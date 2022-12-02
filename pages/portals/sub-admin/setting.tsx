import { ReactElement, useEffect } from 'react'
import { NextPageWithLayout } from '@types'

// layouts
import { SubAdminLayout } from '@layouts'

// components
import { useGetSettingDataQuery } from '@queries'
import { useNotification } from '@hooks'
import { SettingCard } from '@partials/sub-admin/components'

const Setting: NextPageWithLayout = () => {
    const getSettingData = useGetSettingDataQuery()

    const { notification } = useNotification()

    useEffect(() => {
        if (getSettingData.isError) {
            notification.error({
                title: 'Network Error',
                description: 'Network Error',
            })
        }
    }, [getSettingData.isError])

    const settingDetail = [
        {
            title: 'Receive Workplace Requests',
            description:
                'You will be able to receive any workplace request from students',
            // badge: 'Activated by Admin',
            type: 'workplace',
            img: '/images/icons/workplace.png',
            status: getSettingData?.data?.receiveWorkplaceRequest,
        },
        {
            title: 'Book/Receive Appointments',
            description: 'You will not able to book or conduct any appointment',
            img: '/images/icons/behavior.png',
            type: 'appointment',
            status: getSettingData?.data?.canBookAppointments,
        },
        {
            title: 'Student Assessments',
            description:
                'You will not able to receive assessment or assess any student',
            img: '/images/icons/appointments.png',
            type: 'assessment',
            status: getSettingData?.data?.receiveStudentAssessment,
        },
    ]
    return (
        <div className="flex flex-col gap-y-2">
            {settingDetail.map((setting, i) => (
                <SettingCard
                    key={i}
                    setting={setting}
                    loading={getSettingData.isLoading}
                />
            ))}
        </div>
    )
}

Setting.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'Setting',
                navigateBack: true,
                backTitle: 'Back',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default Setting
