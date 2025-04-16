import { Button, GlobalModal, Select } from '@components'
import React, { useState } from 'react'
import { SubAdminApi } from '@queries'
import { AssignCoordinatorModal } from '../modals'

export const AssignCoordinator = ({ student }: any) => {
    const departmentCoordinators =
        SubAdminApi.Student.useDepartmentCoordinators()
    const [modal, setModal] = useState<any | null>(null)
    const [changeCoordinator, setChangeCoordinator] = useState(false)
    const subAdminOptions = departmentCoordinators?.data?.map(
        (coordinator: any) => {
            return {
                label: coordinator.subadmin?.user?.name,
                value: coordinator?.subadmin?.id,
            }
        }
    )
    const onCancelModal = () => {
        setModal(null)
    }
    const onChangeCoordinator = (value: number) => {
        setModal(
            <AssignCoordinatorModal
                onCancelModal={onCancelModal}
                subAdminId={value}
                studentId={student?.id}
            />
        )
    }

    return (
        <>
            {modal && modal}{' '}
            <div className="min-w-48 relative z-10">
                {!changeCoordinator && !student.subadmin ? (
                    <div className="relative z-40">
                        <Select
                            name={'subAdmin'}
                            placeholder={'Select Sub Admin'}
                            options={subAdminOptions}
                            loading={departmentCoordinators?.isLoading}
                            disabled={departmentCoordinators?.isLoading}
                            onChange={(e: any) => {
                                onChangeCoordinator(Number(e?.value))
                            }}
                        />
                    </div>
                ) : changeCoordinator ? (
                    <div className="flex items-start gap-x-2">
                        <div className="relative z-40">
                            <Select
                                name={'subAdmin'}
                                placeholder={'Select Sub Admin'}
                                options={subAdminOptions}
                                loading={departmentCoordinators?.isLoading}
                                disabled={departmentCoordinators?.isLoading}
                                onChange={(e: any) => {
                                    onChangeCoordinator(Number(e?.value))
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setChangeCoordinator(false)
                            }}
                            className="text-red-400 text-xs hover:text-red-600"
                        >
                            cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <p className="text-xs font-medium text-gray-600">
                            {student?.subadmin?.user?.name}
                        </p>
                        <button
                            onClick={() => {
                                setChangeCoordinator(true)
                            }}
                            className="text-link text-xs underline hover:text-link-dark"
                        >
                            change
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
