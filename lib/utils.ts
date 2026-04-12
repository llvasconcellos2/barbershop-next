import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Enumerate<N extends number, Acc extends number[] = []> =
  Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type Minutes = IntRange<0, 60>;
type Hours = IntRange<0, 23>;

export function getDayTimeSlots(
  date: Date = new Date(),
  intervalMinutes: Minutes = 30,
  startHour: Hours = 9,
  endHour: Hours = 21,
) {
  const slots = [];

  const start = new Date(date);
  start.setHours(startHour, 0, 0, 0);

  const end = new Date(date);
  end.setHours(endHour, 0, 0, 0);

  for (let time = start; time <= end; time = new Date(time.getTime() + intervalMinutes * 60000)) {
    slots.push(new Date(time));
  }

  return slots;
}
