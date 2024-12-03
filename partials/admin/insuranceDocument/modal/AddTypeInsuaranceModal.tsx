import React from 'react'
import { AdminApi } from '@queries'
import { MdCancel } from 'react-icons/md'
import { AddInsuaranceTypeForm } from '../forms'
import { GlobalModal, Typography } from '@components'
import { useNotification } from '@hooks'

export const AddTypeInsuaranceModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const [addInsurance, addInsuranceResult] =
        AdminApi.Insurance.addInsuranceType()

    const { notification } = useNotification()

    const onSubmit = async (values: any) => {
        const res: any = await addInsurance(values)

        if (res?.data) {
            notification.success({
                title: 'Type Added!',
                description: 'Type Added Successfully',
            })
            onCancel()
        }
    }
    return (
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
                            Add Insurance Type
                        </Typography>
                    </div>
                </div>
                <div>
                    <AddInsuaranceTypeForm
                        onSubmit={onSubmit}
                        result={addInsuranceResult}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
