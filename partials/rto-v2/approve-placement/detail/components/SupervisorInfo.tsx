import { Badge, Card } from '@components'
import { User, GraduationCap, Briefcase, Mail, Phone } from 'lucide-react'

export function SupervisorInfo() {
    const supervisors = [
        {
            id: 1,
            name: 'Jennifer Thompson',
            role: 'Senior Care Coordinator',
            qualifications: [
                'Certificate IV in Ageing Support',
                'Diploma of Community Services',
                'Current First Aid & CPR',
            ],
            experience: '12 years',
            experienceDetail:
                '12 years in aged care and community services, including 8 years in supervisory roles. Experienced in supporting students across Certificate III and IV qualifications.',
            email: 'j.thompson@sunnydalecare.com.au',
            phone: '(03) 9876 5433',
            supervisionLevel:
                'Direct supervision with regular feedback sessions',
            avatar: 'JT',
        },
        {
            id: 2,
            name: 'Marcus Chen',
            role: 'Disability Support Team Leader',
            qualifications: [
                'Certificate IV in Disability',
                'TAE40116 Certificate IV in Training and Assessment',
            ],
            experience: '8 years',
            experienceDetail:
                '8 years in disability support services with extensive experience in person-centred practice and complex needs support.',
            email: 'm.chen@sunnydalecare.com.au',
            phone: '(03) 9876 5434',
            supervisionLevel: 'Blended supervision with weekly check-ins',
            avatar: 'MC',
        },
    ]

    return (
        <div className="space-y-6">
            {supervisors.map((supervisor) => (
                <Card
                    key={supervisor.id}
                    className="border-2 border-slate-100 hover:border-[#044866]/20 hover:shadow-xl transition-all group"
                >
                    <div className="bg-gradient-to-r from-slate-50 to-white">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                <span className="text-xl">
                                    {supervisor.avatar}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="text-[#044866] mb-1">
                                    {supervisor.name}
                                </div>
                                <p className="text-sm text-slate-600">
                                    {supervisor.role}
                                </p>
                                <Badge
                                    text={`${supervisor.experience} experience`}
                                    className="mt-2 bg-[#F7A619] text-white"
                                ></Badge>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5 pt-5">
                        {/* Qualifications */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <GraduationCap className="w-4 h-4 text-[#0D5468]" />
                                <h4 className="text-slate-900">
                                    Qualifications
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {supervisor.qualifications.map(
                                    (qual, index) => (
                                        <Badge
                                            key={index}
                                            variant="primaryNew"
                                            outline
                                            text={qual}
                                            className="border-[#044866]/20 text-slate-700"
                                        ></Badge>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Briefcase className="w-4 h-4 text-[#0D5468]" />
                                <h4 className="text-slate-900">
                                    Experience & Expertise
                                </h4>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                {supervisor.experienceDetail}
                            </p>
                        </div>

                        {/* Supervision Approach */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="w-4 h-4 text-purple-600" />
                                <h4 className="text-purple-900">
                                    Supervision Approach
                                </h4>
                            </div>
                            <p className="text-sm text-purple-800">
                                {supervisor.supervisionLevel}
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="pt-4 border-t border-slate-100">
                            <h4 className="text-slate-900 mb-3 text-sm">
                                Contact Information
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <a
                                        href={`mailto:${supervisor.email}`}
                                        className="text-sm text-[#044866] hover:underline"
                                    >
                                        {supervisor.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-700">
                                        {supervisor.phone}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 italic">
                                Available for coordination once placement
                                commences
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
