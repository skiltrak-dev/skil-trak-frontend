import React, { useState, useEffect } from 'react'
import { SiteLayout } from '@layouts'
import Image from 'next/image'

import { Wrapper } from '../components/site/wrapper/Wrapper'
import { Heading } from '../components/site/Heading'
import { Button } from '../components/site/Button'
import { AboutUsCard } from '../components/site/aboutUsCard/AboutUsCard'
import { AboutUsTeamCard } from '../components/site/aboutUsCard/AboutUsTeamCard'
import { css } from '@emotion/react'

import axios from 'axios'

const Page = () => {
    const [teamList, setTeamList] = useState([])

    useEffect(() => {
        axios
            .get(`https://www.skiltrak.com.au/api/active-teams`)
            .then((res) => {
                setTeamList(res.data)
            })
            .catch((err) => {})
    }, [])

    return (
        <SiteLayout title={'Features'}>
            <div>
                <div className="relative">
                    <Image
                        src={'/images/site/features_hero.png'}
                        alt=""
                        width={0}
                        height={0}
                        sizes={'100vw'}
                        className="w-full"
                    />
                    <div className="bg-black w-full h-full absolute top-0 left-0 opacity-60 z-0"></div>
                    <div className="text-white absolute top-2/4 w-11/12 md:w-3/5 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
                        <h3 className="font-bold text-2xl md:text-4xl text-center">
                            SKILTRAK IS HERE WHEN YOU NEED IT MOST!
                        </h3>
                        <p className="text-md md:text-2xl text-center mt-4">
                            We have knowledgeable and friendly professionals
                            available to schedule an appointment or answer any
                            questions you may have in relation to Work Placement
                            . Call us today!
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-8/12 mx-auto my-16">
                <div className="flex flex-col md:flex-row md:flex-md justify-between">
                    <div className="w-full md:w-5/12">
                        <Image
                            src="/images/site/about-us.png"
                            alt="Illustration for online education"
                            width={450}
                            height={100}
                        />
                    </div>

                    <div className="my-8 md:my-0 w-full md:w-6/12 flex flex-col align-center md: align-start">
                        <Heading text={'OUR PROMISE TO YOU'} />
                        <div className="my-8 text-gray-500 text-center md:text-left">
                            <p>
                                SkilTraK philosophy is a reflection of the
                                values established by over 15 years of industry
                                experience.
                            </p>
                            <p className="mt-4">
                                These values are simple: we rely on genuine
                                integrity, industry-leading partnerships and the
                                highest-quality services to build authentic
                                relationships with our clients.
                            </p>
                        </div>
                        <Button text={'Join Us'} />
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 py-16 px-2 md:px-8">
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between">
                        <AboutUsCard
                            heading={'WE PRIDE OURSELVES ON CUSTOMER INTIMACY.'}
                            description={`We take the time to understand your needs and develop solutions to
          meet or exceed them. We build long-term loyalty by a commitment to
          customer satisfaction.`}
                            imageIndex={0}
                        />
                        <AboutUsCard
                            heading={'WE ARE THERE WHEN YOU NEED IT MOST.'}
                            description={`We have knowledgeable and friendly professionals available to schedule 
              an appointment or answer any questions you have. Call us today!
              `}
                            imageIndex={1}
                        />
                        <AboutUsCard
                            heading={'WE LISTEN.'}
                            description={`We want to hear from you! Expect to receive a customer satisfaction call 
              or email from us after our work is complete. We want to earn your referrals!`}
                            imageIndex={2}
                        />
                    </div>
                </div>
            </div>

            <div className="w-10/12 mx-auto py-16">
                <Heading text={'Meet Our Team Leads'} />
                <div className="my-8 flex flex-col md:flex-row justify-around">
                    {teamList.length > 0 &&
                        teamList.map((team: any) => (
                            <AboutUsTeamCard
                                key={team.id}
                                name={team.name}
                                designation={team.designation}
                                email={team.email}
                                message={team.description}
                                imageUrl={team.image_url}
                            />
                        ))}
                    {/* <AboutUsTeamCard
            name={"Jacques Edouard Betsy"}
            designation={"Business Development Manager"}
            email={"info@skiltrak.com.au"}
            message={`With over 40 years of International Marketing experience, Jacques entered SkilTrak to ensure a fresh, innovative and flexible approach to our clients and students. A large portfolio of European and US clientele, Jacques is surrounded by a very dedicated and talented team.`}
          />
          <AboutUsTeamCard
            name={"Julie Clarke"}
            designation={"Managing Director"}
            email={"julie@skiltrak.com.au"}
            message={`Julie has 15 years of Hospitality experience and 8 years of Experience as a Trainer and Assessor in Hospitality and Tourism. She specializes in RTO Compliance and in any Industry consultation you may require. “I believe that we are here to guide and give our students the base for success. We are here from the start to the finish line, just like a race with outstanding coaching.`}
          />
          <AboutUsTeamCard
            name={"Yaseen Khan"}
            designation={"CEO"}
            email={"yaseen@skiltrak.com.au"}
            message={`Yaseen has over 9 years of experience in the hospitality Industry. An outstanding Chef and great mentor to so many cooks, he brings in this company his culinary knowledge. His passion for food has now led him to become a Trainer and Assessor for Commercial Cookery.“All the best chefs started at the bottom of the rank, so be the next one! Do not be scared, it is all part of the game!`}
          /> */}
                </div>
            </div>
        </SiteLayout>
    )
}

export default Page
