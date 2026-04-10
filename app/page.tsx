import Banner from '@/components/banner';
import BarberShops, { BarberShopSort } from '@/components/barber-shops';
import Bookings from '@/components/bookings';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { QuickSearchOption, QUICKSEARCHOPTIONS } from '@/lib/quick-search-options';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col gap-6 p-5'>
      <HomeHeader />
      <Search />
      <QuickSearchBar />
      <Banner />
      <Bookings />
      <BarberShops sort={BarberShopSort.Recommended} />
      <BarberShops sort={BarberShopSort.Popular} />
    </div>
  );
}

function HomeHeader() {
  return (
    <div>
      <h2 className='text-xl font-bold'>Hello, Leonardo</h2>
      <p>Segunda-feira, 24 de Março de 2026</p>
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
    <Button variant='outlineCustom' className='p-4'>
      <Image src={option.imageUrl} width={16} height={16} alt={option.name} />
      {option.name}
    </Button>
  );
}
