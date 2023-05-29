import {
    ImportantDocumentCard,
    Modal,
    PdfViewModal,
    Portal,
    Typography,
    VideoPlayModal,
} from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

type Props = {}

const data = [
    {
        title: 'Work Flow',
        type: 'workflow',
        description: 'See all the requirements asked by RTO for your courses',
        imageUrl:
            'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    },
    {
        title: 'Course Requirements',
        // type: 'workflow',
        description: 'See all the requirements asked by RTO for your courses',
        imageUrl:
            'https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXJzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
        title: 'Induction Process',
        type: 'inductionProcess',
        description: 'This document is about the flow of work we have here',
        imageUrl:
            'https://images.unsplash.com/photo-1624686713594-21157487be91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGluZHVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
        title: 'Placement Info',
        type: 'placementInfo',
        description: 'This document is about the flow of work we have here',
        imageUrl:
            'https://images.unsplash.com/photo-1548882097-ee1e4da9bc9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
        title: 'Legal',
        type: 'legal',
        description: 'This document is about the flow of work we have here',
        imageUrl:
            'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVnYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60s',
    },
]
export const RtoContextBarData = (props: Props) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()
    const router = useRouter()

    const documents = CommonApi.Documents.useList()

    const onCancel = () => {
        setModal(null)
    }

    const getDocument = (docType: string) => {
        return documents?.data?.find(
            (document: any) => document?.docType === docType
        )
    }

    const onDocumentView = (docType: string) => {
        const document = getDocument(docType)
        const extension = document?.file?.split('.').reverse()[0]

        if (document) {
            setModal(
                <Portal>
                    <Modal
                        title=""
                        subtitle=""
                        onCancelClick={onCancel}
                        onConfirmClick={onCancel}
                    >
                        {document?.fileType === 'file' ? (
                            ['jpg', 'jpeg', 'png'].includes(
                                extension.toLowerCase()
                            ) ? (
                                <div className="min-w-[650px] max-w-[70vw] max-h-[500px] overflow-auto">
                                    <img
                                        src={document?.file}
                                        alt=""
                                        className="w-[inherit] h-full object-contain"
                                    />
                                </div>
                            ) : ['mp4', 'mkv', 'avi', 'mpeg'].includes(
                                  extension.toLowerCase()
                              ) ? (
                                <VideoPlayModal
                                    downloadUrl={document?.file}
                                    url={document?.file}
                                    onCancelButtonClick={onCancel}
                                />
                            ) : ['pdf'].includes(extension.toLowerCase()) ? (
                                <PdfViewModal
                                    downloadUrl={document?.file}
                                    url={document?.file}
                                    onCancelButtonClick={onCancel}
                                />
                            ) : null
                        ) : (
                            <div className="px-5 min-w-full md:min-w-[600px] max-w-4xl min-h-[40vh] max-h-[calc(100vh-250px)] overflow-auto custom-scrollbar">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: document?.content,
                                    }}
                                />
                            </div>
                        )}
                    </Modal>
                </Portal>
            )
        } else {
            notification.error({
                title: 'No Document Provided',
                description: 'No Document provided from Admin',
            })
        }
    }

    const role = getUserCredentials()?.role

    return (
        <>
            <div className="relative z-50">{modal}</div>
            <div className="flex flex-col gap-y-1">
                <Typography variant="muted" color="text-gray-400">
                    Important Documents
                </Typography>
                {data.map((item, index) => (
                    <ImportantDocumentCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        onClick={() => {
                            if (item?.type) {
                                onDocumentView(item?.type)
                            } else {
                                router.push(
                                    role === UserRoles.SUBADMIN
                                        ? '/portals/sub-admin/course-requirements'
                                        : role === UserRoles.RTO
                                        ? '/portals/rto/course-requirements'
                                        : role === UserRoles.STUDENT
                                        ? '/portals/student/course-requirements'
                                        : role === UserRoles.INDUSTRY
                                        ? '/portals/industry/course-requirements'
                                        : '#'
                                )
                            }
                        }}
                    />
                ))}
            </div>
        </>
    )
}
