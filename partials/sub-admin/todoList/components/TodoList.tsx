import React from 'react'
import { TasksGroup } from './TasksGroup'
import { dummyTaskData } from '../mockTasks'
import { TodoListTable } from './TodoListTable'

export const TodoList = () => {
    return (
        <div className="flex flex-col gap-y-2">
            {dummyTaskData.map((group) => (
                <TasksGroup
                    key={group.label}
                    label={group.label}
                    count={group.categories.length}
                >
                    <div className="flex flex-col gap-y-2">
                        {group.categories.map((category) => (
                            <TasksGroup
                                key={category.label}
                                label={category.label}
                                count={category.tasks.length}
                            >
                                <div className="">
                                    {/* {category.tasks.map((task) => {
                                        return ( */}
                                    <div className="mb-1">
                                        <TodoListTable
                                            students={category?.tasks}
                                        />
                                    </div>
                                    {/* )
                                    })} */}
                                </div>
                            </TasksGroup>
                        ))}
                    </div>
                </TasksGroup>
            ))}
        </div>
    )
}
