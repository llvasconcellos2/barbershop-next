import { BarberShop } from '@/db/schema';
import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceHolder';

export default function BarberShopImage({ barberShop }: { barberShop: BarberShop }) {
  return (
    <>
      {barberShop.imageUrl ?
        <Image
          src={barberShop.imageUrl}
          alt={`${barberShop.name} BarberShop Picture`}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          fill
          className='object-cover object-center'
        />
      : <ImagePlaceholder
          alt={`${barberShop.name} BarberShop Picture`}
          text={barberShop.name}
          width={768}
          height={350}
          className='absolute h-full w-full object-cover object-center'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          background='#262626'
          color='#6e11b0'
        />
      }
    </>
  );
}
