import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

export default function LoginDialog({ children }: { children: ReactNode }) {
  const handleLogin = async () => await signIn('google');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[80%]'>
        <DialogHeader>
          <DialogTitle>Log Into Your Account</DialogTitle>
          <DialogDescription>Connect using your Google Account.</DialogDescription>
        </DialogHeader>
        <Button variant='outlineCustom' className='gap-2' onClick={handleLogin}>
          <Image src='/google.svg' width={18} height={18} alt='Google Color Icon' /> Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
