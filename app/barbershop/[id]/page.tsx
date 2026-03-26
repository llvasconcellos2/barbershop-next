import { db } from '@/db';
import { BarberShop } from '@/db/schema';
import { notFound } from 'next/navigation';
import BarberShopImage from '@/components/barber-shop-image';
import { MapPinIcon, PhoneIcon, StarIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import BarberShopServiceItem from '@/components/barber-shop-service-item';
import { Button } from '@/components/ui/button';
import CopyPhoneButton from '@/components/copy-phone-button';

export default async function BarberShopPage({ params }: { params: { id: string } }) {
  const { id: barberShopId } = await params;
  try {
    const barberShop = await db.query.barberShopTable.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, barberShopId);
      },
      with: {
        barberShopServices: true,
      },
    });
    if (!barberShop) return notFound();
    return <BarberShopComponent barberShop={barberShop} />;
  } catch (e) {
    return notFound();
  }
}

function BarberShopComponent({ barberShop }: { barberShop: BarberShop }) {
  return (
    <div className='flex flex-1 flex-col gap-2'>
      <div className='relative aspect-video h-87.5 w-full'>
        <BarberShopImage barberShop={barberShop} />
      </div>
      <div className='flex flex-col gap-3 p-5'>
        <h1 className='text-xl font-bold'>{barberShop.name}</h1>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='text-primary' size={18} />
          <p className='text-sm'>{barberShop.address}</p>
        </div>
        <div className='flex items-center gap-2'>
          <StarIcon className='text-primary fill-primary' size={18} />
          <p className='text-sm'>5.0 (458 ratings)</p>
        </div>
        <Separator />
        <h2 className='text-xs font-bold text-gray-400 uppercase'>ABOUT US</h2>
        <p className='text-justify text-sm'>{barberShop.description}</p>
        <Separator />
        <h2 className='text-xs font-bold text-gray-400 uppercase'>SERVICES</h2>
        {barberShop.barberShopServices.map((service) => (
          <BarberShopServiceItem service={service} key={service.id} />
        ))}
        <Separator />
        {barberShop.phones?.map((phone, index) => (
          <div className='flex items-center justify-between' key={index}>
            <div className='flex items-center gap-2'>
              <PhoneIcon size={18} />
              <p className='text-sm'>{phone}</p>
            </div>
            <CopyPhoneButton phone={phone} />
          </div>
        ))}
      </div>
    </div>
  );
}
