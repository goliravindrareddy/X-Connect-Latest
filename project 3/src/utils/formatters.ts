export function formatControlNumber(prefix: string, number: number): string {
  return `${prefix}-${number.toString().padStart(2, '0')}`;
}

export function formatCANumber(coNumber: number, caNumber: number): string {
  return `CA${coNumber}.${caNumber.toString().padStart(2, '0')}`;
}

export function parseCANumber(value: string): { valid: boolean; coNumber: number; caNumber: number } {
  // Remove any non-numeric characters except dots
  const cleaned = value.replace(/[^0-9.]/g, '');
  
  // Split by dot to get parts
  const parts = cleaned.split('.');
  
  if (parts.length === 2) {
    const coNumber = parseInt(parts[0]);
    const caNumber = parseInt(parts[1]);
    
    if (!isNaN(coNumber) && !isNaN(caNumber) && coNumber > 0 && caNumber > 0) {
      return { valid: true, coNumber, caNumber };
    }
  }
  
  return { valid: false, coNumber: 0, caNumber: 0 };
}