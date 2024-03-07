import React from 'react'
import { UpskillForm } from '../form'

export const ContactUpSkill = () => {
    const onSubmit = (values: any) => {
        console.log({ values })
    }
    return (
        <div className="rounded-[10px] shadow-site px-6 py-5 bg-white">
            <UpskillForm onSubmit={onSubmit} />
        </div>
    )
}
