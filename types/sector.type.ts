import { BaseResponse } from './base.type'
import { Folder } from './folder.type'

export interface Course extends BaseResponse {
  id: number
  code: string
  title: string
  description: string
  hours: number
  requirements: string
  sector: Sector
  folders: Folder[]
}

export interface Sector extends BaseResponse {
  id: number
  code: string
  name: string
  courses: Course[]
}
