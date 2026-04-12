'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Calendar1Icon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from 'lucide-react';
import { QuickSearchOption, QUICKSEARCHOPTIONS } from '@/lib/quick-search-options';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import LoginDialog from './login-dialog';

export default function Menu() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const q = searchParams.get('q');
  const s = searchParams.get('s');

  const handleLogout = async () => await signOut();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline'>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className='gap-0 overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <SheetDescription style={{ display: 'none' }}>Menu Options</SheetDescription>
        <div className='flex items-center gap-3 border-b border-solid px-5 pb-4'>
          {session?.user ?
            <>
              <Avatar size='lg' className='border-primary border-3'>
                <AvatarImage src={session.user.image ?? ''} alt='Barber Avatar' />
                <AvatarFallback>
                  {session.user.name?.split(' ').map((value) => value.charAt(0))}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-bold'>{session.user.name}</p>
                <p className='text-xs'>{session.user.email}</p>
              </div>
            </>
          : <LoginDialog>
              <Button
                variant='ghostCustom'
                className='hover:bg-primary/30! flex w-full items-center justify-between bg-transparent! px-2 py-5'>
                <h2>Log into your account</h2>
                <div className='bg-primary rounded-md p-1.5'>
                  <LogInIcon size={18} />
                </div>
              </Button>
            </LoginDialog>
          }
        </div>
        <div className='flex flex-col gap-2 border-b border-solid p-5'>
          <SheetClose asChild>
            <Button
              className='justify-start gap-2'
              asChild
              variant={q || s ? 'ghostCustom' : 'default'}>
              <Link href={`/`}>
                <HomeIcon />
                Home
              </Link>
            </Button>
          </SheetClose>
          <Button className='justify-start gap-2' variant='ghostCustom'>
            <Calendar1Icon />
            Bookings
          </Button>
        </div>
        <div className='flex flex-col gap-2 border-b border-solid p-5'>
          {QUICKSEARCHOPTIONS.map((option) => (
            <QuickSearchMenuItem
              option={option}
              key={option.name}
              variant={s === option.name ? 'default' : 'ghostCustom'}
            />
          ))}
        </div>
        {session?.user && (
          <div className='flex flex-col gap-2 border-b border-solid p-5'>
            <Button variant='secondary' className='gap-2' onClick={handleLogout}>
              <LogOutIcon />
              Log Out
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function QuickSearchMenuItem({
  option,
  variant,
}: {
  option: QuickSearchOption;
  variant: 'ghostCustom' | 'default';
}) {
  return (
    <SheetClose asChild>
      <Button variant={variant} className='justify-start gap-2' asChild>
        <Link href={`/barbershops/?s=${option.name}`}>
          <Image src={option.imageUrl} width={18} height={18} alt={option.name} />
          {option.name}
        </Link>
      </Button>
    </SheetClose>
  );
}
