import React, { useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

export const Carousel = ({ items }: any) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const prevSlide = () => {
        setActiveIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1)
    }

    const nextSlide = () => {
        setActiveIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1)
    }

    return (
        <div className="relative w-full ">
            <div className="flex w-full items-center gap-x-24 mt-4">
                <div className="w-1/2 flex flex-col items-end p-4 ">
                    <div className="h-72 pl-28">
                        <h1 className="text-3xl font-bold">
                            {items[activeIndex]?.title}
                        </h1>
                        <p className="mt-4">
                            {items[activeIndex]?.description}
                        </p>
                    </div>
                   
                    <div className="flex items-center justify-center mt-4 space-x-4 border-b border-t py-4 w-full remove-scrollbar overflow-x-auto snap-x">
                        <div className="flex space-x-2 snap-mandatory">
                            {items?.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className={`w-[212px] h-48 p-1.5 bg-white shadow-md rounded-md cursor-pointer snap-start ${
                                        index === activeIndex
                                            ? 'border-2 border-[#F6910F]'
                                            : ''
                                    }`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <img
                                        src={item?.image}
                                        alt={item?.title}
                                        className="w-[202px] h-36 rounded-sm object-cover"
                                    />
                                    <p className="text-sm text-center font-medium text-[#25566B] mt-2.5">
                                        {item?.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-2.5 w-[558px] h-[518px] text-center rounded-md shadow-md bg-white">
                    <img
                        src={items[activeIndex]?.image}
                        alt={items[activeIndex]?.title}
                        className="w-[558px] h-[428.682px] object-cover rounded-lg"
                    />
                    <h1 className="text-xl font-semibold mt-4 text-[#25566B]">
                        {items[activeIndex]?.title}
                    </h1>
                </div>
            </div>
            <div className="">
                <button
                    onClick={prevSlide}
                    className="bg-orange-400 p-2 rounded-sm absolute left-12 bottom-[20%]"
                >
                    <MdKeyboardArrowLeft className="text-white" />
                </button>
                <div className="border-b border-t h-[14.1rem] py-4 flex justify-center items-center absolute right-12 bottom-4">
                    <button
                        onClick={nextSlide}
                        className=" bg-[#F6910F] p-2 rounded-sm "
                    >
                        <MdKeyboardArrowRight className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}
