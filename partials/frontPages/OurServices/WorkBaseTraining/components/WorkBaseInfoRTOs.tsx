import Image from 'next/image'
import { WorkBaseInfoCardData } from './WorkBaseInfoCardData'

export const WorkBaseInfoRTOs = () => {
    return (
        <div
            data-aos="fade-left"
            className="relative w-[95%] ml-auto h-auto lg:h-[335px] bg-no-repeat"
            style={{
                border: '10px solid transparent',
                borderImage:
                    'url(/images/site/services/webbasetraining/updatedBorderRight.png) 12 round',
            }}
        >
            <div className="flex items-center h-full gap-x-20 py-6 lg:py-0 px-2 lg:px-16">
                <div className="w-full lg:w-[calc(100%-490px)]">
                    <WorkBaseInfoCardData title="Registered Training Organisations (RTOs)">
                        <span>
                            We understand the challenges faced by RTOs in
                            providing comprehensive work-based training
                            opportunities to their students. Many struggle to
                            establish meaningful partnerships with industries
                            that can offer relevant placements. Our program acts
                            as a bridge, complementing the theoretical
                            curriculum offered by RTOs with practical, hands-on
                            experiences in reputable industry settings.
                        </span>
                        <span>
                            By collaborating with us, RTOs enhance the quality
                            of their training programs and enrich the learning
                            experiences of their students. Our network of
                            industry partners spans various sectors, ensuring
                            that students receive exposure to diverse work
                            environments and industry best practices. We work
                            closely with RTOs to understand their curriculum
                            requirements and align our placements to meet their
                            educational objectives, fostering a seamless
                            transition from classroom learning to real-world
                            application.
                        </span>
                    </WorkBaseInfoCardData>
                </div>
                <div className="hidden lg:block w-[490px] relative h-full py-6 pr-10">
                    <Image
                        src={'/images/site/services/webbasetraining/rto1.png'}
                        alt={''}
                        width={255}
                        height={184}
                        className="rounded-[10px] ml-auto"
                    />
                    <Image
                        src={'/images/site/services/webbasetraining/rto2.png'}
                        alt={''}
                        width={194}
                        height={139}
                        className="rounded-[10px] absolute left-0 top-1/2 -translate-y-1/2"
                    />
                    <Image
                        src={'/images/site/services/webbasetraining/rto3.png'}
                        alt={''}
                        width={194}
                        height={139}
                        className="rounded-[10px] absolute bottom-6 left-1/2 -translate-x-1/2   "
                    />
                </div>
            </div>
        </div>
    )
}
