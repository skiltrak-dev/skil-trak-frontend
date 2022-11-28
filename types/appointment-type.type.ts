import { BaseResponse } from './base.type'


export interface AppointmentType extends BaseResponse {
  id?: number
  title: string
  color: string
  breakDuration: number
  duration: string
  videoAppointment: boolean
  appointmentFor?: string
  appointmentParticipants?: string[]
  emailContent: string
}
