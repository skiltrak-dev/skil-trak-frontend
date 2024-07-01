import {
    Button,
    Card,
    InitialAvatar,
    Select,
    SelectOption,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useEffect, useState } from 'react'

// query
import { useNotification } from '@hooks'
import {
    SubAdminApi,
    useApplyWorkplaceOnExistingIndustryMutation,
} from '@queries'
import { Course } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

export const ExistinIndustryCard = ({
    industry,
    setActive,
    setWorkplaceData,
    studentId,
    student,
}: any) => {
    const [selectedCourse, setselectedCourse] = useState<number | null>(null)

    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceOnExistingIndustryMutation()

    const courses = SubAdminApi.Student.useCourses(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: true,
    })

    const { notification } = useNotification()

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

    return (
        <>
            <ShowErrorNotifications result={applyForWorkplaceResult} />
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

                <div className="-mt-2 bg-secondary-dark py-2 px-4 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                        {industry?.user?.name && (
                            <InitialAvatar
                                name={industry?.user?.name}
                                imageUrl={industry?.user?.avatar}
                                large
                            />
                        )}
                        <div>
                            {/* <Typography variant={'muted'} color={'gray'}>
                        5km away
                    </Typography> */}
                            <Typography variant={'label'}>
                                {industry?.user?.name}
                            </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                {industry?.addressLine1},{' '}
                                {industry?.addressLine2}
                            </Typography>
                        </div>
                    </div>
                    <Button
                        variant={'secondary'}
                        text={'Apply Here'}
                        // disabled={industries?.map((i: any) => i.applied).includes(true)}
                        onClick={async () => {
                            if (selectedCourse) {
                                await applyForWorkplace({
                                    studentId: student,
                                    IndustryId: industry?.id,
                                    courseId: selectedCourse,
                                })
                            } else {
                                notification.warning({
                                    title: 'Course Required',
                                    description: 'Course Must be selected',
                                })
                            }
                        }}
                        loading={applyForWorkplaceResult.isLoading}
                        disabled={applyForWorkplaceResult.isLoading}
                    />
                </div>
            </Card>
        </>
    )
}
