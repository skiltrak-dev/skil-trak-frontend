import { Button, TextInput } from '@components'
import { AnimatePresence, motion } from 'framer-motion'
import {
    Activity,
    AlertCircle,
    BarChart3,
    BookOpen,
    CheckCircle,
    FileText,
    Search,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
} from 'lucide-react'
import { useState } from 'react'
import { SectorCards } from './components'

const sectors = [
    {
        id: 1,
        name: 'Health & Community Services',
        icon: '🏥',
        color: 'from-[#044866] to-[#0D5468]',
        eSignature: {
            status: 'approved',
            sentDate: '2024-11-15',
            sentBy: 'Jessica Williams - Program Coordinator',
            signedDate: '2024-11-18',
            signedBy: 'Sarah Mitchell - Clinical Manager',
            approvedDate: '2024-11-20',
            approvedBy: 'Dr. Robert Chen - Head of Department',
            documentUrl: '/documents/facility-checklist-health-services.pdf',
        },
        supervisors: [
            {
                name: 'Sarah Johnson',
                title: 'Registered Nurse, Bachelor of Nursing',
                role: 'Senior Manager',
                experience: 12,
                description:
                    'Specialized in aged care and disability support with extensive experience in student mentoring and clinical supervision.',
                phone: '+61 2 9876 5432',
                email: 'sarah.j@techcorp.com.au',
            },
            {
                name: 'Michael Chen',
                title: 'Certificate IV in Training and Assessment',
                role: 'Clinical Supervisor',
                experience: 8,
                description:
                    'Expert in disability services and community care programs. Passionate about developing future healthcare professionals.',
                phone: '+61 2 9876 5433',
                email: 'michael.c@techcorp.com.au',
            },
        ],
        courses: [
            {
                id: 1,
                code: 'CHC33021',
                name: 'Certificate III in Individual Support',
                programs: ['Ageing', 'Disability', 'Home and Community'],
                deliveryModes: ['Face-to-face', 'Blended', 'Online'],
                status: 'Active',
                students: 45,
                capacity: 60,
                duration: '12 months',
                rating: 4.8,
                courseHours: 520,
                streams: [
                    'Ageing Support',
                    'Disability Support',
                    'Home & Community Care',
                ],
                placementWorkflow: {
                    currentStep: 4,
                    totalSteps: 8,
                    status: 'In Progress',
                    completedSteps: 4,
                    remainingSteps: 3,
                    placementSchedule: 65,
                },
                programsAndServices:
                    'Based on publicly available information and a signed facility checklist, TechCorp Healthcare provides comprehensive aged care and disability support services. The organization offers a range of services including: Standard care programs aligned with NDIS guidelines and aged care quality standards. Specialist services such as physiotherapy, occupational therapy, and recreational activities. Support programs for clients with diverse care needs including dementia care and complex care requirements.',
                branchesAndLocations:
                    'TechCorp Healthcare operates from a single primary location in Sydney, NSW with satellite service delivery across the Greater Sydney metropolitan area.',
                activities: [
                    'Assisting care coordinators in the delivery of person-centered support plans',
                    'Working with individual clients on daily living activities and personal care',
                    'Supporting the preparation of care resources and activity programs',
                    'Contributing to the health, safety, and wellbeing of clients',
                    'Assisting clients with additional needs within community and residential settings',
                ],
                eligibilityNotes:
                    "The workplace is approved. TechCorp Healthcare's core business as an aged care and disability support provider directly aligns with the vocational outcomes of the CHC33021 qualification. The industry has signed the facility checklist, confirming the environment is a suitable setting for a student to engage in a range of support tasks and demonstrate the required competencies for the Certificate III level.",
                coordinatorNote:
                    'Verified - excellent placement partner with strong mentoring culture',
                hodComment: 'Approved for maximum capacity allocation',
                note: 'Priority partner - fast-track student placements',
                requestedBy: 'Sarah Mitchell - Clinical Manager',
                referenceUrl: 'https://techcorphealthcare.com.au',
            },
            {
                id: 2,
                code: 'CHC43121',
                name: 'Certificate IV in Disability',
                programs: ['Disability Support'],
                deliveryModes: ['Face-to-face', 'Blended'],
                status: 'Active',
                students: 28,
                capacity: 40,
                duration: '18 months',
                rating: 4.9,
                courseHours: 780,
                streams: [
                    'Complex Care',
                    'Community Participation',
                    'Behavioural Support',
                ],
                placementWorkflow: {
                    currentStep: 6,
                    totalSteps: 8,
                    status: 'In Progress',
                    completedSteps: 6,
                    remainingSteps: 2,
                    placementSchedule: 82,
                },
                programsAndServices:
                    'TechCorp Healthcare specializes in disability support services registered with NDIS. The organization provides: Evidence-based support programs for clients with complex disabilities. Specialist services including behavior support, therapy assistance, and community access programs. Comprehensive support for participants across all disability types and age groups.',
                branchesAndLocations:
                    'Operating from Sydney headquarters with outreach services to Western Sydney, Northern Beaches, and Sutherland Shire regions.',
                activities: [
                    'Implementing individualized support plans under supervision',
                    'Facilitating community participation and social inclusion activities',
                    'Supporting clients with complex care needs and behaviors of concern',
                    'Coordinating with allied health professionals and support teams',
                    'Maintaining documentation and reporting in compliance with NDIS standards',
                ],
                eligibilityNotes:
                    'The workplace is approved. TechCorp Healthcare demonstrates extensive experience in disability support service delivery aligned with CHC43121 vocational outcomes. The signed facility checklist confirms appropriate supervision structures and diverse client base suitable for Certificate IV competency development.',
                coordinatorNote:
                    'Verify additional supervisor qualifications for behavioral support stream',
                hodComment:
                    'Approved pending NDIS registration renewal documentation',
                note: 'Request updated insurance certificates',
                requestedBy: 'David Chen - NDIS Coordinator',
                referenceUrl:
                    'https://techcorphealthcare.com.au/disability-services',
            },
        ],
    },
    {
        id: 2,
        name: 'Hospitality & Tourism',
        icon: '👨‍🍳',
        color: 'from-[#F7A619] to-[#EA580C]',
        supervisors: [
            {
                name: 'Emma Williams',
                title: 'Trade Certificate III & IV in Commercial Cookery',
                role: 'Head Chef',
                experience: 15,
                description:
                    'Award-winning chef with international experience in fine dining and commercial kitchens. Committed to culinary education excellence.',
                phone: '+61 2 9876 5434',
                email: 'emma.w@techcorp.com.au',
            },
        ],
        courses: [
            {
                id: 3,
                code: 'SIT30821',
                name: 'Certificate III in Commercial Cookery',
                programs: ['Commercial Cookery'],
                deliveryModes: ['Face-to-face'],
                status: 'Pending Setup',
                students: 12,
                capacity: 30,
                duration: '24 months',
                rating: 4.6,
                placementWorkflow: {
                    currentStep: 2,
                    totalSteps: 8,
                    status: 'In Progress',
                    completedSteps: 2,
                    remainingSteps: 6,
                    placementSchedule: 28,
                },
            },
        ],
    },
    {
        id: 3,
        name: 'Technology & IT',
        icon: '💻',
        color: 'from-[#8B5CF6] to-[#7C3AED]',
        eSignature: {
            status: 'signed',
            sentDate: '2024-11-25',
            sentBy: 'Jessica Williams - Program Coordinator',
            signedDate: '2024-11-28',
            signedBy: 'James Anderson - IT Manager',
            approvedDate: null,
            approvedBy: null,
            documentUrl: '/documents/facility-checklist-technology-it.pdf',
        },
        supervisors: [
            {
                name: 'James Anderson',
                title: 'Bachelor of IT, Cisco Certified Network Professional',
                role: 'IT Manager',
                experience: 10,
                description:
                    'Senior systems architect with expertise in network infrastructure and cybersecurity. Dedicated to nurturing the next generation of IT professionals.',
                phone: '+61 2 9876 5435',
                email: 'james.a@techcorp.com.au',
            },
            {
                name: 'Lisa Wong',
                title: 'Master of Computer Science',
                role: 'Senior Developer',
                experience: 7,
                description:
                    'Full-stack developer specializing in cloud technologies and agile methodologies. Passionate about teaching modern software development practices.',
                phone: '+61 2 9876 5436',
                email: 'lisa.w@techcorp.com.au',
            },
        ],
        courses: [
            {
                id: 4,
                code: 'ICT30120',
                name: 'Certificate III in Information Technology',
                programs: ['Software Development', 'Network Administration'],
                deliveryModes: ['Face-to-face', 'Online', 'Blended'],
                status: 'Active',
                students: 35,
                capacity: 50,
                duration: '18 months',
                rating: 4.7,
                courseHours: 650,
                streams: [
                    'Software Development',
                    'Network Infrastructure',
                    'Cybersecurity',
                ],
                placementWorkflow: {
                    currentStep: 5,
                    totalSteps: 8,
                    status: 'In Progress',
                    completedSteps: 5,
                    remainingSteps: 3,
                    placementSchedule: 73,
                },
                programsAndServices:
                    'TechCorp is a leading technology solutions provider specializing in enterprise software development, network infrastructure management, and cybersecurity services. The organization delivers: Custom software development and cloud solutions for enterprise clients. Network infrastructure design, implementation, and management services. Cybersecurity consultation, penetration testing, and security monitoring services.',
                branchesAndLocations:
                    'TechCorp operates from modern offices in Sydney CBD with additional tech hubs in Parramatta and North Sydney.',
                activities: [
                    'Assisting development teams with software coding and testing under supervision',
                    'Supporting network infrastructure projects and system administration tasks',
                    'Contributing to cybersecurity assessments and security documentation',
                    'Participating in agile development sprints and team collaboration',
                    'Learning industry-standard tools, frameworks, and development methodologies',
                ],
                eligibilityNotes:
                    "The workplace is approved. TechCorp's core business in software development and IT infrastructure aligns perfectly with the ICT30120 qualification outcomes. The facility checklist confirms appropriate technical resources, qualified supervision, and diverse project opportunities suitable for Certificate III competency development.",
                coordinatorNote:
                    'Excellent partner with modern development practices and mentoring program',
                hodComment:
                    'Awaiting final approval - pending insurance documentation review',
                note: 'Strong industry connections - consider for advanced placement options',
                requestedBy: 'James Anderson - IT Manager',
                referenceUrl: 'https://techcorp.com.au',
            },
        ],
    },
]

