import { Button, Typography } from '@components'
import { FaCheck } from 'react-icons/fa'

export const PackageDetail = ({
    packageTypes,
    selectedPackage,
}: {
    selectedPackage: string
    packageTypes: any
}) => {
    const packagesFeatures = [
        {
            text: 'Student Progress Tracking',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Mapped WBT assessment tools available',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Online appointment booking',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Innovative way to track and monitor your work placement units',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Stay compliant and liaise directly with Industry partners',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'SMS/LMS to assist your everyday business needs',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Workplaces automatically assigned as per students&apos; location',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Video conference with recording available',
            packageType: [
                packageTypes.PlacementManagement,
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Skiltrak LMS portal featuring all services',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Automated push notifications',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Induction class Skiltrak consultant',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Chat system',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Placement workplace visits',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Interview tutorials',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Ticket systems',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'Liaison between students',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },
        {
            text: 'RTO and industry',
            packageType: [
                packageTypes.StartupPackage,
                packageTypes.CompletePackage,
            ],
        },

        {
            text: 'Skiltrak Coordinator assigned to class',
            packageType: [packageTypes.CompletePackage],
        },
        {
            text: 'Placement observation visits/remote',
            packageType: [packageTypes.CompletePackage],
        },
        {
            text: 'Coaching calls',
            packageType: [packageTypes.CompletePackage],
        },
        {
            text: 'Ticket systems',
            packageType: [packageTypes.CompletePackage],
        },
        {
            text: 'Online assessing and learning materials',
            packageType: [packageTypes.CompletePackage],
        },
        {
            text: 'Student final outcome displayed with feedback',
            packageType: [packageTypes.CompletePackage],
        },
        {
            text: 'Liaison between students, RTO and industry',
            packageType: [packageTypes.CompletePackage],
        },
    ]
    return (
        <div className="px-6 bg-white shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] rounded-[10px]">
            <div className="flex justify-between items-center py-4 border-b border-secondary-dark">
                <Typography variant="title" semibold>
                    What you get
                </Typography>
                <Button text={'Start With This Package'} />
            </div>

            {/*  */}
            <div className="py-2">
                <div className="px-1.5 grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6 py-4 h-[420px] overflow-auto custom-scrollbar md:h-auto">
                    {packagesFeatures?.map((features, index) => {
                        const active =
                            features.packageType.includes(selectedPackage)
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-x-2"
                            >
                                <div
                                    className={`mt-[2px] min-w-[20px] min-h-[20px] rounded-md  flex justify-center items-center ${
                                        active ? 'bg-[#8CCA66]' : 'bg-[#CFCFCF]'
                                    }`}
                                >
                                    <FaCheck className="text-white" size={12} />
                                </div>
                                <Typography
                                    variant="label"
                                    normal
                                    color={
                                        active
                                            ? 'text-[#222]'
                                            : 'text-[#A3A3A3]'
                                    }
                                >
                                    <span className="text-[13px]">
                                        {' '}
                                        {features?.text}
                                    </span>
                                </Typography>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
