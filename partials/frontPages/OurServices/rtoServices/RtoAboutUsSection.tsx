import { Button } from '@components'
import Image from 'next/image'
import React from 'react'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'

export const RtoAboutUsSection = () => {
    return (
        <section className="md:pt-20 py-10 max-w-7xl mx-auto md:px-0 px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <Image
                    src="/images/site/services/rto-services/about-us.png"
                    alt="placement"
                    width={500}
                    height={500}
                />
            </div>

            <div>
                <p className="bg-gradient-to-r from-[#9B2000] to-[#044866] bg-clip-text text-transparent font-bold capitalize">
                    About us
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    We Are a Strategic Placement Company
                </h2>
                <p className="text-primaryNew mb-6 leading-relaxed">
                    SkilTrak connects RTOs, students, and host employers to
                    deliver work-based Training solutions and support. Our
                    strategic approach ensures VET Standard aligned placements,
                    enhances student outcomes, and supports Training
                    Organizations in building strong, industry-driven
                    partnerships.
                </p>
                <div className="flex gap-10 text-center flex-col md:flex-row">
                    <div>
                        <p className=" text-[50px] font-extrabold leading-none capitalize text-transparent [-webkit-text-stroke:1px_#044866]">
                            12,500+
                        </p>

                        <p className="font-medium text-primaryNew">
                            Students Successfully Placed
                        </p>
                    </div>

                    <div>
                        <p className=" text-[50px] font-extrabold leading-none capitalize text-transparent [-webkit-text-stroke:1px_#044866]">
                            45+
                        </p>

                        <p className="font-medium text-primaryNew">
                            RTO Partnerships Across Australia
                        </p>
                    </div>
                    <div>
                        <p className=" text-[50px] font-extrabold leading-none capitalize text-transparent [-webkit-text-stroke:1px_#044866]">
                            25+
                        </p>

                        <p className="font-medium text-primaryNew">Courses</p>
                    </div>
                </div>

                <div className="mt-10 relative flex flex-col gap-y-4 md:flex-row items-center w-full md:justify-between">
                    <Button text="About Us" variant="primaryNew" />
                    <div className="absolute left-60  md:left-24 top-0 md:top-2">
                        <BsArrowUpRightCircleFill
                            size={30}
                            className="text-primaryNew cursor-pointer"
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
                                d="M2 2C11.7534 2 11.7534 42 21.5069 42C31.2603 42 31.2603 2 41.0137 2C50.7672 2 50.7672 42 60.4977 42C70.2515 42 70.2515 2 79.9817 2C89.7354 2 89.7354 42 99.4657 42C109.219 42 109.219 2 118.972 2C128.726 2 128.726 42 138.48 42C148.232 42 148.232 2 157.986 2C167.74 2 167.74 42 177.493 42C187.246 42 187.246 2 197 2"
                                stroke="#044866"
                                stroke-width="3"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}
