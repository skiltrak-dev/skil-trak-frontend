import { ActionButton, AuthorizedUserComponent, Typography } from '@components'
import { CommonApi } from '@queries'
import { ReactElement, useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import { AddIndustryWPTypeModal, DeleteIndustryWPTypeModal } from '../../modal'
import { MdDelete } from 'react-icons/md'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const IndustryWpType = ({
    industryUserId,
}: {
    industryUserId?: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const industryWpType =
        CommonApi.Industries.getIndustryWPType(industryUserId)

    const role = getUserCredentials()?.role

    const onCancel = () => setModal(null)

    const onAddIndustryWPType = (typeId?: number) => {
        setModal(
            <AddIndustryWPTypeModal
                onCancel={onCancel}
                industryUserId={industryUserId}
                typeId={typeId}
            />
        )
    }
    const onDeleteIndustryWPType = (type: any) => {
        setModal(
            <DeleteIndustryWPTypeModal
                onCancel={onCancel}
                industryUserId={industryUserId}
            />
        )
    }
    return (
        <div>
            {modal}
            {industryWpType?.data && industryWpType?.isSuccess ? (
                <div>
                    <Typography
                        variant={role === UserRoles.INDUSTRY ? 'label' : 'xs'}
                        medium
                        color={
                            role === UserRoles.INDUSTRY
                                ? 'text-black'
                                : 'text-gray-500'
                        }
                    >
                        Workplace Type
                    </Typography>
                    <div className="flex items-center gap-x-1">
                        <Typography variant="small">
                            {industryWpType?.data?.name}
                        </Typography>
                        <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                            <>
                                <div
                                    className="rounded-full p-1 shadow-lg bg-white cursor-pointer"
                                    onClick={() => {
                                        onAddIndustryWPType(
                                            industryWpType?.data?.id
                                        )
                                    }}
                                >
                                    <BiSolidPencil className="text-info" />
                                </div>
                                <div
                                    className="rounded-full p-1 shadow-lg bg-white cursor-pointer"
                                    onClick={() => {
                                        onDeleteIndustryWPType(
                                            industryWpType?.data
                                        )
                                    }}
                                >
                                    <MdDelete className="text-error" />
                                </div>
                            </>
                        </AuthorizedUserComponent>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-y-1 w-full">
                    {/* <AuthorizedUserComponent roles={[UserRoles.INDUSTRY]}> */}
                    <Typography
                        variant={role === UserRoles.INDUSTRY ? 'label' : 'xs'}
                        medium
                    >
                        Workplace Type
                    </Typography>
                    {/* </AuthorizedUserComponent> */}
                    <div className="flex justify-end ml-auto w-full">
                        <ActionButton
                            onClick={() => {
                                onAddIndustryWPType()
                            }}
                            variant="info"
                        >
                            Add Type
                        </ActionButton>
                    </div>
                </div>
            )}
        </div>
    )
}
