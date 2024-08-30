import { UserRoles } from '@constants'
import { SubAdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { RestrictedDataTypes } from '../types'

export const useRestricted = (type: RestrictedDataTypes) => {
    const role = getUserCredentials()?.role

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        // refetchOnMountOrArgChange: true,
    })

    const checkType = () => {
        switch (type) {
            case UserRoles.STUDENT:
                return 'canViewStudentDetails'
            case UserRoles.INDUSTRY:
                return 'canViewIndustryDetails'
            case UserRoles.RTO:
                return 'canAccessRtoProfile'
            case 'canAddStudents':
                return 'canAddStudents'

            default:
                return null
        }
    }

    const key = checkType()

    if (role === UserRoles.SUBADMIN && subadmin?.data?.isAdmin) {
        const canAccess = key ? subadmin?.data?.[key] : false
        return canAccess
    }

    return true
}
