import React from 'react'
import { AddBranchesAddress } from '../forms'
import { CommonApi } from '@queries'
import { Industry, IndustryBranchesAddressType } from '@types'
import { ShowErrorNotifications } from '@components'
import { useContextBar, useNotification } from '@hooks'

export const AddBranchesAddresses = ({
    industryId,
}: {
    industryId: number
}) => {
    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [addBranchesAddress, addBranchesAddressResult] =
        CommonApi.Industries.addBranchesAddress()
    const onSubmit = (values: any) => {
        addBranchesAddress({
            ...values,
            industry: industryId,
        })?.then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Address Added',
                    description: 'Address Added Successfully',
                })
                contextBar.hide()
                contextBar.setContent(null)
                contextBar.setTitle('')
            }
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={addBranchesAddressResult} />
            <AddBranchesAddress
                onSubmit={onSubmit}
                result={addBranchesAddressResult}
            />
        </div>
    )
}
