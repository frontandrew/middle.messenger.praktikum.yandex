function isEmpty(value) {
  if (!value) return true
  if (typeof value === 'boolean') return true
  if (typeof value === 'number') return true
  if (typeof value === 'string') return !value.length
  if (Array.isArray(value)) return !value.length
  return false
}
