'use client'

import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { ImLinkedin } from 'react-icons/im'

export const MeetOurTeam = () => {
    const teamMembers = [
        {
            name: 'Yaseen Khan',
            role: 'Co-Founder &',
            role2: 'Managing Director',
            image: '/images/site/about-us/yaseen.jpg',
            hasLinkedIn: true,
            linkedInLink: 'https://www.linkedin.com/in/yaseen-khan-54248076/',
        },
        {
            name: 'Julie D. Clarke',
            role: 'Co-Founder/CEO',
            role2: '',
            image: '/images/site/about-us/julie-clarke.jpg',
            hasLinkedIn: true,
            linkedInLink:
                'https://www.linkedin.com/in/julie-d-clarke-a06b2b293/',
        },
        {
            name: 'Qandeel Tanoli',
            role: 'Operations Manager',
            role2: '',
            image: '/images/site/about-us/qandeel-tanoli.jpeg',
            hasLinkedIn: true,
            linkedInLink:
                'https://www.linkedin.com/in/qandeel-tanoli-b05bb72b9/',
        },
    ]

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Title Section */}
                <div className="flex flex-col justify-center items-center mb-10">
                    <Typography variant="h2" color="text-[#24556D]">
                        MEET OUR TEAM
                    </Typography>
                    <Image
                        src="/images/site/home-page-v3/who-we-serve/title-line.svg"
                        alt="title line"
                        height={18}
                        width={380}
                    />
                    <div className="mt-5">
                        <Typography italic>
                            Behind every successful placement is a team of
                            passionate professionals committed to your success.
                        </Typography>
                    </div>
                </div>

                {/* Swiper Section */}
                <Swiper
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView="auto"
                    initialSlide={1}
                    spaceBetween={40}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{
                        clickable: true,
                        bulletClass: 'custom-bullet',
                        bulletActiveClass: 'custom-bullet-active',
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="team-swiper"
                >
                    {teamMembers.map((member, index) => (
                        <SwiperSlide
                            key={index}
                            className="!w-[280px] sm:!w-[340px] lg:!w-[380px]"
                        >
                            <div className="team-card bg-slate-200 shadow-lg overflow-hidden transition-all duration-300 p-7">
                                <div className="relative aspect-square bg-white">
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={345}
                                            height={345}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-32 h-32 bg-slate-300 rounded-full"></div>
                                        </div>
                                    )}
                                    {member.hasLinkedIn && (
                                        <a
                                            href={member.linkedInLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="absolute top-4 right-4 bg-slate-100 p-1 flex items-center justify-center rounded">
                                                <ImLinkedin className="text-[#24556D]" />
                                            </div>
                                        </a>
                                    )}
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-slate-600 text-base leading-relaxed">
                                        {member.role}
                                    </p>
                                    {member.role2 && (
                                        <p className="text-slate-600 text-base leading-relaxed">
                                            {member.role2}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Swiper Pagination Styling */}
            <style>{`
                .team-swiper {
                    padding-bottom: 20px;
                }

                .swiper-pagination {
                    bottom: 0 !important;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                }

                .custom-bullet {
                    width: 12px;
                    height: 12px;
                    background: #fbbf24;
                    opacity: 1;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .custom-bullet-active {
                    background: #1e40af;
                    width: 14px;
                    height: 14px;
                }

                .swiper-slide {
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }

                .swiper-slide:not(.swiper-slide-active) .team-card {
                    transform: scale(0.85);
                    opacity: 0.6;
                }

                .swiper-slide-active .team-card {
                    transform: scale(1);
                    opacity: 1;
                }
            `}</style>
        </div>
    )
}
