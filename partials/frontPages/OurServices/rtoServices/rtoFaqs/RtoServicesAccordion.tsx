import { Typography } from '@components'
import React, { useState } from 'react'

export const RtoServicesAccordion = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(2) // default open the 3rd

    const faqs = [
        {
            question: 'What If I Can’t Find A Placement On My Own?',
            answer: 'We can help you with placement options if needed.',
        },
        {
            question: 'Will I Receive Any Support During Placement?',
            answer: 'Yes, support will be available throughout your placement.',
        },
        {
            question: 'How Long Does The Placement Process Take?',
            answer: 'Once We Have All Your Details And Documents, Placement Can Be Arranged Quickly Often Within A Few Days.',
        },
        {
            question: 'How Far Do I Need To Travel For My Placement?',
            answer: 'We’ll try to arrange a nearby placement whenever possible.',
        },
    ]

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="mb-5">
                <Typography variant="h2" bold>
                    Question ?
                </Typography>
            </div>
            {/* Tabs */}
            <div className="flex space-x-6 border-b">
                <button className="text-[#FF9900] font-semibold border-b-2 border-[#FF9900] pb-2">
                    General
                </button>
                <button className="font-semibold pb-2">Safety&Security</button>
                <button className="font-semibold pb-2">Billing</button>
            </div>

            {/* Accordion */}
            <div className="mt-6 divide-y">
                {faqs.map((faq, index) => (
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
                ))}
            </div>
        </div>
    )
}
