import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
    Button,
    Card,
    MoreActionsButton,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { DepartmentInfoCard } from './DepartmentInfoCard'
import { useNotification } from '@hooks'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AdminApi } from '@queries'
import { useModal } from '../hooks'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import Modal from '../../../../modals/Modal'

interface DepartmentMember {
    isHod: boolean
    subadmin?: {
        user?: {
            name: string
        }
    }
}

interface Department {
    id: number
    name: string
    membersCount: number
    courseCount: number
    departmentMembers: DepartmentMember[]
}

// Define component props
interface DepartmentCardProps {
    department: Department
}
export const DepartmentCard = ({ department }: DepartmentCardProps) => {
    const { notification } = useNotification()
    const router = useRouter()
    const { openModal } = useModal()
    const role = getUserCredentials()?.role
    const findHod = department?.departmentMembers?.find(
        (member: DepartmentMember) => member?.isHod
    )
    const [deleteDepartment, deleteDepartmentResult] =
        AdminApi.Department.useDeleteDepartment()

    useEffect(() => {
        if (deleteDepartmentResult?.isSuccess) {
            notification.success({
                title: 'Department Deleted',
                description: 'Department Deleted Successfully',
            })
        }
    }, [deleteDepartmentResult?.isSuccess])

    const handleDeleteDepartment = () => {
        openModal({
            title: 'Delete Department',
            content: `Are you sure you want to delete <strong>"${department.name}"</strong>?`,
            icon: FaTrash,
            confirmText: 'Delete',
            variant: 'error',
            onConfirm: () => {
                return deleteDepartment(department?.id)
            },
        })
    }

    const handleViewDetails = () => {
        if (!findHod) {
            notification.warning({
                title: 'Head of Department Missing',
                description: 'Please mark any coordinator as HOD.',
            })
        } else {
            router.push(`/portals/admin/departments/${department?.id}`)
        }
    }

    const actions = [
        {
            text: 'View Details',
            Icon: FaEye,
            onClick: handleViewDetails,
            className: 'text-blue-600',
        },

        ...(role === UserRoles.ADMIN
            ? [
                  {
                      text: 'Delete Department',
                      Icon: FaTrash,
                      onClick: handleDeleteDepartment,
                      className: 'text-red-600',
                  },
              ]
            : []),
    ]

    return (
        <>
            <ShowErrorNotifications result={deleteDepartmentResult} />

            <Card noPadding>
                <div className="flex gap-x-8 w-full pr-5">
                    <div className="bg-primaryNew whitespace-nowrap min-w-[272px] rounded-lg p-5 flex items-start gap-x-5">
                        <div className="flex flex-col gap-y-1.5 items-start">
                            <Typography
                                variant="xs"
                                uppercase
                                color="text-white"
                            >
                                Department Name
                            </Typography>
                            <Typography
                                variant="title"
                                capitalize
                                color="text-white"
                            >
                                {department?.name ?? 'NA'}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2.5 w-full py-2">
                        {findHod !== undefined ? (
                            <>
                                <DepartmentInfoCard
                                    subHeading={
                                        findHod?.subadmin?.user?.name || 'NA'
                                    }
                                    bgColors="bg-[#F7910F0F] bg-opacity-[0.6]"
                                    heading={'Head of Department'}
                                />
                            </>
                        ) : (
                            <DepartmentInfoCard
                                bgColors="bg-[#F7910F0F] bg-opacity-[0.6]"
                                heading={'Head of Department'}
                                noHod={department?.departmentMembers}
                            />
                        )}
                        <DepartmentInfoCard
                            subHeading={department?.membersCount}
                            bgColors="bg-[#6B72800D] bg-opacity-[0.5]"
                            heading={'Total Coordinators'}
                        />
                        <DepartmentInfoCard
                            subHeading={department?.courseCount}
                            bgColors="bg-[#6971DD12] bg-opacity-[0.7]"
                            heading={'Courses'}
                        />
                        <div className="ml-2">
                            <MoreActionsButton actions={actions} />
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
