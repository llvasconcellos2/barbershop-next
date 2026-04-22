import Search from '@/components/search';
import { getDoneUserBookings, getUpcomingUserBookings } from '@/app/actions';
import BookingCard from '@/components/booking-card';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { forbidden } from 'next/navigation';

export default async function BarberShopsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return forbidden();

  const [upcomingBookings, doneBookings] = await Promise.all([
    getUpcomingUserBookings(),
    getDoneUserBookings(),
  ]);
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Search />
      <h1 className='text-xl font-bold'>Bookings</h1>
      {upcomingBookings.length > 0 && (
        <>
          <h2 className='text-xs font-bold text-gray-400 uppercase'>Upcoming</h2>
          {upcomingBookings.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </>
      )}
      {doneBookings.length > 0 && (
        <>
          <h2 className='text-xs font-bold text-gray-400 uppercase'>Done</h2>
          {doneBookings.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </>
      )}

      {upcomingBookings.length === 0 && doneBookings.length === 0 && (
        <p>No bookings scheduled yet.</p>
      )}
    </div>
  );
}
