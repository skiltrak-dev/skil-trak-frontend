import { Button, Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'

const GetStarted = ({ contactUsRef }: { contactUsRef: any }) => {
    const router = useRouter()
    const isMobile = useMediaQuery(MediaQueries.Mobile)
    return (
        <div className="bg-gradient-to-t from-[#0C1535] to-[#2C3E7F] py-10 px-5 md:px-0">
            <div>
                <Typography variant="h3" bold center color={'text-white'}>
                    Get Started With Us
                </Typography>
            </div>
            <div className="w-full sm:max-w-[450px] mx-auto flex justify-center mt-3">
                <Typography
                    variant={isMobile ? 'small' : 'label'}
                    color={'text-white'}
                    normal
                    center
                >
                    Request a demo or create your account right away to get
                    started. We are just one click away
                </Typography>
            </div>

            <div className="flex items-center justify-center mt-5 gap-x-2">
                <Button
                    onClick={() => {
                        router.push('/auth/signup')
                    }}
                    outline
                    text="Sign up"
                />
                <Button
                    onClick={() => {
                        contactUsRef?.current?.scrollIntoView({
                            behavior: 'smooth',
                        })
                    }}
                    variant="primary"
                    text="Request a demo"
                />
            </div>
            <div className="max-w-4xl mt-7 md:mt-9 mx-auto">
                <div className="w-full h-full">
                    <Image
                        className="w-full h-full"
                        src="/images/site/get-started-image.jpg"
                        sizes={
                            '(max-width: 640px) 260px, (max-width: 768px) 896px, (max-width: 1024px) 1420px, 1792px'
                        }
                        width={0}
                        height={0}
                        alt="get-started-with-us"
                        placeholder="blur"
                        blurDataURL={'/images/get-started-with-us-blur.png'}
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

export default GetStarted
