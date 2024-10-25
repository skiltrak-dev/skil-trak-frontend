import { InitialAvatar } from '@components'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { FaHandshake, FaHireAHelper } from 'react-icons/fa'
import { MdPhoneIphone } from 'react-icons/md'

export const IndustryCellInfo = ({ industry }: { industry: Industry }) => {
    const router = useRouter()

    return (
        <div className="flex items-center gap-x-2 relative z-10">
            <div className="shadow-inner-image rounded-full relative">
                {industry?.user?.name && (
                    <InitialAvatar
                        name={industry?.user?.name}
                        imageUrl={industry?.user?.avatar}
                    />
                )}
                {industry?.isPartner ? (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full text-white">
                        <FaHandshake size={14} />
                    </div>
                ) : null}
            </div>
            <div>
                <div className="flex items-center gap-x-1">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center gap-x-1">
                            <p className="font-semibold">
                                {industry?.user?.name}
                            </p>
                            {industry?.isHiring ? <FaHireAHelper /> : ''}
                        </div>
                    </div>
                </div>
                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdPhoneIphone />
                        </span>
                        {industry?.phoneNumber}
                    </p>
                </div>
            </div>
        </div>
    )
}
