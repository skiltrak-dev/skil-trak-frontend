import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TestimonialCard } from "./TestimonialCard";
import { Typography } from "@components";


export const TestimonialSectionRtoServices = () => {
  const testimonials = [
    {
      image: "/images/site/services/rto-services/testimonial-1.png",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
    {
      image: "/images/site/services/rto-services/testimonial-2.png",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
    {
      image: "/images/site/services/rto-services/testimonial-1.png",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
   {
      image: "/images/site/services/rto-services/testimonial-2.png",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
    },
  ];

  return (
    <div style={{
        backgroundImage: 'url(/images/site/services/rto-services/testimonial-glob-bg.png)',
        backgroundPosition: "right"
    }} className="w-full px-6 py-12  md:max-w-7xl md:mx-auto md:mt-20 mt-10 bg-no-repeat bg-contain">
        <div className="flex justify-center items-center flex-col gap-y-6 mb-20">
            <Typography variant="h3" color="text-yellow-500" uppercase>Testimonial</Typography>
            <Typography variant="h2">Words That Inspire Us</Typography>
            <Typography variant="body"> Discover what Our Partners say about their journey with SkilTrak.</Typography>
        </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        // navigation
        // pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 }, // mobile
          640: { slidesPerView: 2 }, // tablet
          1024: { slidesPerView: 3 } // desktop
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
  );
};