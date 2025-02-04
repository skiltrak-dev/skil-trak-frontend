import { useEffect, useMemo, useRef, useState } from 'react'
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

import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// components
import {
    AuthorizedUserComponent,
    Button,
    Card,
    Checkbox,
    draftToHtmlText,
    htmlToDraftText,
    InputContentEditor,
    inputEditorErrorMessage,
    RadioGroup,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'

// query
import { yupResolver } from '@hookform/resolvers/yup'
import { useContextBar, useNotification, useWorkplace } from '@hooks'
import { NotesTemplateType } from '@partials/admin/noteTemplates/enum'
import { CommonApi, SubAdminApi } from '@queries'
import { OptionType } from '@types'
import { getUserCredentials, HtmlToPlainText } from '@utils'
import ClickAwayListener from 'react-click-away-listener'
import { IoCheckmark } from 'react-icons/io5'
import { StudentNotesDropdown } from '../components'
import { UserRoles } from '@constants'

interface onSubmitType {
    title: string
    body: EditorState
    isPinned: boolean
}

export enum NotesTemplateStatus {
    Success = 'success',
    Failure = 'failure',
}
export const CreateStudentNote = ({
    action,
    receiverId,
    studentId,
    sender,
    editValues,
    setEditValues,
    onCancel,
}: any) => {
    const { notification } = useNotification()
    const [noteContent, setNoteContent] = useState<any>(null)
    const { workplaceRes } = useWorkplace()

    const contextBar = useContextBar()

    const ref = useRef<HTMLDivElement>(null)

    const [isSendDraft, setIsSendDraft] = useState<boolean>(true)
    const [selectedContent, setSelectedContent] = useState<OptionType | null>(
        null
    )
    const [selectedStatus, setSelectedStatus] =
        useState<NotesTemplateStatus | null>(null)
    const [selectedType, setSelectedType] = useState<
        NotesTemplateType | string | null
    >(null)
    const [selectedWorkplace, setSelectedWorkplace] = useState<number | null>(
        null
    )
    const [editing, setEditing] = useState(false)

    // query
    const [createNote, createNoteResult] = CommonApi.Notes.useCreate()
    const [changeNoteStatus, changeNoteStatusResult] =
        SubAdminApi.Student.addStudentNote()
    const [setNoteDraft, setNoteDraftResult] = CommonApi.Draft.useSetNoteDarft()
    const getNoteDraft = CommonApi.Draft.getNoteDarft(receiverId, {
        skip: !receiverId,
        refetchOnMountOrArgChange: true,
    })

    const getNotesTemplate = CommonApi.Notes.getNotesTemplate(
        {
            type: selectedType as NotesTemplateType,
            wpId: selectedWorkplace || -1,
        },
        {
            skip:
                !selectedType ||
                (!selectedWorkplace &&
                    selectedType === NotesTemplateType?.['Status Check Label']),
            refetchOnMountOrArgChange: true,
        }
    )
    const studentWorkplace = SubAdminApi.Student.getWorkplaceForSchedule(
        studentId,
        {
            skip: !studentId,
        }
    )

    const role = getUserCredentials()?.role

    const filterNotes = (notes: any) => {
        return notes
            ?.filter((note: any) => {
                // Check if studentNoteHistory exists and is an array
                if (
                    !note?.studentNoteHistory ||
                    !Array.isArray(note?.studentNoteHistory)
                ) {
                    return true // Keep notes without history
                }

                // Check if any history entry has current = "success"
                return !note?.studentNoteHistory?.some(
                    (history: any) => history?.current === 'success'
                )
            })
            ?.map((note: any) => note?.id)
    }

    const filteredNotesTemplate = filterNotes(getNotesTemplate?.data)

    const workplaceOptions = useMemo(
        () =>
            workplaceRes?.map((wp: any, i: number) => ({
                label: `Workplace ${i + 1}`,
                value: wp?.id,
                item: wp,
            })),
        [studentWorkplace]
    )

    const templateOptions = useMemo(
        () =>
            getNotesTemplate?.data?.map((noteTemplate: any) => ({
                label:
                    noteTemplate?.noteTemplate?.subject ||
                    noteTemplate?.subject,
                value: noteTemplate?.id,
            })),
        [getNotesTemplate]
    )

    useEffect(() => {
        if (
            selectedType &&
            selectedType === NotesTemplateType['Status Check Label'] &&
            filteredNotesTemplate &&
            filteredNotesTemplate?.length > 0
        ) {
            setSelectedContent(
                templateOptions?.find(
                    (template: OptionType) =>
                        template?.value === filteredNotesTemplate?.[0]
                )
            )
        }
    }, [filteredNotesTemplate, templateOptions])

    useEffect(() => {
        if (workplaceOptions && workplaceOptions?.length > 0) {
            setSelectedWorkplace(workplaceOptions?.[0]?.value)
        }
    }, [workplaceOptions])

    useEffect(() => {
        if (editValues) {
            setEditing(true)
        }
    }, [editValues])

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        body: Yup.mixed().test('Message', 'Must Provide Message', (value) =>
            inputEditorErrorMessage(value)
        ),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })

    const noteBodyWordsCount = noteContent
        ? HtmlToPlainText(noteContent)?.trim()?.replace(/\s+/g, ' ')?.split(' ')
              ?.length
        : ''

    const isBodyGreaterThen30 = noteBodyWordsCount > 30

    const onSubmit = async (values: any) => {
        setIsSendDraft(false)

        if (values?.body) {
            // const body = draftToHtml(
            //     convertToRaw(values?.body.getCurrentContent())
            // )
            const body = draftToHtmlText(values?.body)
            if (selectedType !== 'custom' && role !== UserRoles.RTO) {
                const noteRes: any = await changeNoteStatus({
                    id: Number(selectedContent?.value),
                    status: selectedStatus as NotesTemplateStatus,
                    type: selectedType as NotesTemplateType,
                    stdId: studentId,
                    templateId: Number(selectedContent?.value),
                })

                if (noteRes?.data) {
                    const res: any = await createNote({
                        ...values,
                        body,
                        isSuccess:
                            selectedStatus === NotesTemplateStatus.Success
                                ? true
                                : false,
                        isPinned: isBodyGreaterThen30
                            ? false
                            : values?.isPinned,
                        student: studentId,
                        postedFor: receiverId,
                        studentNote: noteRes?.data?.id,
                        // status: selectedStatus,
                    })
                    if (res?.data) {
                        notification.success({
                            title: 'Note Added',
                            description: 'Note Added Successfully!',
                        })
                        contextBar.hide()
                        contextBar.setTitle('')
                        contextBar.setContent(null)
                    }
                }
            } else if (selectedType === 'custom' || role === UserRoles.RTO) {
                const res: any = await createNote({
                    ...values,
                    body,
                    isPinned: isBodyGreaterThen30 ? false : values?.isPinned,
                    student: studentId,
                    postedFor: receiverId,
                    // status: selectedStatus,
                })
                if (res?.data) {
                    notification.success({
                        title: 'Note Added',
                        description: 'Note Added Successfully!',
                    })
                    contextBar.hide()
                    contextBar.setTitle('')
                    contextBar.setContent(null)
                }
            }
        } else {
            notification.error({
                title: 'Message is Required',
                description: 'Message is Required',
            })
        }
    }

    const typeOptions = [
        ...Object.entries(NotesTemplateType).map(([label, value]) => ({
            label,
            value,
        })),
        {
            label: 'Custom',
            value: 'custom',
        },
    ]

    return (
        <>
            <ShowErrorNotifications result={createNoteResult} />
            <ShowErrorNotifications result={changeNoteStatusResult} />

            <div className={`sticky -4 -top-48`}>
                <Card>
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div>
                                {workplaceRes && workplaceRes?.length > 1 && (
                                    <div className="relative z-50">
                                        <Select
                                            label={'Workplaces'}
                                            name={'workplace'}
                                            value={workplaceOptions?.find(
                                                (c: any) =>
                                                    c?.value ===
                                                    selectedWorkplace
                                            )}
                                            options={workplaceOptions}
                                            loading={studentWorkplace.isLoading}
                                            onlyValue
                                            disabled={
                                                studentWorkplace.isLoading
                                            }
                                            validationIcons
                                            onChange={(e: any) => {
                                                setSelectedWorkplace(e)
                                            }}
                                        />
                                    </div>
                                )}
                                <AuthorizedUserComponent
                                    roles={[
                                        UserRoles.ADMIN,
                                        UserRoles.SUBADMIN,
                                    ]}
                                >
                                    <div className="relative z-[49]">
                                        <Select
                                            name="type"
                                            options={typeOptions}
                                            label={'Select Type'}
                                            placeholder="Select Type"
                                            onlyValue
                                            onChange={(
                                                e: NotesTemplateType
                                            ) => {
                                                setSelectedType(e)
                                                setSelectedStatus(null)
                                                setSelectedContent(null)
                                                methods.setValue('body', '')
                                            }}
                                        />
                                    </div>
                                </AuthorizedUserComponent>

                                {selectedType && selectedType !== 'custom' && (
                                    <div className="w-full relative z-[55]">
                                        <StudentNotesDropdown
                                            title="Select Note Template"
                                            onClear={() => {
                                                setSelectedContent(null)
                                            }}
                                            disabled={
                                                getNotesTemplate?.isLoading ||
                                                getNotesTemplate?.isFetching ||
                                                !selectedType
                                            }
                                            loading={
                                                getNotesTemplate?.isLoading ||
                                                getNotesTemplate?.isFetching
                                            }
                                            selected={
                                                selectedContent
                                                    ? selectedContent?.label
                                                    : ''
                                            }
                                            dropDown={() => (
                                                <div>
                                                    {templateOptions?.map(
                                                        (
                                                            template: OptionType,
                                                            i: number
                                                        ) => (
                                                            <div
                                                                key={Number(
                                                                    template.value
                                                                )}
                                                                onClick={() => {
                                                                    if (
                                                                        !filteredNotesTemplate?.includes(
                                                                            template.value
                                                                        ) &&
                                                                        selectedType ===
                                                                            NotesTemplateType[
                                                                                'Status Check Label'
                                                                            ]
                                                                    ) {
                                                                        notification.warning(
                                                                            {
                                                                                title: 'Action Already Performed',
                                                                                description:
                                                                                    ' ',
                                                                            }
                                                                        )
                                                                    } else if (
                                                                        filteredNotesTemplate?.includes(
                                                                            template.value
                                                                        ) &&
                                                                        filteredNotesTemplate?.[0] !==
                                                                            template.value &&
                                                                        selectedType ===
                                                                            NotesTemplateType[
                                                                                'Status Check Label'
                                                                            ]
                                                                    ) {
                                                                        notification.warning(
                                                                            {
                                                                                title: 'Cant Perform this action now!',
                                                                                description:
                                                                                    ' ',
                                                                            }
                                                                        )
                                                                    } else {
                                                                        setSelectedContent(
                                                                            template
                                                                        )
                                                                    }
                                                                }}
                                                                className={`${
                                                                    selectedContent?.value ===
                                                                    template?.value
                                                                        ? 'bg-gray-200'
                                                                        : ''
                                                                } hover:bg-gray-200 py-2 border-b border-secondary-dark px-2 flex items-center justify-between gap-x-2 cursor-pointer`}
                                                            >
                                                                <div className="flex items-center gap-x-2">
                                                                    <Typography
                                                                        variant={
                                                                            filteredNotesTemplate?.[0] ===
                                                                                template?.value &&
                                                                            selectedType ===
                                                                                NotesTemplateType[
                                                                                    'Status Check Label'
                                                                                ]
                                                                                ? 'label'
                                                                                : 'small'
                                                                        }
                                                                        color={
                                                                            filteredNotesTemplate?.[0] !==
                                                                                template?.value &&
                                                                            selectedType ===
                                                                                NotesTemplateType[
                                                                                    'Status Check Label'
                                                                                ]
                                                                                ? 'text-gray-400'
                                                                                : 'text-black'
                                                                        }
                                                                    >
                                                                        {!filteredNotesTemplate?.includes(
                                                                            template.value
                                                                        ) &&
                                                                        selectedType ===
                                                                            NotesTemplateType[
                                                                                'Status Check Label'
                                                                            ] ? (
                                                                            <del>
                                                                                {i +
                                                                                    1}
                                                                            </del>
                                                                        ) : (
                                                                            i +
                                                                            1
                                                                        )}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant={
                                                                            filteredNotesTemplate?.[0] ===
                                                                                template?.value &&
                                                                            selectedType ===
                                                                                NotesTemplateType[
                                                                                    'Status Check Label'
                                                                                ]
                                                                                ? 'label'
                                                                                : 'small'
                                                                        }
                                                                        color={
                                                                            filteredNotesTemplate?.[0] !==
                                                                                template?.value &&
                                                                            selectedType ===
                                                                                NotesTemplateType[
                                                                                    'Status Check Label'
                                                                                ]
                                                                                ? 'text-gray-400'
                                                                                : 'text-black'
                                                                        }
                                                                    >
                                                                        {!filteredNotesTemplate?.includes(
                                                                            template.value
                                                                        ) &&
                                                                        selectedType ===
                                                                            NotesTemplateType[
                                                                                'Status Check Label'
                                                                            ] ? (
                                                                            <del>
                                                                                {
                                                                                    template?.label
                                                                                }
                                                                            </del>
                                                                        ) : (
                                                                            template?.label
                                                                        )}
                                                                    </Typography>
                                                                </div>
                                                                {!filteredNotesTemplate?.includes(
                                                                    template.value
                                                                ) &&
                                                                    selectedType ===
                                                                        NotesTemplateType[
                                                                            'Status Check Label'
                                                                        ] && (
                                                                        <IoCheckmark />
                                                                    )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}

                                {selectedContent ? (
                                    <div className="mt-2">
                                        <RadioGroup
                                            layout="grid"
                                            gridColumns="2"
                                            label={'Select Message Type'}
                                            name={'status'}
                                            options={[
                                                {
                                                    label: 'Successfully',
                                                    value: NotesTemplateStatus.Success,
                                                },
                                                {
                                                    label: 'Unsuccessfully',
                                                    value: NotesTemplateStatus.Failure,
                                                },
                                            ]}
                                            onChange={(e: any) => {
                                                setSelectedStatus(
                                                    e?.target?.value
                                                )
                                                const contentData =
                                                    getNotesTemplate?.data?.find(
                                                        (template: any) =>
                                                            template?.id ===
                                                            selectedContent?.value
                                                    )

                                                const updatedContent =
                                                    contentData?.noteTemplate ||
                                                    contentData

                                                methods.setValue(
                                                    'title',
                                                    updatedContent?.subject
                                                )

                                                // selectedContent
                                                if (
                                                    e?.target?.value ===
                                                    'success'
                                                ) {
                                                    methods.setValue(
                                                        'body',
                                                        htmlToDraftText(
                                                            updatedContent?.successContent
                                                        )
                                                    )
                                                } else {
                                                    methods.setValue(
                                                        'body',
                                                        htmlToDraftText(
                                                            updatedContent?.failureContent
                                                        )
                                                    )
                                                }
                                            }}
                                        />
                                    </div>
                                ) : null}
                                <TextInput
                                    label={'Title'}
                                    name={'title'}
                                    // disabled={!!selectedStatus}
                                    disabled={
                                        selectedType ===
                                            NotesTemplateType[
                                                'Status Check Label'
                                            ] && !!selectedStatus
                                    }
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
                                    {/* <Typography variant="small">
                                        Words Count: {noteBodyWordsCount}
                                    </Typography> */}
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

                                <div className="mt-2 mb-4 flex items-center gap-3 flex-wrap">
                                    <Checkbox
                                        name={'isPinned'}
                                        label={'Pinned'}
                                        disabled={isBodyGreaterThen30}
                                        showError={false}
                                    />
                                </div>

                                <div ref={ref} id={'submitButton'}>
                                    <Button
                                        submit
                                        fullWidth
                                        text={`${
                                            editing ? 'Update' : 'Add'
                                        } Note`}
                                        loading={
                                            createNoteResult?.isLoading ||
                                            changeNoteStatusResult?.isLoading
                                        }
                                        disabled={
                                            createNoteResult?.isLoading ||
                                            changeNoteStatusResult?.isLoading
                                        }
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
