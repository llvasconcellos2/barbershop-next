import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import BackButton from './backbutton';
import { headers } from 'next/headers';

export default async function Header() {
  const headersList = await headers();
  const referer = headersList.get('referer');
  return (
    <header>
      <Card className='rounded-none'>
        <CardContent className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <BackButton referer={referer || '/'} />
            <Link href={`/`}>
              <Image
                src='/Logo.svg'
                alt='BarberShop Logo'
                loading='eager'
                width={134}
                height={22}
                style={{ width: 120, height: 18 }}
              />
            </Link>
          </div>
          <Button size='icon' variant='outline'>
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </header>
  );
}
