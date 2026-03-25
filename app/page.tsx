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
      <FastSearchBar />
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

function FastSearchBar() {
  return (
    <div className='flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden'>
      <Button variant='outline' className='p-4'>
        <Image src='/haircut.svg' width={16} height={16} alt='Haircut' />
        Haircut
      </Button>

      <Button variant='outline' className='p-4'>
        <Image src='/beard.svg' width={16} height={16} alt='Beard' />
        Beard
      </Button>

      <Button variant='outline' className='p-4'>
        <Image src='/Finish.svg' width={16} height={16} alt='Finish' />
        Finish
      </Button>

      <Button variant='outline' className='p-4'>
        <Image src='/eyebrows.svg' width={16} height={16} alt='Eyebrows' />
        Eyebrows
      </Button>

      <Button variant='outline' className='p-4'>
        <Image src='/hydration.svg' width={16} height={16} alt='Hydration' />
        Hydration
      </Button>

      <Button variant='outline' className='p-4'>
        <Image src='/massage.svg' width={16} height={16} alt='Massage' />
        Massage
      </Button>
    </div>
  );
}
