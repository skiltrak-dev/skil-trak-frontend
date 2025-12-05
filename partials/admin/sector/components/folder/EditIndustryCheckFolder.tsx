import React from 'react'
import { CourseIndustryCheckForm } from '../../form'

export const EditIndustryCheckFolder = ({
    industryCheck,
    onCancel,
}: {
    industryCheck: any
    onCancel: () => void
}) => {
    const onSubmit = async (values: any) => {}

    return (
        <div>
            <CourseIndustryCheckForm
                onSubmit={onSubmit}
                onCancel={onCancel}
                initialValues={industryCheck}
                edit
            />
        </div>
    )
}
