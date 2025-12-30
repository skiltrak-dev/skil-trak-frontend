import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@components/ui'
import { Button } from '@components'
import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Separator } from '@components/ui/separator'
import { ScrollArea } from '@components/ui/scroll-area'

export const PremiumFeatureModal = () => {
    const [addOnDialogOpen, setAddOnDialogOpen] = useState(false)

    return (
        <div className="mt-3 pt-3 border-t border-white/20">
            <Dialog open={addOnDialogOpen} onOpenChange={setAddOnDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full py-1.5 bg-gradient-to-r from-[#F7A619] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#F7A619] text-white rounded-lg text-xs font-medium transition-all shadow-md h-auto">
                        Add-On Services Proposal
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[85vh] p-0">
                    <DialogHeader className="bg-gradient-to-r from-[#F7A619] to-[#FFB84D] p-6 rounded-t-lg">
                        <DialogTitle className="text-white text-xl">
                            Add-On Services for Industry Partnerships
                        </DialogTitle>
                        <DialogDescription className="text-white/90 text-sm mt-2">
                            Comprehensive service offerings to enhance RTO
                            partnerships and support student placements
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="max-h-[calc(85vh-155px)] px-6">
                        <div className="space-y-6 py-2">
                            {/* Service 1: Conditional MOU */}
                            <div className="bg-gradient-to-br from-[#044866]/5 to-[#0D5468]/5 rounded-xl p-5 border border-[#044866]/20">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-[#044866] font-semibold text-base">
                                            1. Conditional Memorandum of
                                            Understanding (MOU) with RTOs
                                        </h3>
                                        <div className="mt-2 inline-flex items-center gap-2 bg-[#F7A619]/10 text-[#F7A619] px-3 py-1 rounded-full text-sm font-medium">
                                            Industry Contribution: $90 per MOU
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <p>
                                        A Conditional MOU helps RTOs meet VET
                                        compliance by showing active industry
                                        partnerships.
                                    </p>
                                    <p>
                                        It confirms your workplace is suitable
                                        and open to hosting students in the
                                        future — with no obligation to take
                                        students immediately.
                                    </p>
                                    <p>
                                        SkilTrak coordinates this process on
                                        your behalf by collecting basic
                                        workplace details and photos, verifying
                                        eligibility, and preparing the MOU for
                                        signing.
                                    </p>
                                    <p>
                                        This supports RTO accreditation while
                                        recognising your business as an
                                        approved, placement-ready partner.
                                    </p>
                                    <div className="bg-white rounded-lg p-3 mt-3 border border-[#044866]/10">
                                        <p className="text-xs text-gray-600">
                                            ⏱️{' '}
                                            <span className="font-medium">
                                                Process Duration:
                                            </span>{' '}
                                            Approximately 30 minutes to complete
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Service 2: Industry Consultations */}
                            <div className="bg-gradient-to-br from-[#044866]/5 to-[#0D5468]/5 rounded-xl p-5 border border-[#044866]/20">
                                <div className="mb-4">
                                    <h3 className="text-[#044866] font-semibold text-base">
                                        2. Industry Consultations
                                    </h3>
                                </div>
                                <div className="space-y-3 text-sm text-gray-700 mb-4">
                                    <p>
                                        This helps RTOs meet government
                                        compliance requirements while
                                        recognising your workplace as part of
                                        their professional industry network.
                                    </p>
                                    <p>
                                        The process is simple and takes around
                                        30 minutes to complete.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-white rounded-lg p-4 border border-[#044866]/10">
                                        <div className="font-medium text-[#044866] mb-2">
                                            Online Consultation
                                        </div>
                                        <div className="text-[#F7A619] font-semibold text-lg">
                                            $50–$80/hr
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-[#044866]/10">
                                        <div className="font-medium text-[#044866] mb-2">
                                            Face-to-Face Consultation
                                        </div>
                                        <div className="text-[#F7A619] font-semibold text-lg">
                                            $120–$150/hr
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Service 3: Simulation Labs */}
                            <div className="bg-gradient-to-br from-[#044866]/5 to-[#0D5468]/5 rounded-xl p-5 border border-[#044866]/20">
                                <div className="mb-4">
                                    <h3 className="text-[#044866] font-semibold text-base">
                                        3. Simulation Labs
                                    </h3>
                                    <div className="mt-2 inline-flex items-center gap-2 bg-[#F7A619]/10 text-[#F7A619] px-3 py-1 rounded-full text-sm font-medium">
                                        $50–$80/hr • Up to $500 per session
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <p>
                                        Simulation labs allow online RTOs to
                                        give students hands-on practice in
                                        realistic industry environments.
                                    </p>
                                    <div className="bg-white rounded-lg p-4 border border-[#044866]/10 mt-3">
                                        <h4 className="font-medium text-[#044866] mb-3">
                                            Requirements:
                                        </h4>
                                        <ul className="space-y-2 text-xs text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#F7A619] mt-0.5">
                                                    •
                                                </span>
                                                <span>
                                                    Industries must provide
                                                    photos of their simulation
                                                    lab and equipment in
                                                    advance.
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#F7A619] mt-0.5">
                                                    •
                                                </span>
                                                <span>
                                                    The facility must reflect
                                                    the facility equipment and
                                                    resources required for the
                                                    relevant course tasks.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-[#10B981]/10 rounded-lg p-3 mt-3 border border-[#10B981]/20">
                                        <p className="text-sm text-[#10B981] font-medium">
                                            💡 Estimated Industry Earnings: Up
                                            to $500 per session, depending on
                                            duration and curriculum/training
                                            setup
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-600 italic mt-3">
                                        This service supports students in
                                        fulfilling course requirements while
                                        offering industries additional
                                        engagement and income opportunities.
                                    </p>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Service 4: Seminars and Webinars */}
                            <div className="bg-gradient-to-br from-[#044866]/5 to-[#0D5468]/5 rounded-xl p-5 border border-[#044866]/20">
                                <h3 className="text-[#044866] font-semibold text-base mb-4">
                                    4. Seminars and Webinars
                                </h3>

                                {/* Seminars */}
                                <div className="mb-5">
                                    <h4 className="text-[#0D5468] font-medium text-sm mb-3">
                                        A. Seminars
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Industries can deliver seminars at RTO
                                        campuses, sharing professional insights
                                        and practical knowledge with students.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="bg-white rounded-lg p-4 border border-[#044866]/10">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="font-medium text-[#044866] mb-1">
                                                        Package 1
                                                    </div>
                                                    <p className="text-xs text-gray-600 mb-2">
                                                        Speaker delivers a talk
                                                        session (Minimum 1 hour)
                                                    </p>
                                                    <div className="text-[#F7A619] font-semibold">
                                                        $100/hr
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-2 italic">
                                                * RTO to cover fuel cost or
                                                provide transport
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-[#044866]/10">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="font-medium text-[#044866] mb-1">
                                                        Package 2
                                                    </div>
                                                    <p className="text-xs text-gray-600 mb-2">
                                                        Speaker prepares slides
                                                        and delivers a full
                                                        seminar session (Minimum
                                                        4 hours)
                                                    </p>
                                                    <div className="text-[#F7A619] font-semibold">
                                                        $120–$150/hr
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-2 italic">
                                                * RTO to cover fuel cost or
                                                provide transport
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Webinars */}
                                <div>
                                    <h4 className="text-[#0D5468] font-medium text-sm mb-3">
                                        B. Webinars
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Webinars offer a virtual alternative to
                                        seminars, allowing industry experts to
                                        engage with RTOs and students remotely.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="bg-white rounded-lg p-4 border border-[#044866]/10">
                                            <div className="font-medium text-[#044866] mb-1">
                                                Package 1
                                            </div>
                                            <p className="text-xs text-gray-600 mb-2">
                                                Live online talk/discussion
                                            </p>
                                            <div className="text-[#F7A619] font-semibold">
                                                $40–$50/hr
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-[#044866]/10">
                                            <div className="font-medium text-[#044866] mb-1">
                                                Package 2
                                            </div>
                                            <p className="text-xs text-gray-600 mb-2">
                                                Online session with slides and
                                                structured delivery
                                            </p>
                                            <div className="text-[#F7A619] font-semibold">
                                                $80–$100/hr
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Service 5: Podcast Collaboration */}
                            <div className="bg-gradient-to-br from-[#044866]/5 to-[#0D5468]/5 rounded-xl p-5 border border-[#044866]/20">
                                <div className="mb-4">
                                    <h3 className="text-[#044866] font-semibold text-base">
                                        5. Podcast Collaboration
                                    </h3>
                                </div>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <p>
                                        The Industry Podcast Series provides
                                        another way for speakers and industry
                                        representatives to participate in
                                        recorded discussions related to their
                                        field and RTO courses.
                                    </p>
                                    <div className="bg-white rounded-lg p-4 border border-[#044866]/10 mt-3">
                                        <div className="font-medium text-[#044866] mb-2">
                                            Flexible Pricing
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            The speaker's fee for this service
                                            will be determined individually,
                                            based on their proposed rate and
                                            availability.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Summary Section */}
                            <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] rounded-xl p-6">
                                <h3 className="text-white font-semibold text-base mb-4">
                                    Summary of Add-On Services
                                </h3>
                                <div className="space-y-2.5">
                                    {[
                                        {
                                            service: 'Conditional MOU',
                                            desc: 'Conditional agreement confirming eligibility and future placement intent',
                                            price: '$90',
                                        },
                                        {
                                            service: 'Industry Consultations',
                                            desc: 'Curriculum-based discussions (online or in-person)',
                                            price: '$50–$150/hr',
                                        },
                                        {
                                            service: 'Simulation Labs',
                                            desc: 'Industry labs for RTO practical sessions',
                                            price: '$50���$80/hr',
                                        },
                                        {
                                            service: 'Seminars',
                                            desc: 'On-campus professional presentations',
                                            price: '$100–$150/hr',
                                        },
                                        {
                                            service: 'Webinars',
                                            desc: 'Online seminars with or without prepared content',
                                            price: '$40–$100/hr',
                                        },
                                        {
                                            service: 'Podcasts',
                                            desc: 'Recorded conversations on course and industry topics',
                                            price: "Speaker's rate",
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 bg-white/10 rounded-lg p-3"
                                        >
                                            <CheckCircle className="w-4 h-4 text-[#F7A619] flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-white font-medium text-sm">
                                                        {item.service}
                                                    </span>
                                                    <span className="text-[#F7A619] font-semibold text-sm">
                                                        {item.price}
                                                    </span>
                                                </div>
                                                <p className="text-white/80 text-xs">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    )
}
