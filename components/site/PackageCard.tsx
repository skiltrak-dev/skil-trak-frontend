import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { BsCheck2Circle } from 'react-icons/bs'

export const PackageCard = ({
    img,
    heading,
    subheading,
    features,
    link,
}: any) => {
    return (
        <div
            className="
        bg-white
        rounded-xl
        overflow-hidden
        shadow-md
        flex flex-col
        self-stretch
        w-full
        sm:w-3/4
        md:mx-auto
        lg:w-2/7
        mb-5
        relative
        transition-all
        transform
        scale-100
        hover:scale-105
      "
        >
            <div>
                <Image
                    src="https://picsum.photos/350/100"
                    alt="Illustration for online education"
                    className="w-full"
                    width={0}
                    height={0}
                    sizes={'100vw'}
                />
            </div>
            <div className="rounded-xl">
                <div
                    className="text-white
            bg-primary
            inline-block
            px-8
            py-4
            rounded-r
            text-right
            -mt-16
            relative"
                >
                    <h4 className="font-semibold uppercase">{heading}</h4>
                    <span className="text-sm uppercase">{subheading}</span>
                </div>

                <ul className="mt-3 mb-24 px-5">
                    {features.map((feature: any, i: number) => (
                        <li
                            className="mb-3 font-medium text-sm text-dark"
                            key={i}
                        >
                            <div className="flex items-start">
                                <BsCheck2Circle
                                    className="text-theme-secondary mr-2 flex-shrink-0"
                                    size={18}
                                />
                                {feature}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full absolute bottom-0 right-0 text-center">
                <Link
                    href={link}
                    className="inline-block 
    text-theme-secondary 
    px-5  
    py-3 
    my-5 
    rounded-xl 
    hover:bg-gray-100"
                >
                    enquire now
                </Link>
            </div>
        </div>
    )
}
