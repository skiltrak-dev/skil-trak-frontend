import { Modal } from '@components/Modal'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { Select } from '@components/inputs'
import { useNotification } from '@hooks'
import { BranchOrHeadofficeType } from '@partials/common'
import { CommonApi, SubAdminApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const AddBranchesModal = ({
    onCancel,
    type,
    industries,
}: {
    onCancel: () => void
    type: BranchOrHeadofficeType
    industries: Industry[]
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

    const branches = industries?.map((industry) => industry?.id)

    const industryOptions = getIndustries?.data
        ?.filter(
            (industry: Industry) => industry?.id !== Number(router?.query?.id)
        )
        ?.filter(
            (industry: Industry) => !branches.includes(industry?.id as any)
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
                    loading={getIndustries?.isLoading}
                    disabled={getIndustries?.isLoading}
                    onlyValue
                />
            </Modal>
        </div>
    )
}
