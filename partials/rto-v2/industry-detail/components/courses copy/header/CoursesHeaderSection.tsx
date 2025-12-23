import { Button, TextInput } from '@components'
import { AnimatePresence, motion } from 'framer-motion'
import {
    AlertCircle,
    BookOpen,
    Filter,
    Search,
    Sparkles,
    TrendingUp,
    Users,
} from 'lucide-react'

interface CoursesHeaderSectionProps {
    showSearch: boolean
    searchQuery: string
    totalCourses: number
    totalStudents: number
    totalCapacity: number
    overallCapacity: number
    onToggleSearch: () => void
    onSearchChange: (value: string) => void
}

export function CoursesHeaderSection({
    showSearch,
    searchQuery,
    totalCourses,
    totalStudents,
    totalCapacity,
    overallCapacity,
    onToggleSearch,
    onSearchChange,
}: CoursesHeaderSectionProps) {
    return (
        <div className="space-y-4">
            {/* Main Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#1A2332] mb-1">
                        Courses & Programs
                    </h2>
                    <p className="text-sm text-[#64748B]">
                        Manage facility approvals, supervisors, and course
                        workflows
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={onToggleSearch}
                        variant="secondary"
                        className="gap-2 h-10"
                    >
                        <Search className="w-4 h-4" />
                        Search
                    </Button>
                    <Button variant="secondary" className="gap-2 h-10">
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                            <TextInput
                                name="search"
                                value={searchQuery}
                                onChange={(e: any) =>
                                    onSearchChange(e.target.value)
                                }
                                placeholder="Search courses, codes, or programs..."
                                className="pl-10 h-11 bg-white border-[#E2E8F0] focus:border-[#044866]"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-4">
                {/* Total Courses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-2xl p-5 text-white shadow-lg shadow-[#044866]/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-4 -mb-4" />
                    <div className="relative">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <p className="text-white/80 text-xs mb-1">
                            Total Courses
                        </p>
                        <p className="text-3xl font-bold">{totalCourses}</p>
                    </div>
                </motion.div>

                {/* Total Students */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl p-5 border-2 border-[#E2E8F0] shadow-lg relative overflow-hidden group hover:border-[#044866]/20 transition-all"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#044866]/5 rounded-full -mr-8 -mt-8 group-hover:bg-[#044866]/10 transition-colors" />
                    <div className="relative">
                        <div className="w-12 h-12 bg-[#044866]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#044866]/20 transition-colors">
                            <Users className="w-6 h-6 text-[#044866]" />
                        </div>
                        <p className="text-[#64748B] text-xs mb-1">
                            Active Students
                        </p>
                        <p className="text-3xl font-bold text-[#1A2332]">
                            {totalStudents}
                        </p>
                        <p className="text-[10px] text-[#64748B] mt-1">
                            of {totalCapacity} capacity
                        </p>
                    </div>
                </motion.div>

                {/* Utilization Rate */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-2xl p-5 border-2 shadow-lg relative overflow-hidden group transition-all ${
                        overallCapacity >= 80
                            ? 'bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 border-[#10B981]/30 shadow-[#10B981]/10'
                            : overallCapacity >= 50
                            ? 'bg-gradient-to-br from-[#F7A619]/10 to-[#EA580C]/10 border-[#F7A619]/30 shadow-[#F7A619]/10'
                            : 'bg-white border-[#E2E8F0]'
                    }`}
                >
                    <div
                        className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 ${
                            overallCapacity >= 80
                                ? 'bg-[#10B981]/10'
                                : overallCapacity >= 50
                                ? 'bg-[#F7A619]/10'
                                : 'bg-[#64748B]/5'
                        }`}
                    />
                    <div className="relative">
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                                overallCapacity >= 80
                                    ? 'bg-[#10B981]/20'
                                    : overallCapacity >= 50
                                    ? 'bg-[#F7A619]/20'
                                    : 'bg-[#64748B]/10'
                            }`}
                        >
                            <TrendingUp
                                className={`w-6 h-6 ${
                                    overallCapacity >= 80
                                        ? 'text-[#10B981]'
                                        : overallCapacity >= 50
                                        ? 'text-[#F7A619]'
                                        : 'text-[#64748B]'
                                }`}
                            />
                        </div>
                        <p className="text-[#64748B] text-xs mb-1">
                            Utilization Rate
                        </p>
                        <p
                            className={`text-3xl font-bold ${
                                overallCapacity >= 80
                                    ? 'text-[#10B981]'
                                    : overallCapacity >= 50
                                    ? 'text-[#F7A619]'
                                    : 'text-[#1A2332]'
                            }`}
                        >
                            {overallCapacity}%
                        </p>
                        <div className="mt-2 bg-[#E2E8F0] rounded-full h-1.5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${overallCapacity}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${
                                    overallCapacity >= 80
                                        ? 'bg-gradient-to-r from-[#10B981] to-[#059669]'
                                        : overallCapacity >= 50
                                        ? 'bg-gradient-to-r from-[#F7A619] to-[#EA580C]'
                                        : 'bg-gradient-to-r from-[#64748B] to-[#475569]'
                                }`}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Workflow Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-gradient-to-br from-[#F7A619]/10 to-[#EA580C]/10 rounded-2xl p-5 border-2 border-[#F7A619]/30 shadow-lg shadow-[#F7A619]/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#F7A619]/10 rounded-full -mr-8 -mt-8" />
                    <div className="relative">
                        <div className="w-12 h-12 bg-[#F7A619]/20 rounded-xl flex items-center justify-center mb-3">
                            <AlertCircle className="w-6 h-6 text-[#F7A619]" />
                        </div>
                        <p className="text-[#64748B] text-xs mb-1">
                            Pending Actions
                        </p>
                        <p className="text-3xl font-bold text-[#F7A619]">1</p>
                        <p className="text-[10px] text-[#EA580C] mt-1 font-medium">
                            Requires immediate attention
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-[#E8F4F8] to-[#F8FAFB] border border-[#044866]/10 rounded-xl p-4"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#1A2332]">
                                Workflow Overview
                            </p>
                            <p className="text-xs text-[#64748B]">
                                Track facility approvals and course setup
                                progress
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0]">
                            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                            <span className="text-xs text-[#64748B]">
                                1 Approved
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#F7A619]/30">
                            <div className="w-2 h-2 rounded-full bg-[#F7A619] animate-pulse" />
                            <span className="text-xs text-[#64748B]">
                                1 Pending Review
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#E2E8F0]">
                            <div className="w-2 h-2 rounded-full bg-[#64748B]" />
                            <span className="text-xs text-[#64748B]">
                                2 Awaiting Signature
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
