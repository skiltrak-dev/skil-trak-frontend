import { Typography } from '@components'
import React, { useState } from 'react'

export const RtoServicesAccordion = () => {
    // Default open tab and accordion item
    const [activeTab, setActiveTab] = useState<
        'general' | 'safety' | 'billing'
    >('general')
    const [activeIndex, setActiveIndex] = useState<number | null>(2) // default open 3rd question in General

    // FAQ data grouped by category
    const faqData = {
        general: [
            {
                question:
                    'What services does SkilTrak offer to training organizations?',
                answer: 'SkilTrak assists with sourcing eligible workplaces, coordinating placements, and maintaining a streamlined process that helps your students meet their practical training requirements smoothly and effectively.',
            },
            {
                question:
                    'Can SkilTrak help us find placements that align with specific Units of Competency?',
                answer: 'We ensure that the workplace opportunities we provide are aligned with the relevant Units of Competency to support students’ learning outcomes.',
            },
            {
                question:
                    'Do we need to sign an agreement or MOU to work with SkilTrak?',
                answer: 'We work with all training organisations under a formal agreement or MOU to ensure clarity, mutual understanding, and a structured partnership.',
            },
            {
                question:
                    'What industries does SkilTrak have partnerships with?',
                answer: 'We collaborate with a wide range of industries, including hospitality, aged care, IT, business, and more. Our industry network continues to expand across Australia, offering valuable placement opportunities for students.',
            },
            {
                question: 'Can we track student placement progress',
                answer: 'Yes. Depending on your selected package, we provide access to tools and reports that help you track student placements, feedback, and progress throughout their practical training.',
            },
            {
                question: 'Do you offer support during the placement period?',
                answer: 'Yes. Our services include ongoing coordination and support throughout the placement duration, ensuring both students and host employers are supported.',
            },
        ],
        safety: [
            {
                question:
                    'How does SkilTrak ensure my personal information is protected?',
                answer: 'SkilTrak uses secure, encrypted systems to protect your data. Your personal and academic information is only shared with verified industry partners for placement purposes and only with your consent.',
            },
            {
                question: 'Will I be placed in a safe and compliant workplace?',
                answer: 'Yes, SkilTrak only partners with registered and approved industry hosts. Each workplace is vetted to ensure it meets safety and legal standards before any placement is confirmed.',
            },
        ],
        billing: [
            {
                question: 'Do I need to pay for placement through SkilTrak?',
                answer: 'If you’re referred by a partner RTO, there’s no cost to you – it’s covered under their agreement. If you apply independently, a fee may apply. We’ll inform you of the charges before placement begins, and secure payment options will be provided.',
            },
        ],
    }

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    const renderFAQs = (category: 'general' | 'safety' | 'billing') => {
        return faqData[category].map((faq, index) => (
            <div key={index}>
                <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex gap-x-4 items-center py-4 text-left"
                >
                    <span className="text-[#FF9900] font-bold text-2xl">
                        {activeIndex === index ? '−' : '+'}
                    </span>
                    <span className="font-medium text-[16px]">
                        {faq.question}
                    </span>
                </button>

                {activeIndex === index && (
                    <div className="pb-4 pl-6 pr-2 text-[15px] text-gray-700 border-t border-dashed">
                        {faq.answer}
                    </div>
                )}
            </div>
        ))
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-5">
                <Typography variant="h2" bold>
                    Question ?
                </Typography>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b">
                {[
                    { key: 'general', label: 'General' },
                    { key: 'safety', label: 'Safety & Security' },
                    { key: 'billing', label: 'Billing' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            setActiveTab(
                                tab.key as 'general' | 'safety' | 'billing'
                            )
                            setActiveIndex(null)
                        }}
                        className={`font-semibold pb-2 transition-colors duration-200 ${
                            activeTab === tab.key
                                ? 'text-[#FF9900] border-b-2 border-[#FF9900]'
                                : 'text-gray-600 hover:text-[#FF9900]'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Accordion */}
            <div className="divide-y min-w-[630px] min-h-[440px]">
                {renderFAQs(activeTab)}
            </div>
        </div>
    )
}
