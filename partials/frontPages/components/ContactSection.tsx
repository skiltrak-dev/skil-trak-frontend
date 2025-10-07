import { ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { ContactFormV3 } from './ContactFormV3'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { useEffect } from 'react'

type Variant = 'orange' | 'red' | 'blue'

const variantStyles: Record<
    Variant,
    {
        leftBg: string
        leftBorder: string
        buttonBg: string
        buttonBorder: string
        textColor: string
        iconColor: string
        gradientFrom: string
    }
> = {
    orange: {
        leftBg: 'bg-[#F7A619]/60',
        leftBorder: 'border-[#FFF4E0]',
        buttonBg: 'bg-[#F7A619]/80 hover:bg-[#F7A619]',
        buttonBorder: 'border-[#FFF4E0]',
        textColor: 'text-black',
        iconColor: 'text-[#044866]',
        gradientFrom: 'from-[rgba(247,166,25,0.5)]', // orange glow
    },
    red: {
        leftBg: 'bg-[#9B2000]',
        leftBorder: 'border-[#FFAF9A]',
        buttonBg: 'bg-[#9B2000]/90 hover:bg-[#9B2000]',
        buttonBorder: 'border-[#FFAF9A]',
        textColor: 'text-white',
        iconColor: 'text-[#044866]',
        gradientFrom: 'from-[rgba(155,32,0,0.5)]', // red glow
    },
    blue: {
        leftBg: 'bg-[#044866]',
        leftBorder: 'border-[#DDF4FF]',
        buttonBg: 'bg-[#044866]/90 hover:bg-[#044866]',
        buttonBorder: 'border-[#DDF4FF]',
        textColor: 'text-white',
        iconColor: 'text-white',
        gradientFrom: 'from-[rgba(4,72,102,0.5)]', // blue glow
    },
}

export const ContactSection = ({
    variant = 'orange',
}: {
    variant?: Variant
}) => {
    const styles = variantStyles[variant]

    const { notification } = useNotification()
    const [sendUsQuery, sendUsQueryResult] = CommonApi.Messages.useContactUs()
    useEffect(() => {
        if (sendUsQueryResult?.isSuccess) {
            notification.success({
                title: 'Message Sent',
                description: 'Your message has been successfully sent',
            })
        }
    }, [sendUsQueryResult.isSuccess])

    const onSubmit = (data: any) => {
        sendUsQuery(data)
    }

    return (
        <>
            <ShowErrorNotifications result={sendUsQueryResult} />
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 mx-auto max-w-7xl md:my-20 my-10">
                {/* Left Info Card */}
                <div
                    className={`
                        ${styles.leftBg} ${styles.leftBorder}
                        border-[20px] border-r-0 rounded-l-[23px] rounded-r-none
                        flex flex-col p-8 md:p-10 shadow-md !py-24 !px-32 space-y-5
                        w-full md:w-1/2
                    `}
                >
                    <Typography variant="h1" color={styles.textColor}>
                        Let's talk with Us
                    </Typography>
                    <Typography variant="label" color={styles.textColor}>
                        Still got some questions? We are here to assist you.
                    </Typography>

                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt className={styles.iconColor} />
                            <span className={`font-medium ${styles.textColor}`}>
                                03-9363-6378
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdAlternateEmail className={styles.iconColor} />
                            <a
                                href="mailto:info@skiltrak.com.au"
                                className={`font-medium underline ${styles.textColor}`}
                            >
                                info@skiltrak.com.au
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="w-full md:w-1/2 relative">
                    {/* Dynamic gradient glow based on variant */}
                    <div
                        className={`w-72 h-72 rounded-[292px] bg-gradient-to-b ${styles.gradientFrom} to-[rgba(255,255,255,0)] blur-[25px] absolute -top-14 -right-14`}
                    ></div>

                    <div className="bg-white shadow-lg rounded-xl py-10 px-14 relative mr-10">
                        <ContactFormV3
                            onSubmit={onSubmit}
                            result={sendUsQueryResult}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
