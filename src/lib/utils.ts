import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateCredibility = (score: number, violations: number) => {
  let base = score;

  if (violations > 0) {
    base -= violations * 5;
  }

  return Math.max(base, 0);
};
