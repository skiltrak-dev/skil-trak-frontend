import { SpecialLink } from '@components'

import { IoDocumentTextOutline } from 'react-icons/io5'
import { FaUserGraduate } from 'react-icons/fa'
import { FaBriefcase } from 'react-icons/fa'

const OtherLegalDocuments = [
    {
        icon: IoDocumentTextOutline,
        text: 'Host Employer Legal Requirements',
        link: 'host-legal-requirement',
        theme: {
            iconColor: 'text-[#DFF9FB]',
            iconBG: 'bg-[#A3F5FB]',
            bg: 'bg-[#DFF9FB]',
            light: false,
        },
    },
    {
        icon: FaUserGraduate,
        text: 'Student Placement Work Cover',
        link: 'student-placement-work-cover',
        theme: {
            iconColor: 'text-[#686DE0]',
            iconBG: 'bg-[#9295E0]',
            bg: 'bg-[#686DE0]',
            light: true,
        },
    },
    {
        icon: FaBriefcase,
        text: 'Fair Work Placement Requirements',
        link: 'fair-workplacement-requirements',
        theme: {
            iconColor: 'text-[#F6E58D]',
            iconBG: 'bg-[#F6F2DD]',
            bg: 'bg-[#F6E58D]',
            light: false,
        },
    },
]

export const LegalDocuments = ({ hideLink }: { hideLink: string }) => {
    return (
        <div className="flex flex-col gap-y-2">
            {OtherLegalDocuments.map((doc) =>
                doc.link !== hideLink ? (
                    <SpecialLink
                        key={doc.link}
                        icon={doc.icon}
                        text={doc.text}
                        link={doc.link}
                        theme={doc.theme}
                    />
                ) : null
            )}
        </div>
    )
}
