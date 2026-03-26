import { BarberShopService } from '@/db/schema';
import BarberShopImage from './barber-shop-image';
import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceHolder';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export default function BarberShopServiceItem({ service }: { service: BarberShopService }) {
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
          <div className='flex flex-col gap-3'>
            <h3 className='font-semibold'>{service.name}</h3>
            <p className='text-gray-400'>{service.description}</p>
            <div className='flex items-center justify-between'>
              <p className='text-primary text-sm font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  service.price,
                )}
              </p>
              <Button variant='secondary' className='px-5'>
                Book
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
