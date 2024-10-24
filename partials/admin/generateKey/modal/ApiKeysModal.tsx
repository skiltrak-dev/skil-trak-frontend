import { GlobalModal, Typography } from '@components'
import { useNotification } from '@hooks'
import { LiaTimesSolid } from 'react-icons/lia'
import { MdOutlineContentCopy } from 'react-icons/md'

export const ApiKeysModal = ({
    onCancel,
    keyData,
}: {
    keyData: { clientId: string; clientSecret: string }
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    return (
        <GlobalModal>
            <div className="rounded-lg overflow-hidden max-w-2xl min-w-[600px]">
                <div className="grid grid-cols-3 py-3 px-4 border-b border-[#E6E6E6]">
                    <div className="col-start-2">
                        <Typography center semibold>
                            API Keys
                        </Typography>
                    </div>
                    <LiaTimesSolid
                        size={20}
                        onClick={onCancel}
                        className="ml-auto transition-all duration-500 text-gray-700 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                {/*  */}
                <div className="px-4 py-2.5 flex flex-col gap-y-2.5">
                    <div>
                        <Typography variant="label">
                            {' '}
                            <span className="font-extralight">
                                Client ID
                            </span>{' '}
                        </Typography>
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#6B72800D]">
                            <Typography variant="label">
                                {keyData?.clientId}
                            </Typography>
                            <MdOutlineContentCopy
                                className="cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        keyData?.clientId
                                    )
                                    notification.success({
                                        title: 'Copied',
                                        description: '',
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <Typography variant="label">
                            {' '}
                            <span className="font-extralight">
                                Client Secret
                            </span>{' '}
                        </Typography>
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#6B72800D]">
                            <Typography variant="label">
                                {keyData?.clientSecret}
                            </Typography>
                            <MdOutlineContentCopy
                                className="cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        keyData?.clientSecret
                                    )
                                    notification.success({
                                        title: 'Copied',
                                        description: '',
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
