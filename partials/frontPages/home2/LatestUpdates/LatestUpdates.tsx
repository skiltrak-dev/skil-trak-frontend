import React from 'react'
import Image from 'next/image'
import { AdminApi } from '@queries'
import { SubscribeForm } from './forms'
import { useNotification } from '@hooks'
import { MediaQueries } from '@constants'
import { useMediaQuery } from 'react-responsive'
import { ShowErrorNotifications, Typography } from '@components'

export const LatestUpdates = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const { notification } = useNotification()

    const [subscribe, subscribeResult] = AdminApi.Subscribers.useSubscribe()

    const onSubmit = (values: any) => {
        subscribe({ ...values, name: values?.email?.split('@')?.[0] })?.then(
            (res: any) => {
                if (res?.data) {
                    notification.info({
                        title: 'User subscribed',
                        description: `User "${subscribeResult?.data?.email}" has been subscribed`,
                    })
                }
            }
        )
    }

    return (
        <div className="py-8 md:py-12" data-aos="zoom-in">
            <ShowErrorNotifications result={subscribeResult} />
            <div className="relative max-w-6xl mx-auto bg-gradient-to-t from-[#0C1535] to-[#2C3E7F] rounded-[10px] px-8 py-9 md:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-y-6">
                    <div className="flex flex-col gap-y-4 md:gap-y-6">
                        <Typography
                            color={'text-white'}
                            semibold
                            {...(isMobile
                                ? {
                                      center: true,
                                  }
                                : {})}
                        >
                            <span className="text-[19px] md:text-[26px] text-center md:text-left md:leading-10">
                                Get the latest updates right in your inbox!
                            </span>
                        </Typography>
                        <Typography
                            color="text-white"
                            variant="label"
                            normal
                            {...(isMobile
                                ? {
                                      center: true,
                                  }
                                : {})}
                        >
                            Subscribe to get the latest updates on job openings
                            in your industry
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="px-0 md:px-10">
                        <SubscribeForm
                            onSubmit={onSubmit}
                            result={subscribeResult}
                        />
                    </div>

                    {/*  */}
                    <div className={'absolute top-4 right-4'}>
                        <Image
                            src={'/images/site/subscribeBall.png'}
                            alt={''}
                            width={0}
                            height={0}
                            sizes={'100vw 100vh'}
                            className="w-28 h-28 animate-float"
                        />
                    </div>
                    <div className={'absolute top-2/3 left-1/3'}>
                        <Image
                            src={'/images/site/subscribeBall.png'}
                            alt={''}
                            width={0}
                            height={0}
                            sizes={'100vw 100vh'}
                            className="w-28 h-28 animate-float"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
