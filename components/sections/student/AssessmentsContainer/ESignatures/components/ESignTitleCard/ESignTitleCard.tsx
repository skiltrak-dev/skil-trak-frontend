import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import React from 'react'
import { FaFileSignature } from 'react-icons/fa'
type ESignTitleCardProps = {
    doc: any
    onClick: () => void
    selectedFolder: any
}

export const ESignTitleCard = ({
    doc,
    onClick,
    selectedFolder,
}: ESignTitleCardProps) => {
    const role = getUserCredentials()?.role

    const { status } =
        doc?.signers?.find((d: any) => d?.user?.role === role) || {}

    const getRoleData = (role: UserRoles) =>
        doc?.signers?.find((s: any) => s?.user?.role === role)

    const studentUser = getRoleData(UserRoles.STUDENT)
    const industryUser = getRoleData(UserRoles.INDUSTRY)

    const student = `${studentUser?.user?.name} ${
        studentUser?.user?.student?.familyName || ''
    }`
    const industry = `${industryUser?.user?.name} (${
        industryUser?.user?.role || ''
    })`
    return (
        <div
            onClick={() => {
                onClick()
            }}
            className={`${
                doc?.id === selectedFolder?.id ? 'bg-[#FEE1B2]' : 'bg-white'
            } px-2 py-4 cursor-pointer`}
        >
            <div className={`flex justify-between items-center`}>
                <div className="flex items-center gap-x-2">
                    <div>
                        <FaFileSignature className="text-orange-400" />
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <Typography variant="small">
                                {doc?.template?.name}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="label" block medium>
                                {studentUser ? student : industry}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        status === 'Signed' ? 'bg-green-100' : 'bg-[#E8F2FA]'
                    } px-1 whitespace-nowrap`}
                >
                    <Typography
                        variant="xs"
                        color={
                            status === 'Signed'
                                ? 'text-green-500'
                                : 'text-neutral-500'
                        }
                    >
                        {status}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
