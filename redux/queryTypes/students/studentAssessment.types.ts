export interface IStudentAssessmentTool {
  code: string
  createdAt: string
  description: string
  hours: number
  id: number
  isActive: boolean
  requirements: string
  title: string
  upadatedAt: string
  subadmin: {
    appointmentEligibility: boolean
    createdAt: string
    id: number
    isActive: boolean
    updatedAt: string
    user: {
      avatar: string
      createdAt: string
      email: string
      id: number
      isActive: boolean
      name: string
      password: string
      role: string
      socketId: string
      status: string
      updatedAt: string
    }
  }[]
}
export interface IStudentCourses {
  createdAt: string
  file: string
  id: number
  isActive: boolean
  status: string
  title: string
  updatedAt: string
}
