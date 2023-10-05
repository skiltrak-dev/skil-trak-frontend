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

                    <div className="md:w-24 w-12 absolute left-[8%] top-[20%] md:top-[12%] md:left-[14%]">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/pv-2.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="w-12 h-12 md:w-24 md:h-24  absolute top-[37.3%] left-[38.3%] md:top-[17.5%] md:left-[33.7%]">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/pv-5.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-[7rem] md:h-[7.5rem] w-[4.5rem] h-[4.5rem]  absolute top-[50%] left-[4%] md:top-[60%]  md:left-[18.5%]">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/pv-1.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-36 w-14 absolute top-[65%] right-20 md:top-8  md:right-[31rem]">
                        <Image
                            className=""
                            src="/images/site/partners/pv-6.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    <div className="md:w-24 w-12 absolute top-20 md:top-7 right-8 md:right-80">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/pv-3.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div>
                    {/* <div className="md:w-24 md:h-24 w-14 h-14  absolute top-[65%] right-[25%] md:top-48  md:right-72">
                        <Image
                            className="rounded-full"
                            src="/images/site/partners/p1.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                    </div> */}
                    <div className="md:w-48 w-16 absolute top-8 right-36 md:top-48  md:right-[18rem]">
                        <Image
                            className=""
                            src="/images/site/partners/pv-7.webp"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                            
                        />
                    </div>
                    <div className="w-28 md:w-56 absolute top-[82%] left-14 md:top-[59%] md:left-[40%]">
                        <Image
                            className=""
                            src="/images/site/partners/pv-4.png"
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
