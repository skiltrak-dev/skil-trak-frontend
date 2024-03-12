import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { WorkBaseInfo } from './components'

export const WorkBaseTraining = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)
    const isTablet = useMediaQuery({ maxWidth: 1024 })

    return (
        <div className="relative">
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[310px] right-0 -z-10"
            />
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[700px] -left-40 -z-10"
            />
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[1280px] right-0 -z-10"
            />
            <div className="ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-10 lg:pb-40 relative">
                <div className="max-w-7xl mx-auto ">
                    <div className="max-w-3xl mx-auto flex flex-col gap-y-5 px-8 md:px-6 xl:px-0">
                        <Typography bold center>
                            <span className="text-xl md:text-3xl lg:text-[47px]">
                                Work Based Training
                            </span>
                        </Typography>
                        <div className="flex flex-col gap-y-2.5">
                            <Typography
                                center
                                // variant={isMobile ? 'label' : 'body'}
                                color={'text-[#25566B]'}
                                bold
                            >
                                <span className="text-[21px]">
                                    Welcome to our Work Based Training (WBT)
                                    program. involved.
                                </span>
                            </Typography>
                            <Typography
                                center
                                variant={isMobile ? 'label' : 'body'}
                                color={'text-[#56585a]'}
                            >
                                Where we connect students, Registered Training
                                Organisations (RTOs), and industries, ensuring a
                                symbiotic relationship that benefits all parties
                                involved.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="relative max-w-7xl mx-auto  lg:-mt-32 mb-10">
                <div className="hidden lg:block absolute top-0 left-0 -mt-32 lg:-mt-0">
                    <Image
                        src={`/images/site/services/webbasetraining/border.png`}
                        alt={''}
                        width={0}
                        height={0}
                        sizes="100vw 100vh"
                        className={'w-full h-full'}
                    />
                </div>
                <div className="flex flex-col gap-y-11 lg:gap-y-0 w-full lg:max-w-5xl mx-auto">
                    <div className="px-5 xl:px-0 lg:pl-14 h-auto lg:h-[450px] flex flex-col justify-center gap-y-3.5 relative">
                        <WorkBaseInfo title="Students">
                            <span>
                                At the heart of our program are the students,
                                Excited to commence their professional
                                endeavours. We understand that theoretical
                                knowledge alone is insufficient in today's
                                competitive job market. Therefore, we provide
                                students with invaluable hands-on experience
                                through work-based training (WBT). By engaging
                                themselves in real-world settings, students gain
                                practical skills and insights that complement
                                their academic learning, enhancing their
                                employability and confidence.
                            </span>
                            <span>
                                Our diverse range of WBT placements in fields
                                such as Commercial Cookery and Hospitality,
                                Disability and Ageing Support, Early Childhood
                                Education and Care, Individual Support, Mental
                                Health, Allied Health Assistance, School-Based
                                Education Support, Nursing, and Youth Work,
                                caters to the varied interests and career
                                aspirations of students. Whether they aspire to
                                become chefs, nurses, educators, or support
                                workers, our program offers tailored
                                opportunities to explore and excel in their
                                chosen fields.
                            </span>
                        </WorkBaseInfo>
                    </div>
                    <div className="px-4 xl:px-0 lg:!pr-40 lg:-ml-28 h-auto lg:h-[450px] flex flex-col justify-center gap-y-3.5">
                        <WorkBaseInfo title="Registered Training Organisations (RTOs)">
                            <span>
                                We understand the challenges faced by RTOs in
                                providing comprehensive work-based training
                                opportunities to their students. Many struggle
                                to establish meaningful partnerships with
                                industries that can offer relevant placements.
                                Our program acts as a bridge, complementing the
                                theoretical curriculum offered by RTOs with
                                practical, hands-on experiences in reputable
                                industry settings.
                            </span>
                            <span>
                                By collaborating with us, RTOs enhance the
                                quality of their training programs and enrich
                                the learning experiences of their students. Our
                                network of industry partners spans various
                                sectors, ensuring that students receive exposure
                                to diverse work environments and industry best
                                practices. We work closely with RTOs to
                                understand their curriculum requirements and
                                align our placements to meet their educational
                                objectives, fostering a seamless transition from
                                classroom learning to real-world application.
                            </span>
                        </WorkBaseInfo>
                    </div>
                    <div className="px-4 xl:px-0 lg:pl-14 h-auto lg:h-[450px] flex flex-col justify-center gap-y-3.5">
                        <WorkBaseInfo title="Industries">
                            <span>
                                In today's dynamic business landscape,
                                industries seek talented and skilled individuals
                                who can contribute meaningfully to their
                                operations. However, identifying and recruiting
                                such candidates can be an intimidating task. Our
                                program serves as a talent pipeline, connecting
                                industries with motivated students who possess
                                the skills, knowledge, and enthusiasm to thrive
                                in their respective fields.
                            </span>
                            <span>
                                By partnering with SkilTrak, industries gain
                                access to a pool of well-prepared and job-ready
                                candidates across various sectors. We
                                collaborate closely with industry partners to
                                understand their workforce needs and tailor our
                                placements to match their requirements. Through
                                these partnerships, industries not only address
                                their immediate staffing needs but also
                                contribute to the development of future
                                professionals within their sectors.
                            </span>
                            <span>
                                Our Work Based Training program serves as a
                                catalyst for synergy and growth, benefiting
                                students, RTOs, and industries alike. We are
                                committed to nurturing talent, fostering
                                partnerships, and driving positive change within
                                the workforce ecosystem. Join us on this
                                transformative journey towards excellence and
                                innovation in work-based education and training.
                            </span>
                        </WorkBaseInfo>
                    </div>
                </div>
            </div>
            {/* Data */}
        </div>
    )
}
