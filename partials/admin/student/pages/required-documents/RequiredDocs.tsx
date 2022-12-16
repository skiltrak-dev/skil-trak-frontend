import { useRouter } from 'next/router'
import { Card, NoData } from '@components'
import { Typography } from '@components'
import React, { useEffect, useState } from 'react'
import { CourseFolders } from './CourseFolders'

export const RequiredDocs = ({ courses, assessmentEvidence }: any) => {
    const router = useRouter()
    const { id } = router.query

    const [industryChecks, setIndustryChecks] = useState<any[] | null>([])
    const [assessmentFolders, setAssessmentFolders] = useState<any | null>(null)
    const [assessmentEvidenceFolders, setAssessmentEvidenceFolders] = useState<
        any | null
    >([])

    useEffect(() => {
        if (courses && courses.length > 0) {
            courses?.map((c: any) => {
                return setIndustryChecks((preVal: any) => {
                    return [
                        ...preVal,
                        {
                            ...c,
                            folders: c.folders
                                .map((f: any) =>
                                    f.documents.map((d: any) => d.response)
                                )
                                .flat(Infinity),
                        },
                    ]
                })
            })
        }
    }, [courses])

    useEffect(() => {
        if (assessmentEvidence) {
            setAssessmentFolders(
                assessmentEvidence
                    ?.filter((a: any) => a?.assessmentFolder)
                    ?.map((a: any) => a?.assessmentFolder)
            )
        }
    }, [assessmentEvidence])

    useEffect(() => {
        if (assessmentFolders) {
            let newFolders: any = []
            assessmentFolders?.map(({ course, ...folder }: any) => {
                const findIndex = newFolders.findIndex(
                    (data: any) => data.title === course?.title
                )
                if (newFolders.some((data: any) => data.title)) {
                    newFolders[findIndex] = {
                        ...newFolders[findIndex],
                        folders: [...newFolders[findIndex]?.folders, folder],
                    }
                } else {
                    newFolders = [
                        ...newFolders,
                        {
                            ...course,
                            folders: [folder],
                        },
                    ]
                }
            })

            setAssessmentEvidenceFolders(newFolders)
        }
    }, [assessmentFolders, setAssessmentEvidenceFolders])

    return (
        <div className="">
            <Card>
                <div className="grid grid-cols-2">
                    <div className="border-r border-secondary-dark pr-4 flex flex-col gap-y-4">
                        <Typography variant={'subtitle'}>
                            Industry Checks
                        </Typography>
                        {industryChecks
                            ?.filter(
                                (v, i, a) =>
                                    industryChecks.findIndex(
                                        (v2) => v2.id === v.id
                                    ) === i
                            )
                            ?.map((course: any) => (
                                <CourseFolders
                                    key={course.id}
                                    course={course}
                                    docType={'industryChecks'}
                                />
                            ))}
                    </div>
                    <div className="pl-4 flex flex-col gap-y-4">
                        <Typography variant={'subtitle'}>
                            Assessment Evidence
                        </Typography>
                        {assessmentEvidenceFolders &&
                        assessmentEvidenceFolders?.length > 0 ? (
                            assessmentEvidenceFolders?.map(
                                (assessmentEvidenceFolder: any) => (
                                    <CourseFolders
                                        key={assessmentEvidenceFolder.id}
                                        course={assessmentEvidenceFolder}
                                        docType={'assessmentEvidence'}
                                    />
                                )
                            )
                        ) : (
                            <NoData
                                text={'No Assessment Evidence were found'}
                            />
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}
