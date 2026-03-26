import Image from 'next/image';

export default function Banner() {
  return (
    <div className='relative h-[150] w-full'>
      <Image
        src='/banner.png'
        alt='Banner do BarberShop'
        fill
        className='rounded-xl object-cover'
      />
    </div>
  );
}
