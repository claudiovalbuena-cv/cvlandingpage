import { getDb } from './firebase-admin';
import { Service, Booking } from '@/types';

// Helper function to get Firestore database instance
const db = () => getDb();

// Helper functions for data operations
export async function getServices(): Promise<Service[]> {
    const snapshot = await db().collection('services').orderBy('created_at', 'asc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
}

export async function getBookings(): Promise<Booking[]> {
    const snapshot = await db().collection('bookings').orderBy('created_at', 'desc').get();
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
    return bookings;
}

export async function getSettings(): Promise<Record<string, string>> {
    const snapshot = await db().collection('settings').get();
    const dbSettings = snapshot.docs.reduce((acc: Record<string, string>, doc) => {
        acc[doc.id] = doc.data().value;
        return acc;
    }, {});

    return { ...dbSettings };
}

export async function createBooking(booking: {
    name: string;
    email: string;
    phone?: string;
    service_id?: string;
    preferred_date: string;
    message?: string;
}): Promise<Partial<Booking>> {
    const docRef = await db().collection('bookings').add({
        ...booking,
        status: 'pending',
        created_at: new Date().toISOString()
    });
    return { id: docRef.id, ...booking, status: 'pending' };
}

export async function updateSetting(key: string, value: string) {
    await db().collection('settings').doc(key).set({
        value,
        updated_at: new Date().toISOString()
    }, { merge: true });
    return { key, value };
}

export async function updateService(id: string, service: Partial<Service>) {
    await db().collection('services').doc(id).update(service);
    return { id, ...service };
}

export async function createService(service: Partial<Service>) {
    const docRef = await db().collection('services').add({
        ...service,
        created_at: new Date().toISOString()
    });
    return { id: docRef.id, ...service };
}

export async function deleteService(id: string) {
    await db().collection('services').doc(id).delete();
}

export async function updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    await db().collection('bookings').doc(id).update({ status });
    return { id, status };
}

export async function deleteBooking(id: string) {
    await db().collection('bookings').doc(id).delete();
}

// Portfolio helpers
export async function getPortfolio() {
    const snapshot = await db().collection('portfolio').orderBy('order_index', 'asc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createPortfolioItem(item: any) {
    const docRef = await db().collection('portfolio').add(item);
    return { id: docRef.id, ...item };
}

export async function updatePortfolioItem(id: string, updates: any) {
    await db().collection('portfolio').doc(id).update(updates);
    return { id, ...updates };
}

export async function deletePortfolioItem(id: string) {
    await db().collection('portfolio').doc(id).delete();
}
