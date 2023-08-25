import { useEffect, useState } from 'react'
import { Button, TextArea, TextInput, Typography } from '@components'
import { KeyFeatures } from '@components/site/KeyFeatures'
import { OurPackage } from '@components/site/OurPackage'
import { NextPage } from 'next'
import Image from 'next/image'
import { Form } from 'react-hook-form'
import { AiFillSchedule } from 'react-icons/ai'
import { FaFileSignature, FaPhoneAlt, FaUserClock } from 'react-icons/fa'
import {
    MdAttachEmail,
    MdOutlineAlternateEmail,
    MdOutlinePolyline,
} from 'react-icons/md'
import { RiComputerFill } from 'react-icons/ri'
import { TbBulbFilled } from 'react-icons/tb'
import { FiPhone } from 'react-icons/fi'
import { IoLocationOutline } from 'react-icons/io5'
import {
    PiLinkedinLogoLight,
    PiInstagramLogoLight,
    PiFacebookLogoLight,
} from 'react-icons/pi'
import { Navbar2 } from '@components/site/navbar'

const Home3: NextPage = () => {
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
            color: 'bg-[#094D8C]',
            textColor: 'text-[#6BB8FF]',
        },
        {
            content: 'The Startup Package',
            manage: 'We Get It Going',
            price: 'From $175/student',
            color: 'bg-[#AD2E06]',
            textColor: 'text-[#F9AE97]',
        },
        {
            content: 'The Complete Package',
            manage: 'We Do It All',
            price: 'From $375/student Applies for STI courses only',
            color: 'bg-[#094D8C]',
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
                            <div className="rotate-12" style={redDivStyle}>
                                <Image
                                    className=""
                                    src="/images/site/scrolling-image-11.png"
                                    layout="responsive"
                                    objectFit="contain"
                                    objectPosition="center"
                                    width={100}
                                    height={100}
                                    alt="hero image"
                                />
                            </div>
                            <div className="rotate-45" style={blackDivStyle}>
                                <Image
                                    className=""
                                    src="/images/site/scrolling-image-12.png"
                                    layout="responsive"
                                    objectFit="contain"
                                    objectPosition="center"
                                    width={100}
                                    height={100}
                                    alt="hero image"
                                />
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
                <Button outline text="View all features" />
            </div>

            {/* Student Placement Management System */}
            <div className="bg-[#EFF5FF]  mt-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-y-2 md:justify-between md:gap-x-12">
                    <div className="pl-20 md:pl-36 py-20">
                        <div className="relative border rounded-full w-[230px] h-[230px] md:w-[520px] md:h-[520px] p-4">
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
                    <div className="px-4 md:px-0 md:pr-36 py-2 md:py-20">
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
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-y-8 md:gap-x-12 md:justify-center items-center px-4 md:px-36">
                {packages.map((pack, index) => (
                    <OurPackage
                        key={index}
                        content={pack.content}
                        manage={pack.manage}
                        price={pack.price}
                        color={pack.color}
                        textColor={pack.textColor}
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
                            className=""
                            src="/images/site/threads.png"
                            layout="responsive"
                            objectFit="contain"
                            width={100}
                            height={100}
                            alt="Map"
                        />
                        <div className="absolute top-1.5 h-80 w-[900px] left-[11.6rem]">
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
                    </div>
                </div>
            </div>
            {/* Map */}
            <div className={` map-bg px-[140px] py-[72px]`}>
                <div className="mb-8 flex justify-center">
                    <Typography variant="h2">
                        We operate in following states
                    </Typography>
                </div>
                {/* Mobile View */}
                <div></div>
                {/* Desktop View */}
                <div className="relative  md:block hidden mx-auto max-w-7xl">
                    <Image
                        className=""
                        src="/images/site/map.png"
                        layout="responsive"
                        objectFit="contain"
                        width={100}
                        height={100}
                        alt="Map"
                    />
                    <div className="cloud-1 z-30 absolute top-10 left-56"></div>
                    <div className="cloud-2 z-30 absolute top-20 left-1/2 "></div>
                    <div className="cloud-1 z-30 absolute top-44 left-40"></div>
                    <div className="cloud-3 z-30 absolute top-56 left-1/3"></div>
                    <div className="cloud-3 z-30 absolute top-56 left-3/4"></div>
                    <div className="cloud-2 z-30 absolute top-80 left-2/3 "></div>
                    {/* <div className="w-full cloud-4 z-30 absolute top-72 "></div>
                    <div className="w-full cloud-5 z-30 absolute top-80 "></div>
                    <div className="w-full cloud-6 z-30 absolute top-96 left-0"></div> */}
                    
                    <div className="absolute">
                         
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
            <div className="md:p-36 px-4 py-8 mt-10 md:mt-0">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-y-10 md:gap-x-20 md:justify-between">
                    <div className="md:w-2/3 w-full">
                        <div className="mb-2">
                            <Typography variant="h1">Lets Talk</Typography>
                        </div>
                        <div>
                            <Typography variant="h4">
                                Tell us about you!
                            </Typography>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-y-4 md:gap-x-20 mt-4">
                            <div className="flex items-center gap-x-4">
                                <div className="p-4 rounded-2xl bg-[#F1DBC6]">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <Typography variant="label">
                                        Call us at
                                    </Typography>
                                    <Typography
                                        variant="subtitle"
                                        color="text-[#EA9037]"
                                    >
                                        03-9363-6378
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <div className="p-4 rounded-2xl bg-[#F1DBC6]">
                                    <MdOutlineAlternateEmail />
                                </div>
                                <div>
                                    <Typography variant="label">
                                        Mail us at
                                    </Typography>
                                    <Typography
                                        variant="subtitle"
                                        color="text-[#EA9037]"
                                    >
                                        info@skiltrak.com.au
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 w-full">
                        <div className="mb-3">
                            <Typography variant="h4">
                                Send Us A Message
                            </Typography>
                        </div>
                        {/* <Form onSubmit={() => {}}> */}
                        <div className="flex flex-col w-full">
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="name"
                                placeholder="Name"
                            />
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="email"
                                placeholder="Email"
                            />
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="subject"
                                placeholder="Subject"
                            />
                            <Typography variant="label">
                                Tell us about your query
                            </Typography>
                            <TextArea
                                color="bg-[#F1DBC6] bg-opacity-25"
                                rows={5}
                                name="message"
                                placeholder="Message"
                            />
                        </div>
                        {/* </Form> */}
                    </div>
                </div>
            </div>

            {/*  Footer */}
            <div className="w-full h-4 bg-[#F6910F]"></div>
            <div className="md:px-36 px-4 py-4 md:py-[72px] footer-bg">
                <div className="max-w-7xl mx-auto gap-y-4 grid grid-cols-1 md:grid-cols-3">
                    <div className="flex flex-col items-center md:block">
                        <Image
                            className="mb-8"
                            src="/images/site/skiltrak-logo.png"
                            width={100}
                            height={100}
                            alt="logo"
                        />
                        <div className="flex flex-col items-center md:items-start gap-y-4">
                            <a
                                href="tel:03-9363-6378"
                                className="flex items-center gap-x-4"
                            >
                                <div>
                                    <FiPhone className="text-[#F6910F]" />
                                </div>
                                <div className="cursor-pointer text-sm font-medium text-[#AEAEAE]">
                                    03-9363-6378
                                </div>
                            </a>

                            <a
                                href="mailto:info@skiltrak.com.au"
                                className="flex items-center gap-x-4"
                            >
                                <div>
                                    <MdOutlineAlternateEmail className="text-[#F6910F]" />
                                </div>
                                <div className="cursor-pointer text-sm font-medium text-[#AEAEAE]">
                                    info@skiltrak.com.au
                                </div>
                            </a>
                            <div className="flex items-center gap-x-4">
                                <div>
                                    <IoLocationOutline className="text-[#F6910F]" />
                                </div>
                                <div className="cursor-pointer text-sm font-medium text-[#AEAEAE]">
                                    Melbourne, Vic, Australia 3000
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-6 mt-8">
                            <a href="#">
                                <PiFacebookLogoLight className="text-[#F6910F] text-3xl" />
                            </a>
                            <a href="#">
                                <PiInstagramLogoLight className="text-[#F6910F] text-3xl" />
                            </a>
                            <a href="#">
                                <PiLinkedinLogoLight className="text-[#F6910F] text-3xl" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-y-8">
                        <Typography variant="title" color="text-[#F6910F]">
                            Quick Links
                        </Typography>
                        <div className="flex items-center flex-col gap-y-4">
                            <a href="#">
                                <Typography
                                    variant="body"
                                    color="text-[#AEAEAE]"
                                >
                                    Home
                                </Typography>
                            </a>
                            <a href="#">
                                <Typography
                                    variant="body"
                                    color="text-[#AEAEAE]"
                                >
                                    Features
                                </Typography>
                            </a>
                            <a href="#">
                                <Typography
                                    variant="body"
                                    color="text-[#AEAEAE]"
                                >
                                    Contact Us
                                </Typography>
                            </a>
                            <a href="#">
                                <Typography
                                    variant="body"
                                    color="text-[#AEAEAE]"
                                >
                                    Abouts
                                </Typography>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-y-8">
                        <Typography variant="label" color="text-[#F6910F]">
                            JOIN THE JOURNEY OF PASSION AND FULFILMENT
                        </Typography>
                        <div className="ml-3">
                            <Typography variant="small" color="text-white">
                                An easy approach to the industry with a
                                professional team that has been put together to
                                lead you to your career goals. SkilTrak prepares
                                you from the beginning of your job path, from
                                the design of a strong CV, interview tips and
                                role plays to your first day in the industry.
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto  border-t border-[#F6910F] my-8"></div>
                <div className="max-w-7xl mx-auto  flex flex-col md:flex-row md:justify-between items-center">
                    <div>
                        <Typography variant="xs" color="text-[#AEAEAE]">
                            All Rights Reserved - 2023
                        </Typography>
                    </div>
                    <div>
                        <a href="#" className="text-[#AEAEAE] text-xs">
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home3
