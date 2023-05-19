import { useEffect, useState } from 'react'

// compornents
import { Button, Card, ShowErrorNotifications } from '@components'
import { UploadDocs } from './components'

// query
import { LinearProgress } from '@components/LinearProgress'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { useGetCourseDocumentsQuery } from '@queries'

export const VerifyStudentDocs = ({
    id,
    setActive,
    setIndustrySelection,
    selectedCourses,
    workplaceId,
}: {
    id: any
    setActive: Function
    setIndustrySelection: Function
    selectedCourses: number[] | null
    workplaceId: any
}) => {
    const [courseDocuments, setCourseDocuments] = useState<any[] | null>([])
    const [progressPercent, setProgressPercent] = useState<any | null>(null)
    const [folders, setFolders] = useState<any | null>([])

    const requiredDocs = useGetCourseDocumentsQuery(
        { id, course: selectedCourses },
        { skip: !id || !selectedCourses }
    )

    useEffect(() => {
        const getSectors = () => {
            const docs = {}
            requiredDocs?.data?.uploaded?.forEach((doc: any) => {
                if ((docs as any)[doc?.name]) {
                    ;(docs as any)[doc?.name].push(doc)
                } else {
                    ;(docs as any)[doc?.name] = []
                    ;(docs as any)[doc?.name].push(doc)
                }
            })
            const requiredDocuments = requiredDocs?.data?.document?.map(
                (doc: any) => ({
                    ...doc,
                    uploaded: (docs as any)[doc?.folder?.name],
                })
            )
            setFolders(requiredDocuments)
        }
        getSectors()
    }, [requiredDocs])

    const getUploadedDocPercent = () => {
        const totalDocs = folders?.reduce(
            (acum: any, curr: any) => acum + curr?.folder?.capacity,
            0
        )
        const uploadedDocs = folders?.reduce(
            (acum: any, curr: any) =>
                acum + curr?.uploaded ? Number(curr?.uploaded?.length) : 0,
            0
        )
        return (uploadedDocs / totalDocs) * 100
    }

    useEffect(() => {
        setProgressPercent(getUploadedDocPercent())
    }, [requiredDocs, folders])

    return (
        <div>
            <p className="mb-2">Upload Documents</p>
            <Card>
                <ShowErrorNotifications result={requiredDocs} />
                <p className="text-xs">
                    <span className="font-semibold">Industry</span>{' '}
                    <span className="text-gray-500">
                        wants these document from you. We will help you to
                        deliver these documents to them.
                    </span>
                </p>

                <div className="my-3">
                    <LinearProgress
                        percent={progressPercent}
                        strokeWidth={0.4}
                        strokeColor={'#22c55e'}
                    />
                </div>

                <div className="my-4 flex flex-col gap-y-2">
                    {requiredDocs.isLoading ? (
                        <LoadingAnimation />
                    ) : folders?.length ? (
                        folders?.map((folder: any, i: number) => (
                            <UploadDocs
                                key={folder.id}
                                requiredDoc={folder}
                                workplaceId={workplaceId}
                            />
                        ))
                    ) : (
                        <div className="border border-dashed rounded-md p-5">
                            <div className="font-semibold text-orange-300">
                                No Documents Required
                            </div>
                            <p className="text-sm text-gray-400">
                                This industry don&apos;t require any document
                                from you. Your coordinator will forward your
                                request to industry
                            </p>
                        </div>
                    )}
                </div>

                <Button
                    variant={'secondary'}
                    text={'Back To Industries'}
                    onClick={() => {
                        setIndustrySelection(null)
                    }}
                />
            </Card>
        </div>
    )
}
