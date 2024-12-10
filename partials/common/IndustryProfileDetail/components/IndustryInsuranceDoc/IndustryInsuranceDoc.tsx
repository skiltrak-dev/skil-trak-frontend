import { useEffect, useMemo, useState } from 'react'
// components
import { Button, LoadingAnimation, NoData, Typography } from '@components'
import { Supervisor } from '@partials/common/IndustrySupervisor'

// redux
import { InsuranceDocCard } from '@partials/industry/IndustryUpdatedDashboard/components/IndustryDashboardRD/cards'
import { IndustryApi, useGetIndustryCoursesQuery } from '@queries'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Industry } from '@types'

export const IndustryInsuranceDoc = ({ industry }: { industry: Industry }) => {
    const [showInsuranceList, setShowInsuranceList] = useState<boolean>(false)

    console.log({ industry })

    const industryDocsType = IndustryApi.Insurance.industryInsuranceDocs(
        industry?.user?.id,
        {
            skip: !industry,
        }
    )

    const onClickShowInsuranceDocList = () => {
        setShowInsuranceList(!showInsuranceList)
    }

    console.log({ industryDocsType })

    // const abc = selectedWorkplace?.workplaceApprovaleRequest?.reduce(
    //     (latest: any, current: any) =>
    //         new Date(current?.createdAt) > new Date(latest?.createdAt)
    //             ? current
    //             : latest,
    //     selectedWorkplace?.workplaceApprovaleRequest?.[0]
    // )

    const required = useMemo(
        () =>
            industryDocsType?.data
                ?.filter((x: any) => {
                    const latest = x?.industryRequiredDocuments?.reduce(
                        (latest: any, current: any) =>
                            new Date(current?.createdAt) >
                            new Date(latest?.createdAt)
                                ? current
                                : latest,
                        x?.industryRequiredDocuments?.[0]
                    )
                    return showInsuranceList ? x : latest?.isRequired
                })
                ?.sort((a: any, b: any) => {
                    const aLatest = a?.industryRequiredDocuments?.reduce(
                        (latest: any, current: any) =>
                            new Date(current?.createdAt) >
                            new Date(latest?.createdAt)
                                ? current
                                : latest,
                        a?.industryRequiredDocuments?.[0]
                    )
                    const bLatest = b?.industryRequiredDocuments?.reduce(
                        (latest: any, current: any) =>
                            new Date(current?.createdAt) >
                            new Date(latest?.createdAt)
                                ? current
                                : latest,
                        b?.industryRequiredDocuments?.[0]
                    )

                    // Sort based on `latest?.isRequired`
                    return (
                        (bLatest?.isRequired ? 1 : 0) -
                        (aLatest?.isRequired ? 1 : 0)
                    )
                }),
        [industryDocsType, showInsuranceList]
    )

    return (
        <>
            <div className="border rounded-md p-2.5 shadow-lg relative w-full">
                <div className="flex gap-x-2  items-center justify-between w-full">
                    <Typography variant={'label'}>
                        Insurance Documents
                    </Typography>
                    <div className="flex items-center gap-x-1 ">
                        <div
                            onClick={onClickShowInsuranceDocList}
                            className="border rounded-md p-1 cursor-pointer"
                        >
                            <MdKeyboardArrowDown
                                className={`transition-all duration-300 ${
                                    showInsuranceList
                                        ? 'rotate-180'
                                        : 'rotate-0'
                                }`}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`rounded-[10px] duration-500 transition-all mt-1.5 overflow-auto custom-scrollbar h-auto ${
                        showInsuranceList ? 'max-h-80' : 'max-h-60'
                    }`}
                >
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
                            <div className="flex flex-col gap-y-2.5 overflow-auto custom-scrollbar ">
                                {required?.map((docs: any) => (
                                    <InsuranceDocCard
                                        key={docs?.id}
                                        docs={docs}
                                    />
                                ))}
                            </div>
                        ) : industryDocsType?.isSuccess ? (
                            <NoData text="No Doument Type!" />
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
