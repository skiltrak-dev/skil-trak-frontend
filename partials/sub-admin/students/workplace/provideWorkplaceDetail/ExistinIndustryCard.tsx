import {
    BackButton,
    Button,
    Card,
    InitialAvatar,
    Select,
    SelectOption,
    ShowErrorNotifications,
    Typography,
    useShowErrorNotification,
} from '@components'
import { ReactElement, useEffect, useState } from 'react'

// query
import { useNotification } from '@hooks'
import {
    SubAdminApi,
    useApplyWorkplaceOnExistingIndustryMutation,
} from '@queries'
import { Course } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { WorkplaceCreatedModal } from '../requestWorkplaceDetail/modal'
import { IndustryCard } from './IndustryCard'

export const ExistinIndustryCard = ({
    student,
    industry,
    setActive,
    studentId,
    setWorkplaceData,
}: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [selectedCourse, setselectedCourse] = useState<number | null>(null)

    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceOnExistingIndustryMutation()

    const courses = SubAdminApi.Student.useCourses(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (applyForWorkplaceResult.isSuccess) {
            setWorkplaceData(applyForWorkplaceResult?.data?.workplaceRequest)
            setActive((active: number) => active + 1)
        }
    }, [applyForWorkplaceResult])
    useEffect(() => {
        if (courses?.data && courses?.data?.length) {
            setselectedCourse(courses?.data?.[0]?.id)
        }
    }, [courses?.data])

    const courseOptions =
        courses?.data && courses?.data?.length > 0
            ? courses?.data?.map((course: Course) => ({
                  item: course,
                  value: course?.id,
                  label: course?.title,
              }))
            : []

    const showErrorNotifications = useShowErrorNotification()

    const onCancelModal = () => setModal(null)

    return (
        <>
            {modal}
            {/* <ShowErrorNotifications result={applyForWorkplaceResult} /> */}
            <BackButton
                onClick={() => {
                    setActive(1)
                }}
            />
            <Card>
                <div className="mb-4">
                    <Typography variant={'subtitle'}>
                        We found following industry
                    </Typography>
                    <Typography variant={'small'} color={'text-gray-400'}>
                        This is result of ABN number you have provided{' '}
                        <i>{industry.abn}</i>
                    </Typography>
                </div>

                <Typography variant={'small'} color={'text-gray-500'}>
                    You can carry on by clicking &apos;Apply Here&apos; button
                </Typography>

                <div className="mt-2">
                    <Select
                        label={'Select Course'}
                        name={'course'}
                        required
                        options={courseOptions}
                        value={courseOptions?.find(
                            (course: SelectOption) =>
                                selectedCourse === course?.value
                        )}
                        placeholder={'Select Course...'}
                        loading={courses?.isLoading}
                        onChange={(e: any) => {
                            setselectedCourse(e?.value)
                        }}
                        components={{
                            Option: CourseSelectOption,
                        }}
                        formatOptionLabel={formatOptionLabel}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <IndustryCard
                        industry={industry}
                        student={student}
                        selectedCourse={Number(selectedCourse)}
                    />

                    {industry?.locations?.map((location: any) => (
                        <IndustryCard
                            industry={{
                                ...location,
                                id: industry?.id,
                                locationId: location?.id,
                                addressLine1: location?.address,
                                user: industry?.user,
                            }}
                            student={student}
                            selectedCourse={Number(selectedCourse)}
                        />
                    ))}
                </div>
            </Card>
        </>
    )
}
