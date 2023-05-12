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
import ClickAwayListener from 'react-click-away-listener'

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
    const [setNoteDraft, setNoteDraftResult] = CommonApi.Draft.useSetNoteDarft()
    const getNoteDraft = CommonApi.Draft.getNoteDarft(receiverId, {
        skip: !receiverId,
    })

    const [editing, setEditing] = useState(false)

    const [bodyData, setBodyData] = useState<any>(EditorState.createEmpty())
    const [template, setTemplate] = useState<any | null>(null)

    useEffect(() => {
        if (editValues) {
            setEditing(true)
        }
    }, [editValues])

    const templateValue = template
        ? '<p><strong>Requirements for SITHCCC020 (work effectively as a cook)</strong></p>    <p></p>    <p>This unit describes the performance outcomes, skills and knowledge required to work as a cook. It incorporates all aspects of organising, preparing and cooking a variety of food items across different service periods and menu types; using a range of cooking methods and team coordination skills. The unit integrates key technical and organisational skills required by a qualified commercial cook. It brings together the skills and knowledge covered in individual units and focuses on the way they must be applied in a commercial kitchen.</p>   <p>During your placement, you will be covering unit SITHCC020 Work effectively as a cook, which requires the following: Prepare, cook and present multiple items for a minimum of 48 food service periods (shifts), including</p>    <p>Breakfast, Lunch, dinner and Special functions. (each service a minimum of 4 hours)</p>    <p><strong>Prepare, cook and present multiple items for food service periods (shifts) including:</strong></p>    <p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Poppins, sans-serif, monospace;">• Breakfast </span></p>'
        : ''

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
        if (editing) {
            // updateNote({ ...values, postedFor: receiverId, id: editValues?.id })
        } else {
            if (values?.body) {
                const body = draftToHtml(
                    convertToRaw(values?.body.getCurrentContent())
                )
                createNote({ ...values, body, postedFor: receiverId })
            } else {
                notification.error({
                    title: 'Message is Required',
                    description: 'Message is Required',
                })
            }
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

    const sa = 'Saad Khan'

    useEffect(() => {
        setBodyData(
            EditorState.createWithContent(ContentState.createFromText(sa))
        )
    }, [])

    const methods = useForm({
        mode: 'all',
        defaultValues: { ...editValues, body: bodyData },
    })

    useEffect(() => {
        if (getNoteDraft.isSuccess) {
            if (getNoteDraft?.data?.content) {
                const blocksFromHTML = convertFromHTML(
                    getNoteDraft?.data?.content
                )
                const bodyValue = EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap
                    )
                )
                methods.setValue('body', bodyValue)
            }
        }
    }, [getNoteDraft.isSuccess])

    useEffect(() => {
        if (templateValue) {
            const blocksFromHTML = convertFromHTML(templateValue)
            const bodyValue = EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                )
            )
            methods.setValue('body', bodyValue)
        }
    }, [templateValue, template])

    return (
        <>
            <ShowErrorNotifications result={createNoteResult} />

            <div className={`sticky -4 -top-48`}>
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

                                <ClickAwayListener
                                    onClickAway={(e: any) => {
                                        if (noteContent) {
                                            setNoteDraft({
                                                receiver: receiverId,
                                                content: noteContent,
                                            })
                                        }
                                    }}
                                >
                                    <div className="mb-3">
                                        <NoteEditor
                                            name={'body'}
                                            label={'Message'}
                                            onChange={(e: any) => {
                                                const note = draftToHtml(
                                                    convertToRaw(
                                                        e.getCurrentContent()
                                                    )
                                                )
                                                setNoteContent(note)

                                                console.log(
                                                    draftToHtml(
                                                        convertToRaw(
                                                            e.getCurrentContent()
                                                        )
                                                    )
                                                )
                                            }}
                                        />
                                    </div>
                                </ClickAwayListener>

                                <Select
                                    name={'templates'}
                                    options={templates}
                                    onChange={(e: any) => {
                                        setTemplate(e?.value)
                                    }}
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
