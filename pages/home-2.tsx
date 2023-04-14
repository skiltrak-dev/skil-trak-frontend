import { Typography } from '@components'
import { Button2 } from '@components/site/Button2'
import { Footer2 } from '@components/site/Footer2'
import { JobTitleCard } from '@components/site/JobTitleCard'
import { PackagesCard } from '@components/site/PackagesCard'
import { ReviewCard } from '@components/site/ReviewCard'
import { Navbar2 } from '@components/site/navbar/Navbar2'
import { Wrapper } from '@components/site/wrapper'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
const Home2: NextPage = () => {
    const router = useRouter()
    return (
        <div>
            <Navbar2 />
            <Wrapper sectionName="introduction">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="w-full sm:w-3/5 md:w-2/4">
                        <h2 className="text-theme-secondary text-center text-3xl font-bold">
                            SKILTRAK, <br />
                            YOUR STUDENT PLACEMENT PARTNER
                        </h2>
                        <div className="text-theme-primary text-center text-3xl mt-6">
                            <Typography variant='title'>
                                Create industry partners. Keep track of students
                                placement progress.
                            </Typography>
                        </div>
                        <div className="mt-6 text-center text-xl text-theme-primary">
                            <Typography variant='body'>
                                A user-friendly placement platform. No hassle, no
                                documentation missing . Be innovative and efficient.
                            </Typography>
                        </div>
                    </div>
                    <div className="w-full sm:w-2/5 md:w-2/5 mt-4 md:mt-0 relative">
                        <Image
                            src="/images/site/st_intro.png"
                            alt="Illustration for online education"
                            width={0}
                            height={0}
                            sizes={'100vw'}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button2
                    asLink={true}
                    to={'/auth/login'}
                    text={'LOGIN/SIGNUP'}
                    external={true}
                />
            </Wrapper>
            <Wrapper sectionName="packages">
                <div className="flex flex-col md:flex-row justify-center gap-x-8 items-center">
                    <PackagesCard variant={'bg-[#f5daa6]'} />
                    <PackagesCard variant={'bg-[#e29e41]'} />
                    <PackagesCard variant={'bg-[#345a6d]'} />
                </div>
            </Wrapper>


            <Wrapper sectionName="introduction">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="w-full sm:w-3/5 md:w-2/4">
                        <h2 className="text-theme-secondary text-center text-3xl font-bold">
                            How does it work?
                        </h2>
                        <p className="text-theme-primary text-justify text-lg mt-8">
                            Our software is designed to link the Educational
                            organisation, student and industry expert under one
                            platform. Add your students and assessment tools and
                            start connecting with industry experts throughout
                            Australia. The platform provides you with workplace
                            options closest to the students’ location. Kepp
                            track of their progress, keep records of
                            communications and legal documentations and join
                            confidentally our team for your Placement services.
                        </p>
                    </div>
                    <div className="w-full sm:w-2/5 md:w-2/5 mt-4 md:mt-0 relative rounded-lg">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/hd8Rd27vOQ8"
                            title="YouTube video player"
                            // frameborder="2"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            // allowfullscreen
                            style={{
                                borderRadius: '8px',
                            }}
                        ></iframe>
                    </div>
                </div>
                <Button2
                    asLink={true}
                    to={'/auth/login'}
                    text={'FIND OUT MORE'}
                    external={true}
                />
            </Wrapper>
            <div className="bg-gray-200 flex flex-col items-center md:flex-row md:gap-x-2 w-full py-12">
                <ReviewCard
                    customerName="Thomas Achtingh, Certificate IV Mental Health"
                    content="Done my placement at KM Health, Needed help with NDIS and other documents, SKiltrak helped me with all that. They organized everything and it was really easy for met to understand the placement process. I was happy with the experience and the service I received."
                />
                <div className="flex flex-col items-center gap-y-36">
                    <div className="mt-3">
                        <Typography variant="h2">
                            Our customer reviews
                        </Typography>
                    </div>
                    <ReviewCard
                        customerName="Thomas Achtingh, Certificate IV Mental Health"
                        content="Done my placement at KM Health, Needed help with NDIS and other documents, SKiltrak helped me with all that. They organized everything and it was really easy for met to understand the placement process. I was happy with the experience and the service I received."
                    />
                </div>
                <ReviewCard
                    customerName="Thomas Achtingh, Certificate IV Mental Health"
                    content="Done my placement at KM Health, Needed help with NDIS and other documents, SKiltrak helped me with all that. They organized everything and it was really easy for met to understand the placement process. I was happy with the experience and the service I received."
                />
            </div>
            <Wrapper sectionName="Paid Jobs">
                <div className="text-center">
                    <Typography variant="h2">Paid Jobs</Typography>
                    <div className="text-justify mt-16">
                        <Typography variant="body">
                            Access all paid jobs on our platform. <br />
                            View and apply directly from your skiltrak account.
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="w-full sm:w-3/5 md:w-2/4">
                        <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-10">
                            <div className="flex flex-col gap-y-8">
                                <JobTitleCard
                                    title={'Job title workplace'}
                                    onClick={() => {
                                        router.push('#')
                                    }}
                                />
                                <JobTitleCard
                                    title={'Job title workplace'}
                                    onClick={() => {
                                        router.push('#')
                                    }}
                                />
                            </div>
                            <div>
                                <JobTitleCard
                                    title={'Job title workplace'}
                                    onClick={() => {
                                        router.push('#')
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-2/5 md:w-2/5 mt-4 md:mt-0">
                        <Image
                            src="/images/site/st_intro.png"
                            alt="Illustration for online education"
                            width={0}
                            height={0}
                            sizes={'100vw'}
                            className="w-full"
                        />
                    </div>
                </div>
            </Wrapper>
            <Footer2 />
        </div>
    )
}
export default Home2
