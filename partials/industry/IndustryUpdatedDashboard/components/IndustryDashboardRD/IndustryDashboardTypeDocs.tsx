// components
import { Button, LoadingAnimation, NoData, Typography } from '@components'

// redux
import { IndustryApi } from '@queries'
import { InsuranceDocCard } from './cards'

export const IndustryDashboardTypeDocs = () => {
    const industryDocsType =
        IndustryApi.Insurance.industryInsuranceDocs(undefined)

    return (
        <div className="bg-[#E5F4FD] rounded-[10px] h-full">
            <div className="px-4 py-3 flex justify-between items-center border-b border-secondary-dark">
                <Typography semibold>
                    <span className="text-[15px]">Insurance Documents</span>
                </Typography>
            </div>
            <div className="h-full px-3.5 py-2.5">
                {industryDocsType?.isError && (
                    <div>
                        <div className="flex justify-end">
                            <Button
                                text="Refetch"
                                variant="action"
                                onClick={() => {
                                    industryDocsType?.refetch()
                                }}
                            />
                        </div>
                        <NoData text="There is some technical issue" />
                    </div>
                )}

                {industryDocsType?.isLoading ? (
                    <LoadingAnimation size={65} />
                ) : industryDocsType?.data &&
                  industryDocsType?.data?.length > 0 ? (
                    <div className="flex flex-col gap-y-2.5 overflow-auto custom-scrollbar h-[calc(100%-60px)]">
                        {industryDocsType?.data?.map((docs: any) => (
                            <InsuranceDocCard key={docs?.id} docs={docs} />
                        ))}
                    </div>
                ) : industryDocsType?.isSuccess ? (
                    <NoData text="No Doument Type!" />
                ) : null}
            </div>
        </div>
    )
}
