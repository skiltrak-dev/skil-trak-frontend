import React, { ReactNode, useState } from 'react'
import { ContextBarDropdown } from '../ContextBarDropdown'
import { RtoApi } from '@queries'
import { LoadingAnimation, NoData } from '@components'
import { useContextBar } from '@hooks'
import { AddAdminCB, DeleteModal } from '@partials/rto'
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri'
import { UserCard } from '../../cards'

export const ContactPersons = ({ userId }: { userId: number }) => {
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [isViewd, setIsViewd] = useState<boolean>(false)


    const { isLoading, data } = RtoApi.Rto.useContactPersons(
        {
            id: userId,
        },
        {
            skip: !isViewd,
        }
    )

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
            text: 'Edit',
            onClick: (contactPerson: any) => {
                onAddAdmin({ contactPerson, edit: true })
            },
            Icon: RiEdit2Fill,
        },
        {
            text: 'Delete',
            onClick: async (contactPerson: any) =>
                onDeleteClicked(contactPerson),
            Icon: RiDeleteBin6Line,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]
    return (
        <div>
            {modal}
            <ContextBarDropdown
                title="Contact Person"
                onAddData={() => {
                    onAddAdmin({ contactPerson: null, edit: false })
                }}
                onSetDropdown={setIsViewd}
            >
                {isLoading ? (
                    <LoadingAnimation size={60} />
                ) : data?.data && data?.data?.length > 0 ? (
                    <div className="flex flex-col gap-y-2.5">
                        {data?.data?.map((contactPerson: any) => (
                            <UserCard
                                userType="Contact Person"
                                user={contactPerson}
                                actions={actions}
                            />
                        ))}
                    </div>
                ) : (
                    <NoData text={'No Contact person were found'} />
                )}
            </ContextBarDropdown>
        </div>
    )
}
