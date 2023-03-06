import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

import { JobSlide } from './JobSlide'
import { JobContentLoader } from './JobContentLoader'
import axios from 'axios'

export const JobSlider = () => {
    const [jobList, setJobList] = useState([])

    useEffect(() => {
        axios
            .get(`https://www.skiltrak.com.au/api/active-jobs`)
            .then((res) => {
                setJobList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Swiper
            loop
            centeredSlides
            autoplay={{ delay: 3000 }}
            direction={'horizontal'}
            slidesPerView={1}
            spaceBetween={4}
            speed={3000}
            modules={[Autoplay]}
            breakpoints={{
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                    centeredSlides: false,
                },
                // when window width is >= 768px
                1024: {
                    slidesPerView: 5,
                },
            }}
        >
            {jobList.length > 0
                ? jobList.map((job: any) => (
                      <SwiperSlide key={job.id}>
                          <JobSlide job={job} />
                      </SwiperSlide>
                  ))
                : Array(8)
                      .fill(null)
                      .map((_, key) => (
                          <SwiperSlide key={key}>
                              <JobContentLoader />
                          </SwiperSlide>
                      ))}
        </Swiper>
    )
}
