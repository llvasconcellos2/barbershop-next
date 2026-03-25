import Banner from '@/components/banner';
import BarberShops, { BarberShopSort } from '@/components/barber-shops';
import Bookings from '@/components/bookings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
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

function Search() {
  return (
    <div className='flex items-center gap-2'>
      <Input placeholder='Search...' />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
}

type QuickSearchOption = {
  imageUrl: string;
  name: string;
};

function QuickSearchBar() {
  const options: QuickSearchOption[] = [
    {
      imageUrl: '/haircut.svg',
      name: 'Haircut',
    },
    {
      imageUrl: '/beard.svg',
      name: 'Beard',
    },
    {
      imageUrl: '/finish.svg',
      name: 'Finish',
    },
    {
      imageUrl: '/eyebrows.svg',
      name: 'Eyebrows',
    },
    {
      imageUrl: '/hydration.svg',
      name: 'Hydration',
    },
    {
      imageUrl: '/massage.svg',
      name: 'Massage',
    },
  ];

  return (
    <div className='flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden'>
      {options.map((option) => (
        <QuickSearchBarItem option={option} key={option.name} />
      ))}
    </div>
  );
}

function QuickSearchBarItem({ option }: { option: QuickSearchOption }) {
  return (
    <Button variant='outline' className='p-4'>
      <Image src={option.imageUrl} width={16} height={16} alt={option.name} />
      {option.name}
    </Button>
  );
}
