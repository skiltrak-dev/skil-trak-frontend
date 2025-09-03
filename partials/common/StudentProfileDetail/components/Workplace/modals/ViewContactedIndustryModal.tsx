import { GlobalModal, LoadingAnimation, NoData } from '@components'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { FaBuilding } from 'react-icons/fa'
import { MdBusiness, MdCancel } from 'react-icons/md'
import {
    ContactedIndustryCard,
    SectionHeader,
} from '../components/IndustryDetail/components'

export const ViewContactedIndustryModal = ({
    onCancel,
    workpaceId,
}: {
    workpaceId: number
    onCancel: () => void
}) => {
    const router = useRouter()
    const studentDetails = SubAdminApi.SubAdmin.useSubAdminMapStudentDetail(
        router?.query?.id,
        { skip: !router?.query?.id }
    )
    const contactedIndustries = SubAdminApi.Student.wpContactIndustriesList(
        {
            workpaceId,
            stdId: Number(router?.query?.id),
        },
        {
            skip: !router?.query?.id,
            refetchOnMountOrArgChange: true,
        }
    )

    const Industries = contactedIndustries?.data?.filter(
        (industry: any) => industry?.industry !== null
    )
    const listingIndustries = contactedIndustries?.data?.filter(
        (industry: any) => industry?.listing !== null
    )
    const branchIndustries = contactedIndustries?.data?.filter(
        (industry: any) => industry?.branch !== null
    )
    console.log('branchIndustries', branchIndustries)
    return (
        <>
            {/* <ShowErrorNotifications result={interestedResult} /> */}
            <GlobalModal>
                <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaBuilding className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Industry Contacts
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Manage contacted industries for current
                                    student
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                            title="Close modal"
                        >
                            <MdCancel className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex h-full max-h-[calc(90vh-120px)]">
                        {/* Signed Up Industries */}
                        <div className="flex-1 p-6 border-r border-gray-200">
                            <SectionHeader
                                title="Signed Up Industries"
                                icon={
                                    <FaBuilding className="w-4 h-4 text-blue-600" />
                                }
                                count={
                                    Industries?.length +
                                        branchIndustries?.length || 0
                                }
                            />

                            <div className="h-full overflow-y-auto space-y-4 max-h-[calc(100vh-300px)] remove-scrollbar">
                                {contactedIndustries.isError && (
                                    <div className="flex items-center justify-center h-32">
                                        <NoData text="There is some technical issue" />
                                    </div>
                                )}

                                {contactedIndustries.isLoading ? (
                                    <div className="flex items-center justify-center h-32">
                                        <LoadingAnimation size={85} />
                                    </div>
                                ) : (
                                    <>
                                        {/* Branch Industries */}
                                        {branchIndustries &&
                                            branchIndustries.length > 0 && (
                                                <div className="space-y-3">
                                                    {branchIndustries.map(
                                                        (branch: any) => (
                                                            <ContactedIndustryCard
                                                                isBranch
                                                                industry={
                                                                    branch
                                                                }
                                                                key={`branch-${branch?.id}`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}

                                        {/* Regular Industries */}
                                        {Industries &&
                                            Industries.length > 0 && (
                                                <div className="space-y-3">
                                                    {Industries.map(
                                                        (industry: any) => (
                                                            <div
                                                                key={`industry-${industry?.id}`}
                                                            >
                                                                <ContactedIndustryCard
                                                                    industry={
                                                                        industry
                                                                    }
                                                                    isListing={
                                                                        false
                                                                    }
                                                                />

                                                                {/* branch under industry */}
                                                                {industry
                                                                    ?.branch
                                                                    ?.callLogs
                                                                    ?.length >
                                                                    0 && (
                                                                    <ContactedIndustryCard
                                                                        isBranch
                                                                        industry={
                                                                            industry?.branch
                                                                        }
                                                                        key={`branch-inline-${industry?.id}`}
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                        {/* Empty state */}
                                        {contactedIndustries.isSuccess &&
                                            !Industries?.length &&
                                            !branchIndustries?.length && (
                                                <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                                                    <FaBuilding className="w-8 h-8 mb-2 opacity-30" />
                                                    <p className="text-sm">
                                                        No signed up industries
                                                        or branches found
                                                    </p>
                                                </div>
                                            )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Listed Industries */}
                        <div className="flex-1 p-6">
                            <SectionHeader
                                title="Listed Industries"
                                icon={
                                    <MdBusiness className="w-4 h-4 text-blue-600" />
                                }
                                count={listingIndustries?.length || 0}
                            />

                            <div className="h-full overflow-y-auto space-y-4 max-h-[calc(100vh-300px)] remove-scrollbar">
                                {contactedIndustries.isError && (
                                    <div className="flex items-center justify-center h-32">
                                        <NoData text="There is some technical issue" />
                                    </div>
                                )}

                                {contactedIndustries.isLoading ? (
                                    <div className="flex items-center justify-center h-32">
                                        <LoadingAnimation size={85} />
                                    </div>
                                ) : listingIndustries &&
                                  listingIndustries?.length > 0 ? (
                                    listingIndustries?.map((industry: any) => (
                                        <ContactedIndustryCard
                                            key={industry?.id}
                                            industry={industry}
                                            isListing={true}
                                        />
                                    ))
                                ) : (
                                    contactedIndustries.isSuccess && (
                                        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                                            <MdBusiness className="w-8 h-8 mb-2 opacity-30" />
                                            <p className="text-sm">
                                                No listed industries found
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
