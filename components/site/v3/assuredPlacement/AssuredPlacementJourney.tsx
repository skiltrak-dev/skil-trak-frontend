// import Image from 'next/image'
// import React, { useState, useEffect } from 'react'

// export const AssuredPlacementJourney = () => {
//     const [progress, setProgress] = useState(0)

//     // Auto-animate infinitely with smooth progress
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setProgress((prev) => (prev + 1) % 100) // 100 steps for smooth animation
//         }, 80) // Faster updates for smoother movement

//         return () => clearInterval(interval)
//     }, [])

//     // Calculate student position along the curved path - matching the SVG pattern
//     const getStudentPosition = (progress: any) => {
//         const t = progress / 100 // Normalize to 0-1

//         // Beautiful flowing arches based on the SVG pattern
//         let x, y

//         if (t <= 0.25) {
//             // From 1st circle center, flowing UP in a beautiful arc
//             const localT = t / 0.25
//             x = 20 + 20 * localT
//             y = 50 - 35 * Math.sin(localT * Math.PI * 0.8) * (1 - localT * 0.3) // Graceful upward curve
//         } else if (t <= 0.5) {
//             // Flowing DOWN between 2nd and space, creating deep arch
//             const localT = (t - 0.25) / 0.25
//             x = 40 + 20 * localT
//             y = 50 + 40 * Math.sin(localT * Math.PI) * (0.8 + localT * 0.4) // Deep downward curve
//         } else if (t <= 0.75) {
//             // Flowing UP between space and 3rd circle, high arch
//             const localT = (t - 0.5) / 0.25
//             x = 60 + 20 * localT
//             y = 50 - 35 * Math.sin(localT * Math.PI) * (0.9 + localT * 0.2) // High upward arch
//         } else {
//             // Final flowing DOWN to 4th circle
//             const localT = (t - 0.75) / 0.25
//             x = 80 + 0 * localT // End at 4th circle
//             y = 50 + 25 * Math.sin(localT * Math.PI * 0.7) * (1 - localT * 0.5) // Gentle descent
//         }

//         return { x, y }
//     }

//     const circles = [
//         {
//             id: 0,
//             title: 'Student Added',
//             icon: '🔍',
//             color: 'bg-teal-700',
//             x: 20,
//             y: 50,
//             hasRing: false,
//         },
//         {
//             id: 1,
//             title: 'Case Officer Assigned',
//             color: 'bg-red-700',
//             x: 40,
//             y: 50,
//             hasRing: true,
//         },
//         {
//             id: 2,
//             title: 'Compliance and Matched Via AI',
//             subtitle: 'Best possible match',
//             icon: '🔄',
//             color: 'bg-teal-700',
//             x: 60,
//             y: 50,
//             hasRing: false,
//         },
//         {
//             id: 3,
//             title: 'All Paperwork and Follow ups done by Case Officer',
//             icon: '📋',
//             color: 'bg-teal-700',
//             x: 80,
//             y: 50,
//             hasRing: true,
//         },
//     ]

//     // Determine which circle should be active based on progress
//     const getActiveCircle = (progress: any) => {
//         if (progress >= 10 && progress <= 30) return 0 // First circle active
//         if (progress >= 30 && progress <= 50) return 1 // Second circle active
//         if (progress >= 50 && progress <= 75) return 2 // Third circle active
//         if (progress >= 75 && progress <= 95) return 3 // Fourth circle active
//         return -1 // No circle active
//     }

//     const activeCircle = getActiveCircle(progress)
//     const studentPos = getStudentPosition(progress)

//     return (
//         <div className="w-full max-w-7xl mx-auto  min-h-screen flex items-center">
//             <div className="w-full relative h-96">
//                 <div
//                     className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-none"
//                     style={{
//                         left: `${studentPos.x}%`,
//                         top: `${studentPos.y}%`,
//                     }}
//                 >
//                     <Image
//                         src="/images/site/home-page-v3/assured-placement/student-character.svg"
//                         alt="journey"
//                         width={100}
//                         height={100}
//                         className=" "
//                     />
//                 </div>

