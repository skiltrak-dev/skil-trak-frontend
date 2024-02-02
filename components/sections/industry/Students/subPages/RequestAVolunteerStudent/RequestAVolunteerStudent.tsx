import { useEffect } from 'react'

// Icons

// components
import {
    ActionAlert,
    BackButton,
    Card,
    ShowErrorNotifications,
} from '@components'
import { RightSidebarData } from './components/RightSidebarData/RightSidebarData'

// Context
import { useIndustryProfileQuery, useRequestAVolunteerMutation } from '@queries'
import { useContextBar } from 'hooks'
import { CreateVolunteerRequest, VolunteerRequestsList } from './components'

export const RequestAVolunteerStudent = () => {
    const { setContent, show, hide } = useContextBar()

    const { data, isSuccess, isLoading } = useIndustryProfileQuery()

    const getCourses = data.courses.map((course: any) => ({
        label: `${course?.title} ${course?.code}`,
        value: course?.id,
    }))
    console.log('getCourses', getCourses)

    // query
    const [requestAVolunteer, requestAVolunteerResult] =
        useRequestAVolunteerMutation()

    useEffect(() => {
        setContent(
            <>
                <RightSidebarData />
            </>
        )
        show(false)
        return () => {
            setContent(null)
            hide()
        }
    }, [setContent])

    const onVolunteer = (selectedCourse: number) => {
        // requestAVolunteer(selectedCourse)
    }

    return (
        <>
            <ShowErrorNotifications result={requestAVolunteerResult} />
            {requestAVolunteerResult.isSuccess ? (
                <Card>
                    <ActionAlert
                        title={'Successfully requested a volunteer student'}
                        description={
                            'You will be redirected to jobs in a moment.'
                        }
                    />
                </Card>
            ) : (
                <>
                    <BackButton
                        link={'/portals/industry/students'}
                        text={'Back To Dashboard'}
                    />

                    <div className="flex flex-col gap-y-3">
                        <VolunteerRequestsList />

                        {/* Data */}
                        <CreateVolunteerRequest
                            result={requestAVolunteerResult}
                            onVolunteer={onVolunteer}
                        />
                    </div>
                </>
            )}
        </>
    )
}
