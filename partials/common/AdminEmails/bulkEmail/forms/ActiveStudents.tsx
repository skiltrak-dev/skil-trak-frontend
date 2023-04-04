import {
    Button,
    Checkbox,
    ContentEditor,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { FileUpload } from '@hoc'
import { useNotification } from '@hooks'
import { Attachment } from '@partials/common/Notifications'
import { CommonApi } from '@queries'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ToStudentCard } from '../components/ToStudentCard'
import { BulkEmailEditor } from '../components'
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertToRaw,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
type Props = {
    selectedUser: any
    setSelectedUser: any
    selectedStudent: any
    setSelectedStudent: any
}

export const ActiveStudents = ({
    selectedUser,
    setSelectedUser,
    selectedStudent,
    setSelectedStudent,
}: Props) => {
    const { notification } = useNotification()
    const [attachmentFiles, setAttachmentFiles] = useState<any>([])
    const [template, setTemplate] = useState<any | null>(null)
    const [templateId, setTemplateId] = useState<any | null>(null)
    const [templateBody, setTemplateBody] = useState<any | null>(null)
    const [templateSubject, setTemplateSubject] = useState<any | null>(null)
    const [selectAll, setSelectAll] = useState<any | null>(null)
    const [isChecked, setIsChecked] = useState(false)
    const [industryIds, setIndustryIds] = useState<any>([])
    const [rtoIds, setRtoIds] = useState<any>([])
    const [courseIds, setCourseIds] = useState<any>([])

    const [templateValue, setTemplateValue] = useState<any>(null)

    // Ids
    const getRtoIds = rtoIds.map((rto: any) => rto.value).join(',')
    const getCourseIds = courseIds.map((course: any) => course.value).join(',')
    const getIndustriesIds = industryIds
        .map((industry: any) => industry.value)
        .join(',')

    const [sendBulkEmail, resultSendBulkEmail] =
        CommonApi.Messages.useSendBulkMail()

    const isWithWorkplace =
        selectedStudent === 'With Workplace'
            ? 1
            : selectedStudent === 'Without Workplace'
            ? 2
            : undefined
    // rtos list, industries list, courses list
    const rtoResponse = CommonApi.Rtos.useRtosList()
    const industriesResponse = CommonApi.Industries.useIndustriesList()
    const coursesResponse = CommonApi.Courses.useCoursesList()

    //all ids
    const industriesIds = industriesResponse?.data?.map(
        (industry: any) => industry?.id
    )
    const coursesIds = coursesResponse?.data?.map((course: any) => course?.id)
    const rtosIds = rtoResponse.data?.map((rto: any) => rto?.id)
    //students list
    const bulkMailStudentsResponse =
        CommonApi.Messages.useSearchBulkMailStudents({
            courses: getCourseIds || undefined,
            rtos: getRtoIds || undefined,
            industries: getIndustriesIds || undefined,
            workplace: isWithWorkplace,
        })
    const studentsOptions = bulkMailStudentsResponse.data?.length
        ? bulkMailStudentsResponse?.data?.map((student: any) => ({
              label: student?.user?.name,
              value: student?.id,
          }))
        : []

    const checkAllStudents = () => {
        if (isChecked) {
            setSelectAll(null)
            setIsChecked(false)
        } else {
            setSelectAll(studentsOptions)
            setIsChecked(true)
        }
    }
    // select all students

    // Rtos List

    const rtoOptions = rtoResponse.data?.length
        ? rtoResponse?.data?.map((rto: any) => ({
              label: rto?.user?.name,
              value: rto?.id,
          }))
        : []

    //industries list

    const industryOptions = industriesResponse.data?.length
        ? industriesResponse?.data?.map((rto: any) => ({
              label: rto?.user?.name,
              value: rto?.id,
          }))
        : []

    // Templates List
    const getTemplates = CommonApi.Messages.useAllTemplates()
    const templateOptions = getTemplates?.data?.length
        ? getTemplates?.data?.map((template: any) => ({
              label: template?.subject,
              value: template?.id,
          }))
        : []

    const findTemplate = (id: any) => {
        const template = getTemplates?.data?.find(
            (template: any) => template.id === id
        )
        setTemplateBody(template?.content)
        setTemplateSubject(template?.subject)
    }
    // Courses List

    const coursesOptions = coursesResponse.data?.length
        ? coursesResponse?.data?.map((course: any) => ({
              label: course?.title,
              value: course?.id,
          }))
        : []

    const getStudentIds = selectAll?.map((student: any) => student?.value)
    const studentsIds =
        getStudentIds?.map((studentId: any) => {
            const student = bulkMailStudentsResponse?.data?.find(
                (student: any) => student.id === studentId
            )
            return student?.user?.id
        }) || null

    const toStudent = [
        {
            text: 'All Students',
            icon: '/images/icons/students.png',
        },
        {
            text: 'With Workplace',
            icon: '/images/icons/workplace.png',
        },
        {
            text: 'Without Workplace',
            icon: '/images/icons/no-workplace.png',
        },
    ]

    const formMethods = useForm({
        mode: 'all',
        // resolver: yupResolver(validationSchema),
    })
    const onRemoveFile = (fileId: number) => {
        setAttachmentFiles((preVal: any) => [
            ...preVal?.filter((file: File) => file?.lastModified !== fileId),
        ])
    }
    const onFileUpload = ({
        name,
        fileList,
    }: {
        name: string
        fileList: any
    }) => {
        return (
            <Attachment
                name={name}
                fileList={attachmentFiles}
                onRemoveFile={onRemoveFile}
            />
        )
    }
    const onSubmit = (data: any) => {
        let content = ''
        if (data?.message) {
            content = draftToHtml(
                convertToRaw(data?.message?.getCurrentContent())
            )
        }
        // sent the above data to the api using form data
        const formData = new FormData()
        const {
            attachment,
            message,
            student,
            rtos,
            industries,
            course,
            students,
            template,
            ...rest
        } = data
        Object.entries(rest)?.forEach(([key, value]: any) => {
            formData.append(key, value)
        })

        attachment &&
            attachment?.length > 0 &&
            attachment?.forEach((attached: File) => {
                formData.append('attachment', attached)
            })
        formData.append('users', studentsIds)
        formData.append('template', templateId)
        formData.append('message', content)

        sendBulkEmail(formData)
        // sendBulk({ users: studentsIds, template: templateId })
    }
    useEffect(() => {
        if (selectAll && selectAll?.length > 0) {
            formMethods.setValue('student', selectAll)
        }
    }, [selectAll])
    useEffect(() => {
        if (template && template?.length > 0) {
            formMethods.setValue('subject', template)
        }
    }, [template])
    useEffect(() => {
        if (templateBody && templateBody?.length > 0) {
            formMethods.setValue('message', templateBody)
        }
    }, [templateBody])
    useEffect(() => {
        if (attachmentFiles) {
            formMethods.setValue('attachment', attachmentFiles)
        }
    }, [attachmentFiles])

    useEffect(() => {
        if (resultSendBulkEmail.isSuccess) {
            notification.success({
                title: 'Bulk Email Sent',
                description: 'Bulk Email Sent Successfully',
            })
            formMethods.reset()
            setSelectAll(null)
            setTemplateValue(null)
            setTemplate(null)
            setTemplateId(null)
            setIsChecked(false)
            setTemplateBody(null)
        }
    }, [resultSendBulkEmail])

    useEffect(() => {
        if (templateBody) {
            const blocksFromHTML = convertFromHTML(templateBody)
            const bodyValue = EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                )
            )
            formMethods.setValue('message', bodyValue)
        }
    }, [templateBody])
    return (
        <>
            <ShowErrorNotifications result={resultSendBulkEmail} />
            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col"
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    {selectedUser?.sendTo === 'Student' && (
                        <div className="py-4 flex justify-between items-center gap-x-3">
                            {toStudent.map(({ text, icon }: any) => (
                                <ToStudentCard
                                    key={text}
                                    text={text}
                                    icon={icon}
                                    selected={selectedStudent}
                                    onClick={() => {
                                        setSelectedStudent(text)
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div className="grid gap-x-4 grid-cols-2">
                        <Select
                            label={'Search by RTO'}
                            name={'rtos'}
                            // defaultValue={courseOptions}
                            // value={courseValues}
                            options={rtoOptions}
                            multi
                            // loading={courseLoading}
                            onChange={(e: any) => {
                                setRtoIds(e)
                            }}
                        />
                        {selectedStudent !== 'Without Workplace' && (
                            <Select
                                label={'Search by Industry'}
                                name={'industries'}
                                // defaultValue={courseOptions}
                                // value={courseValues}
                                options={industryOptions}
                                multi
                                // loading={courseLoading}
                                onChange={(e: any) => {
                                    setIndustryIds(e)
                                }}
                            />
                        )}

                        {/* <Select
                            label={'Search by Batch/Class'}
                            name={'batch'}
                            defaultValue={courseOptions}
                            value={courseValues}
                            options={[
                                {
                                    label: 'Course 1',
                                    value: 'course-1',
                                },
                                {
                                    label: 'Course 2',
                                    value: 'course-2',
                                },
                            ]}
                            multi
                        loading={courseLoading}
                        onChange={(e: any) => {
                            setCourseValues(e)
                        }}
                        /> */}
                        <Select
                            label={'Search by Unit'}
                            name={'course'}
                            // defaultValue={courseOptions}
                            // value={courseValues}
                            options={coursesOptions}
                            multi
                            // loading={courseLoading}
                            onChange={(e: any) => {
                                setCourseIds(e)
                            }}
                        />
                    </div>

                    <Select
                        label={`Select Student`}
                        name={'student'}
                        // defaultValue={selectAll}
                        value={selectAll}
                        options={studentsOptions}
                        multi
                        // loading={courseLoading}
                        onChange={(e: any) => {
                            setSelectAll(e)
                        }}
                    />

                    <Checkbox
                        name="students"
                        label={'Select all Students'}
                        onChange={checkAllStudents}
                        defaultChecked={isChecked}

                        // defaultChecked={
                        //     bulkMailStudentsResponse?.data?.isSuccess &&
                        //     bulkMailStudentsResponse?.data?.length ===
                        //         selectAll?.length
                        //         ? true
                        //         : false
                        // }
                    />

                    {/* <div className="flex justify-between items-center"> */}
                    <Select
                        label={'Select Email Template'}
                        name={'template'}
                        // defaultValue={courseOptions}
                        // value={courseValues}
                        options={templateOptions}
                        placeholder="Select Email Template"
                        // loading={courseLoading}
                        value={templateValue}
                        onChange={(e: any) => {
                            setTemplate(e?.label)
                            setTemplateId(e?.value)
                            findTemplate(e?.value)
                            setTemplateValue(e)
                        }}
                    />
                    {/* <Button text={'All Templates'} /> */}
                    {/* </div> */}
                    <TextInput label={'Subject'} name={'subject'} />
                    {/* <TextArea
                        rows={10}
                        value={templateBody}
                        label={'Message'}
                        name={'message'}
                    /> */}
                    {/* <ContentEditor
                        setContent={setTemplateBody}
                        content={templateBody}
                    /> */}
                    <BulkEmailEditor
                        name={'message'}
                        label={'Message'}
                        content={templateBody}
                    />
                    <div className="my-4 flex justify-between items-center">
                        <FileUpload
                            onChange={(docs: FileList) => {
                                setAttachmentFiles((preVal: any) => [
                                    ...preVal,
                                    ...docs,
                                ])
                            }}
                            name={'attachment'}
                            component={onFileUpload}
                            multiple
                            limit={Number(1111111111)}
                        />
                        <Button
                            disabled={resultSendBulkEmail?.isLoading}
                            loading={resultSendBulkEmail?.isLoading}
                            text={'Send'}
                            submit
                        />
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
