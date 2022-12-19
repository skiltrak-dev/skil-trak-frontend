import { Button, Card, Checkbox, TextArea, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContextBar, useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Note, User } from '@types'
import { useEffect } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const NoteForm = ({ id, note }: { id: any; note?: Note }) => {
    const contextBar = useContextBar()
    const { notification } = useNotification()

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required!'),
        body: Yup.string().required('Message is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const [add, addResult] = CommonApi.Notes.useCreate()
    const onSubmit = async (values: any) => {
        await add({
            ...values,
            postedFor: id,
        })
    }

    useEffect(() => {
        if (addResult.isSuccess) {
            methods.reset()
            notification.success({
                title: 'Note Added',
                description: 'Note has been added on your request',
            })
        } else if (addResult.isError) {
            notification.error({
                title: 'Note Add Failed',
                description: 'An error occurred while adding note.',
            })
        }
    }, [addResult])

    return (
        <div className={`sticky top-2`}>
            <Card>
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full flex flex-col gap-y-4"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div>
                            <TextInput
                                label={'Title'}
                                name={'title'}
                                placeholder={'Note Title...'}
                                required
                            />

                            <TextArea
                                label="Body"
                                name="body"
                                placeholder="Note Message ..."
                            />
                            <Checkbox label={'Pin Note'} name="isPinned" />
                        </div>
                        <div>
                            <Button
                                submit
                                text="Add Note"
                                loading={addResult.isLoading}
                                disabled={addResult.isLoading}
                            />
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
