import { BookingWithServiceAndBarberShop } from '@/db/schema';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

export default function BookingCard({ booking }: { booking: BookingWithServiceAndBarberShop }) {
  const isUpcoming = booking.date.getTime() > new Date().getTime();
  return (
    <Card className='p-0'>
      <CardContent className='flex'>
        <div className='flex w-full flex-col gap-3 p-5'>
          <Badge variant={isUpcoming ? 'default' : 'secondary'}>
            {isUpcoming ? 'Upcoming' : 'Done'}
          </Badge>
          <h3 className='font-semibold'>{booking.barberShopService.name}</h3>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage
                src={booking.barberShopService.barberShop.imageUrl as string}
                alt='Barber Avatar'
              />
              <AvatarFallback>
                {booking.barberShopService.barberShop.name
                  .split(' ')
                  .map((value) => value.charAt(0))}
              </AvatarFallback>
            </Avatar>
            <p className='text-sm'>{booking.barberShopService.barberShop.name}</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-3 border-l p-5'>
          <h3 className='capitalize'>{booking.date.toLocaleString('pt-BR', { month: 'long' })}</h3>
          <h1 className='text-2xl'>{booking.date.getDate()}</h1>
          <h2 className='font-semibold'>
            {booking.date.toLocaleTimeString('pt-BR', { timeStyle: 'short' })}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
