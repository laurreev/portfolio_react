import nodemailer from "nodemailer";
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Rate limiting storage (Firebase Firestore)
interface RateLimit {
  count: number;
  resetTime: number;
  lastUsed: number;
}

// Check rate limit for IP using Firebase
async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  if (!ip || ip === 'unknown') {
    console.log('Unknown IP, allowing request');
    return { allowed: true, remaining: 1, resetTime: Date.now() + (24 * 60 * 60 * 1000) };
  }

  const now = Date.now();
  const RATE_LIMIT = 2;
  const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
  
  try {
    console.log(`Checking rate limit for IP: ${ip}`);
    
    // Create safe document ID by replacing dots and other special chars
    const safeIP = ip.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, 'contactRateLimits', safeIP);
    
    const docSnap = await getDoc(docRef);
    console.log(`Document exists: ${docSnap.exists()}`);
    
    if (!docSnap.exists()) {
      // First time this IP is contacting
      const newLimit: RateLimit = { 
        count: 1, 
        resetTime: now + WINDOW_MS, 
        lastUsed: now 
      };
      
      await setDoc(docRef, newLimit);
      console.log(`New rate limit created for ${ip}: count=1, remaining=1`);
      
      return { 
        allowed: true, 
        remaining: RATE_LIMIT - 1, 
        resetTime: newLimit.resetTime 
      };
    }
    
    const data = docSnap.data() as RateLimit;
    console.log(`Existing data:`, data);
    
    // Check if the limit window has expired
    if (now > data.resetTime) {
      console.log(`Rate limit window expired, resetting for ${ip}`);
      
      const newLimit: RateLimit = { 
        count: 1, 
        resetTime: now + WINDOW_MS, 
        lastUsed: now 
      };
      
      await setDoc(docRef, newLimit);
      
      return { 
        allowed: true, 
        remaining: RATE_LIMIT - 1, 
        resetTime: newLimit.resetTime 
      };
    }
    
    // Check if limit exceeded
    if (data.count >= RATE_LIMIT) {
      const hoursLeft = Math.ceil((data.resetTime - now) / (1000 * 60 * 60));
      console.log(`Rate limit exceeded for ${ip}. ${hoursLeft} hours left`);
      
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: data.resetTime 
      };
    }
    
    // Increment the count
    const updatedLimit: RateLimit = {
      count: data.count + 1,
      resetTime: data.resetTime,
      lastUsed: now
    };
    
    await setDoc(docRef, updatedLimit);
    console.log(`Rate limit updated for ${ip}: count=${updatedLimit.count}, remaining=${RATE_LIMIT - updatedLimit.count}`);
    
    return { 
      allowed: true, 
      remaining: RATE_LIMIT - updatedLimit.count, 
      resetTime: data.resetTime 
    };
    
  } catch (error) {
    console.error('Firebase rate limit error:', error);
    // On Firebase error, allow the request but log it
    return { 
      allowed: true, 
      remaining: 1, 
      resetTime: now + WINDOW_MS 
    };
  }
}

// Get client IP address
function getClientIP(request: Request): string {
  // Check various headers for IP (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }
  
  return 'unknown';
}

