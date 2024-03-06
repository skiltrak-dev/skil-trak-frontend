import { FaCircleCheck } from 'react-icons/fa6'
import { WhatNextCard } from './WhatNextCard'
import { Button, Typography } from '@components'
import { useRouter } from 'next/router'

const data = [
    {
        title: '1. Profile Activation',
        description: `Our team will meticulously review your registration details, and upon verification, your profile will be activated within the Talent Pool platform.`,
    },
    {
        title: '2. Privacy Settings',
        description: `Ensure your privacy settings align with your preferences. You retain control over the information shared with industry partners, safeguarding your comfort.`,
    },
    {
        title: '3. Opportunity Matching',
        description: `As our industry partners seek potential candidates, your profile will be presented to them for consideration.`,
    },
    {
        title: '4. Authorization Requests',
        description: `Watch for requests from industry partners eager to delve deeper into your qualifications. You have the choice to authorize or decline these requests, which may involve sharing your CV, contact information, and other pertinent documents.`,
    },
    {
        title: '5. Privacy Settings',
        description: `Watch for requests from industry partners eager to delve deeper into your qualifications. You have the choice to authorize or decline these requests, which may involve sharing your CV, contact information, and other pertinent documents.`,
    },
]

export const RegistrationSuccessful = ({
    onCancelClicked
}:any) => {
    const router = useRouter()
    return (
        <div className="py-8 px-4 md:pl-9 md:pr-16 w-full overflow-y-auto max-h-screen">
            <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:gap-x-14 w-full ">
                <div className="md:w-1/3">
                    <FaCircleCheck size={50} className="text-[#BADC58] " />
                    <div className="my-4">
                        <Typography variant={'h4'} color={'text-[#2D3748]'}>
                            Registration Successful
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'title'}>
                            Fantastic news!
                        </Typography>
                    </div>
                    <div>
                        <Typography variant={'muted'}>
                            Your registration for the Talent Pool has been
                            successfully submitted. We are excited to welcome
                            you aboard and anticipate connecting you with
                            compelling opportunities in your field.
                        </Typography>
                    </div>
                </div>
                {/* What next */}
                <div className="grid md:grid-cols-2 gap-x-5 gap-y-4 w-2/3">
                    {data.map((item) => (
                        <WhatNextCard
                            title={item?.title}
                            description={item?.description}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-7 text-center">
                <Typography variant={'title'}>Stay Connected</Typography>
                <Typography variant={'muted'}>
                    Stay vigilant for updates, alerts, and potential
                    opportunities via email and the Talent Pool platform. If you
                    ever have questions or require assistance, our dedicated
                    support team is ready to lend a hand.
                </Typography>
            </div>
            <div className="mt-7 flex justify-center gap-x-2.5">
                <Button text="Dashboard" variant="info"  onClick={()=>{router.push('/portals/student')}} />
                <Button text="View Registration Details" onClick={()=>{router.push('/portals/student/talent-pool/profile')}} />
            </div>
        </div>
    )
}
