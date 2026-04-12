'use client';

import { BarberShop, BarberShopService, Booking } from '@/db/schema';
import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceHolder';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
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
import { Calendar } from './ui/calendar';
import { ptBR } from 'react-day-picker/locale';
import { useState } from 'react';
import { getDayTimeSlots } from '@/lib/utils';
import { createBooking } from '@/app/barbershops/[id]/actions';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import LoginDialog from './login-dialog';

export default function BarberShopServiceItem({
  barberShop,
  service,
}: {
  barberShop: BarberShop;
  service: BarberShopService;
}) {
  const { data: session } = useSession();

  return (
    <>
      <Card className='mb-2'>
        <CardContent className='flex items-center gap-3'>
          <div className='relative max-h-27.5 min-h-27.5 max-w-27.5 min-w-27.5'>
            {service.imageUrl ?
              <Image
                src={service.imageUrl}
                alt={`${service.name} Picture`}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                fill
                className='rounded-lg object-cover object-center'
              />
            : <ImagePlaceholder
                alt={`${service.name} Picture`}
                text={service.name}
                width={768}
                height={350}
                className='absolute h-full w-full object-cover object-center'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                background='#262626'
                color='#6e11b0'
              />
            }
          </div>
          <div className='flex w-full flex-col gap-3'>
            <h3 className='font-semibold'>{service.name}</h3>
            <p className='text-gray-400'>{service.description}</p>
            <div className='flex items-center justify-between'>
              <p className='text-primary text-sm font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  service.price,
                )}
              </p>
              {session?.user ?
                <ServiceBooking barberShop={barberShop} service={service} />
              : <LoginDialog>
                  <Button variant='secondary' className='px-5'>
                    Login To Book
                  </Button>
                </LoginDialog>
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ServiceBooking({
  barberShop,
  service,
}: {
  barberShop: BarberShop;
  service: BarberShopService;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // TODO: Não exibir horários já agendados
  const [timeSlots, setTimeSlots] = useState<Date[]>(getDayTimeSlots(undefined, 45));
  const [book, setBook] = useState<Date | undefined>();

  function onSelectDate(date: Date | undefined) {
    setDate(date);
    setBook(undefined);
    setTimeSlots(getDayTimeSlots(date, 45));
  }

  function onSelectTime(time: Date) {
    if (time.getTime() == book?.getTime()) {
      setBook(undefined);
    } else {
      setBook(time);
    }
  }

  async function confirmBooking() {
    if (!book) return;
    try {
      await createBooking(service.id, book);
      toast.success('Booking confirmed!');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      toast.error('Unable to confirm your booking.');
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary' className='px-5'>
          Book
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Book Your Appointment</SheetTitle>
        </SheetHeader>
        <SheetDescription style={{ display: 'none' }}>Barbershop Calendar</SheetDescription>
        <div className='flex flex-col gap-3 p-5'>
          <Calendar
            mode='single'
            locale={ptBR}
            className='w-full'
            selected={date}
            onSelect={onSelectDate}
            styles={{
              month_caption: { textTransform: 'capitalize' },
              weekday: { textTransform: 'capitalize' },
            }}></Calendar>
          <div className='flex gap-3 overflow-x-auto border-t border-solid pt-3 [&::-webkit-scrollbar]:hidden'>
            {timeSlots.map((time) => (
              <Button
                key={time.toString()}
                variant={book?.getTime() === time.getTime() ? 'default' : 'outlineCustom'}
                onClick={() => onSelectTime(time)}>
                {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Button>
            ))}
          </div>
          {book && <BookingInfo barberShop={barberShop} service={service} book={book} />}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button disabled={!book} onClick={confirmBooking}>
              {book ? 'Confirm Your Booking' : 'Select Time to Book'}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function BookingInfo({
  barberShop,
  service,
  book,
}: {
  barberShop: BarberShop;
  service: BarberShopService;
  book: Date;
}) {
  return (
    <Card>
      <CardContent className='flex flex-col gap-2 [&>div]:flex [&>div]:justify-between [&>div:first-child]:font-bold [&>div:not(:first-child)>h2]:text-gray-400'>
        <div>
          <h2>{service.name}</h2>
          <span>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              service.price,
            )}
          </span>
        </div>

        <div>
          <h2>Date</h2>
          <span>{book.toLocaleString('pt-BR', { dateStyle: 'full' })}</span>
        </div>

        <div>
          <h2>Time</h2>
          <span>{book.toLocaleString('pt-BR', { timeStyle: 'short' })}</span>
        </div>

        <div>
          <h2>Barber Shop</h2>
          <span>{barberShop.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
