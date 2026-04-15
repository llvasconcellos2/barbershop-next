'use server';

import { db } from '@/db';
import { BarberShopService, bookings, BookingWithServiceAndBarberShop } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { forbidden } from 'next/navigation';

export async function createBooking(service: BarberShopService, date: Date) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return forbidden();

  const booking = await db
    .insert(bookings)
    .values({
      barberShopServiceId: service.id,
      date,
      userId: session?.user?.id,
    })
    .returning();
  if (booking && booking.length === 1) {
    revalidatePath(`/barbershops/${service.barberShopId}`);
    return booking[0];
  }
}

export async function getBookingsByServiceAndDate(serviceId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await db.query.bookings.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.barberShopServiceId, serviceId),
        operators.and(operators.lt(fields.date, endOfDay), operators.gt(fields.date, startOfDay)),
      );
    },
  });
}

export async function getUserBookings() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  return db.query.bookings.findMany({
    where(fields, operators) {
      return operators.eq(fields.userId, session.user.id);
    },
    orderBy: (bookings, { desc }) => [desc(bookings.date)],
    with: {
      barberShopService: {
        with: {
          barberShop: true,
        },
      },
    },
  });
}

export async function getUpcomingUserBookings() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  return db.query.bookings.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, session.user.id),
        operators.gte(fields.date, new Date()),
      );
    },
    orderBy: (bookings, { desc }) => [desc(bookings.date)],
    with: {
      barberShopService: {
        with: {
          barberShop: true,
        },
      },
    },
  });
}

export async function getDoneUserBookings() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  return db.query.bookings.findMany({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, session.user.id),
        operators.lt(fields.date, new Date()),
      );
    },
    orderBy: (bookings, { desc }) => [desc(bookings.date)],
    with: {
      barberShopService: {
        with: {
          barberShop: true,
        },
      },
    },
  });
}