//                 {/* Circles positioned along the path */}
//                 {circles.map((circle, index) => (
//                     <div
//                         key={circle.id}
//                         className="absolute transform -translate-x-1/2 -translate-y-1/2"
//                         style={{
//                             left: `${circle.x}%`,
//                             top: `${circle.y}%`,
//                         }}
//                     >
//                         {/* Outer dotted ring for 2nd and 4th circles */}
//                         {circle.hasRing && (
//                             <div
//                                 className={`absolute w-44 h-44 rounded-full border-4 border-dashed transition-all duration-1000 ${
//                                     activeCircle === index
//                                         ? 'border-yellow-400 scale-110 animate-pulse'
//                                         : 'border-gray-300 scale-100'
//                                 }`}
//                                 style={{
//                                     top: '50%',
//                                     left: '50%',
//                                     transform: 'translate(-50%, -50%)',
//                                 }}
//                             >
//                                 {/* Connection dots on ring */}
//                                 {[0, 90, 180, 270].map((angle, dotIndex) => (
//                                     <div
//                                         key={dotIndex}
//                                         className={`absolute w-4 h-4 rounded-full transition-all duration-500 ${
//                                             activeCircle === index
//                                                 ? 'bg-black scale-125'
//                                                 : 'bg-gray-400 scale-100'
//                                         }`}
//                                         style={{
//                                             top: '50%',
//                                             left: '50%',
//                                             transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-88px)`,
//                                         }}
//                                     />
//                                 ))}
//                             </div>
//                         )}

//                         {/* Main Circle with flip animation */}
//                         <div
//                             className={`w-32 h-32 rounded-full flex items-center justify-center text-white font-semibold text-xs transition-all duration-1000 shadow-xl transform ${
//                                 activeCircle === index
//                                     ? `${circle.color} scale-110 rotate-180 shadow-2xl`
//                                     : `${circle.color} scale-100 rotate-0 shadow-lg`
//                             }`}
//                         >
//                             <div
//                                 className={`text-center px-3 transition-transform duration-1000 ${
//                                     activeCircle === index
//                                         ? 'rotate-180'
//                                         : 'rotate-0'
//                                 }`}
//                             >
//                                 {circle.icon && (
//                                     <div className="text-2xl mb-1">
//                                         {circle.icon}
//                                     </div>
//                                 )}
//                                 <div className="leading-tight">
//                                     {circle.title}
//                                 </div>
//                                 {circle.subtitle && (
//                                     <div className="text-yellow-200 text-xs mt-1 font-normal">
//                                         {circle.subtitle}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {/* Key milestone dots on the path */}
//                 {[
//                     { progress: 25, pos: getStudentPosition(25) }, // Top of first arch
//                     { progress: 50, pos: getStudentPosition(50) }, // Bottom of second arch
//                     { progress: 75, pos: getStudentPosition(75) }, // Top of third arch
//                 ].map((milestone, dotIndex) => (
//                     <div
//                         key={dotIndex}
//                         className={`absolute w-3 h-3 rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
//                             progress >= milestone.progress
//                                 ? 'bg-yellow-500 scale-125 shadow-lg'
//                                 : 'bg-gray-400 scale-100'
//                         }`}
//                         style={{
//                             left: `${milestone.pos.x}%`,
//                             top: `${milestone.pos.y}%`,
//                         }}
//                     />
//                 ))}

//                 {/* Floating text header */}
//                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                         Student Journey Progress
//                     </h3>
//                     <div className="text-sm text-gray-500">
//                         Continuous automated workflow process
//                     </div>
//                 </div>

//                 {/* Current step indicator */}
//                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
//                     <div className="flex justify-center items-center gap-2 mb-2">
//                         {circles.map((_, index) => (
//                             <div
//                                 key={index}
//                                 className={`w-3 h-3 rounded-full transition-all duration-500 ${
//                                     activeCircle >= index
//                                         ? 'bg-teal-600 scale-110'
//                                         : 'bg-gray-300 scale-100'
//                                 }`}
//                             />
//                         ))}
//                     </div>
//                     <div className="text-sm font-medium text-gray-600">
//                         {activeCircle >= 0 && activeCircle < circles.length
//                             ? circles[activeCircle].title
//                             : 'Moving along the path...'}
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                         Progress: {progress}%
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CurveLineDotTopSvg } from './CurveLineDotTopSvg'
import { CurveLineDotBottomSvg } from './CurveLineDotBottomSvg'
import { StudentPlacementSteps } from './StudentPlacementSteps'

