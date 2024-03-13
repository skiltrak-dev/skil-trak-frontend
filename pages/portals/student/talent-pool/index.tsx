import { ReactElement } from 'react'
// Layouts
import { StudentLayout } from '@layouts'
// types
import { NextPageWithLayout } from '@types'
import { HowItWorks, TalentPoolWelcomeCard } from '@partials/student/talentPool'
import Link from 'next/link'
import { StudentApi } from '@queries'

const data = [
    {
        title: '1. Registration',
        description: `To get started, complete the Talent Pool Registration Form. Provide essential details about your academic background, skills, and areas of interest.`,
    },
    {
        title: '2. Information Sharing',
        description: `Rest assured, we prioritize your privacy. By default, only your name, suburb, postcode, and professional background will be shared with industry partners actively looking for paid employees.`,
    },
    {
        title: '3. Authorization Control',
        description: `You have control over the information you share. Access to additional details will only be granted when you authorize specific industries to view them.`,
    },
    {
        title: '4. Profile Enhancement',
        description: `Showcase your skills, talents, and projects through your profile. Link to your online portfolios, projects, and social media profiles to make a compelling impression.`,
    },
    {
        title: '5. Industry Interaction:',
        description: `Industries regularly browse the Talent Pool to discover potential candidates. Your profile could be the key to unlocking exciting opportunities.`,
    },
    {
        title: '6. Opportunity Alerts:',
        description: `Stay informed! Receive notifications about relevant opportunities, events, and projects matching your skills and interests.`,
    },
    {
        title: '7. Consent and Transparency',
        description: `We value your consent. By submitting the registration form, you agree to be part of the Talent Pool and consent to being contacted for opportunities. Your journey is in your hands.`,
    },
]

const TalentPool: NextPageWithLayout = () => {
    const talentPoolStudentProfileDetail =
        StudentApi.TalentPool.useTalentPoolStudentProfile()

    return (
        <>
            <TalentPoolWelcomeCard />
            <div className="grid grid-cols-1 md:grid-cols-4 px-4 py-6 md:px-10 gap-y-6 md:gap-x-12">
                {data.map((item, index) => (
                    <HowItWorks
                        key={item?.title}
                        title={item?.title}
                        description={item?.description}
                    />
                ))}
            </div>
            <div className="bg-[#282F39] px-8 py-3 flex md:flex-row flex-col md:gap-x-80 justify-between gap-y-4 w-full items-center mt-4">
                <p className="text-white text-xs">
                    Visit the Talent Pool Registration Page and take the first
                    step toward unlocking a world of possibilities. Your talents
                    deserve to be recognized, and we're here to bridge the gap
                    between potential and opportunity.
                </p>
                {talentPoolStudentProfileDetail?.data != null &&
                Object.keys(talentPoolStudentProfileDetail?.data).length > 0 ? (
                    <Link
                        href={'/portals/student/talent-pool/profile'}
                        className="px-4 py-[5px] bg-[#F7910F] rounded-md text-white whitespace-nowrap"
                    >
                        View Profile
                    </Link>
                ) : (
                    <Link
                        href={'/portals/student/talent-pool/register-now'}
                        className="px-4 py-[5px] bg-[#F7910F] rounded-md text-white whitespace-nowrap"
                    >
                        Register now
                    </Link>
                )}
            </div>
        </>
    )
}

TalentPool.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Talent Pool' }}>
            {page}
        </StudentLayout>
    )
}

export default TalentPool
