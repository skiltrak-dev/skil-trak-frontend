import { Button } from '@components'
import Image from 'next/image'
import React from 'react'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'

export const IndustryServicesAboutUsSection = () => {
    return (
        <section className="bg-no-repeat" style={{
            backgroundImage: 'url(/images/site/services/industry-services/about-us-bg.png)',
            backgroundPosition: 'right'
        }}>
            <div className="md:pt-20 py-10 max-w-7xl mx-auto md:px-0 px-4 flex flex-col gap-16 md:flex-row md:gap-40 items-center">

            <div className="w-1/2">
                <Image
                    src="/images/site/services/industry-services/about-us.png"
                    alt="placement"
                    width={570}
                    height={570}
                    className='w-full'
                />
            </div>

            <div className=''>
                <p className="bg-gradient-to-r from-[#9B2000] to-[#044866] bg-clip-text text-transparent font-bold capitalize">
                    About us
                </p>

                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Collaboration That Builds <br/> Careers
                </h2>
                <p className="text-primaryNew mb-6 leading-8 md:w-[40rem]">
                    SkilTrak connects RTOs, students, and host employers to
                    deliver work-based Training solutions and support. Our
                    strategic approach ensures VET Standard aligned placements,
                    enhances student outcomes, and supports Training
                    Organizations in building strong, industry-driven
                    partnerships.
                </p>
                <div className="flex gap-10 flex-col md:flex-row">
                    <div>
                        <p className=" text-[50px] font-extrabold leading-none capitalize text-transparent [-webkit-text-stroke:1px_#044866]">
                            47+
                        </p>

                        <p className="font-medium text-primaryNew">
                            Partnered Training Organisation
                        </p>
                    </div>
                </div>

                <div className="mt-10 relative flex gap-x-1 flex-row items-center w-full">
                    <Button text="About Us" variant="error" />
                    <div className="">
                        <BsArrowUpRightCircleFill
                            size={30}
                            className="text-[#9B2000] cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}
