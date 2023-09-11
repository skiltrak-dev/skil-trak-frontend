import { Typography } from '@components/Typography'
import Image from 'next/image'

export const OurPartners = () => {
    return (
        <div className="py-8 md:py-[72px]">
            {/* <div className="max-w-7xl mx-auto"> */}
            <div className="w-full">
                <div className="mb-8 flex justify-center">
                    <Typography variant="h2">Our Partners</Typography>
                </div>
                <div className="relative">
                    <Image
                        className="md:block hidden"
                        src="/images/site/threads.png"
                        layout="responsive"
                        objectFit="contain"
                        width={100}
                        height={100}
                        alt="Map"
                    />
                    {/* Mobile view */}
                    <Image
                        className="md:hidden block"
                        src="/images/site/threads-mob.png"
                        layout="responsive"
                        objectFit="contain"
                        width={100}
                        height={100}
                        alt="Partners"
                    />

                    <div className="md:w-20 w-12 absolute left-[10%] top-[20%] md:top-[12%] md:left-[14%]">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/p12.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="w-12 h-12 md:w-24 md:h-24  absolute top-[38%] left-[40%] md:top-[18%] md:left-[34%]">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/p14.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-[7rem] md:h-[7.5rem] w-[4.5rem] h-[4.5rem]  absolute top-[44%] left-[6%] md:top-[50%]  md:left-[19%]">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/p15.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-36 w-14 absolute top-[42%] right-8 md:top-0  md:right-[31rem]">
                        <Image
                            className=""
                            src="/images/site/partners/p4.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-56 w-24 absolute top-20 md:top-7 right-4 md:right-48">
                        <Image
                            className=""
                            src="/images/site/partners/p10.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-24 md:h-24 w-14 h-14  absolute top-[65%] right-[25%] md:top-48  md:right-72">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/p1.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-32 w-16 absolute top-8 right-36 md:top-32  md:right-[27rem]">
                        <Image
                            className=""
                            src="/images/site/partners/p6.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="w-28 md:w-56 absolute top-[82%] left-16 md:top-[59%] md:left-[42%]">
                        <Image
                            className=""
                            src="/images/site/partners/p16.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    {/* Mobile view */}
                    {/* <div className="md:hidden block px-3 absolute w-[380px] h-[340px] top-[2.5rem] left-3">
                        <Image
                            src="/images/site/partners-mob.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="threads"
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
