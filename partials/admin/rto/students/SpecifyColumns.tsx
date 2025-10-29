import { Button, Card, TextInput } from '@components'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
    initialValues: any
    onColumnsChange: (columns: any) => void
}

export const SpecifyColumns = ({ initialValues, onColumnsChange }: Props) => {
    const onSubmit = (data: any) => {
        onColumnsChange(data)
    }
    const formMethods = useForm({
        defaultValues: initialValues,
        mode: 'all',
    })

    return (
        <Card>
            <div className="">
                <div className="flex items-center justify-between">
                    <div className="w-3/5">
                        <p className="text-xs text-gray-500">
                            Please ensure that your file adheres to the
                            following format. As an example, please refer to the
                            sample file provided.
                        </p>
                        <a
                            className="text-xs font-medium text-orange-500"
                            href="https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/downloadable/Sample+Import+Student+List.xlsx"
                            download
                            referrerPolicy="no-referrer"
                        >
                            Download Format
                        </a>
                    </div>
                    <img
                        src="/images/content/import-example.png"
                        className="w-2/5"
                        alt=""
                    />
                </div>
            </div>
            
        </Card>
    )
}
