import Image from 'next/image'
import { MdCancel, MdOutlineError } from 'react-icons/md'
import { GlobalModal, Typography } from '@components'

export const TradingHoursNotFoundModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-xl px-5 py-6 relative flex flex-col gap-y-2">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="lg:px-20">
                    <div className="flex flex-col gap-y-3.5 justify-between items-center">
                        <MdOutlineError className="text-error" size={65} />
                        <div className="mx-auto ">
                            <Typography variant="h4" center semibold>
                                Trading Hours Not Found
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                Trading hours not found for industry, Please add
                                before applying
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
