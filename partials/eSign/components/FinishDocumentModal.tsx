import { Button, Typography } from '@components'
import { MediaQueries } from '@constants'
import React from 'react'
import { MdCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'

export const FinishDocumentModal = ({
    onCancelFinishSign,
    remainingFields,
    customFieldsData,
    onFinishSignModal,
    onGoToSignFieldIfRemaining,
    asModal,
}: {
    asModal?: boolean
    customFieldsData: any
    remainingFields: any
    onFinishSignModal: () => void
    onCancelFinishSign: () => void
    onGoToSignFieldIfRemaining: any
}) => {
    const isMobile = useMediaQuery(MediaQueries.Tablet)

    return (
        <div
            id={'finishSign'}
            className="w-full absolute h-full bg-[#00000050]"
        >
            <div
                className={`flex flex-col gap-y-2 bg-white w-full lg:w-[500px] p-5 rounded-md ${
                    !asModal
                        ? 'bottom-6 lg:bottom-16 absolute left-1/2 -translate-x-1/2'
                        : ''
                }`}
            >
                <MdCancel
                    onClick={onCancelFinishSign}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                {remainingFields?.length > 0 ? (
                    <Typography center variant={isMobile ? 'small' : 'label'}>
                        <span className="text-[13px]">
                            It appears you did not fill in all the required
                            fields. Please ensure all fields are completed
                            before finalizing your e-signature.
                        </span>
                    </Typography>
                ) : (
                    <>
                        <Typography center variant="label">
                            <span className="text-[13px]">
                                Thank you for completing all the required
                                fields. To finalize your e-signature, please
                                click the button below
                            </span>
                        </Typography>
                        <Typography center variant="label">
                            <span className="text-[13px]">
                                <span className="font-semibold">
                                    Important Note:
                                </span>{' '}
                                Once you click "Finish," your e-signature will
                                be legally binding, and you will not be able to
                                make further changes to the document.
                            </span>
                        </Typography>
                    </>
                )}

                <div className="flex items-center gap-x-3">
                    <div className="w-full h-11">
                        <Button
                            variant={
                                customFieldsData && customFieldsData?.length > 0
                                    ? 'primary'
                                    : 'secondary'
                            }
                            disabled={remainingFields?.length > 0}
                            fullHeight
                            fullWidth
                            onClick={() => {
                                if (
                                    customFieldsData &&
                                    customFieldsData?.length > 0
                                ) {
                                    onFinishSignModal()
                                }
                            }}
                            text={'Finish Signing'}
                        />
                    </div>
                    {remainingFields?.length > 0 ? (
                        <div className="w-full h-11">
                            <Button
                                onClick={() => {
                                    const r0 = remainingFields?.[0]
                                    onGoToSignFieldIfRemaining(r0)
                                }}
                                fullHeight
                                fullWidth
                                outline
                                text={'Fill Required Fields'}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
