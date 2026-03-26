import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <Card className='mt-2 rounded-none'>
        <CardContent className='text-center text-xs text-gray-400'>
          &copy; Developed by{' '}
          <a
            className='text-primary font-bold underline transition-colors duration-300 hover:text-indigo-500'
            target='_blank'
            href='https://llvasconcellos2.github.io/'>
            llvasconcellos
          </a>
        </CardContent>
      </Card>
    </footer>
  );
}
