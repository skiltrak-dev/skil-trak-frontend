import { Typography } from '@components/Typography'
import Image from 'next/image'
import { Ellipse } from './Ellipse'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { TbBulbFilled } from 'react-icons/tb'

export const StudentPlacementManagement = () => {
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
    return (
        <div className="bg-[#EFF5FF]  mt-16">
            <div className="max-w-7xl mx-auto block md:flex md:justify-between md:gap-x-12">
                <div className="pl-0 md:pl-36 py-0 md:py-20">
                    <div className="md:block  hidden relative border big-ellipse-clr rounded-full w-[520px] h-[520px] p-4">
                        <div className="border rounded-full big-ellipse-clr w-[200px] h-[200px] md:w-[480px] md:h-[480px] p-4"></div>

                        <div className={`absolute ellipse -top-2 left-2`}>
                            <Ellipse
                                Icon={HiOutlineStatusOnline}
                                text="Connect"
                            />
                        </div>
                        <div className={`absolute ellipse top-12 left-32`}>
                            <Ellipse
                                Icon={HiOutlineStatusOnline}
                                text="Efficient"
                            />
                        </div>
                        <div className={`absolute ellipse top-40 left-48`}>
                            <Ellipse
                                Icon={HiOutlineStatusOnline}
                                text="Record"
                            />
                        </div>
                        <div className={`absolute ellipse top-72 left-52`}>
                            <Ellipse
                                Icon={HiOutlineStatusOnline}
                                text="Online"
                            />
                        </div>
                        <div className={`absolute ellipse top-[25rem] left-36`}>
                            <Ellipse
                                Icon={HiOutlineStatusOnline}
                                text="Trust"
                            />
                        </div>
                        <div className={`absolute ellipse top-[29rem] left-9`}>
                            <Ellipse
                                Icon={HiOutlineStatusOnline}
                                text="Paperless"
                            />
                        </div>

                        <div className="absolute w-72 md:w-auto top-0 -left-20">
                            <Image
                                className="animate-float"
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
    )
}
