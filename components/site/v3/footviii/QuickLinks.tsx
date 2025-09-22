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
    links: [
      { label: 'Features', href: '/features' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Talent Pool', href: '/talent-pool' },
      { label: 'WBT', href: '/wbt' },
    ],
  },
  {
    title: 'Who We Serve',
    links: [
      { label: 'Student', href: '/student' },
      { label: 'Training Organisations', href: '/training-orgs' },
      { label: 'Industries', href: '/industries' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Our Vision', href: '/vision' },
      { label: 'Our Mission', href: '/mission' },
      { label: 'Meet Our Team', href: '/team' },
    ],
  },
  {
    title: 'Sector',
    links: [
      { label: 'Individual Support', href: '/sectors/individual-support' },
      { label: 'Community Services', href: '/sectors/community-services' },
      { label: 'Hospitality', href: '/sectors/hospitality' },
    ],
  },
]

export const QuickLinks = () => {
  return (
    <div className="grid grid-cols-7 gap-8 mt-10">
      <div className="space-y-6 col-span-2 mt-5"> <Typography variant='title' color='text-primary'> About Us </Typography> <Typography variant='body' color='text-primaryNew'> SkilTrak is a smart placement platform built for students, RTOs, and host industries across Australia. We simplify vocational placements with real-time tracking, automated workflows, and clear communication. Trusted across multiple sectors, SkilTrak connects training with job readiness. Our goal is to power quality placements through smart, simple, and scalable digital solutions. </Typography> </div>
      {linkGroups.map((group, idx) => (
        <div key={idx} className="space-y-4 flex flex-col">
          <Typography variant="label" color="text-primary">
            {group.title}
          </Typography>

          {group.links.map((link, linkIdx) =>
            link.href ? (
              <Link key={linkIdx} href={link.href}>
                <Typography variant="small" color="text-primaryNew">
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
