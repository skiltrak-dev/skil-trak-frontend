import { Industry } from '@types'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { Typography } from '@components'
import Image from 'next/image'
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'

export const IndustryCellInfo = ({ industry }: { industry: Industry }) => {
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <Image
                    className="rounded-full w-7 h-7"
                    src={
                        'https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' ||
                        ' '
                    }
                    alt={''}
                    width={50}
                    height={50}
                />
                <Link
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
