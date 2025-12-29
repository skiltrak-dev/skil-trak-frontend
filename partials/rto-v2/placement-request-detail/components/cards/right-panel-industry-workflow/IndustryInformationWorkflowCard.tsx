import React from 'react'
import { motion } from 'framer-motion'
import { Badge, Button, Card } from '@components'
import {
    Building2,
    Mail,
    MapPin,
    MapPinned,
    Phone,
    User,
    Zap,
} from 'lucide-react'
export const IndustryInformationWorkflowCard = ({
    showIndustryDetails,
}: any) => {
    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-7"
        >
            {showIndustryDetails && (
                <>
                    {/* Industry Match Card */}
                    <Card
                        noPadding
                        className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-sm"
                    >
                        <div className="relative p-5">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#0D5468]/10 to-transparent rounded-full -mr-24 -mt-24" />

                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0D5468] to-[#044866] flex items-center justify-center text-white shadow-lg ring-2 ring-white">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-[#044866] font-semibold">
                                                St Vincent's Hospital
                                            </h3>
                                            <p className="text-slate-600 text-xs">
                                                Aged Care Unit, Fitzroy
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        text="Matched"
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-sm"
                                    />
                                </div>

                                {/* Distance Section */}
                                <div className="p-4 bg-white rounded-xl border border-slate-200 mb-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-[#F7A619]" />
                                            <span className="text-slate-900 font-semibold">
                                                Distance
                                            </span>
                                        </div>
                                        <span className="text-[#044866] font-bold text-lg">
                                            8.5 km
                                        </span>
                                    </div>
                                    <Button
                                        className="w-full bg-gradient-to-r from-[#F7A619] to-[#F7A619]/90 hover:from-[#F7A619]/90 hover:to-[#F7A619] text-white h-10"
                                        onClick={() => {
                                            // Opening map view...
                                            // Map functionality would go here
                                        }}
                                    >
                                        <MapPinned className="h-4 w-4 mr-2" />
                                        View Map
                                    </Button>
                                    <p className="text-xs text-slate-500 mt-2 text-center">
                                        41 Victoria Parade, Fitzroy VIC 3065
                                    </p>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                                        <User className="h-4 w-4 text-[#044866]" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-slate-500">
                                                Contact Person
                                            </p>
                                            <p className="text-xs text-slate-900 font-medium truncate">
                                                Margaret Chen
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                                        <Phone className="h-4 w-4 text-[#044866]" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-slate-500">
                                                Phone
                                            </p>
                                            <p className="text-xs text-slate-900 font-medium">
                                                03 9288 2211
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                                        <Mail className="h-4 w-4 text-[#044866]" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-slate-500">
                                                Email
                                            </p>
                                            <p className="text-xs text-slate-900 font-medium truncate">
                                                placements@svhm.org.au
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card
                        noPadding
                        className="border-0 shadow-xl overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-5 py-4">
                            <div className="flex items-center gap-2.5 text-white">
                                <Zap className="h-5 w-5" />
                                <h3 className="font-semibold">Quick Actions</h3>
                            </div>
                        </div>

                        <div className="p-5 space-y-3">
                            <Button
                                outline
                                className="w-full border-2 border-[#044866]/20 hover:border-[#044866] hover:bg-[#044866]/5 h-11"
                                onClick={() => {
                                    // Switching to student profile...
                                    // Navigation functionality would go here
                                }}
                            >
                                <User className="h-4 w-4 mr-2" />
                                Switch to Student Profile
                            </Button>

                            <Button
                                outline
                                variant="secondary"
                                className="w-full border-2 border-slate-200 hover:border-slate-300 h-11"
                                Icon={Mail}
                                text="Email All Parties"
                            />
                        </div>
                    </Card>
                </>
            )}
        </motion.div>
    )
}
