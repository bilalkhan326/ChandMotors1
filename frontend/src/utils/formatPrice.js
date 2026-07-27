export default function formatPrice(value) {
  if (value === null || value === undefined || value === '') return ''
  const num = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]+/g, ''))
  if (Number.isNaN(num)) return ''
  return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(num)
}
