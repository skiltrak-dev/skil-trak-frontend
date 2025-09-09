import { InitialAvatar, Typography } from '@components'
import { Industry } from '@types'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const IndustryDetail = ({ industry }: { industry: Industry }) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full relative">
                {industry?.user?.name && (
                    <InitialAvatar
                        name={industry?.user?.name}
                        imageUrl={industry?.user?.avatar}
                    />
                )}
                {/* {industry?.isPartner ? (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full text-white">
                        <FaHandshake size={14} />
                    </div>
                ) : null} */}
            </div>
            <div>
                <Typography color={'black'} variant={'small'}>
                    {industry?.user?.name}{' '}
                    <span className="uppercase">({industry?.user?.role})</span>
                </Typography>

                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdEmail />
                        </span>
                        {industry?.user?.email}
                    </p>
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
