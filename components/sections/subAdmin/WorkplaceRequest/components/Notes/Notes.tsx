import moment from 'moment'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
    Button,
    NoData,
    TextInput,
    Typography,
    ShowErrorNotifications,
} from '@components'
import { AllNotesCB } from '../AllNotesCB'
import { useContextBar, useNotification } from '@hooks'
import { useEffect, useState } from 'react'

import { useAddWorkplaceNoteMutation } from '@queries'
import { elipiciseText } from '@utils'

export const Notes = ({ workplace }: { workplace: any }) => {
    const { setContent, show } = useContextBar()
    const [note, setNote] = useState<string | null>('')
    const [notes, setNotes] = useState<any | null>(null)

    // hooks
    const { notification } = useNotification()

    const [addWorkplace, addWorkplaceResult] = useAddWorkplaceNoteMutation()

    const methods = useForm({
        mode: 'all',
    })
    useEffect(() => {
        if (addWorkplaceResult?.isSuccess) {
            setNote('')
            notification.success({
                title: 'Note Added Successfully',
                description: 'Note Added Successfully',
            })
            methods.reset()
        }
    }, [addWorkplaceResult])

    useEffect(() => {
        if (workplace?.notes) {
            setNotes(workplace?.notes)
        }
    }, [workplace])

    const onSubmit = (values: any) => {
        addWorkplace({
            ...values,
            workplaceRequest: workplace?.id,
        })
    }

    return (
        <div>
            <ShowErrorNotifications result={addWorkplaceResult} />
            <div className="flex justify-between">
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Recent Notes:
                </Typography>
                <Typography variant={'small'} color={'text-info'}>
                    <span
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                            show()
                            setContent(<AllNotesCB notes={notes} />)
                        }}
                    >
                        View All Notes
                    </span>
                </Typography>
            </div>

            {/* Notes List */}
            <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col justify-between gap-y-3">
                <div className="flex flex-col gap-y-1">
                    {notes && notes?.length > 0 ? (
                        [...notes]
                            ?.reverse()
                            ?.slice(0, 2)
                            ?.map((note: any) => (
                                <div
                                    key={note?.id}
                                    className="bg-secondary py-1 px-2 rounded-lg"
                                >
                                    <Typography variant={'label'}>
                                        {elipiciseText(note?.message, 70)}
                                    </Typography>
                                    <div className="flex items-center gap-x-1">
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-400'}
                                        >
                                            {moment(note.createdAt).format(
                                                'MMM DD, YYYY hh:mm a'
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <NoData text={'No Notes were found'} />
                    )}
                </div>
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="flex items-start">
                            <TextInput
                                name={'message'}
                                placeholder={'Leave Quick Note'}
                                onChange={(e: any) => {
                                    setNote(e.target.value)
                                }}
                            />
                            <Button
                                submit
                                text={'Leave Note'}
                                loading={addWorkplaceResult.isLoading}
                                disabled={addWorkplaceResult.isLoading}
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}
