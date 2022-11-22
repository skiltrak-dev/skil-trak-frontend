export const trimString = (data: any) => {
  // data must be in object
  const values: any = {}
  Object.keys(data).map((key) => {
    if (typeof data[key] === 'string') {
      (values as any)[key] = data[key].replace(/\s\s+/g, ' ').trim()
    } else {
      (values as any)[key] = data[key]
    }
    return null
  })
  return values
}
