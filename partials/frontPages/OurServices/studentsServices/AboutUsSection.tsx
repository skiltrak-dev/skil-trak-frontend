import { Button } from '@components'
import Image from 'next/image'
import React from 'react'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'

export const AboutUsSection = () => {
    return (
        <section className="md:py-20 py-10 max-w-7xl mx-auto md:px-0 px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <p className="bg-gradient-to-r from-[#9B2000] to-[#044866] bg-clip-text text-transparent font-bold capitalize">
                    About us
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-primaryNew mb-6">
                    Your Trusted Partner for Industry Placements
                </h2>
                <p className="text-primaryNew mb-6 leading-relaxed">
                    Our dedicated support team is always ready to assist you,
                    whether you need help scheduling a placement, understanding
                    the process, or navigating compliance.
                </p>
                <div className="flex md:gap-20 gap-10 text-center flex-col md:flex-row">
                    <div>
                        <p className=" text-[50px] font-extrabold leading-none capitalize text-transparent [-webkit-text-stroke:1px_#044866]">
                            2000+
                        </p>

                        <p className="text-base font-medium text-primaryNew">
                            Successful Placements
                        </p>
                    </div>

                    <div>
                        <p className=" text-[50px] font-extrabold leading-none capitalize text-transparent [-webkit-text-stroke:1px_#044866]">
                            35k+
                        </p>

                        <p className="text-base font-medium text-primaryNew">
                            Industry Connections
                        </p>
                    </div>
                </div>

                <div className="mt-10 relative flex flex-col gap-y-4 md:flex-row items-center w-full md:justify-between">
                    <Button text="About Us" />
                    <div className="absolute left-56  md:left-[5.2rem] top-0 md:top-2">
                        <BsArrowUpRightCircleFill
                            size={30}
                            className="text-primaryNew"
                        />
                    </div>
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="199"
                            height="44"
                            viewBox="0 0 199 44"
                            fill="none"
                        >
                            <path
                                d="M1.60254 2C11.356 2 11.356 42 21.1094 42C30.8628 42 30.8628 2 40.6163 2C50.3697 2 50.3697 42 60.1003 42C69.854 42 69.854 2 79.5843 2C89.3379 2 89.3379 42 99.0682 42C108.822 42 108.822 2 118.575 2C128.328 2 128.328 42 138.082 42C147.835 42 147.835 2 157.589 2C167.342 2 167.342 42 177.096 42C186.849 42 186.849 2 196.603 2"
                                stroke="#FFC358"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="relative">
                <Image
                    src="/images/site/services/student-services/about-us/your-trusted-partner-for-placement.png"
                    alt="placement"
                    width={500}
                    height={500}
                />
            </div>
        </section>
    )
}
