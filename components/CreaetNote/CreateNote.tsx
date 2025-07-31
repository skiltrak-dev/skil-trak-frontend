import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

// const Editor = dynamic<EditorProps>(
//     () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//     {
//         ssr: false,
//     }
// )

const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default

import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// components
import {
    ActionButton,
    Button,
    Card,
    Checkbox,
    draftToHtmlText,
    htmlToDraftText,
    InputContentEditor,
    inputEditorErrorMessage,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'

// query
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification, useRewritePhrase } from '@hooks'
import { CommonApi } from '@queries'
import { OptionType } from '@types'
import { HtmlToPlainText } from '@utils'
import { useRouter } from 'next/router'
import ClickAwayListener from 'react-click-away-listener'
import { RiShining2Fill } from 'react-icons/ri'

interface onSubmitType {
    title: string
    body: EditorState
    isPinned: boolean
}
export const CreateNote = ({
    action,
    receiverId,
    sender,
    editValues,
    setEditValues,
    onCancel,
}: any) => {
    const { notification } = useNotification()
    const [noteContent, setNoteContent] = useState<any>(null)
    const router = useRouter()

    const ref = useRef<HTMLDivElement>(null)

    const [isSendDraft, setIsSendDraft] = useState<boolean>(true)

    // query
    const [createNote, createNoteResult] = CommonApi.Notes.useCreate()
    const [setNoteDraft, setNoteDraftResult] = CommonApi.Draft.useSetNoteDarft()
    const getNoteDraft = CommonApi.Draft.getNoteDarft(receiverId, {
        skip: !receiverId,
        refetchOnMountOrArgChange: true,
    })

    const [editing, setEditing] = useState(false)

    const [bodyData, setBodyData] = useState<any>(EditorState.createEmpty())
    const [template, setTemplate] = useState<any | null>(null)

    const { onRewritePhrase, isLoading } = useRewritePhrase()

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
            if (setEditValues) {
                setEditValues(null)
            }
            notification.success({
                title: 'Note Attached',
                description: 'Note attached successfully',
            })
            setNoteContent(null)
            methods.reset()
            getNoteDraft.refetch()
            if (onCancel) {
                onCancel()
            }
        }
    }, [createNoteResult.isSuccess])

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

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        body: Yup.mixed().test('Message', 'Must Provide Message', (value) =>
            inputEditorErrorMessage(value)
        ),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
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
            if (getNoteDraft?.data?.title) {
                methods.setValue('title', getNoteDraft?.data?.title)
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

    const noteBodyWordsCount = HtmlToPlainText(
        draftToHtmlText(methods?.watch()?.body)
    )
        ?.trim()
        ?.replace(/\s+/g, ' ')
        ?.split(' ')?.length

    const isBodyGreaterThen30 = noteBodyWordsCount > 30

    const onFixGrammerClick = async () => {
        const data = await onRewritePhrase(noteContent)

        if (data?.correctedText) {
            setNoteContent(data?.correctedText)
            methods.setValue('body', htmlToDraftText(data?.correctedText))
        }
    }

    const onSubmit = (values: onSubmitType) => {
        setIsSendDraft(false)
        if (editing) {
            // updateNote({ ...values, postedFor: receiverId, id: editValues?.id })
        } else {
            if (values?.body) {
                // const body = draftToHtml(
                //     convertToRaw(values?.body.getCurrentContent())
                // )
                const body = draftToHtmlText(values?.body)
                createNote({
                    ...values,
                    body,
                    isPinned: isBodyGreaterThen30 ? false : values?.isPinned,
                    postedFor: receiverId,
                })
            } else {
                notification.error({
                    title: 'Message is Required',
                    description: 'Message is Required',
                })
            }
        }
    }

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
                                    onBlur={(e: any) => {
                                        if (
                                            !ref.current?.contains(
                                                e.relatedTarget
                                            )
                                        ) {
                                            setNoteDraft({
                                                receiver: receiverId,
                                                title: e.target.value,
                                            })
                                        }
                                    }}
                                />

                                <div className="flex justify-between items-center">
                                    <Typography variant="label">
                                        Message
                                    </Typography>
                                    <ActionButton
                                        variant="info"
                                        Icon={RiShining2Fill}
                                        text="Rewrite with AI"
                                        onClick={() => {
                                            onFixGrammerClick()
                                        }}
                                        disabled={!noteContent?.trim()}
                                        loading={isLoading}
                                    />
                                </div>
                                <ClickAwayListener
                                    onClickAway={(e: any) => {
                                        if (
                                            noteContent &&
                                            !ref.current?.contains(e.target)
                                        ) {
                                            setNoteDraft({
                                                receiver: receiverId,
                                                content: noteContent,
                                            })
                                        }
                                    }}
                                >
                                    <div className="mb-3">
                                        <InputContentEditor
                                            name={'body'}
                                            onChange={(e: any) => {
                                                const note = draftToHtmlText(e)
                                                setNoteContent(note)
                                            }}
                                        />
                                    </div>
                                </ClickAwayListener>

                                <Select
                                    name={'templates'}
                                    options={templates}
                                    onChange={(e: OptionType) => {
                                        setTemplate(e?.value)
                                    }}
                                />

                                <div className="mt-2 mb-4">
                                    <Checkbox
                                        name={'isPinned'}
                                        label={'Pinned'}
                                        disabled={isBodyGreaterThen30}
                                    />
                                </div>

                                <div ref={ref} id={'submitButton'}>
                                    <Button
                                        submit
                                        fullWidth
                                        text={`${
                                            editing ? 'Update' : 'Add'
                                        } Note`}
                                        loading={createNoteResult?.isLoading}
                                        disabled={createNoteResult?.isLoading}
                                        variant={
                                            editing ? 'secondary' : 'primary'
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </Card>
            </div>
        </>
    )
}
