import Image from 'next/image'

export const TalentPoolWelcomeCard = () => {
    return (
        <div className="bg-[#24556D] relative w-full">
            <div className="flex flex-col gap-y-5 md:gap-y-0 md:flex-row">
                <div className="">
                    <Image
                        src={'/images/talent-pool/vec-1.svg'}
                        width={84}
                        height={84}
                        alt="vector-1"
                    />
                </div>
                <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-x-24">
                    <div className="mt-8">
                        <div className="h-2 w-2 bg-[#6971DD] rounded-full ml-9"></div>
                        <h2 className="uppercase text-white text-2xl font-bold mb-1">
                            Welcome To
                        </h2>
                        <h1 className="text-white font-bold bg-[#6971DD] px-9 py-2 text-[36px] rounded-lg whitespace-nowrap">
                            Talent Pool
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5 w-full">
                    <div className="flex justify-between w-full mt-3 px-4">
                        <div className="flex gap-x-5 md:gap-x-24">
                            <div className="">
                                <Image
                                    src={'/images/talent-pool/cross-vec-1.svg'}
                                    width={51}
                                    height={30}
                                    alt="vector-1"
                                />
                            </div>
                            <div className="">
                                <Image
                                    src={'/images/talent-pool/dots-vec-1.svg'}
                                    width={40}
                                    height={17}
                                    alt="vector-1"
                                />
                            </div>
                        </div>
                        <div className="flex gap-x-5 items-center md:gap-x-24 md:justify-between">
                            <div className="">
                                <Image
                                    src={'/images/talent-pool/poly-vec.svg'}
                                    width={14}
                                    height={14}
                                    alt="vector-1"
                                />
                            </div>
                            <div className="md:mr-7">
                                <Image
                                    src={'/images/talent-pool/aquarius-vec.svg'}
                                    width={78}
                                    height={29}
                                    alt="vector-1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-x-5 md:items-center items-end md:justify-between md:gap-x-28 w-full">
                        <div className="md:w-[80%]">
                            <p className='text-white font-semibold md:pl-28 px-4 mb-1.5'>Your Gateway to Premier Professionals.</p>
                            <p className="text-white md:pl-28 px-4">
                                Discover skilled professionals ready to join
                                your team. Our platform seamlessly connects
                                industries with top-tier candidates. From
                                skilled experts to top-notch professionals, find
                                the perfect match effortlessly. Say goodbye to
                                staffing issues and streamline your recruitment
                                process with ease. Unlock your industry's full
                                potential today!
                            </p>
                        </div>
                        <div className="flex items-center gap-x-10 mr-5">
                            <Image
                                className="rotate-180"
                                src={
                                    '/images/talent-pool/cross-vec-vertical.svg'
                                }
                                width={17}
                                height={71}
                                alt="vector-1"
                            />
                            <div className="">
                                <Image
                                    className="rotate-180"
                                    src={'/images/talent-pool/single-dot.svg'}
                                    width={8}
                                    height={8}
                                    alt="vector-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end w-full">
                <Image
                    className="rotate-180"
                    src={'/images/talent-pool/vec-1.svg'}
                    width={54}
                    height={54}
                    alt="vector-1"
                />
            </div>
        </div>
    )
}
