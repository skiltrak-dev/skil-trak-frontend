import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GoogleReviewCard } from './GoogleReviewCard'

const googleReviews = [
    {
        name: 'Vikashni Mudaliar',
        review: 'Had a great Guidance from my coordinator Lucas. He made my work easier in guiding me on how I can complete my WBT sessions and even helped in understanding on how to fill my log books.Thank you Sir for your help.',
        rating: 5,
        link: 'https://maps.app.goo.gl/eDJjfCVBFf7EbsJV6',
    },
    {
        name: 'Sourabh Jaglan',
        review: `Aaron Valcy was incredibly helpful with my placement process. Their guidance and support 
        made everything much easier for me. I'm grateful for their assistance and would recommend their 
        services to any student in need of placement help.`,
        rating: 5,
        link: 'https://maps.app.goo.gl/e6K9sepJ9c3URa787',
    },
    {
        name: 'Harpreet Kaur',
        review: `Skill track is a good company and skill track gave me  great guidance for my WBT . 
        Maria Cruiz helped me alot for my Wbt . I had great experience with skill track and with Maria 
        Cruiz !!. Thankyou team kindly.`,
        rating: 5,
        link: 'https://maps.app.goo.gl/1Q2vtH8y1Mggqo1z8',
    },
    {
        name: 'Allen Lahaylahay',
        review: `Layla Ballard has been incredibly helpful and respectful throughout the process of 
        arranging my work placement. She efficiently managed all the requirements she called to provide 
        updates, and today, she informed me that everything is set. I truly appreciate all her help—thank 
        God for her assistance.`,
        rating: 5,
        link: 'https://maps.app.goo.gl/Gr7oMkbB1CswFCGK9',
    },
    {
        name: 'Subash Poudel',
        review: `Emma Willians is doing a great job of helping students to find a facility for 
        work placement. He constantly gives feedback and updates regarding the status of the application. 
        Great job mate! Keep up the good work! Cheers!`,
        rating: 5,
        link: 'https://maps.app.goo.gl/FWXjE3w4n9wi2Umg7',
    },
    {
        name: 'Ash Riddell',
        review: `Sara was lovely and found me a work placement after months of me having. 
        No success. Sara also followed up on every step of the way and reassured me things were progressing.`,
        rating: 5,
        link: 'https://maps.app.goo.gl/SxDRmcSpVCaEgFGC6',
    },
]


export const GoogleReviewSlider = () => {
    return (
        <div className="mx-auto max-w-7xl my-12 overflow-hidden">
            <Swiper
                loop
                centeredSlides
                autoplay={{ delay: 3000 }}
                direction={'horizontal'}
                // slidesPerView={3}
                spaceBetween={0}
                speed={1000}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                modules={[Autoplay, Pagination]}
            >
                {googleReviews?.map((review, i) => (
                    <SwiperSlide key={i}>
                        <GoogleReviewCard
                            review={review?.review}
                            name={review?.name}
                            rating={review?.rating}
                            link={review?.link}
                            key={i}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
