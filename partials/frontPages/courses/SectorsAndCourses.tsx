// src/pages/SectorsAndCourses.tsx
import React from 'react'
import { ScrollContainer } from './ScrollContainer'
import { sectorsData } from './courseData'
import { CoursesAccordion } from './CoursesAccordion'

export const SectorsAndCourses: React.FC = () => {
    return (
        <section className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-lg rounded-3xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Explore Our Sectors & Courses
            </h1>

            <ScrollContainer>
                {sectorsData.map((sector) => (
                    <CoursesAccordion key={sector.id} sector={sector} />
                ))}
            </ScrollContainer>
        </section>
    )
}
