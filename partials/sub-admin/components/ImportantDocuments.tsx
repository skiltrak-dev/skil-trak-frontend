import { ImportantDocument } from '@components'

export const ImportantDocuments = () => {
    return (
        <div>
            <p className="text-sm font-semibold mb-2">Important Documents</p>
            <div className="flex gap-x-4">
                <ImportantDocument
                    imageUrl={'/images/documents/workflow.webp'}
                    title={'Work Flow'}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/requirements.webp'}
                    title={'Course Requirement'}
                    href={'rto/course-requirements'}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/induction.webp'}
                    title={'Induction Process'}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/placement.webp'}
                    title={'Placement Info'}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/legal.webp'}
                    title={'Legal'}
                />
            </div>
        </div>
    )
}
