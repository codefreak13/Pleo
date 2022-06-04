export const formatCurrency = (currency: string) => {
  if (currency === 'GBP') {
    return '\u00A3';
  } else if (currency === 'DKK') {
    return 'DKK';
  } else if (currency === 'EUR') {
    return '\u20AC';
  }
};
