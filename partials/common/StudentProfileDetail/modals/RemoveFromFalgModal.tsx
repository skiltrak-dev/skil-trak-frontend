import { Modal, TextArea, useAuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification, useSubadminProfile } from '@hooks'
import { SubAdminApi } from '@queries'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const RemoveFromFalgModal = ({
    studentId,
    onCancel,
}: {
    studentId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [problamaticStudent, problamaticStudentResult] =
        SubAdminApi.Student.useProblamaticStudent()

    const subadmin = useSubadminProfile()

    const hasPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
    })

    const validationSchema = Yup.object({
        comment: Yup.string().required('Please provide the note'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onRemoveFromFlagged = async (values: any) => {
        const body = {
            comment: values?.comment,
        }
        const res: any = await problamaticStudent({ studentId, body })
        if (res?.data) {
            notification?.[hasPermission ? 'success' : 'warning']({
                title: `Remove from Flaged ${
                    !hasPermission ? 'request sent' : ''
                }`,
                description: `Remove from Flaged ${
                    !hasPermission ? 'request sent to manager' : ''
                } successfully!`,
            })
            onCancel()
        }
    }
    return (
        <Modal
            title="Remove Flagged Student"
            onCancelClick={onCancel}
            subtitle="Remove Flagged Student"
            loading={problamaticStudentResult.isLoading}
            onConfirmClick={methods.handleSubmit(onRemoveFromFlagged)}
        >
            <FormProvider {...methods}>
                <form className="w-full">
                    <TextArea
                        label={'Provide Note Please'}
                        required
                        name={'comment'}
                        placeholder={'reason...'}
                        rows={5}
                    />
                </form>
            </FormProvider>
        </Modal>
    )

    // return (
    //     <GlobalModal>
    //         <ShowErrorNotifications result={problamaticStudentResult} />
    //         <div className="flex flex-col justify-center items-center gap-y-4 px-20 py-10">
    //             <div>
    //                 <TiWarning className="text-yellow-500" size={55} />
    //             </div>
    //             <div className="fex flex-col gap-y-8 justify-center items-center mb-5">
    //                 <Typography variant="h4" center>
    //                     Are you sure?
    //                 </Typography>
    //                 <Typography variant="body" center>
    //                     You want to switch the flag OFF?
    //                 </Typography>
    //             </div>
    //             <div className="flex items-center gap-x-4">
    //                 <Button onClick={onCancel} outline variant="error">
    //                     Cancel
    //                 </Button>
    //                 <Button
    //                     onClick={() => {
    //                         onRemoveFromFlagged()
    //                     }}
    //                     loading={problamaticStudentResult.isLoading}
    //                     disabled={problamaticStudentResult.isLoading}
    //                 >
    //                     Yes
    //                 </Button>
    //             </div>
    //         </div>
    //     </GlobalModal>
    // )
}