// Verify Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    console.log('Verifying Turnstile token:', token ? 'Token received' : 'No token');
    
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    console.log('Turnstile verification response:', data);
    
    return data.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    console.log('=== Contact API Called ===');
    
    // Get client IP and check rate limit
    const clientIP = getClientIP(req);
    console.log('Client IP:', clientIP);
    
    const rateLimitResult = await checkRateLimit(clientIP);
    console.log('Rate limit check:', rateLimitResult);
    
    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime).toLocaleString();
      const hoursLeft = Math.ceil((rateLimitResult.resetTime - Date.now()) / (1000 * 60 * 60));
      
      console.log(`Rate limit BLOCKED for IP: ${clientIP}, hours left: ${hoursLeft}`);
      
      return new Response(JSON.stringify({ 
        error: `Rate limit exceeded. You can send up to 2 messages per day. Please wait ${hoursLeft} hours before trying again. (Reset: ${resetDate})` 
      }), { 
        status: 429,
        headers: { 
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '2',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
        }
      });
    }

    const data = await req.formData();
    const name = (data.get("Name") as string) || "";
    const email = (data.get("Email") as string) || "";
    const subject = (data.get("Subject") as string) || "Contact Form Submission";
    const message = (data.get("Message") as string) || "";
    const turnstileToken = (data.get("turnstile-token") as string) || "";

    console.log('Form data received:', { name, email, subject, hasToken: !!turnstileToken });

    // Validate required fields
    if (!email || !name || !message) {
      console.log('Missing required fields');
      return new Response(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      console.log('No Turnstile token provided');
      return new Response(JSON.stringify({ error: "Missing security verification" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Verifying Turnstile token...');
    const isTokenValid = await verifyTurnstileToken(turnstileToken);
    console.log('Token valid:', isTokenValid);
    
    if (!isTokenValid) {
      console.log('Turnstile verification failed');
      return new Response(JSON.stringify({ error: "Security verification failed" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return new Response(JSON.stringify({ error: "Invalid email format" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    
    console.log('Environment check:', { 
      hasSmtpUser: !!smtpUser,
      hasSmtpPass: !!smtpPass,
      hasTurnstileSecret: !!turnstileSecret
    });

    if (!smtpUser || !smtpPass) {
      console.error('Missing SMTP configuration');
      return new Response(JSON.stringify({ error: "Email service not configured" }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!turnstileSecret) {
      console.error('Missing Turnstile secret key');
      return new Response(JSON.stringify({ error: "Security service not configured" }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Configure SMTP transporter
    console.log('Configuring SMTP transporter...');
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    console.log('Sending main email...');
    
    // Email to you
    await transporter.sendMail({
      from: `Portfolio Contact <${smtpUser}>`,
      to: "dlanor.dev@gmail.com", // your static email
      subject: `New Inquiry from your Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Subject:</b> ${subject}<br/><b>Message:</b><br/>${message}`,
    });

    console.log('Main email sent successfully');

    // Auto-response to sender
    await transporter.sendMail({
      from: `Dlanor Domingo <${smtpUser}>`,
      to: email,
      subject: "Thank you for contacting Dlanor Domingo",
      text: `Dear ${name || "Guest"},\n\nThank you for your email. Your message has been received and I will get back to you as soon as possible.\n\nIf you need to reach me directly, contact dlanor.dev@gmail.com.\n You can also find me on social media: \nFacebook: https://www.facebook.com/sinnerdlei\nInstagram: https://www.instagram.com/sinnerdlei\nTelegram: https://t.me/sinnerdlei\nTwitter: https://twitter.com/sinnerdlei\n\nBest regards,\nDlanor Domingo`,
      html: `<p>Dear ${name || "Guest"},</p><p>Thank you for your email. Your message has been received and I will get back to you as soon as possible.</p><p>If you need to reach me directly, contact <a href="mailto:dlanor.dev@gmail.com">dlanor.dev@gmail.com</a>.</p><p>You can also find me on social media:</p><ul><li>Facebook: <a href="https://www.facebook.com/sinnerdlei">https://www.facebook.com/sinnerdlei</a></li><li>Instagram: <a href="https://www.instagram.com/sinnerdlei">https://www.instagram.com/sinnerdlei</a></li><li>Telegram: <a href="https://t.me/sinnerdlei">https://t.me/sinnerdlei</a></li><li>Twitter: <a href="https://twitter.com/sinnerdlei">https://twitter.com/sinnerdlei</a></li></ul><p>Best regards,<br/>Dlanor Domingo</p>`,
    });

    console.log('Auto-response email sent successfully');
    console.log('=== Contact API Success ===');

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': '2',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
      }
    });
  } catch (err) {
    console.error("Contact form error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(JSON.stringify({ 
      error: "Failed to send message. Please try again." 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}