import Image from 'next/image'
import { BsRecordCircle, BsStars } from 'react-icons/bs'
import { FaConnectdevelop } from 'react-icons/fa'
import { GiPapers } from 'react-icons/gi'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { TbBulbFilled } from 'react-icons/tb'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { Ellipse } from './Ellipse'
import { EllipseMob } from './EllipseMob'

export const StudentPlacementManagement = () => {
    const studentPlacement = [
        {
            title: 'Trust us with your student placement at Skiltrak',
            content: `Entrust us with your student placement at Skiltrak, where our dedicated team ensures you find the ideal academic institution and program for a successful educational journey.`,
        },
        {
            title: 'Get surrounded by an encouraging and supportive team',
            content: `Experience the warmth and support of our encouraging team, surrounding you with unwavering positivity.`,
        },
        {
            title: 'Receive our Student Placement Management Platform',
            content: `Embrace our Student Placement Management Platform, designed to streamline and enhance your student placement experience.`,
        },
        {
            title: 'Track your student placement progress',
            content: `Effortlessly monitor your student placement progress with our intuitive tracking system.`,
        },
        {
            title: 'Create industry partners along the way',
            content: `Forge valuable industry partnerships along your journey with us, opening doors to endless opportunities.`,
        },
    ]
    return (
        <div className="bg-[#EFF5FF] mt-0 md:mt-16">
            <div className="max-w-7xl mx-auto flex-col flex md:flex-row md:justify-between md:gap-x-12">
                <div
                    data-aos="fade-right"
                    className="pl-0 md:pl-36 py-8 md:py-20 mx-auto"
                >
                    <div className=" relative border big-ellipse-clr rounded-full w-[220px] h-[220px] md:w-[520px] md:h-[520px] p-2 md:p-4">
                        <div className="border rounded-full big-ellipse-clr w-[200px] h-[200px] md:w-[480px] md:h-[480px] p-2 md:p-4"></div>

                        {/* Mobile View */}
                        <div
                            className={`absolute md:hidden block mob-ellipse top-2 left-0`}
                        >
                            <EllipseMob
                                Icon={FaConnectdevelop}
                                text="Connect"
                            />
                        </div>
                        <div
                            className={`absolute md:hidden block mob-ellipse2 top-12 left-32`}
                        >
                            <EllipseMob Icon={BsStars} text="Efficient" />
                        </div>
                        <div
                            className={`absolute md:hidden block mob-ellipse3 top-40 left-48`}
                        >
                            <EllipseMob Icon={BsRecordCircle} text="Record" />
                        </div>
                        <div
                            className={`absolute md:hidden block mob-ellipse4 top-72 left-52`}
                        >
                            <EllipseMob
                                Icon={HiOutlineStatusOnline}
                                text="Online"
                            />
                        </div>
                        <div
                            className={`absolute md:hidden block mob-ellipse5 top-[25rem] left-36`}
                        >
                            <EllipseMob
                                Icon={VscWorkspaceTrusted}
                                text="Trust"
                            />
                        </div>
                        <div
                            className={`absolute md:hidden block mob-ellipse6 top-[29rem] left-9`}
                        >
                            <EllipseMob Icon={GiPapers} text="Paperless" />
                        </div>
                        <div
                            className={`absolute hidden md:block ellipse -top-2 left-2`}
                        >
                            <Ellipse Icon={FaConnectdevelop} text="Connect" />
                        </div>
                        <div
                            className={`absolute hidden md:block ellipse2 top-12 left-32`}
                        >
                            <Ellipse Icon={BsStars} text="Efficient" />
                        </div>
                        <div
                            className={`absolute hidden md:block ellipse3 top-40 left-48`}
                        >
                            <Ellipse Icon={BsRecordCircle} text="Record" />
                        </div>
                        <div
                            className={`absolute hidden md:block ellipse4 top-72 left-52`}
                        >
                            <Ellipse
                                Icon={HiOutlineStatusOnline}
                                text="Online"
                            />
                        </div>
                        <div
                            className={`absolute hidden md:block ellipse5 top-[25rem] left-36`}
                        >
                            <Ellipse Icon={VscWorkspaceTrusted} text="Trust" />
                        </div>
                        <div
                            className={`absolute hidden md:block ellipse6 top-[29rem] left-9`}
                        >
                            <Ellipse Icon={GiPapers} text="Paperless" />
                        </div>

                        <div className="absolute w-60 md:w-auto -left-12 top-0 md:-left-20">
                            <Image
                                className="animate-float"
                                src="/images/site/student-placement.webp"
                                layout="responsive"
                                objectFit="contain"
                                width={100}
                                height={100}
                                alt="hero image"
                                blurDataURL={
                                    '/images/student-placement-blur.png'
                                }
                                placeholder="blur"
                            />
                        </div>
                    </div>
                </div>
                <div
                    data-aos="fade-left"
                    className="px-4 md:px-0 pb-0 pt-8 md:py-20"
                >
                    <div className="mb-5">
                        <h2 className="text-[28px] md:text-3xl font-bold">
                            Student Placement Management System
                        </h2>
                    </div>

                    {studentPlacement.map((placement, index) => (
                        <div className="mb-4" key={index}>
                            <div className="flex gap-x-2">
                                <TbBulbFilled className="text-[#F7910F] text-base md:text-lg " />
                                <p className="text-[#F7910F] text-base font-semibold">
                                    {placement.title}
                                </p>
                            </div>
                            <div className="md:ml-7 ml-6">
                                <p className="text-sm text-[#6B7280]">
                                    {placement.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
