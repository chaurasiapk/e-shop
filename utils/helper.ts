export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Returns a random color from the predefined color list.
 */
export const getRandomColor = (): string => {
  const COLORS = [
    "#EF4444", // Red
    "#F97316", // Orange
    // "#F59E0B", // Amber
    // "#10B981", // Emerald
    "#22C55E", // Green
    // "#06B6D4", // Cyan
    "#3B82F6", // Blue
    // "#6366F1", // Indigo
    // "#8B5CF6", // Violet
    "#EC4899", // Pink
  ] as const;
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }
