import BarberShopItem from '@/components/barber-shop-item';
import Search from '@/components/search';
import { db } from '@/db';
import { barberShopServices } from '@/db/schema';

export default async function BarberShopsPage({
  searchParams,
}: {
  searchParams: { q?: string; s?: string };
}) {
  const params = await searchParams;
  const barberShops = await db.query.barberShops.findMany({
    where(fields, operators) {
      if (params.s) {
        return operators.exists(
          db
            .select()
            .from(barberShopServices)
            .where(
              operators.and(
                operators.eq(barberShopServices.barberShopId, fields.id),
                operators.eq(barberShopServices.name, params.s),
              ),
            ),
        );
      } else {
        return operators.ilike(fields.name, `%${params.q ?? ''}%`);
      }
    },
  });

  return (
    <div className='flex flex-col gap-4 p-5'>
      <Search />
      {(params.q || params.s) && (
        <h2 className='text-xs font-bold text-gray-400 uppercase'>
          Resultados para "{params.q || params.s}"
        </h2>
      )}
      <div className='grid grid-cols-2 gap-4'>
        {barberShops.map((barberShop) => (
          <BarberShopItem barberShop={barberShop} key={barberShop.id} />
        ))}
      </div>
    </div>
  );
}
