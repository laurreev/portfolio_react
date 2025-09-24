import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const name = (data.get("Name") as string) || "";
    const email = (data.get("Email") as string) || "";
    const subject = (data.get("Subject") as string) || "Contact Form Submission";
    const message = (data.get("Message") as string) || "";

    // Validate required fields
    if (!email || !name || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email format" }), { status: 400 });
    }

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your Gmail address
        pass: process.env.SMTP_PASS, // your Gmail app password
      },
    });

    // Email to you
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: "dlanor.dev@gmail.com", // your static email
      subject: `New Inquiry from your Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Subject:</b> ${subject}<br/><b>Message:</b><br/>${message}`,
    });

    // Auto-response to sender
    await transporter.sendMail({
      from: `Dlanor Domingo <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting Dlanor Domingo",
      text: `Dear ${name || "Guest"},\n\nThank you for your email. Your message has been received and I will get back to you as soon as possible.\n\nIf you need to reach me directly, contact dlanor.dev@gmail.com.\n You can also find me on social media: \nFacebook: https://www.facebook.com/sinnerdlei\nInstagram: https://www.instagram.com/sinnerdlei\nTelegram: https://t.me/sinnerdlei\nTwitter: https://twitter.com/sinnerdlei\n\nBest regards,\nDlanor Domingo`,
      html: `<p>Dear ${name || "Guest"},</p><p>Thank you for your email. Your message has been received and I will get back to you as soon as possible.</p><p>If you need to reach me directly, contact <a href="mailto:dlanor.dev@gmail.com">dlanor.dev@gmail.com</a>.</p><p>You can also find me on social media:</p><ul><li>Facebook: <a href="https://www.facebook.com/sinnerdlei">https://www.facebook.com/sinnerdlei</a></li><li>Instagram: <a href="https://www.instagram.com/sinnerdlei">https://www.instagram.com/sinnerdlei</a></li><li>Telegram: <a href="https://t.me/sinnerdlei">https://t.me/sinnerdlei</a></li><li>Twitter: <a href="https://twitter.com/sinnerdlei">https://twitter.com/sinnerdlei</a></li></ul><p>Best regards,<br/>Dlanor Domingo</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(JSON.stringify({ ok: false, error: errorMessage }), { status: 500 });
  }
}