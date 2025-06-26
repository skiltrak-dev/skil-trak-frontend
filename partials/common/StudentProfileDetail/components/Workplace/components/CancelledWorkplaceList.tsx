import { Typography } from '@components'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'

export const CancelledWorkplaceList = () => {
    const router = useRouter()

    const cancelledWpList =
        SubAdminApi.Student.getAllStudentCancelledWorkplaces(
            Number(router?.query?.id),
            {
                skip: !router?.query?.id,
            }
        )

    return (
        <>
            {cancelledWpList?.data && cancelledWpList?.data?.length > 0 ? (
                <div className="max-h-44">
                    <Typography variant="small" semibold>
                        Cancelled Workplaces
                    </Typography>

                    <div className="bg-green-100 rounded p-2 grid grid-cols-4 gap-x-3"></div>
                </div>
            ) : (
                ''
            )}
        </>
    )
}
