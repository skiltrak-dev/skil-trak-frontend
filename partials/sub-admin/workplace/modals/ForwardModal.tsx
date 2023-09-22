import {
    Button,
    InitialAvatar,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useContextBar, useNotification } from '@hooks'
import { useForwardWorkplaceToIndustryMutation } from '@queries'
import { useEffect, useState } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'
import { IoIosWarning } from 'react-icons/io'

export const ForwardModal = ({
    industry,
    onCancel,
    workplaceId,
    folders,
}: {
    industry: any
    onCancel: Function
    workplaceId: number
    folders: any
}) => {
    const [isDocsUploaded, setIsDocsUploaded] = useState<boolean | null>(null)
    const [missingDocuments, setMissingDocuments] = useState<any | null>(null)

    const contextBar = useContextBar()

    // hooks
    const { notification } = useNotification()

    // query
    const [forwardToIndustry, forwardToIndustryResult] =
        useForwardWorkplaceToIndustryMutation()

    useEffect(() => {
        if (folders && folders?.length) {
            setIsDocsUploaded(folders?.every((f: any) => f.uploaded))
            setMissingDocuments(
                folders
                    ?.filter((f: any) => !f.uploaded)
                    ?.map((f: any) => f?.folder?.name)
            )
        }
    }, [folders])

    const onConfirmUClicked = async () => {
        forwardToIndustry({
            industryId: industry?.id,
            id: workplaceId,
        })
    }

    useEffect(() => {
        if (forwardToIndustryResult.isSuccess) {
            notification.success({
                title: 'Request Forwarded',
                description: 'Request Forwarded to industry Successfully',
            })
            onCancel()
            contextBar.setContent(null)
            contextBar.setTitle(null)
            contextBar.hide()
        }
    }, [forwardToIndustryResult])

    return (
        <>
            <ShowErrorNotifications result={forwardToIndustryResult} />
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white modal-animation rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] px-16 py-4">
                    <div
                        className={`${
                            !missingDocuments?.length
                                ? 'text-green-500'
                                : 'text-orange-500'
                        }`}
                    >
                        {!missingDocuments?.length ? (
                            <HiCheckBadge size={48} />
                        ) : (
                            <IoIosWarning size={48} />
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-y-2">
                        <p className="text-lg font-semibold text-orange-500">
                            {isDocsUploaded
                                ? 'Documents Uploaded'
                                : 'Documents Missing!'}
                        </p>
                        <p className="text-gray-500 max-w-[400px] text-center">
                            You are about to forward request{' '}
                            {!isDocsUploaded ? 'with missing documents' : ''} to
                            following industry.
                        </p>
                    </div>

                    <div className="w-full py-1 px-2 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            {industry?.industry?.user?.name && (
                                <InitialAvatar
                                    name={industry?.industry?.user?.name}
                                    imageUrl={industry?.industry?.user?.avatar}
                                />
                            )}
                            <div>
                                <div className="flex items-center gap-x-0.5">
                                    <Typography variant={'label'}>
                                        <span className="font-bold">
                                            {industry?.industry?.user?.name}
                                        </span>
                                    </Typography>
                                </div>
                                <Typography
                                    variant={'label'}
                                    color={'text-gra-500'}
                                >
                                    {industry?.industry?.addressLine1},{' '}
                                    {industry?.industry?.addressLine2}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {missingDocuments && missingDocuments?.length > 0 && (
                        <div className="flex flex-col gap-y-1">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                                left
                            >
                                Missing Documents
                            </Typography>
                            <div className="flex flex-wrap items-center justify-center gap-x-2">
                                {missingDocuments?.map(
                                    (text: string, i: number) => (
                                        <span className="rounded-full bg-gray-200 text-error font-medium px-2 py-0.5 text-center text-xs">
                                            {text}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-x-4 items-center">
                        <Button
                            text="Cancel"
                            variant="secondary"
                            onClick={() => {
                                onCancel && onCancel()
                            }}
                        />
                        <Button
                            text={
                                isDocsUploaded
                                    ? 'FORWARD REQUEST TO INDUSTRY'
                                    : 'FORWARD WITHOUT DOCUMENTS'
                            }
                            variant={'primary'}
                            onClick={() => {
                                onConfirmUClicked()
                            }}
                            loading={forwardToIndustryResult?.isLoading}
                            disabled={forwardToIndustryResult?.isLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
