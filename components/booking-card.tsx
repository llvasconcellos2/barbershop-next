'use client';

import { BookingWithServiceAndBarberShop } from '@/db/schema';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import Image from 'next/image';
import { Car } from 'lucide-react';
import BookingInfo from './booking-info';
import BarberShopPhones from './barber-shop-phones';

export default function BookingCard({ booking }: { booking: BookingWithServiceAndBarberShop }) {
  const [isOpen, setIsOpen] = useState(false);
  const isUpcoming = booking.date.getTime() > new Date().getTime();

  function handleSheetOpenChange(open: boolean) {
    // if (open) {
    //   fetchData();
    // } else {
    //   setDate(new Date());
    //   setBook(undefined);
    // }
    setIsOpen(open);
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Card className='cursor-pointer p-0'>
          <CardContent className='flex'>
            <div className='flex w-full flex-col gap-3 p-5'>
              <Badge variant={isUpcoming ? 'default' : 'secondary'}>
                {isUpcoming ? 'Upcoming' : 'Done'}
              </Badge>
              <h3 className='font-semibold'>{booking.barberShopService.name}</h3>
              <div className='flex items-center gap-2'>
                <BarbershopAvatar
                  url={booking.barberShopService.barberShop.imageUrl as string}
                  name={booking.barberShopService.barberShop.name}
                />
                <p className='text-sm'>{booking.barberShopService.barberShop.name}</p>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center gap-3 border-l p-5'>
              <h3 className='capitalize'>
                {booking.date.toLocaleString('pt-BR', { month: 'long' })}
              </h3>
              <h1 className='text-2xl'>{booking.date.getDate()}</h1>
              <h2 className='font-semibold'>
                {booking.date.toLocaleTimeString('pt-BR', { timeStyle: 'short' })}
              </h2>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      {isOpen && (
        <SheetContent className='gap-0'>
          <SheetHeader>
            <SheetTitle>Booking Info</SheetTitle>
          </SheetHeader>
          <SheetDescription style={{ display: 'none' }}>Booking Info</SheetDescription>
          <div className='flex flex-col gap-4 p-5'>
            <div className='relative flex h-45 items-end p-5'>
              <Image src='/map.png' alt='Barbershop Map' fill className='rounded-xl object-cover' />
              <Card className='z-50 w-full p-0'>
                <CardContent className='flex items-center gap-3 p-3'>
                  <div>
                    <BarbershopAvatar
                      url={booking.barberShopService.barberShop.imageUrl as string}
                      name={booking.barberShopService.barberShop.name}
                    />
                  </div>
                  <div className='flex flex-col gap-0'>
                    <h2 className='font-bold'>{booking.barberShopService.barberShop.name}</h2>
                    <p className='text-xs'>{booking.barberShopService.barberShop.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Badge variant={isUpcoming ? 'default' : 'secondary'}>
              {isUpcoming ? 'Upcoming' : 'Done'}
            </Badge>
            <BookingInfo
              barberShop={booking.barberShopService.barberShop}
              service={booking.barberShopService}
              date={booking.date}
            />
            <BarberShopPhones phones={booking.barberShopService.barberShop.phones} />
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button>Confirm Your Booking</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}

function BarbershopAvatar({ url, name }: { url: string; name: string }) {
  return (
    <Avatar size='lg'>
      <AvatarImage src={url} alt='Barber Avatar' />
      <AvatarFallback>{name.split(' ').map((value) => value.charAt(0))}</AvatarFallback>
    </Avatar>
  );
}
