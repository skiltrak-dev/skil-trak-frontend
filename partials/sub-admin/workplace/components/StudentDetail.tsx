import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { StudentCellInfo as AdminStudentCellInfo } from '@partials/admin/student/components'
import { StudentCellInfo as RtoStudentCellInfo } from '@partials/rto/student/components'
import { getUserCredentials } from '@utils'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { AuthorizedUserComponent } from '@components'

export const StudentDetail = ({ data }: any) => {
    const role = getUserCredentials()?.role
    return (
        <div className="col-span-2 flex flex-col md:flex-row md:items-center gap-4">
            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                <AdminStudentCellInfo student={data} />
            </AuthorizedUserComponent>
            <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                <StudentCellInfo student={data} />
            </AuthorizedUserComponent>
            <AuthorizedUserComponent roles={[UserRoles.RTO]}>
                <RtoStudentCellInfo student={data} />
            </AuthorizedUserComponent>

            {/*  */}
            <div>
                <div className="flex items-center gap-x-2">
                    <FaPhoneSquareAlt className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>{data?.phone}</Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdLocationOn className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>
                        {data?.addressLine1},{data?.suburb}, {data?.state}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
