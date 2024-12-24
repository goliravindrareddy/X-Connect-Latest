export const regions = [
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Middle East',
  'Oceania'
] as const;

export type Region = typeof regions[number];

export const countryToRegion: Record<string, Region> = {
  // Africa
  'ZA': 'Africa', 'EG': 'Africa', 'NG': 'Africa', 'KE': 'Africa',
  // Americas
  'US': 'Americas', 'CA': 'Americas', 'BR': 'Americas', 'MX': 'Americas',
  // Asia
  'CN': 'Asia', 'JP': 'Asia', 'IN': 'Asia', 'KR': 'Asia',
  // Europe
  'GB': 'Europe', 'DE': 'Europe', 'FR': 'Europe', 'IT': 'Europe',
  // Middle East
  'SA': 'Middle East', 'AE': 'Middle East', 'IL': 'Middle East', 'TR': 'Middle East',
  // Oceania
  'AU': 'Oceania', 'NZ': 'Oceania', 'FJ': 'Oceania', 'PG': 'Oceania'
  // Add more mappings as needed
};