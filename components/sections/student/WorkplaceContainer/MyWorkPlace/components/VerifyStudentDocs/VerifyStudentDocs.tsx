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

export const VerifyStudentDocs = ({
    id,
    setActive,
    setIndustrySelection,
    selectedCourses,
}: {
    id: any
    setActive: Function
    setIndustrySelection: Function
    selectedCourses: number[]
}) => {
    const [courseDocuments, setCourseDocuments] = useState<any | null>([])

    const courses = useGetCourseDocumentsQuery({ id, courses: selectedCourses })
    const [uploadDocs, uploadDocsResult] = useUploadDocumentsMutation()

    useEffect(() => {
        courses.refetch()
    }, [id, selectedCourses])

    useEffect(() => {
        if (uploadDocsResult.isSuccess) {
            setActive((active: number) => active + 1)
        }
    }, [uploadDocsResult.isSuccess])

    return (
        <Card>
            <Typography variant={'muted'} color={'gray'}>
                <span className="text-secondary-text font-bold">
                    ‘Claro Aged Care & Disability Services’
                </span>
                wants these document from you. We will help you to deliver these
                documents to them.
            </Typography>

            <div className="my-4 flex flex-col gap-y-2">
                {courses.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    courses?.data?.map((course: any, i: number) => (
                        <FileUpload
                            key={i}
                            onChange={(docs: any) => {
                                const removeDuplicate = courseDocuments.filter(
                                    (c) => c.id !== course.id
                                )
                                setCourseDocuments([
                                    ...removeDuplicate,
                                    {
                                        id: course?.id,
                                        [course?.folder?.name]: docs,
                                    },
                                ])
                                // setCourseDocuments([...courseDocuments, docs])
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

            <div className="flex items-center gap-x-2">
                <Button
                    text={'Upload'}
                    onClick={async () => {
                        const formData = new FormData()
                        const flattedData = courseDocuments.flat()
                        let ids: any[] = []

                        courseDocuments.forEach((c: any) => {
                            for (let key in c) {
                                Array.isArray(c[key])
                                    ? c[key].forEach((course: any) => {
                                          formData.append(key, course)
                                      })
                                    : (ids = [...ids, c[key]])
                            }
                        })

                        await uploadDocs({ id: ids, body: formData })
                    }}
                    loading={uploadDocsResult.isLoading}
                    disabled={uploadDocsResult.isLoading}
                />
                <Button
                    variant={'secondary'}
                    text={'Change Industry'}
                    onClick={() => {
                        setIndustrySelection(null)
                    }}
                />
            </div>
        </Card>
    )
}
