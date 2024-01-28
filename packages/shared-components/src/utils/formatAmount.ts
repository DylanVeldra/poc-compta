export function numberFormatter(
  number: number,
  country: string,
  symbol?: string,
): string {
  let format = country === 'en' ? 'en-US' : 'fr-FR';
  let suffix = symbol ? symbol : '$';
  return (
    new Intl.NumberFormat(format, {
      style: 'decimal',
      currency: 'USD',
      maximumFractionDigits: 2,
    })
      .format(number)
      .replace(/,/, '.') + suffix
  );
}

export function formatAmount(amount: number, suffix: string = '$'): string {
  const units = ['', 'K', 'M', 'B'];
  const u = ~~(((~~amount).toString().length - 1) / 3);

  return (amount / Math.pow(1000, u)).toFixed(1) + units[u] + ' ' + suffix;
}
