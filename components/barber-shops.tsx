import { db } from '@/db';
import BarberShopItem from './barber-shop-item';
import { barberShopTable } from '@/db/schema';

export enum BarberShopSort {
  Popular,
  Recommended,
}

export default async function BarberShops({ sort }: { sort: BarberShopSort }) {
  let barberShops = await db.select().from(barberShopTable).orderBy(barberShopTable.name);
  let title = '';
  if (BarberShopSort.Popular === sort) {
    title = 'POPULAR';
  } else {
    title = 'RECOMMENDED';
    barberShops = barberShops.sort((a, b) => b.name.localeCompare(a.name));
  }
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-xs font-bold text-gray-400 uppercase'>{title}</h2>
      <div className='flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden'>
        {barberShops.map((barberShop) => (
          <BarberShopItem barberShop={barberShop} key={barberShop.id} />
        ))}
      </div>
    </div>
  );
}
