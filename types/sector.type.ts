import { BaseResponse } from './base.type'

export interface Course extends BaseResponse {
   id: number
   code: string
   title: string
   description: string
   hours: number
   requirementFile: string
   sector: Sector
}

export interface Sector extends BaseResponse {
   id: number
   code: string
   name: string
   courses: Course[]
}
