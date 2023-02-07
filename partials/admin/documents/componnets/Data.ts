import { UserRoles } from '@constants'

export enum DocumentType {
    WorkFlow = 'workflow',
    InductionProcess = 'inductionProcess',
    PlacementInfo = 'placementInfo',
    Legal = 'legal',
}

export enum FileType {
    File = 'file',
    Editor = 'editor',
}

export const legalData = [
    {
        name: 'Student',
        type: FileType.Editor,
        docType: DocumentType.Legal,
        role: UserRoles.STUDENT,
    },
    {
        name: 'RTO',
        type: FileType.Editor,
        docType: DocumentType.Legal,
        role: UserRoles.RTO,
    },
    {
        name: 'Industry',
        type: FileType.Editor,
        docType: DocumentType.Legal,
        role: UserRoles.INDUSTRY,
    },
]
export const placementInfoData = [
    {
        name: 'Student',
        type: FileType.Editor,
        docType: DocumentType.PlacementInfo,
        role: UserRoles.STUDENT,
    },
    {
        name: 'RTO',
        type: FileType.Editor,
        docType: DocumentType.PlacementInfo,
        role: UserRoles.RTO,
    },
    {
        name: 'Industry',
        type: FileType.Editor,
        docType: DocumentType.PlacementInfo,
        role: UserRoles.INDUSTRY,
    },
]
export const workflowData = [
    {
        docType: DocumentType.WorkFlow,
        name: 'Student',
        type: FileType.File,
        role: UserRoles.STUDENT,
    },
    {
        docType: DocumentType.WorkFlow,
        name: 'RTO',
        type: FileType.File,
        role: UserRoles.RTO,
    },
    {
        docType: DocumentType.WorkFlow,
        name: 'Industry',
        type: FileType.File,
        role: UserRoles.INDUSTRY,
    },
]
export const inductionProcessData = [
    {
        name: 'Student',
        type: FileType.File,
        docType: DocumentType.InductionProcess,
        role: UserRoles.STUDENT,
    },
    {
        name: 'RTO',
        type: FileType.File,
        docType: DocumentType.InductionProcess,
        role: UserRoles.RTO,
    },
    {
        name: 'Industry',
        type: FileType.File,
        docType: DocumentType.InductionProcess,
        role: UserRoles.INDUSTRY,
    },
]
