import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

export const WorkBaseTraining = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

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
            <div className="ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-40 relative">
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
            <div className="relative max-w-7xl mx-auto -mt-32 mb-10">
                <div className="absolute top-0 left-0">
                    <Image
                        src={'/images/site/services/webbasetraining/border.png'}
                        alt={''}
                        width={0}
                        height={0}
                        sizes="100vw 100vh"
                        className={'w-full h-full'}
                    />
                </div>
                <div className="flex flex-col gap-y- max-w-5xl mx-auto">
                    <div className="pl-14 h-[450px] flex flex-col justify-center gap-y-3.5 relative">
                        <Typography variant="h4" color="text-[#25566B]" bold>
                            Students
                        </Typography>
                        <Typography variant="label" color="text-[#56585a]">
                            At the heart of our program are the students,
                            Excited to commence their professional endeavours.
                            We understand that theoretical knowledge alone is
                            insufficient in today's competitive job market.
                            Therefore, we provide students with invaluable
                            hands-on experience through work-based training
                            (WBT). By engaging themselves in real-world
                            settings, students gain practical skills and
                            insights that complement their academic learning,
                            enhancing their employability and confidence.
                        </Typography>
                        <Typography variant="label" color="text-[#56585a]">
                            Our diverse range of WBT placements in fields such
                            as Commercial Cookery and Hospitality, Disability
                            and Ageing Support, Early Childhood Education and
                            Care, Individual Support, Mental Health, Allied
                            Health Assistance, School-Based Education Support,
                            Nursing, and Youth Work, caters to the varied
                            interests and career aspirations of students.
                            Whether they aspire to become chefs, nurses,
                            educators, or support workers, our program offers
                            tailored opportunities to explore and excel in their
                            chosen fields.
                        </Typography>
                    </div>
                    <div className="pr-40 -ml-28 h-[450px] flex flex-col justify-center gap-y-3.5">
                        <Typography variant="h4" color="text-[#25566B]" bold>
                            Students
                        </Typography>
                        <Typography variant="label" color="text-[#56585a]">
                            At the heart of our program are the students,
                            Excited to commence their professional endeavours.
                            We understand that theoretical knowledge alone is
                            insufficient in today's competitive job market.
                            Therefore, we provide students with invaluable
                            hands-on experience through work-based training
                            (WBT). By engaging themselves in real-world
                            settings, students gain practical skills and
                            insights that complement their academic learning,
                            enhancing their employability and confidence.
                        </Typography>
                        <Typography variant="label" color="text-[#56585a]">
                            Our diverse range of WBT placements in fields such
                            as Commercial Cookery and Hospitality, Disability
                            and Ageing Support, Early Childhood Education and
                            Care, Individual Support, Mental Health, Allied
                            Health Assistance, School-Based Education Support,
                            Nursing, and Youth Work, caters to the varied
                            interests and career aspirations of students.
                            Whether they aspire to become chefs, nurses,
                            educators, or support workers, our program offers
                            tailored opportunities to explore and excel in their
                            chosen fields.
                        </Typography>
                    </div>
                    <div className="pl-14 h-[450px] flex flex-col justify-center gap-y-3.5">
                        <Typography variant="h4" color="text-[#25566B]" bold>
                            Students
                        </Typography>
                        <Typography variant="label" color="text-[#56585a]">
                            At the heart of our program are the students,
                            Excited to commence their professional endeavours.
                            We understand that theoretical knowledge alone is
                            insufficient in today's competitive job market.
                            Therefore, we provide students with invaluable
                            hands-on experience through work-based training
                            (WBT). By engaging themselves in real-world
                            settings, students gain practical skills and
                            insights that complement their academic learning,
                            enhancing their employability and confidence.
                        </Typography>
                        <Typography variant="label" color="text-[#56585a]">
                            Our diverse range of WBT placements in fields such
                            as Commercial Cookery and Hospitality, Disability
                            and Ageing Support, Early Childhood Education and
                            Care, Individual Support, Mental Health, Allied
                            Health Assistance, School-Based Education Support,
                            Nursing, and Youth Work, caters to the varied
                            interests and career aspirations of students.
                            Whether they aspire to become chefs, nurses,
                            educators, or support workers, our program offers
                            tailored opportunities to explore and excel in their
                            chosen fields.
                        </Typography>
                    </div>
                </div>
            </div>
            {/* Data */}
        </div>
    )
}
