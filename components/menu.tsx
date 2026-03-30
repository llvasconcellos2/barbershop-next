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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function Menu() {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='ghostCustom'
                className='hover:bg-primary/30! flex w-full items-center justify-between bg-transparent! px-2 py-5'>
                <h2>Log into your account</h2>
                <div className='bg-primary rounded-md p-1.5'>
                  <LogInIcon size={18} />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className='w-[80%]'>
              <DialogHeader>
                <DialogTitle>Log Into Your Account</DialogTitle>
                <DialogDescription>Connect using your Google Account.</DialogDescription>
              </DialogHeader>
              <Button variant='outlineCustom' className='gap-2'>
                <Image src='/google.svg' width={18} height={18} alt='Google Color Icon' /> Google
              </Button>
            </DialogContent>
          </Dialog>
          {/* <Avatar size='lg' className='border-primary border-3'>
            <AvatarImage src='/leo.png' alt='Barber Avatar' />
            <AvatarFallback>LLV</AvatarFallback>
          </Avatar>
          <div>
            <p className='font-bold'>Leonardo Lima de Vasconcellos</p>
            <p className='text-xs'>llvasconcellos@gmail.com</p>
          </div>  */}
        </div>
        <div className='flex flex-col gap-2 border-b border-solid p-5'>
          <SheetClose asChild>
            <Button className='justify-start gap-2' asChild>
              <Link href={`/`}>
                <HomeIcon />
                Home
              </Link>
            </Button>
          </SheetClose>
          <Button className='justify-start gap-2' variant='ghost'>
            <Calendar1Icon />
            Bookings
          </Button>
        </div>
        <div className='flex flex-col gap-2 border-b border-solid p-5'>
          {QUICKSEARCHOPTIONS.map((option) => (
            <QuickSearchMenuItem option={option} key={option.name} />
          ))}
        </div>
        <div className='flex flex-col gap-2 border-b border-solid p-5'>
          <Button variant='secondary' className='gap-2'>
            <LogOutIcon />
            Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function QuickSearchMenuItem({ option }: { option: QuickSearchOption }) {
  return (
    <Button variant='ghostCustom' className='justify-start gap-2'>
      <Image src={option.imageUrl} width={18} height={18} alt={option.name} />
      {option.name}
    </Button>
  );
}
