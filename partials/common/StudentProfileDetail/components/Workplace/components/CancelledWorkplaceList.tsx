import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { Typography } from '@components'
import { CancelledWPCard } from '../Cards'
import { ReactElement, useState } from 'react'
import { AllCancelleWorkplaceModal } from '../modals'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const CancelledWorkplaceList = ({
    rejectedWorkplaces,
}: {
    rejectedWorkplaces: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const onCancel = () => setModal(null)

    const onShowALlListClicked = () => {
        setModal(
            <AllCancelleWorkplaceModal
                onCancel={onCancel}
                rejectedWorkplaces={rejectedWorkplaces}
            />
        )
    }

    return (
        <>
            {modal}
            {rejectedWorkplaces?.data &&
            rejectedWorkplaces?.data?.length > 0 ? (
                <div className="max-h-44">
                    <Typography variant="small" semibold>
                        Cancelled Workplaces
                    </Typography>

                    <div
                        className={`divide-y divide-gray-100 ${
                            role === UserRoles.ADMIN
                                ? 'grid grid-cols-2 gap-2'
                                : 'flex flex-col gap-y-2'
                        } `}
                    >
                        {rejectedWorkplaces?.data
                            ?.slice(0, 2)
                            ?.map((item: any) => (
                                <CancelledWPCard
                                    key={item?.id}
                                    workplace={item}
                                />
                            ))}
                    </div>

                    {rejectedWorkplaces?.data?.length > 2 ? (
                        <p
                            onClick={onShowALlListClicked}
                            className="bg-info px-1 py-0.5 rounded text-white text-xs w-fit ml-auto mt-1 cursor-pointer"
                        >
                            View All
                        </p>
                    ) : null}
                </div>
            ) : (
                ''
            )}
        </>
    )
}