export function CoursesModule() {
    const [expandedSectors, setExpandedSectors] = useState<number[]>([1])
    const [expandedCourses, setExpandedCourses] = useState<number[]>([])
    const [expandedESignatures, setExpandedESignatures] = useState<number[]>([])
    const [editingCapacity, setEditingCapacity] = useState<number | null>(null)
    const [editValues, setEditValues] = useState<{
        students: number
        capacity: number
    }>({ students: 0, capacity: 0 })
    const [editingSectorMetrics, setEditingSectorMetrics] = useState<
        number | null
    >(null)
    const [sectorMetricValues, setSectorMetricValues] = useState<{
        students: number
        capacity: number
        duration: string
    }>({ students: 0, capacity: 0, duration: '' })
    const [coursesData, setCoursesData] = useState<any>(sectors)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    const toggleSector = (sectorId: number) => {
        if (expandedSectors.includes(sectorId)) {
            setExpandedSectors(expandedSectors.filter((id) => id !== sectorId))
        } else {
            setExpandedSectors([...expandedSectors, sectorId])
        }
    }

    const toggleCourse = (courseId: number) => {
        if (expandedCourses.includes(courseId)) {
            setExpandedCourses(expandedCourses.filter((id) => id !== courseId))
        } else {
            setExpandedCourses([...expandedCourses, courseId])
        }
    }

    const toggleESignature = (sectorId: number) => {
        if (expandedESignatures.includes(sectorId)) {
            setExpandedESignatures(
                expandedESignatures.filter((id) => id !== sectorId)
            )
        } else {
            setExpandedESignatures([...expandedESignatures, sectorId])
        }
    }

    const startEditingCapacity = (courseId: number) => {
        const course = coursesData
            .flatMap((s: any) => s.courses)
            .find((c: any) => c.id === courseId)
        if (course) {
            setEditingCapacity(courseId)
            setEditValues({
                students: course.students,
                capacity: course.capacity,
            })
        }
    }

    const saveCapacityChanges = (courseId: number) => {
        const updatedCoursesData = coursesData.map((sector: any) => ({
            ...sector,
            courses: sector.courses.map((course: any) => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        students: editValues.students,
                        capacity: editValues.capacity,
                    }
                }
                return course
            }),
        }))
        setCoursesData(updatedCoursesData)
        setEditingCapacity(null)
    }

    const cancelCapacityChanges = () => {
        setEditingCapacity(null)
    }

    const startEditingSectorMetrics = (sectorId: number) => {
        const sector = coursesData.find((s: any) => s.id === sectorId)
        if (sector) {
            const sectorStudents = sector.courses.reduce(
                (sum: number, c: any) => sum + c.students,
                0
            )
            const sectorCapacity = sector.courses.reduce(
                (sum: number, c: any) => sum + c.capacity,
                0
            )
            const duration =
                sector.courses.length > 0 && sector.courses[0].duration
                    ? sector.courses[0].duration
                    : '12 months'

            setEditingSectorMetrics(sectorId)
            setSectorMetricValues({
                students: sectorStudents,
                capacity: sectorCapacity,
                duration: duration,
            })
        }
    }

    const saveSectorMetrics = (sectorId: number) => {
        const updatedCoursesData = coursesData.map((sector: any) => {
            if (sector.id === sectorId) {
                // Update the capacity for all courses proportionally
                const totalCurrentCapacity = sector.courses.reduce(
                    (sum: number, c: any) => sum + c.capacity,
                    0
                )
                const totalCurrentStudents = sector.courses.reduce(
                    (sum: number, c: any) => sum + c.students,
                    0
                )
                const capacityRatio =
                    sectorMetricValues.capacity / totalCurrentCapacity
                const studentsRatio =
                    sectorMetricValues.students / totalCurrentStudents

                return {
                    ...sector,
                    courses: sector.courses.map((course: any, idx: number) => ({
                        ...course,
                        students:
                            idx === 0
                                ? sectorMetricValues.students
                                : Math.round(course.students * studentsRatio),
                        capacity:
                            idx === 0
                                ? sectorMetricValues.capacity
                                : Math.round(course.capacity * capacityRatio),
                        duration: sectorMetricValues.duration,
                    })),
                }
            }
            return sector
        })
        setCoursesData(updatedCoursesData)
        setEditingSectorMetrics(null)
    }

    const cancelSectorMetrics = () => {
        setEditingSectorMetrics(null)
    }

    // Calculate overall statistics
    const totalCourses = coursesData.reduce(
        (sum: number, s: any) => sum + s.courses.length,
        0
    )
    const totalStudents = coursesData.reduce(
        (sum: number, s: any) =>
            s.courses.reduce((cSum: number, c: any) => cSum + c.students, 0) +
            sum,
        0
    )
    const totalCapacity = coursesData.reduce(
        (sum: number, s: any) =>
            s.courses.reduce((cSum: number, c: any) => cSum + c.capacity, 0) +
            sum,
        0
    )
    const overallCapacity = Math.round((totalStudents / totalCapacity) * 100)

    return (
        <div className="space-y-5">
            {/* Premium Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white via-[#F8FAFB] to-[#E8F4F8] rounded-lg border border-[#E2E8F0] p-3 shadow-md"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center shadow-md">
                            <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-[#1A2332] mb-0.5">
                                Courses & Programs
                            </h2>
                            <p className="text-[9px] text-[#64748B]">
                                Manage course offerings and capacity across all
                                sectors
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="secondary"
                            onClick={() => setShowSearch(!showSearch)}
                            className={`p-1.5 h-auto w-auto rounded-md transition-all duration-300 ${
                                showSearch
                                    ? 'bg-[#044866] text-white shadow-md hover:bg-[#044866]'
                                    : 'bg-white text-[#64748B] hover:bg-[#F8FAFB] border border-[#E2E8F0]'
                            }`}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Search className="w-3 h-3" />
                            </motion.div>
                        </Button>
                        <Button
                            variant="secondary"
                            className="px-2 py-1.5 h-auto bg-gradient-to-r from-[#044866] to-[#0D5468] text-white rounded-md hover:shadow-md hover:bg-gradient-to-r hover:from-[#044866] hover:to-[#0D5468] transition-all duration-300 flex items-center gap-1.5 text-[10px]"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-1.5"
                            >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Notes</span>
                            </motion.div>
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <AnimatePresence>
                    {showSearch && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="relative mb-3">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#64748B] z-10" />
                                <TextInput
                                    name="search"
                                    type="text"
                                    placeholder="Search courses, programs, or supervisors..."
                                    value={searchQuery}
                                    onChange={(e: any) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-7 pr-2 py-1.5 h-auto bg-white border border-[#E2E8F0] rounded-md focus-visible:border-[#044866] focus-visible:ring-2 focus-visible:ring-[#044866]/20 transition-all text-[10px]"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Statistics Grid - Premium */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <motion.div
                        whileHover={{ y: -1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-[#E2E8F0] shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-0.5">
                            <div className="w-5 h-5 bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] rounded-md flex items-center justify-center">
                                <BookOpen className="w-3 h-3 text-[#044866]" />
                            </div>
                            <TrendingUp className="w-2.5 h-2.5 text-[#10B981]" />
                        </div>
                        <p className="text-base font-bold text-[#1A2332] mb-0.5">
                            {totalCourses}
                        </p>
                        <p className="text-[8px] text-[#64748B]">
                            Total Courses
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-[#E2E8F0] shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-0.5">
                            <div className="w-5 h-5 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-md flex items-center justify-center">
                                <Users className="w-3 h-3 text-[#F7A619]" />
                            </div>
                            <Activity className="w-2.5 h-2.5 text-[#F7A619]" />
                        </div>
                        <p className="text-base font-bold text-[#1A2332] mb-0.5">
                            {totalStudents}
                        </p>
                        <p className="text-[8px] text-[#64748B]">
                            Active Students
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-[#E2E8F0] shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-0.5">
                            <div className="w-5 h-5 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-md flex items-center justify-center">
                                <Target className="w-3 h-3 text-[#3B82F6]" />
                            </div>
                            <BarChart3 className="w-2.5 h-2.5 text-[#3B82F6]" />
                        </div>
                        <p className="text-base font-bold text-[#1A2332] mb-0.5">
                            {totalCapacity}
                        </p>
                        <p className="text-[8px] text-[#64748B]">
                            Total Capacity
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-[#E2E8F0] shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-0.5">
                            <div
                                className={`w-5 h-5 bg-gradient-to-br ${
                                    overallCapacity >= 80
                                        ? 'from-[#FEE2E2] to-[#FECACA]'
                                        : 'from-[#D1FAE5] to-[#A7F3D0]'
                                } rounded-md flex items-center justify-center`}
                            >
                                {overallCapacity >= 80 ? (
                                    <AlertCircle className="w-3 h-3 text-[#DC2626]" />
                                ) : (
                                    <CheckCircle className="w-3 h-3 text-[#10B981]" />
                                )}
                            </div>
                            {overallCapacity >= 80 ? (
                                <TrendingUp className="w-2.5 h-2.5 text-[#DC2626]" />
                            ) : (
                                <TrendingDown className="w-2.5 h-2.5 text-[#10B981]" />
                            )}
                        </div>
                        <p
                            className={`text-base font-bold mb-0.5 ${
                                overallCapacity >= 80
                                    ? 'text-[#DC2626]'
                                    : 'text-[#10B981]'
                            }`}
                        >
                            {overallCapacity}%
                        </p>
                        <p className="text-[8px] text-[#64748B]">
                            Overall Capacity
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Sector Cards - Enhanced Design */}
            <div className="space-y-3">
                {coursesData.map((sector: any, sectorIndex: number) => {
                    const isExpanded = expandedSectors.includes(sector.id)

                    return (
                        <SectorCards
                            key={sector.id}
                            sector={sector}
                            isExpanded={isExpanded}
                            toggleSector={toggleSector}
                            sectorIndex={sectorIndex}
                            startEditingSectorMetrics={
                                startEditingSectorMetrics
                            }
                            expandedCourses={expandedCourses}
                            toggleCourse={toggleCourse}
                        />
                    )
                })}
            </div>
        </div>
    )
}
