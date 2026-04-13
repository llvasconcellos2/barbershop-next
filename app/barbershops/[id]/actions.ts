'use server';

import { db } from '@/db';
import { bookings } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function createBooking(serviceId: string, date: Date) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return;

  const booking = await db
    .insert(bookings)
    .values({
      barberShopServiceId: serviceId,
      date,
      userId: session?.user?.id,
    })
    .returning();
  if (booking && booking.length === 1) return booking[0];
}

export async function getBookings(serviceId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = await db.query.bookings.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.barberShopServiceId, serviceId),
        operators.and(operators.lt(fields.date, endOfDay), operators.gt(fields.date, startOfDay)),
      );
    },
  });
  return bookings;
}
