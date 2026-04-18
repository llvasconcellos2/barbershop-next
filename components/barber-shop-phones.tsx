import { PhoneIcon } from 'lucide-react';
import CopyPhoneButton from './copy-phone-button';

export default function BarberShopPhones({ phones }: { phones: string[] | null }) {
  return phones?.map((phone, index) => (
    <div className='flex items-center justify-between' key={index}>
      <div className='flex items-center gap-2'>
        <PhoneIcon size={18} />
        <p className='text-sm'>{phone}</p>
      </div>
      <CopyPhoneButton phone={phone} />
    </div>
  ));
}
