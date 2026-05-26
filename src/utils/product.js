export function hasMeaningfulDiscount(product) {
  return Math.round(product.discountPercentage) > 0;
}

export function getStockState(product) {
  if (product.stock === 0) return 'out';
  if (product.availabilityStatus === 'Low Stock') return 'low';
  return 'in';
}

export function getStockLabel(state) {
  if (state === 'out') return 'Немає в наявності';
  if (state === 'low') return 'Закінчується';
  return 'В наявності';
}