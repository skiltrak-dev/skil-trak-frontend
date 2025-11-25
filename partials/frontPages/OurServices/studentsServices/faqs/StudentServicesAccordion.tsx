import { Typography } from '@components'
import React, { useState } from 'react'

export const StudentServicesAccordion = () => {
    // Default open tab and accordion item
    const [activeTab, setActiveTab] = useState<
        'general' | 'safety' | 'billing'
    >('general')
    const [activeIndex, setActiveIndex] = useState<number | null>(2) // default open 3rd question in General

    // FAQ data grouped by category
    const faqData = {
        general: [
            {
                question: 'What If I Can’t Find A Placement On My Own?',
                answer: 'No problem – that’s what we’re here for! SkilTrak guarantees placement assistance that is aligned with your course requirements.',
            },
            // {
            //     question: 'Is the placement site safe and approved?',
            //     answer: 'Yes. Every workplace we work with is verified for compliance, safety, and relevance to your course.',
            // },
            {
                question: 'Will I Receive Any Support During Placement?',
                answer: 'Absolutely. Our team is available to support you at every step – before, during, and after your placement.',
            },
            {
                question: 'How Long Does The Placement Process Take?',
                answer: 'Once we have all your details and documents, placement can be arranged quickly, often within a few days.',
            },
            {
                question: 'How Far Do I Need To Travel For My Placement?',
                answer: "Ideally, it's within a 20 km radius of your given location. We prefer to give you the nearest best-matched options.",
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
            <div className="divide-y min-w-[550px] min-h-[440px]">
                {renderFAQs(activeTab)}
            </div>
        </div>
    )
}
