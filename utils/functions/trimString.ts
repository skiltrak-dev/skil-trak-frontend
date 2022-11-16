export const trimString = (data) => {
  // data must be in object
  const values = {}
  Object.keys(data).map((key) => {
    if (typeof data[key] === 'string') {
      values[key] = data[key].replace(/\s\s+/g, ' ').trim()
    } else {
      values[key] = data[key]
    }
    return null
  })
  return values
}
