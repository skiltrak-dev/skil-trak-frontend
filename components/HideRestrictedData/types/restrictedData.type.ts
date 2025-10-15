import { UserRoles } from '@constants'

type UserRoleType = `${UserRoles}`

type ReducedUserRoleType = Exclude<
    UserRoleType,
    | UserRoles.ADMIN
    | UserRoles.MANAGER
    | UserRoles.MARKETING
    | UserRoles.SUBADMIN
>

export type RestrictedDataTypes =
    | ReducedUserRoleType
    | 'canAddStudents'
    | 'canCreateInternalTicket'
    | 'canViewRtoList'
    | 'canDownloadReport'
    | 'canViewRtoList'
    | 'canAccessRtoProfile'
    | 'canApproveWorkplace'
    | 'canOnPremiumFeature'
