import { LoadingAnimation, NoData, Typography } from '@components'
import { SubAdminApi } from '@queries'
import { Industry } from '@types'
import { getUserCredentials } from '@utils'
import { MdCancel } from 'react-icons/md'
import { ViewMoreIndustryCard } from '../components'

export const ViewMoreIndustriesModal = ({
    workplaceId,
    title,
    subtitle,
    onCancel,
    suggestedIndustriesIds,
}: {
    title: string
    subtitle: string
    workplaceId: number
    onCancel: () => void
    suggestedIndustriesIds: number[]
}) => {
    const viewMoreIndustries = SubAdminApi.Workplace.useViewMoreIndustries(
        Number(workplaceId),
        {
            skip: !workplaceId,
        }
    )

    return (
        <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
            <div className="bg-white modal-animation rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] max-w-[70vw] py-2">
                <div className="w-full px-4 py-2 border-b border-secondary-dark flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Typography variant={'subtitle'}>
                                {title}
                            </Typography>
                        </div>
                        <Typography variant={'label'} color={'text-muted'}>
                            {subtitle}
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <div className="max-h-[65vh] overflow-auto custom-scrollbar flex flex-col gap-y-1.5 w-full px-6">
                    {viewMoreIndustries.isError && (
                        <NoData text={'There is some technical issue'} />
                    )}
                    {viewMoreIndustries.isLoading ? (
                        <LoadingAnimation size={85} />
                    ) : viewMoreIndustries?.data &&
                      viewMoreIndustries?.data?.length > 0 ? (
                        <>
                            <Typography variant={'label'}>
                                Industries Present in Student Profile
                            </Typography>
                            {viewMoreIndustries?.data
                                ?.filter((ind: any) =>
                                    suggestedIndustriesIds.includes(
                                        ind?.industry?.id
                                    )
                                )
                                ?.filter(
                                    (industry: any) => !industry?.suggession
                                )
                                ?.map(
                                    (industry: {
                                        distance: string
                                        industry: Industry
                                    }) => (
                                        <ViewMoreIndustryCard
                                            industry={industry}
                                            workplaceId={workplaceId}
                                            onCancel={() => {
                                                onCancel()
                                            }}
                                        />
                                    )
                                )}

                            <div className="mt-2 flex flex-col gap-y-1.5">
                                <Typography variant={'label'}>
                                    Other Industries
                                </Typography>
                                {viewMoreIndustries?.data
                                    ?.filter(
                                        (industry: any) => industry?.suggession
                                    )
                                    ?.map(
                                        (industry: {
                                            distance: string
                                            industry: Industry
                                        }) => (
                                            <ViewMoreIndustryCard
                                                industry={industry}
                                                workplaceId={workplaceId}
                                                onCancel={() => {
                                                    onCancel()
                                                }}
                                            />
                                        )
                                    )}
                            </div>
                        </>
                    ) : (
                        viewMoreIndustries.isSuccess && (
                            <NoData text={'There is no Industries!'} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
