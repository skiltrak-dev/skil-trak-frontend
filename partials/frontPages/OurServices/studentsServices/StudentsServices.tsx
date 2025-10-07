import React from 'react'
import { HeroSection } from './HeroSection'
import { AboutUsSection } from './AboutUsSection'
import { TrackYourPlacement } from './TrackYourPlacement'
import { SkiltrakAppSection } from './SkiltrakAppSection'
import Image from 'next/image'
import { SvgLine } from './SvgLine'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { VscSmiley } from 'react-icons/vsc'
import { LiaBoxSolid } from 'react-icons/lia'
import { StudentAccFeatures } from './StudentAccFeatures'
import { OurProfessionalWorkFlow } from './OurProfessionalWorkFlow'
import { TalentPoolSection } from './TalentPoolSection'
import { TestimonialSection } from './TestimonialSection'
import { FaqsSection } from './faqs'
import { ContactSection } from '@partials/frontPages/components'

export const StudentsServices = () => {
    return (
        <div>
            <HeroSection />
            <AboutUsSection />
            <div className="">
                <div className="relative">
                    <div className="absolute top-32 right-0 -z-10">
                        <div className="relative">
                            <div className="absolute top-48 right-10 bg-white rounded-full p-2">
                                <LiaBoxSolid
                                    className="text-red-500"
                                    size={25}
                                />
                            </div>
                            <div className="absolute bottom-48 left-28 bg-white rounded-full p-2">
                                <HiOutlineLocationMarker
                                    className="text-red-500"
                                    size={25}
                                />
                            </div>
                            <div className="absolute -bottom-5 left-28 bg-white rounded-full p-2">
                                <VscSmiley className="text-red-500" size={25} />
                            </div>
                            <SvgLine />
                        </div>
                    </div>
                    <TrackYourPlacement />
                    <SkiltrakAppSection />
                </div>
            </div>

            <StudentAccFeatures />
            <OurProfessionalWorkFlow />
            <TalentPoolSection />
            <TestimonialSection />
            <FaqsSection />
            <ContactSection />
        </div>
    )
}
