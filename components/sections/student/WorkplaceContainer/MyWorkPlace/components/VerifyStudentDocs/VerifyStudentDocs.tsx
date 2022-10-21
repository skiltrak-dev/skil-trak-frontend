import React from 'react'

// compornents
import { DocumentCard } from './components'
import { Typography, Button, Card } from 'components'

export const VerifyStudentDocs = ({ setActive, setIndustrySelection }) => {
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
                    <DocumentCard key={i} />
                ))}
            </div>

            <div className="flex items-center gap-x-2">
                <Button
                    text={'submit'}
                    onClick={() => {
                        setActive((active) => active + 1)
                    }}
                />
                <Button
                    variant={'secondary'}
                    text={'Cancel'}
                    onClick={() => {
                        setIndustrySelection(true)
                    }}
                />
            </div>
        </Card>
    )
}
