import Image from 'next/image'
import Link from 'next/link'
import { BiSolidDownArrow } from 'react-icons/bi'
import { HiLocationMarker } from 'react-icons/hi'

export const WeOperate = () => {
    return (
        <>
            <div className={`relative map-bg`}>
                <div className=" px-4 py-8  md:px-[140px] md:pt-[72px]">
                    <div className="mb-8 flex justify-center">
                        <h2 className="font-bold md:text-4xl text-2xl">
                            We operate in following states
                        </h2>
                    </div>

                    {/* Desktop View */}
                    <div className=" mx-auto max-w-7xl  ">
                        <div className="relative w-96 h-[300px] md:w-[800px] md:h-[444px] mx-auto">
                            <Image
                                className=""
                                src="/images/site/map.png"
                                layout="responsive"
                                objectFit="contain"
                                width={100}
                                height={100}
                                alt="Map"
                            />
                            <div className="cloud-1 hidden md:block z-30 absolute top-1 left-56"></div>
                            <div className="cloud-2 hidden md:block z-30 absolute top-20 left-1/2 "></div>
                            <div className="cloud-1 hidden md:block z-30 absolute top-28 left-40"></div>
                            <div className="cloud-3 hidden md:block z-30 absolute top-44 left-1/3"></div>
                            <div className="cloud-3 hidden md:block z-30 absolute top-44 left-3/4"></div>
                            <div className="cloud-2 hidden md:block z-30 absolute top-[15rem] left-2/3 "></div>

                            <Link
                                href={
                                    'https://www.google.com/maps/place/Queensland,+Australia/@-18.8511163,135.0927291,5z/data=!3m1!4b1!4m6!3m5!1s0x6bd4df247a62dcfd:0xf5f2d0227612be99!8m2!3d-22.575197!4d144.0847926!16zL20vMGczOWg?entry=ttu'
                                }
                                className="z-40 absolute hover:text-white group top-14 right-[5.6rem] md:top-20 md:right-[13%] "
                            >
                                <BiSolidDownArrow className="md:hidden block rotate-180 text-white md:w-auto w-full md:text-left text-right group-hover:text-[#F7910F] text-xs md:text-2xl ml-11 md:ml-0 mt-0.5 md:mt-2" />
                                <div className="bg-white  group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                    <HiLocationMarker className="hover:text-white text-xs" />
                                    <p className="text-xs">
                                        Queens Land
                                    </p>
                                </div>
                                <BiSolidDownArrow className="md:block hidden text-white md:w-auto w-full md:text-left text-right group-hover:text-[#F7910F] text-xs ml-11 md:ml-0 mt-0.5 md:mt-1" />
                            </Link>
                            <Link
                                href={
                                    'https://www.google.com/maps/place/Northern+Territory,+Australia/@-18.1830844,122.8162297,5z/data=!3m1!4b1!4m6!3m5!1s0x2b5172c2e6f3190f:0x2775!8m2!3d-19.4914108!4d132.5509603!16zL20vMDVmZjY?entry=ttu'
                                }
                                className="z-40 absolute group top-4 left-44 md:top-[13%] md:left-[46%] "
                            >
                                <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                    <HiLocationMarker className="hover:text-white text-xs" />
                                    <p className="text-xs">
                                        Northern Territory
                                    </p>
                                </div>
                                <BiSolidDownArrow className="text-white group-hover:text-[#F7910F] text-xs mt-0.5 md:mt-1" />
                            </Link>
                            <Link
                                href={
                                    'https://www.google.com/maps/place/South+Australia,+Australia/@-31.5843508,124.3613065,5z/data=!3m1!4b1!4m6!3m5!1s0x6aa7589e5be8c7f3:0xdb7e79993dfad0d8!8m2!3d-30.0002315!4d136.2091547!16zL20vMDZtdHE?entry=ttu'
                                }
                                className="z-40 absolute group top-[8rem] left-14 md:top-[52%] md:left-[47%] "
                            >
                                <BiSolidDownArrow className="ml-16 md:ml-0 rotate-180 w-full text-right text-white md:hidden block group-hover:text-[#F7910F] text-xs mb-0.5" />
                                <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                    <HiLocationMarker className="hover:text-white text-xs" />
                                    <p className="text-xs">
                                        Southern Australia
                                    </p>
                                </div>
                                <BiSolidDownArrow className="text-white hidden md:block group-hover:text-[#F7910F] text-xs mt-1" />
                            </Link>
                            <Link
                                href={
                                    'https://www.google.com/maps/place/Western+Australia,+Australia/@-24.0384057,110.2938342,5z/data=!3m1!4b1!4m6!3m5!1s0x2a392a2e89f384d1:0x6e0e4adf3200a399!8m2!3d-27.6728168!4d121.6283098!16zL20vMDg0N3E?entry=ttu'
                                }
                                className="z-40 absolute group top-[4.2rem] left-11 md:top-[37%] md:left-[12.5%] "
                            >
                                <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                    <HiLocationMarker className="hover:text-white text-xs" />
                                    <p className="text-xs">
                                        Western Australia
                                    </p>
                                </div>
                                <BiSolidDownArrow className="text-white group-hover:text-[#F7910F] text-xs mt-0.5 md:mt-1" />
                            </Link>
                            <Link
                                href={
                                    'https://www.google.com/maps/place/New+South+Wales,+Australia/@-32.3802907,139.4146106,5z/data=!3m1!4b1!4m6!3m5!1s0x6b0dcb74f75e4b0d:0x1780af1122c49f2d!8m2!3d-31.2532183!4d146.921099!16zL20vMDVmbHk?entry=ttu'
                                }
                                className="z-40 absolute group top-[6.3rem] -right-1 md:top-[55%] md:-right-3"
                            >
                                <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                    <HiLocationMarker className="hover:text-white text-xs" />
                                    <p className="text-[10px]">
                                        New South Wales
                                    </p>
                                </div>
                                <BiSolidDownArrow className="text-white w-full text-right md:text-left md:w-auto group-hover:text-[#F7910F] text-xs mt-0.5 md:mt-1" />
                            </Link>
                            <Link
                                href={
                                    'https://www.google.com/maps/place/Victoria,+Australia/@-36.2443251,143.4996593,6.25z/data=!4m6!3m5!1s0x6ad4314b7e18954f:0x5a4efce2be829534!8m2!3d-36.9847807!4d143.3906074!16zL20vMGNoZ3Iy?entry=ttu'
                                }
                                className="z-40 absolute group bottom-32 right-12 md:bottom-[20%] md:right-[19%]"
                            >
                                <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                    <HiLocationMarker className="hover:text-white text-xs" />
                                    <p className="text-xs">Victoria</p>
                                </div>
                                <BiSolidDownArrow className="text-white group-hover:text-[#F7910F] text-xs mt-0.5 md:mt-1" />
                            </Link>
                            <Link
                                href={
                                    'https://www.google.com/maps/place/Tasmania,+Australia/@-41.405173,141.4311049,6z/data=!4m6!3m5!1s0xaa7aed277e34facf:0x2a8fa5dd29404064!8m2!3d-42.0409059!4d146.8087323!16zL20vMDdjZng?entry=ttu'
                                }
                                className="z-40 absolute group bottom-[4.5rem] right-[5.5rem] md:bottom-[-3%] md:right-[9%]"
                            >
                                <div className="bg-white hidden group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 md:flex items-center gap-x-1 md:gap-x-2">
                                    <HiLocationMarker className="hover:text-white text-xs" />
                                    <p className="text-xs">Tasmania</p>
                                </div>
                                <BiSolidDownArrow className="text-white hidden md:block group-hover:text-[#F7910F] text-xs mt-1" />
                                <div className="flex items-center md:hidden ">
                                    <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                        <HiLocationMarker className="hover:text-white " />
                                        <p className="text-xs md:text-[16px]">
                                            Tasmania
                                        </p>
                                    </div>
                                    <BiSolidDownArrow className="text-white -rotate-90 group-hover:text-[#F7910F] text-xs md:text-2xl mt-0 md:mt-2" />
                                </div>
                            </Link>

                            {/* <div className="ripple-effect top-0 z-20"></div>
                    <div className="ripple-effect top-0 z-20"></div> */}
                        </div>
                    </div>
                </div>
                <div className="">
                    <svg
                        className="waves"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28"
                        preserveAspectRatio="none"
                        shapeRendering="auto"
                    >
                        <defs>
                            <path
                                id="gentle-wave"
                                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                            />
                        </defs>
                        <g className="parallax">
                            <use
                                xlinkHref="#gentle-wave"
                                x="48"
                                y="0"
                                fill="rgba(255,255,255,0.7"
                            />
                            <use
                                xlinkHref="#gentle-wave"
                                x="48"
                                y="3"
                                fill="rgba(255,255,255,0.5)"
                            />
                            <use
                                xlinkHref="#gentle-wave"
                                x="48"
                                y="5"
                                fill="rgba(255,255,255,0.3)"
                            />
                            <use
                                xlinkHref="#gentle-wave"
                                x="48"
                                y="7"
                                fill="#fff"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </>
    )
}
