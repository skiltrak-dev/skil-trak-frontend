import { Button, Select, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import React, { useEffect, useState } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'

export const AddCoordinatorModal = ({ onCancel }: any) => {
    const [selectedCoordinators, setSelectedCoordinators] = useState<any>([])
    const { notification } = useNotification()
    const [addDeptMembers, addDeptMembersResult] =
        AdminApi.Department.useAddDepartmentMembers()
    const router = useRouter()

    useEffect(() => {
        if (addDeptMembersResult.isSuccess) {
            notification.success({
                title: `Request Coordinator(s) Added`,
                description: `Coordinator is successfully Coordinator(s) Added`,
            })
            onCancel()
        }
        if (addDeptMembersResult.isError) {
            notification.error({
                title: 'Request Coordinator(s) Added',
                description: `Your request for adding coordinator(s)`,
            })
        }
    }, [addDeptMembersResult])

    const departmentCoordinators =
        AdminApi.Department.useDepartmentCoordinators(undefined)
    const coordinatorOptions = departmentCoordinators?.data?.map(
        (coordinator: any) => ({
            label: `${coordinator?.user?.name}`,
            value: coordinator?.id,
        })
    )

    const onConfirmClicked = async () => {
        if (selectedCoordinators.length > 0) {
            await addDeptMembers({
                body: { members: selectedCoordinators },
                id: router.query.id,
            })
        } else {
            notification.error({
                title: 'Selection Error',
                description: 'Please select at least one coordinator.',
            })
        }
    }

    const handleSelectChange = (selectedMember: number[]) => {
        const structuredMembers = selectedMember.map((member) => ({
            subadmin: member,
        }))

        setSelectedCoordinators(structuredMembers)
        console.log('structuredMembers', structuredMembers)
    }
    return (
        <>
            <ShowErrorNotifications result={addDeptMembersResult} />
            <div className="px-5 py-3">
                <div
                    onClick={onCancel}
                    className="cursor-pointer flex justify-end"
                >
                    <IoCloseCircleSharp
                        size={25}
                        className="text-red-400 hover:text-red-500"
                    />
                </div>
                <Typography
                    variant="title"
                    color="text-primaryNew"
                    semibold
                    center
                >
                    Add Members
                </Typography>
                <Select
                    name="members"
                    options={coordinatorOptions}
                    label="Add Members"
                    multi
                    onlyValue
                    onChange={handleSelectChange}
                />
                <div className="flex justify-center items-center">
                    <Button
                        variant="primaryNew"
                        text="Submit"
                        onClick={onConfirmClicked}
                        loading={addDeptMembersResult?.isLoading}
                        disabled={addDeptMembersResult?.isLoading}
                    />
                </div>
            </div>
        </>
    )
}
