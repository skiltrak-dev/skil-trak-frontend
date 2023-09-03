import { Typography } from '@components/Typography'
import { Button } from '@components/buttons'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export const JumboSection = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const containerHeight = 1000

    useEffect(() => {
        const handleScroll = () => {
            const newPosition = window.scrollY % containerHeight
            setScrollPosition(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const redDivStyle = {
        transform: `translateY(${scrollPosition / 3}px)`,
        transition: 'transform 0.3s ease-out',
    }

    const blackDivStyle = {
        transform: `translateY(-${scrollPosition / 3}px)`,
        transition: 'transform 0.3s ease-out',
    }
    return (
        <div className="jumbo-bg mb-20">
            <div className="flex-col flex md:flex-row h-[450px] overflow-hidden">
                {/* Text */}
                <div className="w-full py-16 p-16 flex flex-col gap-y-4">
                    <div>
                        <h1 className="font-bold text-4xl text-white mb-8">
                            SKILTRAK, Your Student Placement Partner
                        </h1>
                    </div>
                    <div>
                        <h2 className="font-medium text-2xl text-[#add4f9] mb-4">
                            Create industry partners. Keep track of students
                            placement progress.
                        </h2>
                    </div>
                    <div>
                        <p className="text-md text-[#c1d7ef] mb-4">
                            A user-friendly placement platform. No hassle, no
                            documentation missing . Be innovative and efficient.
                        </p>
                    </div>
                    <div>
                        <Button
                            variant="primary"
                            text="Get Started with your portal"
                        />
                    </div>
                </div>

                {/* Image Animation */}
                <div className="relative md:block hidden w-full">
                    <div className="absolute scale-150 opacity-10 top-0 right-0">
                        <div className="flex gap-4 rotate-[15deg]">
                            {/* Image Scroll 2 */}
                            <div className="" style={blackDivStyle}>
                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>
                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>

                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>
                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>
                            </div>

                            {/* Image Scroll 1 */}
                            <div className="" style={redDivStyle}>
                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>

                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>

                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>

                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>
                            </div>
                        </div>
                        {/* <div className="absolute h-80 top-0 left-0 inset-0 bg-gradient-to-t from-transparent via-transparent to-[#345B87] bg-opacity-90"></div> */}
                    </div>

                    <div className="">
                        <div className="flex gap-4 rotate-[15deg]">
                            {/* Image Scroll 1 */}
                            <div className="" style={redDivStyle}>
                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>

                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>

                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>

                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>
                            </div>

                            {/* Image Scroll 2 */}
                            <div className="" style={blackDivStyle}>
                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>
                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>

                                <div className="relative w-80 h-[180px] bg-blue-400 rounded-md overflow-hidden mb-2"></div>
                                <div className="relative w-80 h-[180px] rounded-md overflow-hidden mb-2">
                                    <Image
                                        className="bg-cover"
                                        src="/images/jumbo/student-mock.png"
                                        sizes="100vw"
                                        fill
                                        alt="Hero Image Skiltrak Student Portal"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="absolute h-80 top-0 left-0 inset-0 bg-gradient-to-t from-transparent via-transparent to-[#345B87] bg-opacity-90"></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
