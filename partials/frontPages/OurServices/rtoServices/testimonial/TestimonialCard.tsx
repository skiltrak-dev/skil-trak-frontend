"use client";

import Image from "next/image";
import React from "react";

interface TestimonialCardProps {
  image: string;
  text: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, text }) => {
  return (
    <div className=" flex flex-col items-center rounded-3xl bg-white shadow-[-25px_59px_70px_27px_rgba(0,0,0,0.11),_-4px_-2px_16px_1px_rgba(0,0,0,0.25)_inset,_3px_-1px_8px_0_rgba(0,0,0,0.25)_inset] p-2 w-full max-w-[320px] h-[350px] mx-auto">
      {/* Paperclip */}
      <div className="absolute -top-2 left-[58%] transform -translate-x-1/2 rotate-12 z-30">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="75" viewBox="0 0 45 77" fill="none">
        <path d="M34.7694 2.94309C40.9335 4.95614 44.1963 11.5508 42.0602 17.6785L37.5583 30.5893C35.7861 29.1988 33.1328 30.7286 33.499 32.9849L34.6976 40.3695L26.1799 66.5195C24.044 73.0762 16.9521 76.7623 10.3577 74.7441C3.59294 72.6735 0.0248334 65.4302 2.50258 58.7974L9.58134 39.8476L9.65049 39.6625L9.66863 39.4669L10.8758 26.7975C10.8802 26.752 10.8897 26.7307 10.8925 26.725C10.8951 26.7195 10.8974 26.7167 10.9002 26.7141C10.9083 26.7064 10.9385 26.6854 10.9932 26.6782C11.0475 26.6711 11.0816 26.6834 11.0914 26.6889C11.0947 26.6907 11.0974 26.6925 11.1011 26.697C11.1046 26.7012 11.1193 26.72 11.1344 26.7643L12.5381 30.8749L13.9903 26.7318L19.7158 10.3911C21.863 4.26317 28.6019 0.929015 34.7694 2.94309Z" stroke="black" stroke-width="3"/>
        </svg>
      </div>

      {/* Image */}
      <div className="relative ">
        <Image
          src={image}
          alt="testimonial"
          width={190}
          height={190}
          className=" object-cover rounded-md transform -rotate-12 "
        />
      </div>

      {/* Text */}
      <p className="mt-3 text-center text-gray-700 text-sm leading-relaxed">
        {text}
      </p>

      {/* Accent Bar */}
      <div className="absolute bottom-0 h-3 w-24 bg-[#004c6d] rounded-full"></div>
    </div>
  );
};
