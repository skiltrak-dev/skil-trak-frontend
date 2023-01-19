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
                    imageUrl={'/images/documents/workflow.webp'}
                    title={'Work Flow'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/requirements.webp'}
                    title={'Course Requirement'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/induction.webp'}
                    title={'Induction Process'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/placement.webp'}
                    title={'Placement Info'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/legal.webp'}
                    title={'Legal'}
                    detail={sidebar}
                />
            </div>
        </div>
    )
}
