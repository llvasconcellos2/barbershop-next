import Banner from '@/components/banner';
import BarberShops, { BarberShopSort } from '@/components/barber-shops';
import BookingCard from '@/components/booking-card';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { QuickSearchOption, QUICKSEARCHOPTIONS } from '@/lib/quick-search-options';
import Image from 'next/image';
import Link from 'next/link';
import { getUpcomingUserBookings } from './actions';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const bookings = await getUpcomingUserBookings();

  return (
    <div className='flex flex-col gap-6 p-5'>
      <HomeHeader />
      <Search />
      <QuickSearchBar />
      <Banner />
      {bookings.length > 0 && (
        <div className='flex flex-col gap-2'>
          <h2>Bookings</h2>
          {bookings.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </div>
      )}
      <BarberShops sort={BarberShopSort.Recommended} />
      <BarberShops sort={BarberShopSort.Popular} />
    </div>
  );
}

async function HomeHeader() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h2 className='text-xl font-bold'>
        {session?.user.name ? `Hello, ${session.user.name}` : 'Welcome'}
      </h2>
      <p className='capitalize'>{new Date().toLocaleString('pt-BR', { dateStyle: 'full' })}</p>
    </div>
  );
}

function QuickSearchBar() {
  return (
    <div className='flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden'>
      {QUICKSEARCHOPTIONS.map((option) => (
        <QuickSearchBarItem option={option} key={option.name} />
      ))}
    </div>
  );
}

function QuickSearchBarItem({ option }: { option: QuickSearchOption }) {
  return (
    <Button variant='outlineCustom' className='p-4' asChild>
      <Link href={`/barbershops/?s=${option.name}`}>
        <Image src={option.imageUrl} width={16} height={16} alt={option.name} />
        {option.name}
      </Link>
    </Button>
  );
}
