import { SkiltrakPackages } from '@components/site/ourPackages'
import { PackageDetailCard } from './PackageDetailCard'

export const packageTypes = {
    PlacementManagement: 'Placement Management Portal',
    StartupPackage: 'The Startup Package',
    CompletePackage: 'The Complete Package',
}

export const PackagesDetail = ({
    selectedPackage,
    setSelectedPackage,
}: {
    selectedPackage: number
    setSelectedPackage: (val: any) => void
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

    const onGoBack = () => {
        setSelectedPackage(-1)
    }

    const onPrevious = () => {
        setSelectedPackage((selectedPackage: number) => selectedPackage - 1)
    }
    const onNext = () => {
        setSelectedPackage((selectedPackage: number) => selectedPackage + 1)
    }

    const currentPackage = SkiltrakPackages[selectedPackage - 1]

    return (
        // <div className="max-w-7xl mx-auto mt-10">
        <div className="w-full mx-auto mt-10 bg-slate-100">
            {/* <div className="grid grid-cols-1 md:grid-cols-4 md:items-start items-center"> */}
            <div className="w-full flex flex-col lg:flex-row justify-between">
                <div className="px-16 py-4 order-2 lg:order-1">
                    <div className="flex flex-col ">
                        <p className="text-xs text-slate-500">Package Detail</p>
                        <h3 className="text-3xl font-semibold">
                            {currentPackage?.title}
                        </h3>
                        <p className="text-lg">{currentPackage?.tagline}</p>
                    </div>

                    <div className="mt-6">
                        <p className={'font-semibold'}>Included Features:</p>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                            {packagesFeatures.map((packageDetail, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-y-2"
                                >
                                    <div
                                        className={`w-7 ${
                                            packageDetail.packageType.includes(
                                                currentPackage?.title
                                            )
                                                ? 'border-t-4 border-[#D9D9D9]'
                                                : ''
                                        } `}
                                    />
                                    <p
                                        className={`text-sm ${
                                            packageDetail.packageType.includes(
                                                currentPackage?.title
                                            )
                                                ? 'text-black'
                                                : 'text-[#D9D9D9]'
                                        }`}
                                    >
                                        {packageDetail?.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <PackageDetailCard
                        onNext={onNext}
                        goBack={onGoBack}
                        onPrevious={onPrevious}
                        currentPackage={currentPackage}
                    />
                </div>
            </div>
        </div>
    )
}