export const AssuredPlacementJourney = () => {
    // const [progress, setProgress] = useState(0)

    // // Auto progress (infinite loop)
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setProgress((prev) => (prev + 1) % 101) // 0–100%
    //     }, 80)
    //     return () => clearInterval(interval)
    // }, [])

    // Path definition (responsive SVG curve)
    const pathD =
        'M 50 150 ' + // start (left-center)
        'Q 150 50, 250 150 ' + // wave up to 1st circle
        'T 450 250 ' + // down to 2nd circle bottom
        'T 650 50 ' + // up to 3rd circle top
        'T 850 250 ' + // down to 4th circle bottom
        'T 1050 150' // end (right-center of 4th circle)

    return (
        <div className="min-h-[500px] md:max-w-7xl md:mx-auto mt-20">
            <div className="relative md:w-7xl md:h-[300px] md:mx-auto">
                <svg className="absolute top-0 left-0 w-full h-full hidden md:block">
                    <path
                        d="M 40 150 
             C 110 20, 250 20, 320 150
             C 390 280, 530 280, 600 150
             C 670 20, 810 20, 880 150
             C 950 280, 1090 280, 1160 150"
                        stroke="black"
                        strokeWidth="4" // make it bold
                        strokeDasharray="1 12" // 1px dash, 12px gap
                        strokeLinecap="round" // round makes dashes into dots
                        fill="transparent"
                    />
                </svg>
                {/* Curve path Dots top */}
                <div className="flex flex-col items-center absolute top-6 left-36">
                    <CurveLineDotTopSvg />
                    <div className="hidden  rounded-full md:flex justify-center items-center border-2 border-black p-0.5 size-4 absolute top-5 left-8">
                        <div className="bg-black rounded-full size-2"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center absolute top-5 left-[44rem]">
                    <CurveLineDotTopSvg />
                    <div className="hidden  rounded-full md:flex justify-center items-center border-2 border-black p-0.5 size-4 absolute top-5 left-8">
                        <div className="bg-black rounded-full size-2"></div>
                    </div>
                </div>
                {/* bottom dots */}
                <div className="flex flex-col items-center absolute bottom-5 left-[26.5rem]">
                    <CurveLineDotBottomSvg />
                    <div className="hidden rounded-full md:flex justify-center items-center border-2 border-black p-0.5 size-4 absolute top-7 left-9">
                        <div className="bg-black rounded-full size-2"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center absolute bottom-5 left-[61.5rem]">
                    <CurveLineDotBottomSvg />
                    <div className="hidden rounded-full md:flex justify-center items-center border-2 border-black p-0.5 size-4 absolute top-7 left-9">
                        <div className="bg-black rounded-full size-2"></div>
                    </div>
                </div>
                {/* <div className="hidden md:flex flex-col items-center absolute top-[5rem] left-[4.5rem]">
                    <div
                        className={`bg-[radial-gradient(50%_50%_at_50%_50%,#044866_90.87%,#0D5468_100%)] shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)] w-52 h-52 rounded-full flex items-center justify-center text-white text-center flex-col `}
                    >
                        <Image
                            src="/images/site/home-page-v3/assured-placement/assured-placement-journey-icons/student-added.png"
                            alt="student added"
                            height={50}
                            width={50}
                        />
                        Student Added
                    </div>
                </div> */}
                <div className="hidden md:flex flex-col items-center absolute top-[5rem] left-[4.5rem]">
                    <div className="group perspective w-52 h-52">
                        <div className="relative w-full h-full duration-500 transform-style preserve-3d group-hover:rotate-y-180">

                            {/* Front Side */}
                            <div className="absolute w-full h-full rounded-full flex flex-col items-center justify-center text-white text-center p-4
                      bg-[radial-gradient(50%_50%_at_50%_50%,#044866_90.87%,#0D5468_100%)]
                      shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)]
                      backface-hidden">
                                <Image
                                    src="/images/site/home-page-v3/assured-placement/assured-placement-journey-icons/student-added.png"
                                    alt="student added"
                                    height={50}
                                    width={50}
                                />
                                <span className="mt-2 font-semibold">Student Added</span>
                            </div>

                            {/* Back Side */}
                            <div className="absolute w-full h-full rounded-full flex items-center justify-center text-white text-center p-4
                      bg-[#0D5468] rotate-y-180 backface-hidden">
                                <p className="text-sm">
                                    This step ensures that all students are added successfully into the system and are ready to start their journey.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>



                <div className="hidden md:flex flex-col items-center absolute top-2 left-[22rem]">
                    <div className="group perspective w-52 h-52">
                        <div className="relative w-full h-full duration-500 transform-style preserve-3d group-hover:rotate-y-180">

                            {/* Front Side */}
                            <div className="absolute w-full h-full rounded-full flex items-center justify-center text-white text-center p-4
                      bg-[radial-gradient(50%_50%_at_50%_50%,#9B2000_90.87%,#6E1700_100%)]
                      shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)]
                      backface-hidden">
                                <span className="font-semibold">Case Officer Assigned</span>
                            </div>

                            {/* Back Side */}
                            <div className="absolute w-full h-full rounded-full flex items-center justify-center text-white text-center p-4
                      bg-[#6E1700] rotate-y-180 backface-hidden">
                                <p className="text-sm">
                                    A case officer has been assigned to handle your application and will guide you through the next steps.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-col items-center absolute top-[5rem] left-[40rem]">
                    <div className="group perspective w-52 h-52">
                        <div className="relative w-full h-full duration-500 transform-style preserve-3d group-hover:rotate-y-180">

                            {/* Front Side */}
                            <div className="absolute w-full h-full rounded-full flex flex-col items-center justify-center text-white text-center p-4
                      bg-[radial-gradient(50%_50%_at_50%_50%,#044866_90.87%,#0D5468_100%)]
                      shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)]
                      backface-hidden">
                                <Image
                                    src="/images/site/home-page-v3/assured-placement/assured-placement-journey-icons/compliance.png"
                                    alt="Compliance and AI matched"
                                    height={50}
                                    width={50}
                                />
                                <span className="mt-2 font-semibold">Compliance and Matched via AI</span>
                            </div>

                            {/* Back Side */}
                            <div className="absolute w-full h-full rounded-full flex items-center justify-center text-white text-center p-4
                      bg-[#0D5468] rotate-y-180 backface-hidden">
                                <p className="text-sm">
                                    Your compliance is verified and matching is optimized using AI to ensure accurate placement and guidance.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-col items-center absolute top-2 left-[57rem]">
                    <div className="group perspective w-52 h-52">
                        <div className="relative w-full h-full duration-500 transform-style preserve-3d group-hover:rotate-y-180">

                            {/* Front Side */}
                            <div className="absolute w-full h-full rounded-full flex flex-col items-center justify-center text-white text-center p-4
                      bg-[radial-gradient(50%_50%_at_50%_50%,#044866_90.87%,#0D5468_100%)]
                      shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)]
                      backface-hidden">
                                <Image
                                    src="/images/site/home-page-v3/assured-placement/assured-placement-journey-icons/all-paper-work.png"
                                    alt="All Paperwork & Follow ups"
                                    height={50}
                                    width={50}
                                />
                                <span className="mt-2 font-semibold">All Paperwork & Follow ups</span>
                            </div>

                            {/* Back Side */}
                            <div className="absolute w-full h-full rounded-full flex items-center justify-center text-white text-center p-4
                      bg-[#0D5468] rotate-y-180 backface-hidden">
                                <p className="text-sm">
                                    All paperwork is completed and follow-ups are handled efficiently to ensure a smooth process.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <StudentPlacementSteps />
                <div
                    className="absolute arc-path hidden md:block"
                // style={{ offsetDistance: `${progress}%` }}
                >
                    <Image
                        src="/images/site/home-page-v3/assured-placement/student-character.webp"
                        alt="Student"
                        width={60}
                        height={60}
                    />
                </div>
                {/* <div className="absolute w-4 h-4 bg-green-500 rounded-full arc-path"></div> */}
            </div>
        </div>
    )
}
