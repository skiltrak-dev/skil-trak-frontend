import React from 'react'
import { Button, TabNavigation, TabProps } from '@components'
import { ActiveRtoMessages } from './ActiveRtoMessages'
import { ArchiveRtoMessages } from './ArchiveRtoMessages'
import { useRouter } from 'next/router'
import { AdminApi } from '@queries'

export const MessageCenter = () => {
    const router = useRouter()

    const count = AdminApi.RtoMessageCenter.count(undefined, {
        refetchOnMountOrArgChange: true,
    })

    const tabs: TabProps[] = [
        {
            label: 'Active',
            href: {
                pathname: 'message-center',
                query: { tab: 'active' },
            },
            badge: {
                text: count?.data?.active,
                loading: count?.isLoading,
            },
            element: <ActiveRtoMessages />,
        },
        {
            label: 'Archive',
            href: {
                pathname: 'message-center',
                query: { tab: 'archive' },
            },
            badge: {
                text: count?.data?.archived,
                loading: count?.isLoading,
            },
            element: <ArchiveRtoMessages />,
        },
    ]
    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => (
                    <div>
                        <div className="flex items-center gap-x-2 justify-between">
                            <div className="w-full">{header}</div>
                            <Button
                                text="Send MEssage"
                                variant="primaryNew"
                                className="flex-shrink-0"
                                onClick={() =>
                                    router.push(
                                        '/portals/admin/rto/message-center/create'
                                    )
                                }
                            />
                        </div>
                        <div className="p-4">{element}</div>
                    </div>
                )}
            </TabNavigation>
        </div>
    )
}
