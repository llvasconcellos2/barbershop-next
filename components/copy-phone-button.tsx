'use client';

import { toast } from 'sonner';
import { Button } from './ui/button';

export default function CopyPhoneButton({ phone }: { phone: string }) {
  function onButtonClick() {
    navigator.clipboard.writeText(phone);
    toast.success('Phone copied to clipboard!');
  }
  return (
    <Button variant='outline' onClick={onButtonClick}>
      Copiar
    </Button>
  );
}
