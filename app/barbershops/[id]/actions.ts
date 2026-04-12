'use server';

import { db } from '@/db';
import { bookings } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function createBooking(serviceId: string, date: Date) {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    await db.insert(bookings).values({
      barberShopServiceId: serviceId,
      date,
      userId: session?.user?.id,
    });
  }
}
