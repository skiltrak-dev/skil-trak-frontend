import React from 'react'
import { PricingCard } from './PricingCard'
import { Typography } from '@components'

export const PricingCards = () => {
    return (
        <div
            className="w-full bg-primaryNew bg-cover pb-10 md:pb-0 mt-10"
            style={{
                backgroundImage:
                    'url(/images/site/services/rto-services/our-packages-bg.png)',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="flex justify-center items-center py-10 md:py-16">
                <Typography color="text-white" variant="h1" center>
                    Our Packages For Training Organisations
                </Typography>
            </div>
            <div className="mx-auto max-w-5xl px-4 pb-0 md:pb-20 md:px-0 grid grid-cols-1 md:grid-cols-3 items-center md:gap-0 gap-10">
                <PricingCard
                    variant="basic"
                    title="Basic"
                    features={[
                        {
                            text: 'Dedicated SkilTrak coordinators',
                            included: true,
                        },
                        {
                            text: 'One eligible workplace options',
                            included: true,
                        },
                        { text: 'Appointment scheduling', included: true },
                        {
                            text: 'Access to SkilTrak’s Placement',
                            included: false,
                        },
                        { text: 'Management System (PMS)', included: false },
                    ]}
                />
                <PricingCard
                    variant="standard"
                    title="Standard"
                    features={[
                        {
                            text: 'Two eligible workplace options',
                            included: true,
                        },
                        { text: 'Appointment scheduling', included: true },
                        { text: 'Auto generated reports', included: true },
                        {
                            text: 'Access to SkilTrak’s Placement Management System (PMS)',
                            included: true,
                        },
                        {
                            text: 'Placement coordination and support',
                            included: true,
                        },
                        {
                            text: 'Unlimited student and sub-admin accounts',
                            included: true,
                        },
                        {
                            text: 'Secure, centralised document management',
                            included: true,
                        },
                        {
                            text: 'Automated alerts and deadline reminders',
                            included: true,
                        },
                        {
                            text: 'Dedicated SkilTrak coordinators',
                            included: true,
                        },
                        { text: 'Quality Assurance checks', included: true },
                    ]}
                />
                <PricingCard
                    variant="premium"
                    title="Premium"
                    features={[
                        {
                            text: 'Includes all Enhanced Package features',
                            included: true,
                        },
                        {
                            text: 'Industry network add-ons access such as industry consultations, MoUs, QA sessions and Simulation lab hire & more.',
                            included: true,
                        },
                    ]}
                />
            </div>
        </div>
    )
}
