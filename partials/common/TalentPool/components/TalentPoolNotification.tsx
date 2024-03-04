import { Typography } from '@components'
import { IoClose } from 'react-icons/io5'

type TalentPoolNotificationProps = {
    text: string
    setViewNotification: () => void
}
export const TalentPoolNotification = ({
    text,
    setViewNotification,
}: TalentPoolNotificationProps) => {
    return (
        <div className="absolute top-20 flex justify-center w-full z-50">
            <div className="flex items-center bg-[#24556D] rounded-md justify-between gap-x-16 min-w-[512px] mb-5">
                <div className="p-2.5  ">
                    <Typography variant={'small'} color={'text-white'}>
                        {text}
                    </Typography>
                </div>
                <div
                    onClick={setViewNotification}
                    className="bg-[#FEEDE8]/20 cursor-pointer rounded-r-md p-2.5"
                >
                    <IoClose className="text-white" size={20} />
                </div>
            </div>
        </div>
    )
}
