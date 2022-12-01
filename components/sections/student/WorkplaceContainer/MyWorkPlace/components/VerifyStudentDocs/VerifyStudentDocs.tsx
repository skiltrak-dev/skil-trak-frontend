import React, { useEffect, useState } from 'react'

// compornents
import { DocumentCard, UploadDocs } from './components'
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
  const [progressPercent, setProgressPercent] = useState<any | null>(null)

  const requiredDocs = useGetCourseDocumentsQuery(
    { id, courses: selectedCourses },
    { skip: !id || !selectedCourses }
  )

  // useEffect(() => {
  //   requiredDocs.refetch()
  // }, [id, selectedCourses])

  // useEffect(() => {
  //     if (uploadDocsResult.isSuccess) {
  //         setActive((active: number) => active + 1)
  //     }
  // }, [uploadDocsResult.isSuccess])

  const getUploadedDocPercent = () => {
    const totalDocs = requiredDocs?.data?.reduce(
      (acum: any, curr: any) => acum + curr?.folder?.capacity,
      0
    )
    const uploadedDocs = requiredDocs?.data?.reduce(
      (acum: any, curr: any) => acum + curr?.ResponseCount,
      0
    )
    return (uploadedDocs * 100) / totalDocs
  }

  useEffect(() => {
    setProgressPercent(getUploadedDocPercent())
  }, [requiredDocs])

  // console.log('totalll', totalll)

  return (
    <Card>
      <Typography variant={'muted'} color={'gray'}>
        <span className="text-secondary-text font-bold">
          ‘Claro Aged Care & Disability Services’
        </span>
        wants these document from you. We will help you to deliver these
        documents to them.
      </Typography>

      <LinearProgress percent={progressPercent} />

      <div className="my-4 flex flex-col gap-y-2">
        {requiredDocs.isLoading ? (
          <LoadingAnimation />
        ) : (
          requiredDocs?.data?.map((requiredDoc: any, i: number) => (
            <UploadDocs key={requiredDoc.id} requiredDoc={requiredDoc} />
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
