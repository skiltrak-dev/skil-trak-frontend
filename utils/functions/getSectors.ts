import { Course, Sector } from "@types"

export const getSectors = (courses: Course[]) => {
  if (!courses) return {}
  const sectors = {}
  courses.forEach((c: Course) => {
      if ((sectors as any)[c.sector.name]) {
          ;(sectors as any)[c.sector.name].push(c)
      } else {
          ;(sectors as any)[c.sector.name] = []
          ;(sectors as any)[c.sector.name].push(c)
      }
  })
  return sectors
}
