import { ShowErrorNotifications, Typography } from '@components'
import { MediaQueries } from '@constants'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import { ContactForm } from './ContactForm'

export const ContactUsV3 = () => {
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
        <>
            <ShowErrorNotifications result={sendUsQueryResult} />
            {/* */}

            <div className="relative">
                <div className="rounded-[21px] md:inline-block hidden w-52 opacity-80 bg-gradient-to-r from-[#9B2000] to-[#FEFEFE] absolute -left-44 top-16 z-10 px-2 py-4">
                    {/* content */}
                    <div className="space-y-2 mb-6 text-center">
                        <Typography variant="h4" color="text-white" center>
                            Got a question?
                        </Typography>
                        <Typography variant="title" color="text-white" center>
                            We&apos;ve got your back.
                        </Typography>
                        <Typography variant="small" color="text-white" center>
                            Whether it&apos;s about placements or platform
                            features, our friendly team is ready to assist
                            anytime you need.
                        </Typography>
                    </div>
                </div>

                <div className={'absolute -top-10 -left-20 -z-10'}>
                    <Image
                        src={
                            '/images/site/home-page-v3/blogs-contact-us/contact-us-moon.webp'
                        }
                        alt={''}
                        width={0}
                        height={0}
                        sizes={'100vw 100vh'}
                        className="w-28 h-28 animate-float"
                        priority
                    />
                </div>
                <div className=" bg-[#044866] shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] w-96 px-4 md:pl-14 md:pr-8 py-5 rounded-[10px]">
                    <ContactForm
                        onSubmit={onSubmit}
                        result={sendUsQueryResult}
                    />
                </div>
            </div>
        </>
    )
}
