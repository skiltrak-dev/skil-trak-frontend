import { Select, SelectOption, ShowErrorNotifications } from '@components'
import { Modal } from '@components/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

// queries
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { useRouter } from 'next/router'

interface onSubmitType {
    course: number
}

export const UpdateWorkplaceCourseModal = ({
    courseId,
    onCancel,
    workplaceId,
}: {
    courseId: number
    workplaceId: number
    onCancel: Function
}) => {
    const { notification } = useNotification()

    const [courseValue, setCourseValue] = useState<number | null>(null)

    const router = useRouter()
    const { id } = router.query

    const courses = SubAdminApi.Student.useCourses(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const [updateWpCourse, updateWpCourseResult] =
        SubAdminApi.Student.updateWpCourse()

    const courseAddedOptions = courses?.data?.map((course: any) => ({
        item: course,
        value: course?.id,
        label: `${course?.title} ${course?.code}`,
    }))

    const validationSchema = Yup.object({
        course: Yup.number().required('Course is required'),
    })

    const methods = useForm<onSubmitType>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: onSubmitType) => {
        const res: any = await updateWpCourse({
            wpId: Number(workplaceId),
            courseId: values?.course,
        })

        if (res?.data) {
            notification.success({
                title: 'Course Updated',
                description: 'Course Updated Successfully',
            })
            onCancel()
        }
    }

    const courseDataId = courseValue || courseId

    const courseDataValue = courseAddedOptions?.find(
        (course: SelectOption) => course?.value === courseDataId
    )
    return (
        <div>
            <ShowErrorNotifications result={updateWpCourseResult} />
            <Modal
                title={'Update Workplace Course'}
                subtitle={'Update Workplace Course'}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={updateWpCourseResult.isLoading}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <Select
                            label={'Courses'}
                            name={'course'}
                            value={courseDataValue}
                            options={courseAddedOptions}
                            validationIcons
                            onChange={(e: any) => {
                                setCourseValue(e)
                            }}
                            onlyValue
                            components={{
                                Option: CourseSelectOption,
                            }}
                            formatOptionLabel={formatOptionLabel}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
