import { Button, GlobalModal, ShowErrorNotifications } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
export const AssignCoordinatorModal = ({
    onCancelModal,
    subAdminId,
    studentId,
}: any) => {
    const [assignToMe, assignToMeResult] =
        SubAdminApi.SubAdmin.useAssignCoordinatorToStudent()
    const { notification } = useNotification()

    const validationSchema = Yup.object({
        note: Yup.string().required('Note is required'),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async () => {
        const payload: any = {
            studentId: studentId,
            coordinatorId: subAdminId,
        }
        await assignToMe(payload).then((res: any) => {
            notification.success({
                title: 'Coordinator Assigned',
                description: 'Coordinator has been assigned successfully',
            })
        })
    }
    return (
        <>
            <ShowErrorNotifications result={assignToMeResult} />
            <GlobalModal>
                <div className="flex flex-col gap-y-2 px-6 py-4">
                    <div className="text-sm font-semibold text-gray-700">
                        Change Coordinator
                    </div>
                    <div className="text-sm text-gray-500">
                        Are you sure you want to change the coordinator?
                    </div>
                    {/* <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <TextArea
                                label={'Add Note'}
                                name={'note'}
                                placeholder={'Add Note'}
                                showError={false}
                                rows={7}
                            />
                        </form>
                    </FormProvider> */}
                    <div className="flex gap-x-2 mt-5">
                        <Button
                            onClick={onSubmit}
                            loading={assignToMeResult.isLoading}
                            disabled={assignToMeResult.isLoading}
                        >
                            Confirm
                        </Button>
                        <Button variant="error" onClick={onCancelModal}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
