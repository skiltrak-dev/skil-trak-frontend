import type { FC } from 'react'
import Image from 'next/image'
import { Typography } from '@components/Typography'
import SiteButtonV3 from '../../button/SiteButtonV3'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface CardData {
    title: string
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
        title: 'Students',
        subtitle: 'Your First Step Toward a Career',
        description:
            'At SkilTrak, we help students find eligible industries that align with their career goals, ensuring that your placement is not just a requirement but a launchpad. ',
        image: '/images/site/home-page-v3/who-we-serve/cards/card-1.webp',
        button: { text: 'Learn More', variant: 'primary' },
        classes: 'text-[#F7A619]',
    },
    {
        title: 'Training Organizations',
        subtitle: ' Simplifying Placement & Compliance',
        description:
            'We understand the challenges RTOs face from finding quality placements to managing the administrative load of documentation, student tracking, and LMS transparency.',
        image: '/images/site/home-page-v3/who-we-serve/cards/card-2.webp',
        button: { text: 'Learn More', variant: 'secondary' },
        classes: 'text-[#044866]',
    },
    {
        title: 'Industries',
        subtitle: 'Build the Workforce of Tomorrow',
        description:
            'Partnering with SkilTrak gives industries access to a motivated, job-ready talent pool trained in both academic and practical settings. Our system makes it easy to:',
        image: '/images/site/home-page-v3/who-we-serve/cards/card-3.webp',
        button: { text: 'Learn More', variant: 'danger' },
        classes: 'text-[#9B2000]',
    },
]

export const WhoWeServeCard: FC = () => {
    return (
        <div className="w-full relative my-10">
            <div className="max-w-7xl mx-auto inline-grid md:grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="pb-5 rounded-3xl bg-white shadow-[0_10px_4px_0_rgba(9,9,9,0.5)] w-96 h-[520px] relative transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl group"
                    >
                        <div className="relative">
                            <Image
                                src={card.image}
                                alt={`${card.title} card image`}
                                height={418}
                                width={350}
                                className="w-full rounded-t-3xl object-cover group-hover:scale-105 duration-1000 transition-all"
                            />

                            <div className="bg-white rounded-3xl w-[350px] text-center p-5 mx-auto space-y-4 absolute top-48 md:top-56 left-1/2 transform -translate-x-1/2 transition-all duration-700 opacity-100 group-hover:opacity-90 group-hover:-translate-y-1">
                                <Typography
                                    variant="h3"
                                    bold
                                    color={`${card?.classes}`}
                                >
                                    {card.title}
                                </Typography>
                                <Typography color="text-[#044866]/70" semibold>
                                    {card.subtitle}
                                </Typography>
                                <Typography variant="body">
                                    {card.description}
                                </Typography>
                            </div>
                        </div>
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 rounded-2xl shadow-[0_10px_4px_0_rgba(9,9,9,0.5)]">
                            <SiteButtonV3
                                text={card.button.text}
                                variant={card.button.variant}
                                onClick={() =>
                                    console.log(`${card.title} button clicked`)
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
