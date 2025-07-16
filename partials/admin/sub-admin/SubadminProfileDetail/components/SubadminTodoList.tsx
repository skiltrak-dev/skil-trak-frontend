import React from 'react'
import { TodoTabs } from '@partials/common/todoList'
import { Card, Typography } from '@components'

export const SubadminTodoList = () => {
    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="h-full overflow-hidden">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Todo List</span>
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div className='max-h-[500px] overflow-auto'>
                <TodoTabs />
            </div>
        </Card>
    )

}
