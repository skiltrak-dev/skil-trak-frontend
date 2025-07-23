import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

const role = getUserCredentials()?.role

export const redirectUrls = (id: number) =>
    role === UserRoles.ADMIN
        ? `/portals/admin/student/${id}/detail`
        : `/portals/sub-admin/students/${id}/detail`
