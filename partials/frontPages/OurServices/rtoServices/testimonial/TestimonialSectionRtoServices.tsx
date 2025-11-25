import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { TestimonialCard } from './TestimonialCard'
import { Typography } from '@components'

export const TestimonialSectionRtoServices = () => {
    const testimonials = [
        {
            image: '/images/site/services/rto-services/rto-1.png',
            text: `Working with Skiltrak for the past 5 months has been seamless for ITHEA. 
        The entire team, from directors to account managers, has been supportive, accommodating 
        our needs and effectively connecting our students with employers. Their management of student 
        files during work placements and weekly meetings to resolve issues have been invaluable, 
        allowing our trainers to focus more on teaching. Skiltrak’s system also lets us monitor student 
        progress and ensure they are in the correct work sector. We highly recommend Skiltrak to other 
        Organisation seeking similar support, and we look forward to continuing our partnership.`,
        },
        {
            image: '/images/site/services/rto-services/rto-2.png',
            text: `Partnering with SkilTrak has been exceptional. The team, from Julie to Quandeel, 
        consistently demonstrates professionalism, efficiency, and a commitment to our success. 
        Their intuitive, user-friendly system makes coordinating work placements seamless, greatly 
        benefiting our team and learners. Ourstaff and students enjoy working with SkilTrak, and 
        their dedication to quality service is evident in every interaction. We look forward to 
        continuing this valuable partnership.`,
        },
        {
            image: '/images/site/services/rto-services/rto-3.png',
            text: `<div>
                <p class="text-2xl">Work Placement Guarantee</p>
                <p>Changing the game of work placement!</p>
                <p>Alffie’s new Work placement Guarantee, in partnership with SkilTrak, tackles the current delays and limitations in work placement opportunities and support for participants.</p>
                <p class="text-[13px] mt-2">Typically participants can wait for months to secure real-life placements, disrupting the momentum of their training progress and readiness to work. Whilst we understand this challenge, Alffie believes that on the job practical experience is far superior than virtual alternatives, hence why we have worked hard to find the right solution.</p>
                <p class="text-[13px]">Now, Alffie guarantees all participants an in-person placement from within three weeks of being considered ‘ready,’ ensuring a seamless transition from training to the workforce, whilst also helping Employment Service Providers meet their obligations.</p>
                </div>`,
        },
    ]

    return (
        <div
            style={{
                backgroundImage:
                    'url(/images/site/services/rto-services/testimonial-glob-bg.png)',
                backgroundPosition: 'right',
            }}
            className="w-full px-6 py-12  md:max-w-7xl md:mx-auto md:mt-20 mt-10 bg-no-repeat bg-contain"
        >
            <div className="flex justify-center items-center flex-col gap-y-6 mb-20">
                <Typography variant="h3" color="text-yellow-500" uppercase>
                    Testimonial
                </Typography>
                <Typography variant="h2">Words That Inspire Us</Typography>
                <Typography variant="body">
                    {' '}
                    Discover what Our Partners say about their journey with
                    SkilTrak.
                </Typography>
            </div>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                // navigation
                // pagination={{ clickable: true }}
                breakpoints={{
                    0: { slidesPerView: 1 }, // mobile
                    640: { slidesPerView: 2 }, // tablet
                    1024: { slidesPerView: 3 }, // desktop
                }}
                className=" relative max-w-6xl"
            >
                {testimonials.map((t, i) => (
                    <SwiperSlide key={i}>
                        <TestimonialCard image={t.image} text={t.text} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
