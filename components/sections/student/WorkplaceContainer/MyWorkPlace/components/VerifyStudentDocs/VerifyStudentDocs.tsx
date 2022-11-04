import React, { useEffect, useState } from 'react'

// compornents
import { DocumentCard } from './components'
import { Typography, Button, Card } from '@components'
import { FileUpload } from 'hoc'

// query
import {
    useGetCourseDocumentsQuery,
    useUploadDocumentsMutation,
} from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { LinearProgress } from '@components/LinearProgress'

export const VerifyStudentDocs = ({
    id,
    setActive,
    setIndustrySelection,
    selectedCourses,
}: {
    id: any
    setActive: Function
    setIndustrySelection: Function
    selectedCourses: number[] | null
}) => {
    const [courseDocuments, setCourseDocuments] = useState<any[] | null>([])

    const courses = useGetCourseDocumentsQuery(
        { id, courses: selectedCourses },
        { skip: !id || !selectedCourses }
    )
    const [uploadDocs, uploadDocsResult] = useUploadDocumentsMutation()

    useEffect(() => {
        courses.refetch()
    }, [id, selectedCourses])

    // useEffect(() => {
    //     if (uploadDocsResult.isSuccess) {
    //         setActive((active: number) => active + 1)
    //     }
    // }, [uploadDocsResult.isSuccess])

    return (
        <Card>
            <Typography variant={'muted'} color={'gray'}>
                <span className="text-secondary-text font-bold">
                    ‘Claro Aged Care & Disability Services’
                </span>
                wants these document from you. We will help you to deliver these
                documents to them.
            </Typography>

            <LinearProgress percent={5} />

            <div className="my-4 flex flex-col gap-y-2">
                {courses.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    courses?.data?.map((course: any, i: number) => (
                        <FileUpload
                            key={i}
                            onChange={(docs: any) => {
                                const formData = new FormData()
                                docs.forEach((doc: any) => {
                                    formData.append(course?.folder?.name, doc)
                                })
                                uploadDocs({ id: course.id, body: formData })
                            }}
                            name={course?.folder?.name}
                            component={DocumentCard}
                            limit={course?.folder?.capacity}
                            acceptTypes={['pdf']}
                            multiple={course?.folder?.capacity > 1}
                        />
                    ))
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
    )
}
