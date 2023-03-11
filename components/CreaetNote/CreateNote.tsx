import { Controller, FormProvider, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { EditorProps } from 'react-draft-wysiwyg'
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    {
        ssr: false,
    }
)

const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default

import {
    ContentState,
    convertFromHTML,
    convertToRaw,
    EditorState,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// components
import {
    Button,
    Card,
    Checkbox,
    ContentEditor,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { useContextBar } from '@hooks'

// query
import { CommonApi } from '@queries'
import { useNotification } from 'hooks'
import { NoteEditor } from './NoteEditor'

export const CreateNote = ({
    action,
    receiverId,
    sender,
    editValues,
    setEditValues,
}: any) => {
    const { isVisible } = useContextBar()
    const { notification } = useNotification()
    const [noteContent, setNoteContent] = useState<any>(null)

    // query
    const [createNote, createNoteResult] = CommonApi.Notes.useCreate()

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
                title: 'Note Attached',
                description: 'Note attached successfully',
            })
            setNoteContent(null)
            methods.reset()
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
        const body = draftToHtml(convertToRaw(values?.body.getCurrentContent()))
        if (editing) {
            // updateNote({ ...values, postedFor: receiverId, id: editValues?.id })
        } else {
            createNote({ ...values, body, postedFor: receiverId })
        }

        // setTesting(resetForm);
        // setResetFormData(resetForm)
        // const userCredentials = AuthUtils.getUserCredentials();
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

    const templates = [
        {
            label: 'Template',
            value: 'template',
        },
    ]

    const methods = useForm({
        mode: 'all',
        defaultValues: editValues,
    })

    return (
        <>
            <ShowErrorNotifications result={createNoteResult} />
            <div className={`sticky top-4`}>
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
                                    placeholder={'Note Title...'}
                                    validationIcons
                                />

                                <div className="mb-3">
                                    <NoteEditor
                                        name={'body'}
                                        label={'Message'}
                                    />
                                </div>

                                <Select
                                    name={'templates'}
                                    options={templates}
                                />

                                <div className="mt-2 mb-4">
                                    <Checkbox
                                        name={'isPinned'}
                                        label={'Pinned'}
                                    />
                                </div>

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
