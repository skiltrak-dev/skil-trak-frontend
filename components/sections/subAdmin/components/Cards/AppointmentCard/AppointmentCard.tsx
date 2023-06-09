import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import { RecentActivityLinks } from '../../RecentActivityLinks'
import { CommonApi } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { NoData, TechnicalError } from '@components/ActionAnimations'
type Props = {}

export const AppointmentCard = (props: Props) => {
    const { data, isError, isLoading } =
        CommonApi.RecentActivities.useRecentActivities({})

    const bgColor = [
        'bg-blue-100',
        'bg-orange-100',
        'bg-green-100',
        'bg-red-100',
    ]
    const textColor = [
        'text-blue-500',
        'text-orange-500',
        'text-green-500',
        'text-red-500',
    ]

    return (
        <div>
            <Card>
                <div className="flex justify-between items-center pb-3">
                    <Typography variant={'muted'} color={'text-gray-500'}>
                        Recent Activity
                    </Typography>
                    {/* <Typography variant={'muted'} color={'text-blue-400'}>
                        View All
                    </Typography> */}
                </div>
                <div className="flex gap-x-2">
                    <div className="flex flex-col">
                        {/* {isError && <TechnicalError />} */}
                        {isLoading ? (
                            <LoadingAnimation />
                        ) : data?.length > 0 ? (
                            data?.slice(0, 4).map((item: any, index: any) => (
                                <div key={item?.id} className="flex gap-x-2">
                                    <div className="flex items-center flex-col">
                                        <div className="bg-neutral-300 p-1.5 rounded-full"></div>
                                        <div
                                            className={`${
                                                index === 3 && 'hidden'
                                            } bg-neutral-300 min-h-[20px] h-full w-[1px]`}
                                        ></div>
                                    </div>

                                    <RecentActivityLinks
                                        title={item?.title}
                                        color={textColor[index]}
                                        bgColor={bgColor[index]}
                                    />
                                    <div className="flex flex-col">
                                        <div className={`pb-1`}>
                                            <Typography
                                                key={index}
                                                variant={'muted'}
                                                color={'text-gray-500'}
                                            >
                                                {item.description}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <NoData text={'No Recent Activities were found'} />
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}
