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
import { createBooking, getBookingsByServiceAndDate } from '@/app/actions';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import LoginDialog from './login-dialog';
import BookingInfo from './booking-info';

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
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeSlots, setTimeSlots] = useState<Date[]>([]);
  const [bookDate, setBookDate] = useState<Date | undefined>();

  async function fetchData(date: Date = new Date()) {
    const bookings = await getBookingsByServiceAndDate(service.id, date);
    setBookings(bookings);
    setTimeSlots(getRemainingTimeSlots(getDayTimeSlots(date, 45), bookings));
  }

  function getRemainingTimeSlots(defaultTimeSlots: Date[], bookings: Booking[]): Date[] {
    return defaultTimeSlots.filter((timeSlot) => {
      if (timeSlot.getTime() < new Date().getTime()) return;
      const exists = bookings.some((booking) => booking.date.getTime() === timeSlot.getTime());
      if (!exists) return timeSlot;
    });
  }

  function onSelectDate(date: Date) {
    setDate(date);
    setBookDate(undefined);
    fetchData(date);
  }

  function onSelectTime(time: Date) {
    if (time.getTime() == bookDate?.getTime()) {
      setBookDate(undefined);
    } else {
      setBookDate(time);
    }
  }

  async function confirmBooking() {
    if (!bookDate) return;
    try {
      const newBooking = await createBooking(service, bookDate);
      if (newBooking) {
        setBookings([...bookings, newBooking]);
      }
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

  function handleSheetOpenChange(open: boolean) {
    if (open) {
      fetchData();
    } else {
      setDate(new Date());
      setBookDate(undefined);
    }
    setIsOpen(open);
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='px-5'>
          Book
        </Button>
      </SheetTrigger>
      {isOpen && (
        <SheetContent className='gap-0'>
          <SheetHeader>
            <SheetTitle>Book Your Appointment</SheetTitle>
          </SheetHeader>
          <SheetDescription style={{ display: 'none' }}>Barbershop Calendar</SheetDescription>
          <div className='flex flex-col gap-3 p-5'>
            <Calendar
              required
              mode='single'
              locale={ptBR}
              className='w-full'
              selected={date}
              onSelect={onSelectDate}
              disabled={{ before: new Date() }}
              styles={{
                month_caption: { textTransform: 'capitalize' },
                weekday: { textTransform: 'capitalize' },
              }}></Calendar>
            <div className='flex gap-3 overflow-x-auto border-t border-solid pt-3 [&::-webkit-scrollbar]:hidden'>
              {timeSlots.length > 0 ?
                timeSlots.map((time) => (
                  <Button
                    key={time.toString()}
                    variant={bookDate?.getTime() === time.getTime() ? 'default' : 'outlineCustom'}
                    onClick={() => onSelectTime(time)}>
                    {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </Button>
                ))
              : <p>No available hours left for this date.</p>}
            </div>
            {bookDate && <BookingInfo barberShop={barberShop} service={service} date={bookDate} />}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button disabled={!bookDate} onClick={confirmBooking}>
                {bookDate ? 'Confirm Your Booking' : 'Select Time to Book'}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}
