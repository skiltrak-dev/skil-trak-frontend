import { Button, NoData, ShowErrorNotifications, TextArea } from '@components'
import { Badge } from '@components/ui/badge'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { useNotification } from '@hooks'
import { RtoV2Api } from '@queries'
import { CheckCircle2, ChevronDown, Edit, Plus, Target, X } from 'lucide-react'
import { useState } from 'react'

export const AIHighlightedTasks = ({ course }: any) => {
    const [highlightedTasksOpen, setHighlightedTasksOpen] = useState<{
        [courseId: string]: boolean
    }>({})
    const [editingHighlightedTasks, setEditingHighlightedTasks] = useState<
        string | null
    >(null)
    const [newTask, setNewTask] = useState<string>('')
    const [key, setKey] = useState(0)
    const { notification } = useNotification()
    const [addDiff, addDiffResult] =
        RtoV2Api.Courses.useAddCourseHighlightedTask()
    const [removeDiff, removeDiffResult] =
        RtoV2Api.Courses.useRemoveCourseHighlightedTask()

    const logbookSummaryId =
        course?.rtoCourseFiles?.find((f: any) => f.title === 'logBook')
            ?.rtoLogbookSummary?.[0]?.id || null

    const handleAdd = async () => {
        if (!newTask.trim()) return
        const res: any = await addDiff({
            id: logbookSummaryId,
            body: { tasks: [newTask] },
        })
        if (res?.data) {
            notification.success({
                title: 'Success',
                description: 'Task added successfully',
            })
            setNewTask('')
            setKey(key + 1)
        }
    }

    const handleRemove = async (index: number) => {
        const res: any = await removeDiff({
            id: logbookSummaryId,
            params: { index },
        })
        if (res?.data) {
            notification.error({
                title: 'Removed',
                description: 'Task remove successfully',
            })
        }
    }
    const highlightedTasks =
        course?.rtoCourseFiles?.flatMap((file: any) =>
            file?.rtoLogbookSummary?.flatMap(
                (summary: any) => summary?.highLightedTasks ?? []
            )
        ) || []

    return (
        <>
            <ShowErrorNotifications result={addDiffResult} />
            <ShowErrorNotifications result={removeDiffResult} />

            <Collapsible
                open={highlightedTasksOpen[course.id] ?? false}
                onOpenChange={(open) =>
                    setHighlightedTasksOpen({
                        ...highlightedTasksOpen,
                        [course.id]: open,
                    })
                }
            >
                <div className="rounded-xl bg-accent/5 border border-accent/20 overflow-hidden">
                    <CollapsibleTrigger className="w-full p-4 flex items-center gap-2 hover:bg-accent/10 transition-colors">
                        <Target className="h-4 w-4 text-accent shrink-0" />
                        <h4 className="font-semibold text-sm flex-1 text-left">
                            AI-Extracted Highlighted Tasks
                        </h4>
                        <Badge
                            variant="outline"
                            className="bg-accent/10 text-accent border-accent/30"
                        >
                            {highlightedTasks.length} key tasks
                        </Badge>
                        <Button
                            variant="primaryNew"
                            outline
                            onClick={(e) => {
                                e.stopPropagation()
                                setEditingHighlightedTasks(
                                    editingHighlightedTasks === course.id
                                        ? null
                                        : course.id
                                )
                            }}
                            className="!py-1 rounded-sm"
                        >
                            <Edit className="h-3 w-3" />
                            {editingHighlightedTasks === course.id
                                ? 'Done'
                                : 'Edit'}
                        </Button>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform shrink-0 ${
                                highlightedTasksOpen[course.id] ?? false
                                    ? ''
                                    : '-rotate-90'
                            }`}
                        />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="px-4 pb-4">
                            {highlightedTasks.length === 0 ? (
                                <NoData text="No highlighted tasks found" />
                            ) : (
                                <ul className="space-y-2">
                                    {highlightedTasks.map(
                                        (task: any, index: number) => (
                                            <li
                                                key={index}
                                                className="text-xs text-muted-foreground flex items-start gap-2"
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                                                <span className="flex-1">
                                                    {task}
                                                </span>

                                                {editingHighlightedTasks ===
                                                    course.id && (
                                                    <button
                                                        onClick={() =>
                                                            handleRemove(index)
                                                        }
                                                        className="hover:bg-accent/20 rounded-full p-0.5 shrink-0"
                                                    >
                                                        <X className="h-3 w-3 text-accent" />
                                                    </button>
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}

                            {editingHighlightedTasks === course.id && (
                                <div className="mt-3 flex items-start gap-2">
                                    <TextArea
                                        name="newTask"
                                        key={key}
                                        value={newTask}
                                        onChange={(e: any) =>
                                            setNewTask(e.target.value)
                                        }
                                        placeholder="Add new highlighted task..."
                                        className="min-h-[60px] text-xs"
                                        // onKeyDown={(e) => {
                                        //     if (e.key === 'Enter' && e.ctrlKey)
                                        //         handleAdd()
                                        // }}
                                    />
                                    <Button
                                        variant="primaryNew"
                                        onClick={handleAdd}
                                        loading={addDiffResult?.isLoading}
                                        disabled={
                                            addDiffResult?.isLoading ||
                                            removeDiffResult?.isLoading
                                        }
                                        className="!py-1 rounded-sm"
                                    >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CollapsibleContent>
                </div>
            </Collapsible>
        </>
    )
}
