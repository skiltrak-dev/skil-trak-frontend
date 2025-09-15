import { UserRoles } from '@constants'
import { WorkplaceCurrentStatus } from '@utils'

export const excludedRoles = [UserRoles.RTO, UserRoles.OBSERVER]

export const canAddAnotherWorkplace = (
    firstWorkplaceCurrentStatus: WorkplaceCurrentStatus
) => {
    return ![
        WorkplaceCurrentStatus.Completed,
        WorkplaceCurrentStatus.Terminated,
        WorkplaceCurrentStatus.PlacementStarted,
    ].includes(firstWorkplaceCurrentStatus)
}

export const sortedWP = (studentWorkplace: any) =>
    studentWorkplace?.data && studentWorkplace?.data?.length > 0
        ? [...studentWorkplace?.data].sort((a: any, b: any) => {
              // Check if either status is "completed"
              if (
                  a.currentStatus === WorkplaceCurrentStatus.Completed &&
                  b.currentStatus !== WorkplaceCurrentStatus.Completed
              ) {
                  return 1 // a goes after b
              }
              if (
                  a.currentStatus !== WorkplaceCurrentStatus.Completed &&
                  b.currentStatus === WorkplaceCurrentStatus.Completed
              ) {
                  return -1 // a goes before b
              }
              // If neither or both are "completed", sort by createdAt date
              return Date.parse(a.createdAt) - Date.parse(b.createdAt)
          })
        : []

export const isAllDocumentsInitiated = (esignDocumentsFolders: any) =>
    esignDocumentsFolders?.data && esignDocumentsFolders?.isSuccess
        ? esignDocumentsFolders?.data?.every((folder: any) =>
              folder?.course?.esignTemplates?.find(
                  (temp: any) => temp?.documents?.length > 0
              )
          )
        : false
