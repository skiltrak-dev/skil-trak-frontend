import { SettingCard } from './SettingCard'

// query
import { useGetSettingDataQuery } from '@queries'
import { useNotification } from '@hooks'
import { useEffect } from 'react'

export const SettingContainer = () => {
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
            img: '/images/subAdmins/workplaceRequest.png',
            status: getSettingData?.data?.receiveWorkplaceRequest,
        },
        {
            title: 'Book/Receive Appointments',
            description: 'You will not able to book or conduct any appointment',
            img: '/images/subAdmins/studentAssessments.png',
            type: 'appointment',
            status: getSettingData?.data?.canBookAppointments,
        },
        {
            title: 'Student Assessments',
            description:
                'You will not able to receive assessment or assess any student',
            img: '/images/subAdmins/recieveAppointments.png',
            type: 'assessment',
            status: getSettingData?.data?.receiveStudentAssessment,
        },
    ]
    return (
        <div className="flex flex-col gap-y-2">
            {settingDetail.map((setting, i) => (
                <SettingCard
                    setting={setting}
                    loading={getSettingData.isLoading}
                />
            ))}
        </div>
    )
}
