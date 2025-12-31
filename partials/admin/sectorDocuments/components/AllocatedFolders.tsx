import { AdminApi } from '@queries'
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { Badge, Card, Typography } from '@components'
import { Calendar, History } from 'lucide-react'
import moment from 'moment'

export const AllocatedFolders = () => {
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(true)

    const listAllFoldersForCourses =
        AdminApi.IndustryChecks.listAllFoldersForCourses()

    return (
        <div>
            {' '}
            {listAllFoldersForCourses?.data &&
                listAllFoldersForCourses?.data?.length > 0 && (
                    <Card noPadding className="shadow-sm border-gray-200">
                        <Collapsible
                            className=""
                            open={isHistoryExpanded}
                            onOpenChange={setIsHistoryExpanded}
                        >
                            <div className="px-6 py-4 border-b border-gray-200">
                                <CollapsibleTrigger asChild>
                                    <div className="w-full flex items-center justify-between p-0 hover:bg-transparent">
                                        <div className="flex items-center gap-3">
                                            <History className="w-5 h-5 text-gray-700" />
                                            <div className="text-left">
                                                <h3 className="text-gray-900 font-medium">
                                                    Allocation History
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-0.5">
                                                    {
                                                        listAllFoldersForCourses
                                                            ?.data?.length
                                                    }{' '}
                                                    allocation
                                                    {listAllFoldersForCourses
                                                        ?.data?.length !== 1
                                                        ? 's'
                                                        : ''}{' '}
                                                    saved
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">
                                                {isHistoryExpanded
                                                    ? 'Hide'
                                                    : 'Show'}
                                            </span>
                                        </div>
                                    </div>
                                </CollapsibleTrigger>
                            </div>

                            <CollapsibleContent className="!p-0">
                                <div className="!p-6">
                                    {listAllFoldersForCourses?.data?.length ===
                                    0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <History className="w-12 h-12 text-gray-300 mb-2" />
                                            <p className="text-gray-600">
                                                No allocations saved yet
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                Your saved allocations will
                                                appear here
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {listAllFoldersForCourses?.data?.map(
                                                (sectors) => (
                                                    <div
                                                        key={sectors?.id}
                                                        className="space-y-4"
                                                    >
                                                        <Typography variant="label">
                                                            {sectors?.name}
                                                        </Typography>

                                                        {sectors?.courses?.map(
                                                            (
                                                                course,
                                                                index: number
                                                            ) => (
                                                                <Card
                                                                    key={
                                                                        course?.id
                                                                    }
                                                                    className="p-2.5 !bg-gray-100 border !border-gray-200"
                                                                >
                                                                    <Typography
                                                                        variant="label"
                                                                        semibold
                                                                    >
                                                                        {' '}
                                                                        {
                                                                            course?.title
                                                                        }
                                                                    </Typography>

                                                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                                                        <div>
                                                                            <div className="text-gray-600">
                                                                                Total
                                                                            </div>
                                                                            <div className="font-medium text-gray-900">
                                                                                {
                                                                                    course
                                                                                        ?.assessmentEvidence
                                                                                        ?.length
                                                                                }
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <div className="text-gray-600">
                                                                                Mandatory
                                                                            </div>
                                                                            <div className="font-medium text-gray-900">
                                                                                {
                                                                                    course?.assessmentEvidence?.filter(
                                                                                        (
                                                                                            folder
                                                                                        ) =>
                                                                                            folder?.isMandatory
                                                                                    )
                                                                                        ?.length
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <details className="mt-2">
                                                                        <summary className="cursor-pointer text-xs text-blue-600 hover:text-blue-700 select-none">
                                                                            Details
                                                                        </summary>
                                                                        <div className="mt-2 space-y-1 pl-2 border-l border-gray-200">
                                                                            {course?.assessmentEvidence?.map(
                                                                                (
                                                                                    folder
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            folder?.id
                                                                                        }
                                                                                        className="flex items-center justify-between text-xs bg-white p-1.5 rounded border border-gray-200"
                                                                                    >
                                                                                        <div className="flex items-center gap-1.5">
                                                                                            {folder?.isMandatory ? (
                                                                                                <Badge
                                                                                                    text="Mandatory"
                                                                                                    variant="primaryNew"
                                                                                                ></Badge>
                                                                                            ) : (
                                                                                                <Badge
                                                                                                    text="Industry"
                                                                                                    variant="secondary"
                                                                                                ></Badge>
                                                                                            )}
                                                                                            <span className="text-gray-900">
                                                                                                {
                                                                                                    folder?.name
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-1.5">
                                                                                            <Calendar className="w-3 h-3 text-gray-600" />
                                                                                            {moment(
                                                                                                folder?.createdAt
                                                                                            ).format(
                                                                                                'DD MMM YYYY'
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </details>
                                                                </Card>
                                                            )
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>
                )}
        </div>
    )
}
