import React, { useRef } from 'react'
import { OurStoryRtoSection } from './OurStoryRtoSection'
import { OurStoryIndustrySection } from './OurStoryIndustrySection'
import { OurStoryStudentSection } from './OurStoryStudentSection'
import { useMediaQuery } from 'react-responsive'
import { motion, useScroll, useTransform } from 'framer-motion'

export const OurStoryProfilesSections = () => {
    const targetRef = useRef(null)

    const isMobile = useMediaQuery({ maxWidth: 768 })

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-200%'])

    return (
        <div>
            {isMobile ? (
                <>
                    <OurStoryRtoSection />
                    <OurStoryIndustrySection />
                    <OurStoryStudentSection />
                </>
            ) : (
                <section ref={targetRef} className="relative h-[300vh]">
                    <div className="sticky top-5 flex h-screen items-center overflow-hidden">
                        <motion.div
                            style={{ x }}
                            className="flex flex-nowrap w-full"
                        >
                            <motion.div
                                className="min-w-full flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <OurStoryRtoSection />
                            </motion.div>
                            <motion.div
                                className="min-w-full flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <OurStoryIndustrySection />
                            </motion.div>
                            <motion.div
                                className="min-w-full flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <OurStoryStudentSection />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            )}
        </div>
    )
}
