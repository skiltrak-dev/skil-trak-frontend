// src/components/Accordion.tsx
import React, { useState } from 'react'
// import ClosedBg from '@/assets/accordion-closed.svg'
// import OpenBg from '@/assets/accordion-open.svg'
// import LeftArrow from '@/assets/orange-arrow.svg'
import { Sector } from './courseData'

interface AccordionProps {
    sector: Sector
}

export const CoursesAccordion: React.FC<AccordionProps> = ({ sector }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="rounded-2xl overflow-hidden transition-all duration-300 ease-in-out mb-4"
            style={{
                // backgroundImage: `url(${isOpen ? OpenBg : ClosedBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            {/* Header */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    {/* <img src={LeftArrow} alt="Arrow" className="w-4 h-4" /> */}
                    <h2 className="text-lg font-semibold text-gray-800">
                        {sector.title}
                    </h2>
                </div>
                <span
                    className={`transform transition-transform duration-300 ${
                        isOpen ? 'rotate-90' : ''
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-gray-700"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </span>
            </button>

            {/* Body */}
            <div
                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <ul className="pl-10 pb-4 space-y-2 text-gray-700">
                    {sector?.courses?.map((course: any) => (
                        <li
                            key={course.id}
                            className="text-sm hover:text-blue-600 cursor-pointer"
                        >
                            {course.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
