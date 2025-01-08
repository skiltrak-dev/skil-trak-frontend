import { Button, Card, GlobalModal, Typography } from '@components'
import { UserRoles } from '@constants'
import { ProfileCard } from '@partials/admin/sub-admin/SubadminProfileDetail/components/ProfileDetail/ProfileCard'

import { AllowPermissionModal } from '@partials/admin/sub-admin/modals'
import { ProgressChart } from '@partials/sub-admin/components'
import { AdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import { AddCoordinatorModal, AddDepartmentEmailModal } from '../modal'
import { MarkAsHodModalVII } from '../modal/MarkAsHodModalVII'
import { DepartmentCounts } from './DepartmentCounts'
import { DepartmentLineChart } from './DepartmentLineChart'
import { SubAdmin } from '@types'

export const HodProfileDetail = ({
    subadmin,
    deptEmail,
    deptName,
}: {
    deptName: string
    deptEmail: string
    subadmin: SubAdmin
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const id = router.query.id

    const chartCounts = AdminApi.Department.useDepartmentChartStats(id, {
        skip: !id,
    })
    const mapApiDataToChartData = (apiData: any) => {
        if (!apiData) {
            return []
        }

        const colorPalette = [
            '#34B53A',
            '#4339F2',
            '#FF3A29',
            '#02A0FC',
            '#21516A',
        ]

        // Explicitly map only the require d keys to their titles
        const mapping = [
            { key: 'placementStarted', title: 'Placement Started' },
            { key: 'inProcess', title: 'In Progress' },
            { key: 'awaitingAgreementSigned', title: 'Agreement Pending' },
            { key: 'appointmentBooked', title: 'Appointment' },
            { key: 'dontHaveWorkplace', title: `Don't Have Workplace` },
        ]
        const total = mapping.reduce(
            (sum, item) => sum + (apiData[item.key] ?? 0),
            0
        )

        return mapping.map((item, index) => ({
            title: item?.title,
            percent: ((apiData[item?.key] ?? 0) / total) * 100,
            color: colorPalette[index],
        }))
    }
    const data = mapApiDataToChartData(chartCounts?.data)

    const coordinators = AdminApi.Department.useDeptCoordinatorsDropdownList(
        id,
        { skip: !id }
    )

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAllowPermissionClicked = () => {
        setModal(
            <AllowPermissionModal
                subadmin={subadmin}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const onChangeHod = () => {
        setModal(
            <GlobalModal>
                <MarkAsHodModalVII
                    data={coordinators?.data}
                    onCancel={onModalCancelClicked}
                />
            </GlobalModal>
        )
    }
    const onAddMembers = () => {
        setModal(
            <GlobalModal>
                <AddCoordinatorModal onCancel={onModalCancelClicked} />
            </GlobalModal>
        )
    }

    const handleAddDepartmentMail = () => {
        setModal(
            <AddDepartmentEmailModal
                onCancel={onModalCancelClicked}
                departmentId={Number(id)}
                {...{ deptName, deptEmail }}
            />
        )
    }

    const role = getUserCredentials()?.role
    const checkIsAdmin = role === UserRoles.ADMIN

    return (
        <>
            {modal && modal}
            <Card shadowType="profile" fullHeight>
                <div className="relative w-full">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-x-10 px-4 lg:py-2 gap-y-4">
                        <div className="flex items-center  gap-x-5">
                            <img
                                className="w-24 h-24  p-1"
                                src={
                                    subadmin?.user?.avatar ||
                                    '/images/avatar.png'
                                }
                                alt="RTO Logo"
                            />
                            <div className="flex flex-col gap-y-2">
                                <div>
                                    <Typography variant={'title'}>
                                        {subadmin?.user?.name}
                                    </Typography>
                                    <div className="flex items-center gap-x-2">
                                        <Typography
                                            center
                                            variant={'label'}
                                            color={'text-gray-500'}
                                        >
                                            {subadmin?.user?.email}
                                        </Typography>
                                        <BsPatchCheckFill className="text-link" />
                                    </div>
                                </div>
                                <div>
                                    <Typography variant={'title'}>
                                        Department Email
                                    </Typography>
                                    <div className="flex items-center gap-x-2">
                                        <Typography
                                            center
                                            variant={'label'}
                                            color={'text-gray-500'}
                                        >
                                            {deptEmail}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col  gap-y-2">
                            <ProfileCard
                                title="Sub-Admin Id"
                                detail={subadmin?.coordinatorId}
                            />
                            <ProfileCard
                                title="Phone"
                                detail={subadmin?.phone}
                            />
                        </div>
                        {checkIsAdmin && (
                            <div className="flex items-center flex-wrap gap-2 whitespace-nowrap">
                                <Button
                                    text={'Permissions'}
                                    onClick={onAllowPermissionClicked}
                                />
                                <Button
                                    text={'Change HOD'}
                                    variant="info"
                                    onClick={onChangeHod}
                                />
                                <Button
                                    text={'Add Member'}
                                    variant="success"
                                    outline
                                    onClick={onAddMembers}
                                />
                                <Button
                                    text={'Change Dept Details'}
                                    variant="success"
                                    onClick={handleAddDepartmentMail}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Card>
            <div className="flex flex-col lg:flex-row gap-x-5 w-full mt-10 gap-y-6">
                <div className="w-full lg:w-1/2">
                    <DepartmentCounts />
                </div>

                <div className="w-full lg:w-1/2">
                    <Card>
                        <ProgressChart data={data} />
                    </Card>
                </div>
            </div>
            <DepartmentLineChart />
        </>
    )
}
