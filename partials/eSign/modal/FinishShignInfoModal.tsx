import { ActionModal, Button } from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import React, { ReactElement, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoWarningOutline } from 'react-icons/io5'
import { FinishSignModal } from './FinishSignModal'
import { useNotification } from '@hooks'
import { FinishEmailSignModal } from './FinishEmailSignModal'

export const FinishShignInfoModal = ({
    onCancel,
    emailSign,
    customFieldsData,
    decodeData,
}: {
    emailSign?: boolean
    onCancel: () => void
    customFieldsData: any
    decodeData?: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const onCancelClicked = () => {
        setModal(null)
        onCancel()
    }
    const onConfirmClicked = () => {
        const customValues = customFieldsData?.filter(
            (data: any) => data?.isCustom && !data?.fieldValue && data?.required
        )

        if (
            customFieldsData
                ?.filter((s: any) => s?.type === FieldsTypeEnum.Signature)
                ?.filter((s: any) => !s?.responses?.length)?.length > 0
        ) {
            notification.warning({
                title: 'Sign',
                description: 'Please sign before finish signing',
            })
        } else if (customValues && customValues?.length > 0) {
            notification.warning({
                title: 'Please fill all required fields',
                description: 'Please fill all required fields',
            })
        } else {
            if (emailSign) {
                setModal(
                    <FinishEmailSignModal
                        onCancel={onCancelClicked}
                        decodeDataId={decodeData?.id}
                        customFieldsData={customFieldsData}
                    />
                )
            } else {
                setModal(
                    <FinishSignModal
                        onCancel={onCancelClicked}
                        customFieldsData={customFieldsData}
                    />
                )
            }
        }
    }
    return (
        <div>
            {modal}
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center z-[1111111] fixed top-0 left-0 px-2 xl:px-0">
                <div className="bg-white modal-animation rounded-2xl flex flex-col items-center gap-y-6 shadow-xl w-full sm:w-auto sm:min-w-[450px] px-16 py-4">
                    <div className={`text-success`}>
                        <FaCircleCheck size={48} />
                    </div>

                    <div className="flex flex-col items-center gap-y-2">
                        <p className="text-lg font-semibold">Sign Completed!</p>
                        <p
                            className="text-gray-500 max-w-[400px] text-center"
                            dangerouslySetInnerHTML={{
                                __html: `Please fill in your data in the fields provided. If you have already filled in the data or if there are no fields to fill, proceed to finish the e-signature process by clicking the button below. <br/> You may also complete the e-signature form at the end of the document.`,
                            }}
                        ></p>
                    </div>

                    <div className="flex gap-x-4 items-center">
                        <Button
                            text="Cancel"
                            variant="secondary"
                            onClick={() => {
                                onCancel && onCancel()
                            }}
                        />
                        <Button
                            text={'Finish Sign'}
                            variant={'primary'}
                            // disabled={(input && !keyMatched) || loading}
                            onClick={() => {
                                onConfirmClicked && onConfirmClicked()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
