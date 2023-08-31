import { Typography } from '@components/Typography'
import { Button } from '@components/buttons'
import { useEffect, useState } from 'react'

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
        transform: `translate(-${scrollPosition / 5}px, ${
            scrollPosition / 5
        }px)`,
        transition: 'transform 0.3s ease-out',
    }

    const blackDivStyle = {
        transform: `translate(${scrollPosition / 5}px, -${
            scrollPosition / 5
        }px)`,
        transition: 'transform 0.3s ease-out',
    }
    return (
        <div className="jumbo-bg mb-20">
            <div className="flex-col flex md:flex-row">
                <div className="w-full py-16 p-16 flex flex-col gap-y-4">
                    <div>
                        <Typography variant="h1" color="text-white">
                            SKILTRAK, Your Student Placement Partner
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h4" color="text-[#5C90CE]">
                            Create industry partners. Keep track of students
                            placement progress.
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body" color="text-[#B1CAE7]">
                            A user-friendly placement platform. No hassle, no
                            documentation missing . Be innovative and efficient.
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant="primary"
                            text="Get Started with your portal"
                        />
                    </div>
                </div>
                <div className="md:block hidden w-full relative">
                    {/* <div className="absolute top-0 left-0 inset-0 bg-gradient-to-t from-[#345B87] via-transparent to-transparent bg-opacity-90"></div> */}
                    {/* <Image
                            className=""
                            src="/images/site/scrolling-image-1.png"
                            layout="responsive"
                            objectFit="none"
                            objectPosition="center"
                            width={100}
                            height={100}
                            alt="hero image"
                        /> */}
                    <div className="flex overflow-hidden">
                        <div
                            className="bg-red-500 h-96 w-96"
                            style={redDivStyle}
                        >
                            {/* <Image
                                    className=""
                                    src="/images/site/scrolling-image-11.png"
                                    layout="responsive"
                                    objectFit="contain"
                                    objectPosition="center"
                                    width={100}
                                    height={100}
                                    alt="hero image"
                                /> */}
                        </div>
                        <div
                            className="bg-green-500 h-96 w-96"
                            style={blackDivStyle}
                        >
                            {/* <Image
                                    className=""
                                    src="/images/site/scrolling-image-12.png"
                                    layout="responsive"
                                    objectFit="contain"
                                    objectPosition="center"
                                    width={100}
                                    height={100}
                                    alt="hero image"
                                /> */}
                            {/* <div className='jumbo-image-1'></div> */}
                        </div>
                    </div>
                    {/* <div className="absolute h-80 top-0 left-0 inset-0 bg-gradient-to-t from-transparent via-transparent to-[#345B87] bg-opacity-90"></div> */}
                </div>
            </div>
        </div>
    )
}
