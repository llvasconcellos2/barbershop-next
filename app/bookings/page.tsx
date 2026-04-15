import Search from '@/components/search';
import { getDoneUserBookings, getUpcomingUserBookings } from '@/app/actions';
import BookingCard from '@/components/booking-card';

export default async function BarberShopsPage() {
  const [upcomingBookings, doneBookings] = await Promise.all([
    getUpcomingUserBookings(),
    getDoneUserBookings(),
  ]);
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Search />
      <h1 className='text-xl font-bold'>Bookings</h1>
      <h2 className='text-xs font-bold text-gray-400 uppercase'>Upcoming</h2>
      {upcomingBookings.map((booking) => (
        <BookingCard booking={booking} key={booking.id} />
      ))}
      <h2 className='text-xs font-bold text-gray-400 uppercase'>Done</h2>
      {doneBookings.map((booking) => (
        <BookingCard booking={booking} key={booking.id} />
      ))}
    </div>
  );
}
