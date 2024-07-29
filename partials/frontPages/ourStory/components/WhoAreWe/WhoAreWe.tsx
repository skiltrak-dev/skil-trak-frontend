import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Info } from './components'
import { whoAreWeItems } from './data'
export const WhoAreWe = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const controls = useAnimation()
    const itemWidth = 80 // Adjust this to match the width of your carousel items
    const totalItems = whoAreWeItems?.length

    const prevSlide = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1)
        }
    }

    const nextSlide = () => {
        if (activeIndex < totalItems - 1) {
            setActiveIndex(activeIndex + 1)
        }
    }

    useEffect(() => {
        const isAtStart = activeIndex === 0

        const xPosition = isAtStart ? 1 * 650 : -activeIndex * itemWidth

        controls.start({
            x: xPosition,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        })
    }, [activeIndex, controls, itemWidth, totalItems])

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x < -50) {
            nextSlide()
        } else if (info.offset.x > 50) {
            prevSlide()
        }
    }

    return (
        <div className="relative w-full hidden md:block">
            <div className="flex w-full items-center gap-x-24 mt-4">
                <div className="w-1/2 flex flex-col items-end p-4 ">
                    <Info />

                    <motion.div
                        className="flex items-center justify-center mt-4 space-x-4 border-b border-t py-4 w-full remove-scrollbar overflow-x-hidden overflow-y-hidden whitespace-nowrap snap-x"
                        dragConstraints={{
                            left: -itemWidth * totalItems,
                            right: 0,
                        }}
                        whileTap={{ cursor: 'grabbing' }}
                    >
                        <div className="flex space-x-2 snap-mandatory">
                            {whoAreWeItems?.map((item: any, index: number) => (
                                <motion.div
                                    key={index}
                                    className={`w-[212px] h-48 p-1.5 bg-white shadow-md rounded-md cursor-pointer snap-start ${
                                        index % totalItems === activeIndex
                                            ? 'border-2 border-[#F6910F]'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setActiveIndex(index % totalItems)
                                    }
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onDragEnd={handleDragEnd}
                                    animate={controls}
                                    drag="x"
                                >
                                    <img
                                        src={item?.image}
                                        alt={item?.title}
                                        className="w-[202px] h-36 rounded-sm object-cover"
                                    />
                                    <p className="text-sm text-center font-medium text-[#25566B] mt-2.5">
                                        {item?.title}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="p-2.5 w-[558px] h-[518px] text-center rounded-md shadow-md bg-white"
                >
                    <img
                        src={whoAreWeItems[activeIndex]?.image}
                        alt={whoAreWeItems[activeIndex]?.title}
                        className="w-[558px] h-[428.682px] object-cover rounded-lg"
                    />
                    <h1 className="text-xl font-semibold mt-4 text-[#25566B]">
                        {whoAreWeItems[activeIndex]?.title}
                    </h1>
                </motion.div>
            </div>
            <div className="">
                <button
                    onClick={prevSlide}
                    className={`${
                        activeIndex === 0 ? 'bg-gray-300' : 'bg-orange-400'
                    } p-2 rounded-sm absolute left-12 bottom-[20%]`}
                    disabled={activeIndex === 0}
                >
                    <MdKeyboardArrowLeft className="text-white" />
                </button>
                <div className="border-b border-t h-[14.1rem] py-4 flex justify-center items-center absolute right-12 bottom-4">
                    <button
                        onClick={nextSlide}
                        className={`${
                            activeIndex === totalItems - 1
                                ? 'bg-gray-300'
                                : 'bg-orange-400'
                        }  p-2 rounded-sm `}
                        disabled={activeIndex === totalItems - 1}
                    >
                        <MdKeyboardArrowRight className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}
