import React from 'react'
import { ShowErrorNotifications, Typography } from '@components'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { ContactForm } from './components'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'
import Image from 'next/image'

const ContactUs = () => {
    const { notification } = useNotification()
    const [sendUsQuery, sendUsQueryResult] = CommonApi.Messages.useContactUs()
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const onSubmit = (data: any) => {
        sendUsQuery(data).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Message Sent',
                    description: 'Your message has been sent successfully',
                })
            }
        })
    }
    return (
        <div className="py-0 md:py-10 bg-">
            <ShowErrorNotifications result={sendUsQueryResult} />
            {/* */}

            <div className="relative">
                <div className="hidden md:block w-full md:w-3/5 absolute top-[10%] -z-10  h-[80%]">
                    <div className="bg-gradient-to-t from-[#0C1535] to-[#2C3E7F] h-full flex justify-center items-center"></div>
                </div>
                <div className={'absolute top-20 left-1/3'}>
                    <Image
                        src={'/images/site/subscribeBall.png'}
                        alt={''}
                        width={0}
                        height={0}
                        sizes={'100vw 100vh'}
                        className="w-28 h-28 animate-float"
                        priority
                    />
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col justify-center items bg-gradient-to-t from-[#0C1535] md:from-transparent to-[#2C3E7F] md:to-transparent pt-16 md:pt-0 pb-32 md:pb-0 px-10">
                            <div className="flex flex-col gap-y-3">
                                <div>
                                    <Typography
                                        variant="h1"
                                        color="text-white"
                                        {...(isMobile
                                            ? {
                                                  center: true,
                                              }
                                            : {})}
                                    >
                                        <span className="text-[33px] md:text-[43px]">
                                            Let's talk with Us
                                        </span>
                                    </Typography>
                                </div>
                                <div className="w-full flex mx-auto md:mx-0 justify-center sm:max-w-[400px]">
                                    <Typography
                                        variant={
                                            isMobile ? 'label' : 'subtitle'
                                        }
                                        {...(isMobile
                                            ? {
                                                  center: true,
                                              }
                                            : {})}
                                        color={'text-white'}
                                        normal
                                    >
                                        Have Something in mind that you think
                                        we’d be a great fit for it? We’d love to
                                        know what you’re thinking
                                    </Typography>
                                </div>
                            </div>

                            <div className="mx-auto md:mx-0 sm:max-w-[400px] mt-7 flex flex-col gap-y-2">
                                <a
                                    href="tel:03-9363-6378"
                                    className="flex items-center gap-x-4"
                                >
                                    <div>
                                        <FiPhone
                                            size={20}
                                            className="text-[#F6910F]"
                                        />
                                    </div>
                                    <div className="cursor-pointer text-lg font-medium text-white">
                                        03-9363-6378
                                    </div>
                                </a>
                                <a
                                    href="mailto:info@skiltrak.com.au"
                                    className="flex items-center gap-x-4"
                                >
                                    <div>
                                        <MdOutlineAlternateEmail
                                            size={20}
                                            className="text-[#F6910F]"
                                        />
                                    </div>
                                    <div className="cursor-pointer text-lg font-medium text-white">
                                        info@skiltrak.com.au
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/*  */}
                        <div className="mx-6 md:mx-0 -mt-24 md:-mt-0 bg-white shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] px-4 md:px-8 py-4 md:py-10 rounded-[10px]">
                            <ContactForm
                                onSubmit={onSubmit}
                                result={sendUsQueryResult}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
