import { Course, GetSectorsType } from '@types'

export const getSectors = (courses: Course[]) => {
    if (!courses) return {}
    const sectors: GetSectorsType = {}
    courses.forEach((c: Course) => {
        if (sectors[c.sector.name]) {
            sectors[c.sector.name].push(c)
        } else {
            sectors[c.sector.name] = []
            sectors[c.sector.name].push(c)
        }
    })
    return sectors
}
