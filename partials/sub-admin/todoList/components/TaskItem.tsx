import { useState } from 'react'
import { Task } from '../types'
import { useNotification } from '@hooks'
import { Checkbox } from '@components'
import classNames from 'classnames'

interface TaskItemProps {
    task: Task
    onTaskClick: (task: Task) => void
    onTaskComplete: (taskId: string, completed: boolean) => void
    isSelected: boolean
}

export default function TaskItem({
    task,
    onTaskClick,
    onTaskComplete,
    isSelected,
}: TaskItemProps) {
    const [isChecking, setIsChecking] = useState(false)
    const { notification } = useNotification()

    const handleCheckChange = async (checked: boolean) => {
        setIsChecking(true)
        try {
            await onTaskComplete(task.id, checked)
            if (checked) {
                notification.success({
                    title: 'Task completed',
                    description: `${task.title} marked as completed`,
                })
            }
        } catch (error) {
            notification.error({
                title: 'Error',
                description: 'Failed to update task status',
            })
        } finally {
            setIsChecking(false)
        }
    }

    return (
        <div
            className={classNames(
                `task-category-${task.frequency} p-3 rounded-md mb-2 transition-colors cursor-pointer`,
                isSelected ? 'bg-secondary' : 'hover:bg-secondary/50',
                task.completed ? 'opacity-70' : ''
            )}
            onClick={() => onTaskClick(task)}
        >
            <div className="flex items-start gap-3">
                <div
                    className="mt-1"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <Checkbox
                        value={task.completed}
                        name="task-completed"
                        disabled={isChecking}
                        onChange={handleCheckChange}
                        className={classNames(
                            'border-2',
                            isChecking && 'opacity-50',
                            task.completed && 'opacity-100'
                        )}
                    />
                </div>
                <div className="flex-1">
                    <p
                        className={classNames(
                            'font-medium text-sm',
                            task.completed &&
                                'line-through text-muted-foreground'
                        )}
                    >
                        {task.title}
                    </p>
                    {task.clientName && (
                        <span className="text-xs text-muted-foreground block mt-1">
                            Client: {task.clientName}
                        </span>
                    )}
                    {task.status && (
                        <span className="text-xs text-muted-foreground block">
                            Status: {task.status}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
