import Image from 'next/image'
import { WorkBaseInfoCardData } from './WorkBaseInfoCardData'

export const WorkBaseInfoIndustries = () => {
    return (
        <div
            data-aos="fade-right"
            className="relative w-[95%] h-auto lg:h-[335px]  bg-no-repeat"
            style={{
                border: '10px solid transparent',
                borderImage:
                    'url(/images/site/services/webbasetraining/updatedBorder.png) 12 round',
            }}
        >
            <div className="flex items-center h-full gap-x-6 xl:gap-x-20 py-6 lg:py-0 px-2 lg:px-6 xl:px-16">
                <div className="hidden lg:block w-[380px] xl:w-[490px] relative h-full py-6 xl:pl-10">
                    <Image
                        src={
                            '/images/site/services/webbasetraining/industry1.png'
                        }
                        alt={''}
                        width={255}
                        height={184}
                        className="rounded-[10px]"
                    />
                    <Image
                        src={
                            '/images/site/services/webbasetraining/industry2.png'
                        }
                        alt={''}
                        width={194}
                        height={140}
                        className="rounded-[10px] absolute right-0 top-1/2 -translate-y-[60%]"
                    />
                    <Image
                        src={
                            '/images/site/services/webbasetraining/industry3.png'
                        }
                        alt={''}
                        width={309}
                        height={140}
                        className="rounded-[10px] absolute bottom-6 left-20"
                    />
                </div>
                <div className="w-full lg:w-[calc(100%-380px)] xl:w-[calc(100%-490px)]">
                    <WorkBaseInfoCardData title="Industries">
                        <span>
                            In today's dynamic business landscape, industries
                            seek talented and skilled individuals who can
                            contribute meaningfully to their operations.
                            However, identifying and recruiting such candidates
                            can be an intimidating task. Our program serves as a
                            talent pipeline, connecting industries with
                            motivated students who possess the skills,
                            knowledge, and enthusiasm to thrive in their
                            respective fields.
                        </span>
                        <span>
                            By partnering with SkilTrak, industries gain access
                            to a pool of well-prepared and job-ready candidates
                            across various sectors. We collaborate closely with
                            industry partners to understand their workforce
                            needs and tailor our placements to match their
                            requirements. Through these partnerships, industries
                            not only address their immediate staffing needs but
                            also contribute to the development of future
                            professionals within their sectors.
                        </span>
                        <span>
                            Our Work Based Training program serves as a catalyst
                            for synergy and growth, benefiting students, RTOs,
                            and industries alike. We are committed to nurturing
                            talent, fostering partnerships, and driving positive
                            change within the workforce ecosystem. Join us on
                            this transformative journey towards excellence and
                            innovation in work-based education and training.
                        </span>
                    </WorkBaseInfoCardData>
                </div>
            </div>
        </div>
    )
}
