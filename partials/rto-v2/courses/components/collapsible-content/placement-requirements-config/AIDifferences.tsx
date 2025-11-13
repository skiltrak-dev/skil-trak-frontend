'use client'

import { NoData, ShowErrorNotifications, TextArea } from '@components'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { useNotification } from '@hooks'
import { RtoV2Api } from '@queries'
import { AlertTriangle, ChevronDown, Edit, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'

export const AIDifferences = ({ course }: any) => {
    const [open, setOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [newDiff, setNewDiff] = useState('')
    const [key, setKey] = useState(0)
    const { notification } = useNotification()

    const [addDiff, addDiffResult] = RtoV2Api.Courses.useAddAICourseDifference()
    const [removeDiff, removeDiffResult] =
        RtoV2Api.Courses.useRemoveAICourseDifference()

    useEffect(() => {
        if (addDiffResult.isSuccess) {
            notification.success({
                title: 'Success',
                description: 'Difference added successfully',
            })
            setNewDiff('')
            setKey(key + 1)
        }
    }, [addDiffResult.isSuccess])
    useEffect(() => {
        if (removeDiffResult.isSuccess) {
            notification.error({
                title: 'Removed',
                description: 'Difference removed successfully',
            })
        }
    }, [removeDiffResult.isSuccess])
    // Extract differences array (flattened)
    const differences =
        course?.rtoCourseFiles
            ?.flatMap((f: any) => f?.rtoLogbookSummary ?? [])
            ?.flatMap((s: any) => s?.differences ?? []) || []

    const logbookSummaryId =
        course?.rtoCourseFiles?.find(
            (f: any, index: number) => f.title === 'logBook'
        )?.rtoLogbookSummary?.[0]?.id || null

    const onHandleAdd = () => {
        if (logbookSummaryId && newDiff.trim()) {
            addDiff({ body: { differences: [newDiff] }, id: logbookSummaryId })
        }
    }
    const onHandleRemove = (index: number) => {
        if (logbookSummaryId) {
            removeDiff({ params: { index }, id: logbookSummaryId })
        }
    }

    return (
        <>
            <ShowErrorNotifications
                result={addDiffResult || removeDiffResult}
            />
            <div>
                <Collapsible open={open} onOpenChange={setOpen}>
                    <div className="rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 overflow-hidden">
                        {/* HEADER */}
                        <CollapsibleTrigger className="w-full p-4 flex items-center gap-2 hover:bg-orange-100/30 dark:hover:bg-orange-900/20 transition-colors">
                            <AlertTriangle className="h-4 w-4 text-orange-600 shrink-0" />

                            <h4 className="font-semibold text-sm flex-1 text-left">
                                AI-Identified Differences between TGA Admin &
                                RTO Placement
                            </h4>

                            <Badge
                                variant="outline"
                                className="bg-orange-100 text-orange-700 border-orange-300"
                            >
                                {differences.length} Differences
                            </Badge>

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsEditing((prev) => !prev)
                                }}
                                className="h-7 gap-1.5"
                            >
                                <Edit className="h-3 w-3" />
                                {isEditing ? 'Done' : 'Edit'}
                            </Button>

                            <ChevronDown
                                className={`h-4 w-4 transition-transform shrink-0 ${
                                    open ? '' : '-rotate-90'
                                }`}
                            />
                        </CollapsibleTrigger>

                        {/* CONTENT */}
                        <CollapsibleContent>
                            <div className="px-4 pb-4">
                                {differences.length === 0 && !isEditing ? (
                                    <NoData text="No AI-identified differences found." />
                                ) : (
                                    <ul className="space-y-2">
                                        {differences.map(
                                            (diff: string, index: number) => (
                                                <li
                                                    key={index}
                                                    className="text-xs text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="text-orange-600 shrink-0">
                                                        •
                                                    </span>
                                                    <span className="flex-1">
                                                        {diff}
                                                    </span>

                                                    {isEditing && (
                                                        <button
                                                            onClick={() =>
                                                                onHandleRemove(
                                                                    index
                                                                )
                                                            }
                                                            className="hover:bg-orange-200/50 rounded-full p-0.5 shrink-0"
                                                            disabled={
                                                                removeDiffResult.isLoading
                                                            }
                                                        >
                                                            {removeDiffResult.isLoading ? (
                                                                <PuffLoader
                                                                    size={24}
                                                                />
                                                            ) : (
                                                                <X className="h-3 w-3 text-orange-600" />
                                                            )}
                                                        </button>
                                                    )}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>

                            {isEditing && (
                                <div className="mt-3 flex items-start gap-2">
                                    <TextArea
                                        key={key}
                                        name="newDiff"
                                        value={newDiff}
                                        onChange={(e: any) =>
                                            setNewDiff(e.target.value)
                                        }
                                        placeholder="Add new difference..."
                                        className="min-h-[60px] text-xs"
                                    />

                                    <Button
                                        size="sm"
                                        className="bg-orange-600 hover:bg-orange-700 text-white shrink-0"
                                        onClick={onHandleAdd}
                                        disabled={addDiffResult.isLoading}
                                    >
                                        {addDiffResult.isLoading ? (
                                            <PuffLoader size={24} />
                                        ) : (
                                            <>
                                                <Plus className="h-3 w-3 mr-1" />
                                                Add
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            </div>
        </>
    )
}
