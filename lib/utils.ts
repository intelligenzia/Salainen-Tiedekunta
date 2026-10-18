import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "1 kurssi", "3 kurssia" */
export function courseCount(n: number) {
  return `${n} ${n === 1 ? 'kurssi' : 'kurssia'}`;
}

/** Square, face-cropped Contentful thumbnail for an avatar of `size` points. */
export function avatarThumb(url: string | undefined, size: number) {
  return url ? `${url}?w=${size * 3}&h=${size * 3}&fit=thumb&f=face` : undefined;
}
