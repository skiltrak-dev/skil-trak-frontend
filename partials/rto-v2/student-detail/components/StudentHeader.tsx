import {
    Phone,
    Mail,
    MoreVertical,
    Clock,
    MapPin,
    Star,
    Award,
    Smartphone,
} from 'lucide-react'
import { Button, Badge } from '@components'

export function StudentHeader() {
    return (
        <div className="relative">
            {/* Main Card with Gradient Border Effect */}
            <div className="relative bg-gradient-to-r from-[#044866] via-[#0D5468] to-[#044866] p-[2px] rounded-3xl shadow-2xl">
                <div className="bg-white rounded-3xl overflow-hidden">
                    {/* Top Section - Profile & Contact */}
                    <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Left: Avatar + Name + Badges */}
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="absolute -inset-2 bg-gradient-to-br from-[#F7A619] via-[#F7A619]/50 to-transparent rounded-full blur-2xl opacity-60"></div>
                                    <div className="relative w-18 h-18 rounded-full bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 flex items-center justify-center text-white text-2xl shadow-2xl ring-4 ring-white">
                                        HM
                                    </div>
                                    {/* Online Status - Bottom Right */}
                                    <div className="absolute bottom-0 right-0 w-5.5 h-5.5 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                    {/* App Downloaded Badge - Bottom Left */}
                                    <div className="absolute bottom-0 left-0 w-5.5 h-5.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                                        <Smartphone className="w-2.5 h-2.5 text-white" />
                                    </div>
                                </div>

                                {/* Name & Badges */}
                                <div>
                                    <h2 className="text-slate-900 mb-2">
                                        Hema Maya Monger
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#044866] to-[#0D5468] text-white px-3 py-1.5 rounded-full shadow-lg shadow-[#044866]/25">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                            <span className="text-sm">
                                                Active Student
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-white border border-[#044866]/20 text-[#044866] px-2.5 py-1.5 rounded-full shadow-sm">
                                            <Phone className="w-3 h-3" />
                                            <span className="text-sm">
                                                Contactable
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-white border border-[#0D5468]/20 text-[#0D5468] px-2.5 py-1.5 rounded-full shadow-sm">
                                            <span className="text-sm">🌏</span>
                                            <span className="text-sm">
                                                International
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Action Buttons */}
                            <div className="flex items-center gap-2.5">
                                <Button className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white shadow-xl shadow-[#044866]/25 hover:shadow-2xl hover:scale-105 transition-all px-5 py-2">
                                    <Phone className="w-3.5 h-3.5 mr-2" />
                                    Call
                                </Button>
                                <Button
                                    outline
                                    variant="secondary"
                                    className="bg-white border-2 border-slate-200 hover:border-[#044866] hover:text-[#044866] shadow-lg hover:shadow-xl hover:scale-105 transition-all px-5 py-2"
                                >
                                    <Mail className="w-3.5 h-3.5 mr-2" />
                                    Email
                                </Button>
                                <Button
                                    outline
                                    variant="secondary"
                                    mini
                                    className="bg-white border-2 border-slate-200 hover:border-[#044866] shadow-lg hover:shadow-xl hover:scale-105 transition-all w-9 h-9"
                                >
                                    <MoreVertical className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>

                        {/* Contact Info Pills */}
                        <div className="flex items-center gap-2 mt-4 ml-24">
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-[#044866]/10 to-[#0D5468]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Mail className="w-2.5 h-2.5 text-[#044866]" />
                                </div>
                                <span className="text-sm text-slate-700">
                                    *****.com
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-[#044866]/10 to-[#0D5468]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Phone className="w-2.5 h-2.5 text-[#044866]" />
                                </div>
                                <span className="text-sm text-slate-700">
                                    *****7731
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                                <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-[#F7A619]/10 to-[#F7A619]/20 flex items-center justify-center">
                                    <MapPin className="w-2.5 h-2.5 text-[#F7A619]" />
                                </div>
                                <span className="text-sm text-slate-700">
                                    Bayswater, WA
                                </span>
                            </div>
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 shadow-sm">
                                <span className="text-sm text-slate-700">
                                    *****3973
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Info Cards */}
                    <div className="px-6 py-4 bg-white">
                        <div className="grid grid-cols-4 gap-3">
                            {/* Card 1: Primary Course */}
                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] p-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 w-18 h-18 bg-white/5 rounded-full -mr-9 -mt-9"></div>
                                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full -ml-6 -mb-6"></div>
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                        <Award className="w-4.5 h-4.5 text-white" />
                                    </div>
                                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                        Primary Course
                                    </p>
                                    <p className="text-white mb-1 text-[15px]">
                                        CHC33021
                                    </p>
                                    <p className="text-sm text-white/80">
                                        Cert III Individual Support
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Active Workplace */}
                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D5468] to-[#044866] p-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 w-18 h-18 bg-white/5 rounded-full -mr-9 -mt-9"></div>
                                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full -ml-6 -mb-6"></div>
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                        <span className="text-lg">🏢</span>
                                    </div>
                                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                        Active Workplace
                                    </p>
                                    <p className="text-white mb-1 text-[15px]">
                                        Hale Foundation
                                    </p>
                                    <p className="text-sm text-white/80">
                                        Marangaroo, WA
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Coordinator */}
                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] p-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 w-18 h-18 bg-white/5 rounded-full -mr-9 -mt-9"></div>
                                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full -ml-6 -mb-6"></div>
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                        <span className="text-lg">👤</span>
                                    </div>
                                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                        Coordinator
                                    </p>
                                    <p className="text-white mb-1 text-[15px]">
                                        Daniel
                                    </p>
                                    <p className="text-sm text-white/80">
                                        Assigned Nov 4, 2025
                                    </p>
                                </div>
                            </div>

                            {/* Card 4: Student Since */}
                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] p-4 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 w-18 h-18 bg-white/5 rounded-full -mr-9 -mt-9"></div>
                                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full -ml-6 -mb-6"></div>
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                        <Clock className="w-4.5 h-4.5 text-white" />
                                    </div>
                                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                        Student Since
                                    </p>
                                    <p className="text-white mb-1 text-[15px]">
                                        September 2025
                                    </p>
                                    <p className="text-sm text-white/80">
                                        3+ months active
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Banner */}
                        <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#044866]/5 via-[#0D5468]/5 to-transparent border border-[#044866]/20 p-3.5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/25">
                                            <Clock className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F7A619] animate-ping"></div>
                                    </div>
                                    <div>
                                        <p className="text-slate-900 mb-0.5">
                                            Time Remaining:{' '}
                                            <span className="font-medium text-[#044866]">
                                                32d 11h
                                            </span>{' '}
                                            until December 14, 2025
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            Course completion deadline
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-[#044866]/20">
                                    <Star className="w-3.5 h-3.5 text-[#044866] fill-[#044866]" />
                                    <span className="text-sm text-[#044866]">
                                        On Track
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
