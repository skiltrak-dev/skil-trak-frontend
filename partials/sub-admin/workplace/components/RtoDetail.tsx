import { InitialAvatar, Typography } from '@components'
import Link from 'next/link'

export const RtoDetail = ({ rto }: { rto: any }) => {
    return (
        <Link
            href={`/portals/sub-admin/users/rtos/${rto?.id}?tab=overview`}
            className="flex items-center relative"
        >
            <div className="flex items-center gap-x-2">
                {rto?.user?.name && (
                    <InitialAvatar
                        name={rto?.user?.name}
                        imageUrl={rto?.user?.avatar}
                    />
                )}
                <div>
                    <Typography color={'black'} variant={'small'}>
                        {rto?.user?.name}
                    </Typography>
                    <div className="flex flex-col gap-y-1">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            {rto?.user?.email}
                        </Typography>
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            {rto?.phone}
                        </Typography>
                    </div>
                </div>
            </div>
        </Link>
    )
}
