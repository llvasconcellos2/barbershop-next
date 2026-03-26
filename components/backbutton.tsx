'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BackButton({ referer }: { referer: string }) {
  const pathname = usePathname();
  return (
    <>
      {pathname !== '/' && (
        <Button size='icon' asChild>
          <Link href={referer}>
            <ChevronLeftIcon />
          </Link>
        </Button>
      )}
    </>
  );
}
