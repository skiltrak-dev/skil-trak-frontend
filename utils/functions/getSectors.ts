export const getSectors = (courses: any) => {
  if (!courses) return {}
  const sectors = {}
  courses.forEach((c: any) => {
      if ((sectors as any)[c.sector.name]) {
          ;(sectors as any)[c.sector.name].push(c)
      } else {
          ;(sectors as any)[c.sector.name] = []
          ;(sectors as any)[c.sector.name].push(c)
      }
  })
  return sectors
}
