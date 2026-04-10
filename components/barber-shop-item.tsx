import { BarberShop } from '@/db/schema';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { StarIcon } from 'lucide-react';
import BarberShopImage from './barber-shop-image';

export default function BarberShopItem({ barberShop }: { barberShop: BarberShop }) {
  return (
    <Card className='min-w-41.75 p-0'>
      <CardContent className='flex flex-col gap-2 p-0 px-2 pt-2 pb-2'>
        <Link href={`/barbershops/${barberShop.id}`}>
          <div className='relative h-39.75 w-full'>
            <BarberShopImage barberShop={barberShop} />
            <Badge className='bg-secondary/70 absolute top-2 left-2 space-x-1' variant='secondary'>
              <StarIcon size={12} className='fill-primary text-primary brightness-100' />
              <p className='text-xs font-semibold brightness-100'>5,0</p>
            </Badge>
          </div>
        </Link>
        <h3 className='truncate font-semibold'>{barberShop.name}</h3>
        <p className='truncate text-sm text-gray-400'>{barberShop.address}</p>
        <Button variant='secondaryCustom' className='mt-1 w-full' asChild>
          <Link href={`/barbershops/${barberShop.id}`}>Book</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
