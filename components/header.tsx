import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';

export default function Header() {
  return (
    <Card className='rounded-none'>
      <CardContent className='flex items-center justify-between'>
        <Image
          src='/Logo.svg'
          alt='BarberShop Logo'
          loading='eager'
          width={134}
          height={22}
          style={{ width: 120, height: 18 }}
        />
        <Button size='icon' variant='outline'>
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
