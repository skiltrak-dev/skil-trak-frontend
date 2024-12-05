import React from 'react'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { MdCancel } from 'react-icons/md'
import { AddInsuaranceTypeForm } from '../forms'
import { GlobalModal, ShowErrorNotifications, Typography } from '@components'

export const EditTypeInsuaranceModal = ({
    id,
    data,
    onCancel,
}: {
    id: number
    data: string
    onCancel: () => void
}) => {
    const [updateInsurance, updateInsuranceResult] =
        AdminApi.Insurance.editInsuranceType()

    const { notification } = useNotification()

    const onSubmit = async (values: any) => {
        const res: any = await updateInsurance({ id, ...values })

        if (res?.data) {
            notification.success({
                title: 'Type Updated!',
                description: 'Type Updated Successfully',
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={updateInsuranceResult} />
            <GlobalModal>
                <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-5">
                    {onCancel ? (
                        <MdCancel
                            onClick={() => {
                                if (onCancel) {
                                    onCancel()
                                }
                            }}
                            className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                        />
                    ) : null}
                    <div className="flex flex-col gap-y-2 justify-between items-center">
                        <div className="mx-auto">
                            <Typography center semibold>
                                Edit Insurance Type
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <AddInsuaranceTypeForm
                            data={data}
                            onSubmit={onSubmit}
                            result={updateInsuranceResult}
                        />
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
