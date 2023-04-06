import React from 'react'
import { EmailDraftForm } from './components'

type Props = {}

export const DraftEmail = (props: Props) => {
    return (
        <div className='p-4'>
            <EmailDraftForm />
        </div>
    )
}
