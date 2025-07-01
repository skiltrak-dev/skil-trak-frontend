import { ReactElement } from 'react'
import { NextPageWithLayout } from '@types'

// layouts
import { SubAdminLayout } from '@layouts'
import { TodoTabs } from '@partials/common/todoList'
// import { TodoTabs } from '@partials/common'

const TodoListDetails: NextPageWithLayout = () => {
    return (
        <div className="flex flex-col gap-y-2">
            <TodoTabs />
        </div>
    )
}

TodoListDetails.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'Todo List Details',
                navigateBack: true,
                backTitle: 'Back',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default TodoListDetails
