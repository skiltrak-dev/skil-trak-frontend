import { Button, Typography } from '@components'
import { ContactUs } from '@components/site/ContactUs'
import { Footer3 } from '@components/site/Footer3'
import { KeyFeatures } from '@components/site/KeyFeatures'
import { OurPackage } from '@components/site/OurPackage'
import { Navbar2 } from '@components/site/navbar'
import { PackagesDetail } from '@partials/frontPages'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiFillSchedule } from 'react-icons/ai'
import { BiSolidDownArrow } from 'react-icons/bi'
import { FaFileSignature, FaUserClock } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import {
    MdAttachEmail,
    MdOutlinePolyline
} from 'react-icons/md'
import { RiComputerFill } from 'react-icons/ri'
import { TbBulbFilled } from 'react-icons/tb'

const Home3: NextPage = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [selectedPackage, setSelectedPackage] = useState(-1)
    const [isDone, setIsDone] = useState<boolean>(false)
    const containerHeight = 1000

    const router = useRouter()

    console.log({ selectedPackage })

    useEffect(() => {
        if (selectedPackage > 0) {
            console.log('Shunnr')
            setTimeout(() => {
                setIsDone(true)
            }, 1000)
        } else {
            setTimeout(() => {
                setIsDone(false)
            }, 1000)
        }
    }, [selectedPackage])

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
    const features = [
        {
            icon: <MdOutlinePolyline />,
            title: 'Automated Allocation',
            content: `A hassle-free process offered by Skiltrak students accounts are automatically`,
            color: 'bg-[#FFFAEF]',
        },
        {
            icon: <RiComputerFill />,
            title: 'Automated Allocation',
            content: `A hassle-free process offered by Skiltrak students accounts are automatically`,
            color: 'bg-[#F3F8FC]',
        },
        {
            icon: <FaUserClock />,
            title: 'Automated Allocation',
            content: `A hassle-free process offered by Skiltrak students accounts are automatically`,
            color: 'bg-[#E8F8F4]',
        },
        {
            icon: <FaFileSignature />,
            title: 'Automated Allocation',
            content: `A hassle-free process offered by Skiltrak students accounts are automatically`,
            color: 'bg-[#FDF7F6]',
        },
        {
            icon: <AiFillSchedule />,
            title: 'Automated Allocation',
            content: `A hassle-free process offered by Skiltrak students accounts are automatically`,
            color: 'bg-[#FBFBFC]',
        },
        {
            icon: <MdAttachEmail />,
            title: 'Automated Allocation',
            content: `A hassle-free process offered by Skiltrak students accounts are automatically`,
            color: 'bg-[#EFFAFD]',
        },
    ]
    const packages = [
        {
            content: 'Placement Management Portal',
            manage: 'Do it yourself',
            price: 'From $7/month (Per User)',
            color: 'bg-gradient-to-b from-[#094D8C] to-[#06345E]',
            textColor: 'text-[#6BB8FF]',
        },
        {
            content: 'The Startup Package',
            manage: 'We Get It Going',
            price: 'From $175/student',
            color: 'bg-gradient-to-b from-[#EC8D12] to-[#E95616]',
            textColor: 'text-[#F9AE97]',
        },
        {
            content: 'The Complete Package',
            manage: 'We Do It All',
            price: 'From $375/student Applies for STI courses only',
            color: 'bg-gradient-to-b from-[#094D8C] to-[#06345E]',
            textColor: 'text-[#6BB8FF]',
        },
    ]
    const studentPlacement = [
        {
            title: 'Trust us with your student placement at Skiltrak',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam nibh in diam dictum mattis. Sed eget posuere tellus, sit amet luctus mi.`,
        },
        {
            title: 'Get surrounded by an encouraging and supportive team',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam nibh in diam dictum mattis. Sed eget posuere tellus, sit amet luctus mi.`,
        },
        {
            title: 'Receive our Student Placement Management Platform',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam nibh in diam dictum mattis. Sed eget posuere tellus, sit amet luctus mi.`,
        },
        {
            title: 'Track your student placement progress',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam nibh in diam dictum mattis. Sed eget posuere tellus, sit amet luctus mi.`,
        },
        {
            title: 'Create industry partners along the way',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam nibh in diam dictum mattis. Sed eget posuere tellus, sit amet luctus mi.`,
        },
    ]

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

    console.log({ isDone })

    return (
        <div>
            <Navbar2 />
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
                                A user-friendly placement platform. No hassle,
                                no documentation missing . Be innovative and
                                efficient.
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

            
            {/* Key Features */}
            <div className="w-full flex justify-center px-4">
                <Typography variant="h2">
                    Key features and benefits of SkilTrak
                </Typography>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-3 my-4 px-4 md:px-36">
                {features.map((feature, index) => (
                    <KeyFeatures
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        content={feature.content}
                        color={feature.color}
                    />
                ))}
            </div>
            <div className="flex justify-center my-5">
                <Button
                    outline
                    text="View all features"
                    onClick={() => router.push('/features')}
                />
            </div>

            {/* Student Placement Management System */}
            <div className="bg-[#EFF5FF]  mt-16">
                <div className="max-w-7xl mx-auto block md:flex md:justify-between md:gap-x-12">
                    <div className="pl-0 md:pl-36 py-0 md:py-20">
                        <div className="md:block hidden relative border rounded-full w-[230px] h-[230px] md:w-[520px] md:h-[520px] p-4">
                            <div className="border rounded-full w-[200px] h-[200px] md:w-[480px] md:h-[480px] p-4"></div>
                            <div className="absolute md:w-auto w-36 left-24 -top-6 md:top-0 md:left-[270px]">
                                <Image
                                    src="/images/site/Badges.png"
                                    layout="responsive"
                                    objectFit="contain"
                                    width={100}
                                    height={100}
                                    alt="hero image"
                                />
                            </div>
                            <div className="absolute w-72 md:w-auto top-0 -left-20">
                                <Image
                                    src="/images/site/student-placement.png"
                                    layout="responsive"
                                    objectFit="contain"
                                    width={100}
                                    height={100}
                                    alt="hero image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 md:px-0 md:pr-36 py-8 md:py-20">
                        <div className="mb-5">
                            <Typography variant="h3">
                                Student Placement Management System
                            </Typography>
                        </div>
                        <div>
                            {studentPlacement.map((placement, index) => (
                                <>
                                    <div className="flex gap-x-2">
                                        <TbBulbFilled className="text-[#F7910F] text-lg" />
                                        <Typography
                                            variant="label"
                                            color={'text-[#F7910F]'}
                                        >
                                            {placement.title}
                                        </Typography>
                                    </div>
                                    <div className="md:ml-7 ml-4">
                                        <Typography
                                            variant="body"
                                            color={'text-[#6B7280]'}
                                        >
                                            {placement.content}
                                        </Typography>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Our packages */}
            <div className=" mt-16 mb-4 flex justify-center">
                <Typography variant="h2">Our Packages</Typography>
            </div>

            <div
                className={`${
                    selectedPackage > 0 ? 'opacity-100 delay-1000' : 'opacity-0'
                } transition-all duration-1000 ${!isDone ? 'hidden' : 'block'}`}
            >
                <PackagesDetail
                    onClick={() => {
                        setSelectedPackage(-1)
                    }}
                />
            </div>

            <div
                className={`${
                    selectedPackage > 0 ? 'opacity-0' : 'opacity-100 delay-1000'
                } ${
                    isDone ? 'hidden' : 'block'
                } transition-all duration-1000 max-w-7xl mx-auto flex flex-col md:flex-row gap-y-8 md:gap-x-12 md:justify-center items-center px-4 md:px-36`}
            >
                {packages.map((pack, index) => (
                    <OurPackage
                        key={index}
                        content={pack.content}
                        manage={pack.manage}
                        price={pack.price}
                        color={pack.color}
                        textColor={pack.textColor}
                        onClick={() => {
                            setSelectedPackage(index + 1)
                        }}
                    />
                ))}
            </div>

            {/* Our Partners */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex justify-center">
                        <Typography variant="h2">Our Partners</Typography>
                    </div>
                    <div className="relative">
                        <Image
                            className="md:block hidden"
                            src="/images/site/threads.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Map"
                        />
                        {/* Mobile view */}
                        <Image
                            className="md:hidden block"
                            src="/images/site/threads-mob.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Partners"
                        />
                        <div className="md:block hidden absolute top-1.5 h-80 w-[900px] left-[11.6rem]">
                            <Image
                                className=""
                                src="/images/site/partners.png"
                                layout="responsive"
                                objectFit="contain"
                                width={100}
                                height={100}
                                alt="Partners"
                            />
                        </div>
                        {/* Mobile view */}
                        <div className="md:hidden block px-3 absolute w-[380px] h-[340px] top-[2.5rem] left-3">
                            <Image
                                src="/images/site/partners-mob.png"
                                layout="responsive"
                                objectFit="contain"
                                width={100}
                                height={100}
                                alt="threads"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Map */}
            <div className={`map-bg px-4 py-8 md:px-[140px] md:py-[72px]`}>
                <div className="mb-8 flex justify-center">
                    <h2 className="font-bold md:text-4xl text-2xl">
                        We operate in following states
                    </h2>
                </div>

                {/* Desktop View */}
                <div className=" mx-auto max-w-7xl">
                    <div className="relative w-96 h-[300px] md:w-[1024px] md:h-[668px] ">
                        <Image
                            className="w-full h-full"
                            src="/images/site/map.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Map"
                        />
                        <div className="cloud-1 hidden md:block z-30 absolute top-5 left-56"></div>
                        <div className="cloud-2 hidden md:block z-30 absolute top-28 left-1/2 "></div>
                        <div className="cloud-1 hidden md:block z-30 absolute top-52 left-40"></div>
                        <div className="cloud-3 hidden md:block z-30 absolute top-64 left-1/3"></div>
                        <div className="cloud-3 hidden md:block z-30 absolute top-56 left-3/4"></div>
                        <div className="cloud-2 hidden md:block z-30 absolute top-[22rem] left-2/3 "></div>

                        <Link
                            href={'#'}
                            className="z-40 absolute hover:text-white group top-16 right-16 md:top-24 md:right-48 "
                        >
                            <div className="bg-white  group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                <HiLocationMarker className="hover:text-white text-xs md:text-[16px]" />
                                <p className="text-xs md:text-[16px]">
                                    Queens Land
                                </p>
                            </div>
                            <BiSolidDownArrow className="text-white md:w-auto w-full md:text-left text-right group-hover:text-[#F7910F] text-xs md:text-2xl ml-11 md:ml-0 mt-0.5 md:mt-2" />
                        </Link>
                        <Link
                            href={'#'}
                            className="z-40 absolute group top-4 left-44 md:top-[8rem] md:left-[23.5rem] "
                        >
                            <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                <HiLocationMarker className="hover:text-white text-xs md:text-[16px]" />
                                <p className="text-xs md:text-[16px]">
                                    Northern Territory
                                </p>
                            </div>
                            <BiSolidDownArrow className="text-white group-hover:text-[#F7910F] text-lg md:text-2xl mt-0.5 md:mt-2" />
                        </Link>
                        <Link
                            href={'#'}
                            className="z-40 absolute group top-[8.5rem] left-24 md:top-[17rem] md:left-[26.5rem] "
                        >
                            <BiSolidDownArrow className="ml-16 md:ml-0 rotate-180 w-full text-right text-white md:hidden block group-hover:text-[#F7910F] text-xs mb-0.5" />
                            <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                <HiLocationMarker className="hover:text-white text-xs md:text-[16px]" />
                                <p className="text-xs md:text-[16px]">
                                    Southern Australia
                                </p>
                            </div>
                            <BiSolidDownArrow className="text-white hidden md:block group-hover:text-[#F7910F] text-2xl mt-2" />
                        </Link>
                        <Link
                            href={'#'}
                            className="z-40 absolute group top-[4.8rem] left-14 md:top-[13.5rem] md:left-[11rem] "
                        >
                            <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                <HiLocationMarker className="hover:text-white text-xs md:text-[16px] " />
                                <p className="text-xs md:text-[16px]">
                                    Western Australia
                                </p>
                            </div>
                            <BiSolidDownArrow className="text-white group-hover:text-[#F7910F] text-xs md:text-2xl mt-0.5 md:mt-2" />
                        </Link>
                        <Link
                            href={'#'}
                            className="z-40 absolute group top-[6.5rem] right-10 md:top-[14.5rem] md:right-4"
                        >
                            <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                <HiLocationMarker className="hover:text-white text-xs md:text-[16px]" />
                                <p className="text-xs md:text-[16px]">
                                    New South Wales
                                </p>
                            </div>
                            <BiSolidDownArrow className="text-white w-full text-right md:text-left md:w-auto group-hover:text-[#F7910F] text-xs md:text-2xl mt-0.5 md:mt-2" />
                        </Link>
                        <Link
                            href={'#'}
                            className="z-40 absolute group top-36 right-16 md:top-[22.8rem] md:right-[11.3rem]"
                        >
                            <div className="bg-white group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 flex items-center gap-x-1 md:gap-x-2">
                                <HiLocationMarker className="hover:text-white text-xs md:text-[16px]" />
                                <p className="text-xs md:text-[16px]">
                                    Victoria
                                </p>
                            </div>
                            <BiSolidDownArrow className="text-white group-hover:text-[#F7910F] text-xs md:text-2xl mt-0.5 md:mt-2" />
                        </Link>
                        <Link
                            href={'#'}
                            className="z-40 absolute group top-[12.6rem] right-[6rem] md:top-[31.2rem] md:right-[8.5rem]"
                        >
                            <div className="bg-white hidden group-hover:bg-[#F7910F] hover:text-white px-1 md:px-2 py-0.5 md:py-1 md:flex items-center gap-x-1 md:gap-x-2">
                                <HiLocationMarker className="hover:text-white " />
                                <p className="text-xs md:text-[16px]">
                                    Tasmania
                                </p>
                            </div>
                            <BiSolidDownArrow className="text-white hidden md:block group-hover:text-[#F7910F] text-2xl mt-2" />
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
                    </div>
                </div>
            </div>

            {/* Get Started With Us */}
            <div className="md:px-36 px-4 py-8 md:py-20 bg-[#192A65]">
                <div className="max-w-7xl mx-auto gap-y-4 flex flex-col-reverse md:flex-row items-center md:gap-x-20 md:justify-between">
                    <div className="w-full md:w-2/4">
                        <Image
                            src="/images/site/get-started-with-us.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="get-started-with-us"
                        />
                    </div>
                    <div className="md:w-2/4 w-full flex flex-col gap-y-4">
                        <div className="">
                            <Typography variant="h3" color="text-white">
                                Get Started With Us
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body" color="text-white">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc aliquam nibh in diam
                                dictum mattis. Sed eget posuere tellus, sit amet
                                luctus mi.
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button outline text="Sign up" />
                            <Button variant="primary" text="Request a demo" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Lets Talk */}
            <ContactUs />

            {/*  Footer */}
            <Footer3 />
        </div>
    )
}
export default Home3
