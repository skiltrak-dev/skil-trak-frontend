import { SubAdminApi } from '@queries'
import {
    ActionButton,
    AuthorizedUserComponent,
    Badge,
    Button,
    TextArea,
    Typography,
} from '@components'
import { useState } from 'react'
import { useNotification, useSubadminProfile } from '@hooks'
import { UserRoles } from '@constants'

export const AddHodNote = ({
    comment,
    courseReqId,
}: {
    comment?: string
    courseReqId: number
}) => {
    const [note, setNote] = useState('')
    const [noteAdded, setNoteAdded] = useState('')

    const { notification } = useNotification()

    const [addNote, addNoteResult] = SubAdminApi.Industry.addHodNote()

    const onAddNote = async () => {
        if (!note) {
            notification.warning({
                title: 'Required!',
                description: 'Note is Required',
            })
            return
        }
        const res: any = await addNote({ id: courseReqId, comment: note })

        if (res?.data) {
            setNoteAdded(note)
            notification.success({
                title: 'Note Added',
                description: 'Note Added Successfully',
            })
        }
    }

    const subadmin = useSubadminProfile()

    return (
        <div className="mb-2 px-4">
            <Typography variant="label">HOD Comment:</Typography>
            {comment ? (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-5">
                    <Typography variant="small" color={'text-gray-700'}>
                        <strong>Note:</strong> {comment}
                    </Typography>
                </div>
            ) : (
                <>
                    <AuthorizedUserComponent roles={[UserRoles.ADMIN]} isHod>
                        <div className="flex flex-col gap-y-1.5">
                            <TextArea
                                name={'note'}
                                placeholder="Add Hod Comment"
                                rows={3}
                                showError={false}
                                onChange={(e: any) => {
                                    setNote(e?.target?.value)
                                }}
                            />
                            <div>
                                <Button
                                    variant="success"
                                    onClick={() => {
                                        onAddNote()
                                    }}
                                    loading={addNoteResult?.isLoading}
                                    disabled={addNoteResult?.isLoading}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </AuthorizedUserComponent>
                    <AuthorizedUserComponent
                        roles={[UserRoles.SUBADMIN]}
                        isHod={false}
                    >
                        <>
                            {!subadmin?.departmentMember?.isHod && (
                                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-5">
                                    <Typography
                                        variant="small"
                                        color={'text-gray-700'}
                                    >
                                        <strong>Note:</strong> ----
                                    </Typography>
                                </div>
                            )}
                        </>
                    </AuthorizedUserComponent>
                </>
            )}
        </div>
    )
}
