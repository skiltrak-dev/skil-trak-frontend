import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserRoles } from '@constants'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useContextBar, useNotification } from '@hooks'
import {
    AuthApi,
    useAddCustomIndustryMutation,
    useShowExistingIndustriesQuery,
    useAddExistingIndustriesMutation,
} from '@queries'
import { isEmailValid, onlyAlphabets, SignUpUtils } from '@utils'

import {
    Button,
    Checkbox,
    Select,
    TextInput,
    Typography,
    ShowErrorNotifications,
} from '@components'

// form
import { AddCustomIndustryForm } from '../form'

export const AddIndustryCB = ({
    studentId,
    workplaceId,
    courseId,
}: {
    studentId?: any
    workplaceId: any
    courseId: any
}) => {
    const [isAddCustomIndustry, setIsAddCustomIndustry] = useState(false)
    const [customIndustriesOptions, setCustomIndustriesOptions] = useState<
        any | null
    >([])
    const [selectedCustomIndustry, setSelectedCustomIndustry] = useState(false)
    const { notification } = useNotification()
    const { setTitle, hide, setContent } = useContextBar()

    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()
    const getExistingIndustries = useShowExistingIndustriesQuery()

    useEffect(() => {
        if (addExistingIndustryResult.isSuccess) {
            notification.success({
                title: 'Industry Added Successfully',
                description: 'Industry Added Successfully',
            })
            setContent(null)
            hide()
        }
    }, [addExistingIndustryResult])

    useEffect(() => {
        if (getExistingIndustries?.isSuccess) {
            const options = getExistingIndustries?.data?.map((i: any) => ({
                label: i?.user?.name,
                value: i?.id,
            }))
            setCustomIndustriesOptions(options)
        }
    }, [getExistingIndustries])

    useEffect(() => {
        setTitle('Add Custom Industry')
    }, [])

    return (
        <>
            <ShowErrorNotifications result={addExistingIndustryResult} />
            <div
                onClick={() => {
                    setIsAddCustomIndustry(!isAddCustomIndustry)
                }}
                className="cursor-pointer flex justify-end font-bold"
            >
                <Typography color={'text-link'} variant={'small'}>
                    {isAddCustomIndustry
                        ? 'Select From Existing'
                        : '+ Add Custom Industry'}
                </Typography>
            </div>
            {!isAddCustomIndustry ? (
                <div className="flex flex-col gap-y-2">
                    <Select
                        label={'Industries'}
                        name={'industries'}
                        options={customIndustriesOptions}
                        placeholder={'Select Industries...'}
                        loading={getExistingIndustries.isLoading}
                        disabled={getExistingIndustries.isLoading}
                        onChange={(e: any) => {
                            setSelectedCustomIndustry(e?.value)
                        }}
                        validationIcons
                    />
                    <Button
                        text={'Select'}
                        onClick={() => {
                            addExistingIndustry({
                                workplaceId,
                                industryId: selectedCustomIndustry,
                            })
                        }}
                        loading={addExistingIndustryResult?.isLoading}
                        disabled={addExistingIndustryResult?.isLoading}
                    />
                </div>
            ) : (
                <AddCustomIndustryForm workplaceId={workplaceId} />
            )}
        </>
    )
}
