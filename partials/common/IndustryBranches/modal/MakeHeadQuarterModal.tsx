import { Modal } from '@components/Modal'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { Select } from '@components/inputs'
import { useNotification } from '@hooks'
import { CommonApi, SubAdminApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BranchOrHeadofficeType } from '../BranchesIndustries'

export const MakeHeadQuarterModal = ({
    onCancel,
    type,
}: {
    onCancel: () => void
    type: BranchOrHeadofficeType
}) => {
    const router = useRouter()
    const [selectedIndustry, setSelectedIndustry] = useState<number | null>(
        null
    )

    const { notification } = useNotification()

    const getIndustries = CommonApi.Filter.useIndustries()
    const [makeHeadquarter, makeHeadquarterResult] =
        SubAdminApi.Industry.useMakeIndustryHeadquarter()

    useEffect(() => {
        if (makeHeadquarterResult.isSuccess) {
            notification.success({
                title: 'HeadQuarter Added',
                description: 'HeadQuarter Added Successfully',
            })
            onCancel()
        }
    }, [makeHeadquarterResult])

    const industryOptions = getIndustries?.data
        ?.filter(
            (industry: Industry) => industry?.id !== Number(router?.query?.id)
        )
        ?.map((industry: Industry) => ({
            value: industry?.id,
            label: industry?.user?.name,
        }))
    return (
        <div>
            <ShowErrorNotifications result={makeHeadquarterResult} />
            <Modal
                title={
                    type === BranchOrHeadofficeType.Branch
                        ? 'Add Branches'
                        : 'Make Head Office'
                }
                subtitle={
                    type === BranchOrHeadofficeType.Branch
                        ? 'Add Branches'
                        : 'Make Head Office'
                }
                onConfirmClick={() => {
                    makeHeadquarter({
                        branch:
                            type === BranchOrHeadofficeType.Branch
                                ? (selectedIndustry as number)
                                : Number(router?.query?.id),
                        headQuarter:
                            type === BranchOrHeadofficeType.HeadOffice
                                ? (selectedIndustry as number)
                                : Number(router?.query?.id),
                    })
                }}
                onCancelClick={onCancel}
                confirmText={
                    type === BranchOrHeadofficeType.Branch
                        ? 'Add Branches'
                        : 'Add Head Office'
                }
                disabled={!selectedIndustry || makeHeadquarterResult.isLoading}
                loading={makeHeadquarterResult.isLoading}
            >
                <Select
                    name={'makeHeadquarter'}
                    options={industryOptions}
                    onChange={(e: number) => setSelectedIndustry(e)}
                    onlyValue
                />
            </Modal>
        </div>
    )
}
