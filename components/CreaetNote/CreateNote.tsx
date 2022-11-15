import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
    Card,
    Button,
    TextInput,
    TextArea,
    Checkbox,
    Select,
} from '@components'
import { useContextBar } from '@hooks'
import { MdOutlineCancel } from 'react-icons/md'

// query
import { useCreateNoteMutation } from '@queries'
import { useNotification } from 'hooks'

export const CreateNote = ({
    action,
    receiverId,
    sender,
    editValues,
    setEditValues,
}: any) => {
    const { isVisible } = useContextBar()
    const { notification } = useNotification()
    // query
    const [createNote, createNoteResult] = useCreateNoteMutation()
    // const [updateNote, updateNoteResult] = useUpdateNoteMutation()

    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if (editValues) {
            setEditing(true)
        }
    }, [editValues])

    useEffect(() => {
        if (createNoteResult.isSuccess) {
            setEditing(false)
            setEditValues(null)
            notification.success({
                title: 'Note Added Successfully',
                description: 'Note Added Successfully',
            })
        }
    }, [createNoteResult.isSuccess])

    // useEffect(() => {
    //     if (updateNoteResult.isSuccess) {
    //         setEditing(false)
    //         setEditValues(null)
    //         notification.info({
    //             title: 'Note Updated Successfully',
    //             description: 'Note Updated Successfully',
    //         })
    //     }
    // }, [updateNoteResult.isSuccess])

    const onSubmit = (values: any) => {
        if (editing) {
            // updateNote({ ...values, postedFor: receiverId, id: editValues?.id })
        } else {
            createNote({ ...values, postedFor: receiverId })
        }

        // setTesting(resetForm);
        // setResetFormData(resetForm)
        // const userCredentials = AuthUtils.getUserCredentials();
        // console.log("userCredentials", userCredentials);
        // const date = new Date();
        // const parent = replyMessage?.id;
        // setMessage({
        //   parent: replyMessage,
        //   createdAt: date.toISOString(),
        //   status: userStatus.PENDING,
        //   sender: {
        //     id: userCredentials?.id,
        //     name: userCredentials?.name,
        //     role: sender || "",
        //   },
        //   subject: values.subject,
        //   message: values.message,
        //   type: "email",
        //   receiver: receiverId || 64,
        // });
        // setReplyMessage(null);
    }

    const tamplates = [
        {
            label: 'Tamplate',
            value: 'tamplate',
        },
    ]

    const methods = useForm({
        mode: 'all',
        defaultValues: editValues,
    })

    return (
        <>
            {/* <ShowErrorNotifications
                result={editing ? updateNoteResult : createNoteResult}
            /> */}
            <div className={`sticky ${isVisible ? 'bottom-0' : ' top-0'}`}>
                <Card>
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div>
                                <TextInput
                                    label={'Title'}
                                    name={'title'}
                                    type={'email'}
                                    placeholder={'Reciever Email...'}
                                    validationIcons
                                />

                                <TextArea label={'Message'} name={'body'} />

                                <Select
                                    name={'tamplates'}
                                    options={tamplates}
                                />

                                <Checkbox name={'isPinned'} label={'Pinned'} />

                                <Button
                                    submit
                                    fullWidth
                                    text={`${editing ? 'Update' : 'Add'} Note`}
                                    loading={createNoteResult?.isLoading}
                                    disabled={createNoteResult?.isLoading}
                                    variant={editing ? 'secondary' : 'primary'}
                                />
                            </div>
                        </form>
                    </FormProvider>
                </Card>
            </div>
        </>
    )
}
