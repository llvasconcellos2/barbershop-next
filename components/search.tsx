'use client';

import { SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';

const formSchema = z.object({
  q: z.string().trim().min(1, 'Type your search'),
});

export default function Search() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: '',
    },
  });

  const router = useRouter();

  function handleSearch(data: z.infer<typeof formSchema>) {
    router.push(`/barbershops/?q=${data.q}`);
  }

  return (
    <form id='form-search' onSubmit={form.handleSubmit(handleSearch)} className='flex gap-2'>
      <FieldGroup>
        <Controller
          name='q'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id='q'
                aria-invalid={fieldState.invalid}
                placeholder='Search...'
                autoComplete='off'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type='submit' form='form-search'>
        <SearchIcon />
      </Button>
    </form>
  );
}
