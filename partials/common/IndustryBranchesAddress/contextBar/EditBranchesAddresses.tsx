import React from 'react'
import { AddBranchesAddress } from '../forms'
import { CommonApi } from '@queries'
import { Industry, IndustryBranchesAddressType } from '@types'
import { ShowErrorNotifications } from '@components'
import { useContextBar, useNotification } from '@hooks'

export const EditBranchesAddresses = ({
    branch,
    industryId,
}: {
    industryId: number
    branch?: IndustryBranchesAddressType
}) => {
    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [updateBranchesAddress, updateBranchesAddressResult] =
        CommonApi.Industries.useUpdateIndustryBranch()
    const onSubmit = (values: any) => {
        updateBranchesAddress({
            ...values,
            industry: industryId,
        })?.then((res: any) => {
            if (res?.data) {
                notification.info({
                    title: 'Address Updated',
                    description: 'Address Updated Successfully',
                })
                contextBar.hide()
                contextBar.setContent(null)
                contextBar.setTitle('')
            }
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={updateBranchesAddressResult} />
            <AddBranchesAddress
                onSubmit={onSubmit}
                edit
                branch={branch}
                result={updateBranchesAddressResult}
            />
        </div>
    )
}
