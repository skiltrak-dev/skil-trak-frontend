import React from 'react'
import Image from 'next/image'

const ImageUrl = [
    <Image
        key={1}
        src={'/images/site/about_us_1.jpg'}
        alt="Customer Satisfaction"
        width={256}
        height={256}
    />,
    <Image
        key={2}
        src={'/images/site/about_us_2.jpg'}
        alt="We Support"
        width={256}
        height={256}
    />,
    <Image
        key={3}
        src={'/images/site/about_us_3.jpg'}
        alt="We Listen"
        width={256}
        height={256}
    />,
]

export const AboutUsCard = ({ heading, description, imageIndex }: any) => {
    const getImage = (index: number) => ImageUrl[index]
    return (
        <div className="h-96 md:h-80 w-full md:w-4/12">
            <div className="relative ">
                <div className="img-container w-full h-60 md:w-56 md:h-56 relative rounded-md overflow-hidden">
                    <div className="overlay bg-black opacity-50 w-full h-full absolute z-10"></div>
                    {/* <img src={img1}/> */}
                    {getImage(imageIndex)}
                </div>

                <div className="flex flex-col align-center justify-center w-11/12 md:w-72 h-48 shadow-lg p-4 text-center rounded-lg absolute bg-white transform -translate-x-1/2 left-1/2 md:right-16 -bottom-24 z-20">
                    <p className="font-bold text-sm mb-4">{heading}</p>
                    <p className="text-gray-400 text-sm">{description}</p>
                </div>
            </div>
        </div>
    )
}
