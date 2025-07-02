declare module 'tailwind-merge' {
  import { ClassValue } from 'clsx';
  export function twMerge(...inputs: ClassValue[]): string;
  export default twMerge;
}