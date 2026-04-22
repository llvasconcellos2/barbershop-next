import { Card, CardContent } from './ui/card';
import { BarberShop, BarberShopService } from '@/db/schema';

export default function BookingInfo({
  barberShop,
  service,
  date: date,
}: {
  barberShop: Pick<BarberShop, 'name'>;
  service: Pick<BarberShopService, 'name' | 'price'>;
  date: Date;
}) {
  return (
    <Card>
      <CardContent className='flex flex-col gap-2 [&>div]:flex [&>div]:justify-between [&>div:first-child]:font-bold [&>div:not(:first-child)>h2]:text-gray-400'>
        <div>
          <h2>{service.name}</h2>
          <span>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              service.price,
            )}
          </span>
        </div>

        <div>
          <h2>Date</h2>
          <span>{date.toLocaleString('pt-BR', { dateStyle: 'full' })}</span>
        </div>

        <div>
          <h2>Time</h2>
          <span>{date.toLocaleString('pt-BR', { timeStyle: 'short' })}</span>
        </div>

        <div>
          <h2>Barber Shop</h2>
          <span>{barberShop.name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
