import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  timestamp?: Date;
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      timestamp: new Date(),
    });
    
    console.log('Document written with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, error: error };
  }
};
