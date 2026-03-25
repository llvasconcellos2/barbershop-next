import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

export default function Bookings() {
  return (
    <div className='flex flex-col gap-2'>
      <h2>Bookings</h2>
      <Card className='p-0'>
        <CardContent className='flex'>
          <div className='flex w-full flex-col gap-3 p-5'>
            <Badge>Confirmed</Badge>
            <h3 className='font-semibold'>Haircut </h3>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage
                  src='https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png'
                  alt='Barber Avatar'
                />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <p className='text-sm'>Barbearia do Leonardo</p>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center gap-3 border-l p-5'>
            <h3>Fevereiro</h3>
            <h1 className='text-2xl'>06</h1>
            <h2 className='font-semibold'>20:00</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
