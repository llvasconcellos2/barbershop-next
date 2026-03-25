import { BarberShop, barberShopTable } from '@/db/schema';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { StarIcon } from 'lucide-react';

export default function BarberShopItem({ barberShop }: { barberShop: BarberShop }) {
  return (
    <Card className='min-w-41.75 p-0'>
      <CardContent className='flex flex-col gap-2 p-0 px-2 pt-2 pb-2'>
        <div className='relative h-39.75 w-full'>
          {barberShop.imageUrl ?
            <Image
              src={barberShop.imageUrl}
              alt={`${barberShop.name} BarberShop Picture`}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              fill
              className='rounded-md object-cover'
            />
          : <div>Placeholder da Barbearia</div>}
          <Badge className='bg-secondary/70 absolute top-2 left-2 space-x-1' variant='secondary'>
            <StarIcon size={12} className='fill-primary text-primary brightness-100' />
            <p className='text-xs font-semibold brightness-100'>5,0</p>
          </Badge>
        </div>
        <h3 className='truncate font-semibold'>{barberShop.name}</h3>
        <p className='truncate text-sm text-gray-400'>{barberShop.address}</p>
        <Button variant='secondary' className='mt-1 w-full' asChild>
          <Link href={`/barbershops/${barberShop.id}`}>Reservar</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
