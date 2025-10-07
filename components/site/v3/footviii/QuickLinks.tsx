import { Typography } from '@components/Typography'
import Link from 'next/link'
import React from 'react'

type LinkGroup = {
    title: string
    links: { label: string; href: string }[]
}

const linkGroups: LinkGroup[] = [
    {
        title: 'Home',
        links: [{ label: 'Features', href: '/features' }],
    },
    {
        title: 'Services',
        links: [
            { label: 'Talent Pool', href: '/our-services/talent-pool' },
            { label: 'WBT', href: '/our-services/work-based-training' },
        ],
    },
    {
        title: 'Who We Serve',
        links: [
            { label: 'Student', href: '/who-we-serve/students' },
            { label: 'Training Organisations', href: '/who-we-serve/rto' },
            { label: 'Industries', href: '/who-we-serve/industry' },
        ],
    },
    {
        title: 'About Us',
        links: [
            { label: 'Our Vision', href: '/about-us' },
            { label: 'Our Mission', href: '/about-us' },
            { label: 'Meet Our Team', href: '/about-us' },
        ],
    },
    {
        title: 'Sector',
        links: [
            {
                label: 'Individual Support',
                href: '/sectors',
            },
            {
                label: 'Community Services',
                href: '/sectors',
            },
            { label: 'Hospitality', href: '/sectors' },
        ],
    },
]

export const QuickLinks = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-8 mt-10">
            <div className="space-y-6 col-span-2 mt-5">
                {' '}
                <Typography variant="title" color="text-primary">
                    {' '}
                    About Us{' '}
                </Typography>{' '}
                <Typography variant="body" color="text-primaryNew">
                    {' '}
                    SkilTrak is a smart placement platform built for students,
                    RTOs, and host industries across Australia. We simplify
                    vocational placements with real-time tracking, automated
                    workflows, and clear communication. Trusted across multiple
                    sectors, SkilTrak connects training with job readiness. Our
                    goal is to power quality placements through smart, simple,
                    and scalable digital solutions.{' '}
                </Typography>{' '}
            </div>
            {linkGroups.map((group, idx) => (
                <div key={idx} className="space-y-4 flex flex-col">
                    <Typography variant="label" color="text-primary">
                        {group.title}
                    </Typography>

                    {group.links.map((link, linkIdx) =>
                        link.href ? (
                            <Link key={linkIdx} href={link.href}>
                                <Typography
                                    variant="small"
                                    color="text-primaryNew"
                                >
                                    {link.label}
                                </Typography>
                            </Link>
                        ) : (
                            <Typography
                                key={linkIdx}
                                variant="small"
                                color="text-primaryNew"
                            >
                                {link.label}
                            </Typography>
                        )
                    )}
                </div>
            ))}
        </div>
    )
}
