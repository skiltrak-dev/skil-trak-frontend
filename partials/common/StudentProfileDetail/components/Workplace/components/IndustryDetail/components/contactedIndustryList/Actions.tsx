import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { PuffLoader } from 'react-spinners'
import { StatusBadge } from './StatusBadge'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components'

export const Actions = ({ industry }: any) => {
    const { notification } = useNotification()
    const [interested, interestedResult] =
        CommonApi.FindWorkplace.useFutureIndustryInterest()

    const onClickInterested = async (industry: any) => {
        const response: any = await interested({
            id: industry?.id,
            body: {
                status: true,
            },
        })
        if (response?.data) {
            notification.success({
                title: 'Interested',
                description: 'Status interested updated successfully',
            })
            // studentDetails.refetch()
        }
    }

    const onClickNotInterested = async (industry: any) => {
        const response: any = await interested({
            id: industry?.id,
            body: {
                status: false,
            },
        })
        if (response?.data) {
            notification.success({
                title: 'Not Interested',
                description: 'Status not interested updated successfully',
            })
            // contactedIndustries.refetch()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={interestedResult} />
            <div className="flex items-center gap-2">
                {industry?.intrested === null ? (
                    <>
                        <button
                            onClick={() => onClickNotInterested(industry)}
                            disabled={interestedResult.isLoading}
                            className="group relative inline-flex items-center justify-center w-8 h-8 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Mark as Not Interested"
                        >
                            {interestedResult.isLoading ? (
                                <PuffLoader size={12} color="#ef4444" />
                            ) : (
                                <IoClose className="w-4 h-4 text-red-600" />
                            )}
                        </button>
                        <button
                            onClick={() => onClickInterested(industry)}
                            disabled={interestedResult.isLoading}
                            className="group relative inline-flex items-center justify-center w-8 h-8 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Mark as Interested"
                        >
                            {interestedResult.isLoading ? (
                                <PuffLoader size={12} color="#22c55e" />
                            ) : (
                                <FaCheck className="w-4 h-4 text-green-600" />
                            )}
                        </button>
                    </>
                ) : (
                    <StatusBadge status={industry?.intrested} />
                )}
            </div>
        </>
    )
}
