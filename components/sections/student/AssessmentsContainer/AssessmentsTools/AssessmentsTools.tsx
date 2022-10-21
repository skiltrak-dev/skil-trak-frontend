import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import Link from 'next/link'
import { AssessmentCourses } from './AssessmentCourses'
import { DowloadableFiles } from './DownloadableFiles'

type Props = {}

export const AssessmentsTools = (props: Props) => {
    return (
        <>
            <div className="mb-2">
                <Typography variant="muted" color="text-gray-400">
                    *You can access all your assessment tools by clicking on
                    download button for your placement unit you are currently
                    enrolled in.
                </Typography>
            </div>
            <Card noPadding>
                <div className="flex">
                    <div className="w-[25%] border-r">
                        <div className="border-b p-3.5">
                            <Typography variant="label" color="text-black">
                                Select Course
                            </Typography>
                        </div>

                        <AssessmentCourses />
                    </div>
                    <div className="w-[75%]">
                        <div className="border-b p-4">
                            <div className="flex justify-between">
                                <Typography variant="label" color="text-black">
                                    Description
                                </Typography>
                                <Typography variant="label" color="text-black">
                                    Action
                                </Typography>
                            </div>
                        </div>
                        <div className="p-2">
                            <DowloadableFiles />
                        </div>
                    </div>
                </div>
            </Card>
            <div className="mt-6">
                <Typography variant="label" color="text-black">
                    What you want to do here?
                </Typography>
            </div>
            <div>
                <Typography variant="label" color="text-blue-500">
                    <Link href="#">
                        I want to access my assessment tool for enrolled course
                    </Link>
                </Typography>
            </div>
        </>
    )
}
