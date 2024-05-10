import React, { ReactNode, useState } from 'react'
import { ContextBarDropdown } from '../ContextBarDropdown'
import { UserCard } from '../Cards'
import { AdminApi, RtoApi } from '@queries'
import { LoadingAnimation, NoData } from '@components'
import { useContextBar } from '@hooks'
import { AddAdminCB, DeleteModal } from '@partials/rto'
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri'
import { FaRegEye } from 'react-icons/fa'
import { useRouter } from 'next/router'

export const Subadmins = ({ userId }: { userId: number }) => {
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [isViewd, setIsViewd] = useState<boolean>(false)

    const router = useRouter()

    const { isLoading, data, refetch } = AdminApi.Rtos.useRtoProfileSubAdmins({
        id: Number(userId),
    })

    const contextBar = useContextBar()

    const onAddAdmin = ({
        contactPerson,
        edit,
    }: {
        contactPerson?: any
        edit: boolean
    }) => {
        contextBar.setTitle('Add Contact Person')
        contextBar.setContent(
            <AddAdminCB
                {...(contactPerson ? { initialValues: contactPerson } : {})}
                {...(edit ? { edit: edit } : {})}
                userId={userId}
            />
        )
        contextBar.show(false)
    }

    const onModalCancelClicked = () => setModal(null)

    const onDeleteClicked = (contactPerson: any) => {
        setModal(
            <DeleteModal
                contactPerson={contactPerson}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const actions = [
        {
            text: 'View',
            onClick: (subadmin: any) => {
                router.push({
                    pathname: `/portals/admin/sub-admin/${subadmin?.id}`,
                    query: { tab: 'history' },
                })
            },
            Icon: FaRegEye,
        },
    ]
    return (
        <div>
            {modal}
            <ContextBarDropdown title="Subadmins" onSetDropdown={setIsViewd}>
                {isLoading ? (
                    <LoadingAnimation size={60} />
                ) : data?.data && data?.data?.length > 0 ? (
                    <div className="flex flex-col gap-y-2.5">
                        {data?.data?.map((subadmin: any) => (
                            <UserCard
                                userType="SubAdmin"
                                user={{
                                    ...subadmin,
                                    name: subadmin?.user?.name,
                                    email: subadmin?.user?.email,
                                }}
                                actions={actions}
                            />
                        ))}
                    </div>
                ) : (
                    <NoData text={'No Subadmins were found'} />
                )}
            </ContextBarDropdown>
        </div>
    )
}
