import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'

import {
    FaFileContract,
    FaHandshake,
    FaBriefcase,
    FaUserGraduate,
} from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'

import { FeatureSlide } from './FeatureSlide'

const featureSlideContent = [
    {
        icon: <FaFileContract />,
        title: 'E-Signature',
        link: '#',
    },
    {
        icon: <IoIosPeople />,
        title: 'Enhanced Communication',
        link: '#',
    },
    {
        icon: <FaHandshake />,
        title: 'Access to volunteer students',
        link: '#',
    },
    {
        icon: <FaBriefcase />,
        title: 'Jobs Advertisement',
        link: '#',
    },
    {
        icon: <FaUserGraduate />,
        title: 'Student Management System',
        link: '#',
    },
]

export const FeatureSlider = () => {
    return (
        <Swiper
            slidesPerView={1}
            loop
            pagination={{
                bulletClass: `swiper-pagination-bullet swiperPaginationBullet`,
            }}
            modules={[Pagination]}
            breakpoints={{
                // when window width is >= 640px
                640: {
                    slidesPerView: 3,
                },
                // when window width is >= 768px
                1024: {
                    slidesPerView: 5,
                },
            }}
        >
            {featureSlideContent.map((slide, i) => (
                <SwiperSlide key={i}>
                    <FeatureSlide
                        title={slide.title}
                        icon={slide.icon}
                        link={slide.link}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
