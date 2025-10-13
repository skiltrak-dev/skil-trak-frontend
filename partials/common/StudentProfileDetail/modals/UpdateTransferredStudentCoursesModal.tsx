import * as Yup from 'yup'
import { Modal, Select, ShowErrorNotifications } from '@components'
import { useNotification, useSectorsAndCoursesOptions } from '@hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { SubAdminApi } from '@queries'

export const UpdateTransferredStudentCoursesModal = ({
    onCancel,
    studentId,
}: {
    studentId: number
    onCancel: (isSuccess?: boolean) => void
}) => {
    const {
        courseLoading,
        courseOptions,
        courseValues,
        onCourseChange,
        onSectorChanged,
        sectorOptions,
        selectedSector,
        sectorLoading,
    } = useSectorsAndCoursesOptions()

    const [updateStudentCourses, updateStudentCoursesResult] =
        SubAdminApi.Student.updateStudentCourses()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        sectors: Yup.array().min(1, 'Must select at least 1 sector'),
        courses: Yup.array().min(1, 'Must select at least 1 course'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const res: any = await updateStudentCourses({
            courses: values?.courses,
            id: studentId,
        })

        if (res?.data) {
            notification.success({
                title: 'Course Updated',
                description: 'Course Updated Successfully',
            })
            onCancel(true)
        }
    }

    return (
        <Modal
            onCancelClick={onCancel}
            title="Update Transfered Student Courses"
            subtitle="Update Transfered Student Courses"
            onConfirmClick={methods.handleSubmit(onSubmit)}
            loading={updateStudentCoursesResult?.isLoading}
        >
            <ShowErrorNotifications result={updateStudentCoursesResult} />
            <FormProvider {...methods}>
                <form className="mt-2 w-full max-w-2xl">
                    <div>
                        <Select
                            label={'Sector'}
                            value={selectedSector}
                            name={'sectors'}
                            options={sectorOptions}
                            placeholder={'Select Sectors...'}
                            multi
                            loading={sectorLoading}
                            disabled={sectorLoading}
                            onChange={onSectorChanged}
                            validationIcons
                        />
                        <Select
                            label={'Courses'}
                            name={'courses'}
                            value={courseValues}
                            defaultValue={courseOptions}
                            options={courseOptions}
                            multi
                            loading={courseLoading}
                            onChange={(e: any) => {
                                onCourseChange(e)
                            }}
                            disabled={courseOptions.length === 0}
                            validationIcons
                            onlyValue
                        />
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}
