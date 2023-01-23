import { InitialAvatar, Typography } from '@components'
import { Industry } from '@types'
import Link from 'next/link'
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'

export const IndustryCellInfo = ({ industry }: { industry: Industry }) => {
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <InitialAvatar
                    name={industry?.user?.name}
                    imageUrl={industry?.user?.avatar}
                />
                <Link
                    legacyBehavior
                    href={`/portals/sub-admin/users/industries/${industry?.id}?tab=overview`}
                >
                    <a>
                        <Typography color={'black'}>
                            {' '}
                            {industry?.user?.name}{' '}
                        </Typography>
                        <div className="flex items-center gap-x-2">
                            <FaPhoneSquareAlt className="text-gray" />
                            <Typography variant={'muted'}>
                                {industry?.phoneNumber}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <FaEnvelope />
                            <Typography variant={'muted'} color={'gray'}>
                                {industry?.user?.email}
                            </Typography>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
