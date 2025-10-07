import type { FC } from 'react'
import Image from 'next/image'
import { Typography } from '@components/Typography'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface CardData {
    subtitle: string
    description: string
    image: string
    button: {
        text: string
        variant: ButtonVariant
    }
    classes: string
}

const cards: CardData[] = [
    {
        subtitle: 'Integrity in Every Interaction',
        description:
            'SkilTrak’s foundation is built on authentic relationships, transparent communication, and genuine care for every student and partner we work with.',
        image: '/images/site/about-us/card-1.png',
        button: { text: 'Learn More', variant: 'primary' },
        classes: '!text-[#F7A619]',
    },
    {
        subtitle: 'WE ARE THERE WHEN YOU NEED US MOST',
        description:
            'Our dedicated support team is always ready to assist you, whether you need help scheduling a placement, understanding the process, or navigating compliance. Just give us a call!',
        image: '/images/site/about-us/card-2.png',
        button: { text: 'Learn More', variant: 'secondary' },
        classes: '!text-[#044866]',
    },
    {
        subtitle: 'WE LISTEN',
        description:
            "Your feedback matters. We follow up through calls or emails to ensure you're satisfied and to continuously improve our services. Your trust and referrals are our biggest rewards.",
        image: '/images/site/about-us/card-3.png',
        button: { text: 'Learn More', variant: 'danger' },
        classes: '!text-[#9B2000]',
    },
]

export const WhatSetsUsApart: FC = () => {
    return (
        <div className="my-10 bg-primaryNew w-full  py-10 px-8 md:px-0">
            <div className="flex flex-col justify-center items-center mb-10">
                <Typography variant="h2" color="text-white">
                    What Sets Us Apart
                </Typography>
                <Image
                    src={
                        '/images/site/home-page-v3/who-we-serve/title-line.svg'
                    }
                    alt={`title line`}
                    height={18}
                    width={380}
                    className=""
                />
            </div>
            <div
                className="w-full relative bg-no-repeat bg-cover"
                style={{
                    backgroundImage:
                        'url(/images/site/about-us/what-sets-us-apart.png)',
                }}
            >
                <div className="max-w-6xl mx-auto inline-grid md:grid grid-cols-1 md:grid-cols-3 gap-16">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="pb-5 rounded-3xl bg-white shadow-[0_10px_4px_0_rgba(9,9,9,0.5)] md:w-96 h-[480px] relative transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl group mt-10"
                        >
                            <div className="relative">
                                <Image
                                    src={card.image}
                                    alt={`${card.subtitle} card image`}
                                    height={418}
                                    width={350}
                                    className="w-full rounded-t-3xl object-cover group-hover:scale-105 duration-1000 transition-all"
                                />

                                <div className="bg-white rounded-3xl w-[250px] md:w-[350px] text-center p-5 mx-auto space-y-4 absolute top-48 md:top-56 left-1/2 transform -translate-x-1/2 transition-all duration-700 opacity-100 group-hover:opacity-90 group-hover:-translate-y-1">
                                    <Typography
                                        variant="body"
                                        bold
                                        color={`${card?.classes}`}
                                    >
                                        {card.subtitle}
                                    </Typography>

                                    <Typography variant="body">
                                        {card.description}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
