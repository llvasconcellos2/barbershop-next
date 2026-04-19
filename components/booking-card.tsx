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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { toast } from 'sonner';
import { deleteBooking } from '@/app/actions';
import GoogleMap from './google-map';

export default function BookingCard({ booking }: { booking: BookingWithServiceAndBarberShop }) {
  const [isOpen, setIsOpen] = useState(false);
  const isUpcoming = booking.date.getTime() > new Date().getTime();

  function handleSheetOpenChange(open: boolean) {
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
            <GoogleMap />
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

          <SheetFooter>{isUpcoming && <CancelBooking bookingId={booking.id} />}</SheetFooter>
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

function CancelBooking({ bookingId }: { bookingId: string }) {
  async function handleCancelBooking() {
    try {
      await deleteBooking(bookingId);
      toast.success('Booking canceled!');
    } catch (error) {
      console.log(error);
      toast.error('Error canceling booking. Try again.');
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Cancel Your Booking</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Your Booking?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your reservation will be permanently canceled.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-row gap-3'>
          <AlertDialogCancel className='flex-1'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='flex-1' variant='destructive' onClick={handleCancelBooking}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
