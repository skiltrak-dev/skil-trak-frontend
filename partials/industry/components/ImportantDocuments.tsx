import { ImportantDocument } from '@components'
import classNames from 'classnames'

export const ImportantDocuments = ({ sidebar }: { sidebar?: boolean }) => {
    const titleClasses = classNames({
        'mb-2': true,
        'text-xs font-medium text-gray-600': sidebar,
        'text-sm font-semibold': !sidebar,
    })

    const containerClasses = classNames({
        'grid grid-cols-2 gap-4 md:flex md:gap-x-4': !sidebar,
        'flex flex-col gap-y-2': sidebar,
    })
    return (
        <div>
            <p className={titleClasses}>Important Documents</p>
            <div className={containerClasses}>
                <ImportantDocument
                    imageUrl={
                        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                    }
                    title={'Work Flow'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={
                        'https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXJzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
                    }
                    title={'Course Requirement'}
                    href={'rto/course-requirements'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={
                        'https://images.unsplash.com/photo-1624686713594-21157487be91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGluZHVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
                    }
                    title={'Induction Process'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={
                        'https://images.unsplash.com/photo-1548882097-ee1e4da9bc9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                    }
                    title={'Placement Info'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={
                        'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVnYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60s'
                    }
                    title={'Legal'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={
                        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlY2tsaXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
                    }
                    title={'Checklists'}
                    detail={sidebar}
                />
            </div>
        </div>
    )
}
