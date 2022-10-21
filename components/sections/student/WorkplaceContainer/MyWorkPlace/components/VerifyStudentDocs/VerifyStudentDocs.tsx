import React, { useState } from 'react'

// compornents
import { DocumentCard } from './components'
import { Typography, Button, Card } from '@components'
import { FileUpload } from 'hoc'

export const VerifyStudentDocs = ({
    setActive,
    setIndustrySelection,
}: {
    setActive: Function
    setIndustrySelection: Function
}) => {
    const [courseDocuments, setCourseDocuments] = useState<any | null>([])
    return (
        <Card>
            <Typography variant={'muted'} color={'gray'}>
                <span className="text-secondary-text font-bold">
                    ‘Claro Aged Care & Disability Services’
                </span>
                wants these document from you. We will help you to deliver these
                documents to them.
            </Typography>

            <div className="my-4 flex flex-col gap-y-2">
                {[...Array(5)].map((_, i) => (
                    <FileUpload
                        key={i}
                        onChange={(docs: object) => {
                            setCourseDocuments([...courseDocuments, docs])
                        }}
                        name={`industryDocx${i}`}
                        component={DocumentCard}
                    />
                    // <DocumentCard key={i} />
                ))}
            </div>

            <div className="flex items-center gap-x-2">
                <Button
                    text={'Upload'}
                    onClick={() => {
                        console.log('courseDocuments', courseDocuments)
                        setActive((active: number) => active + 1)
                    }}
                />
                <Button
                    variant={'secondary'}
                    text={'Change Industry'}
                    onClick={() => {
                        setIndustrySelection(true)
                    }}
                />
            </div>
        </Card>
    )
}
