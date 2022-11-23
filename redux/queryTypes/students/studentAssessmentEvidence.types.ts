export interface IAssessmentsCourses {
  code: string
  createdAt: string
  description: string
  hours: number
  id: number
  isActive: boolean
  requirements: string
  title: string
  updatedAt: string
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
export interface IAssessmentsFolders {
  capacity: number
  createdAt: string
  description: string
  id: number
  isActive: boolean
  name: string
  negativeComments: string
  positiveComments: string
  type: string
  updatedAt: string
  course: {
    code: string
    createdAt: string
    description: string
    hours: number
    id: number
    isActive: boolean
    requirements: string
    title: string
    updatedAt: string
  }
}
export interface IAssessmentsFolderDetail {
  comment: string
  createdAt: string
  id: number
  isActive: boolean
  status: string
  updatedAt: string
  assessmentFolder: {
    capacity: number
    createdAt: string
    description: string
    id: number
    isActive: boolean
    name: string
    negativeComments: string
    positiveComments: string
    type: string
    updatedAt: string
  }
  files: {
    createdAt: string
    file: string
    filename: string
    id: number
    isActive: boolean
    updatedAt: string
  }[]
}
export interface IUploadFolderDocs {
  comment: string
  createdAt: string
  id: number
  isActive: boolean
  status: string
  updatedAt: string
  assessmentFolder: {
    capacity: number
    createdAt: string
    description: string
    id: number
    isActive: boolean
    name: string
    negativeComments: string
    positiveComments: string
    type: string
    updatedAt: string
  }
  files: {
    createdAt: string
    file: string
    filename: string
    id: number
    isActive: boolean
    updatedAt: string
  }[]
}
