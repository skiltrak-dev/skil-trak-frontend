import { Typography } from '@components/Typography'
import { Button } from '@components/buttons'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const GetStartedWithUs = ({ contactUsRef }: any) => {
    const router = useRouter()
    return (
        <div className="md:px-36 px-8 py-8 md:py-20 bg-[#192A65]">
            <div className="max-w-7xl mx-auto gap-y-12 flex flex-col-reverse md:flex-row items-center md:gap-x-20 md:justify-between">
                <div className="w-full md:w-3/4 relative">
                    <div className="w-full h-80 bg-orange-500 rounded-md absolute top-0 rotate-0 z-0"></div>
                    <div className="w-full h-80 bg-blue-300 rounded-md absolute top-0 rotate-1 z-10"></div>
                    <div className="w-full h-80 bg-blue-500 rounded-md absolute top-0 z-20 rotate-3"></div>
                    <div className="relative w-full h-80 rounded-md overflow-hidden rotate-6 z-30">
                        <Image
                            src="/images/site/get-started-with-us.jpg"
                            sizes="100vw"
                            fill
                            alt="get-started-with-us"
                            placeholder="blur"
                            blurDataURL={'/images/get-started-with-us-blur.png'}
                        />
                    </div>
                </div>
                <div className="md:w-2/4 w-full flex flex-col gap-y-4">
                    <div className="">
                        <Typography variant="h3" color="text-white">
                            Get Started With Us
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body" color="text-white">
                            Request a demo or create your account right away to
                            get started. We are just one click away
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button
                            onClick={() => {
                                router.push('/auth/signup')
                            }}
                            outline
                            text="Sign up"
                        />
                        <Button
                            onClick={() => {
                                contactUsRef.current.scrollIntoView({
                                    behavior: 'smooth',
                                })
                            }}
                            variant="primary"
                            text="Request a demo"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
