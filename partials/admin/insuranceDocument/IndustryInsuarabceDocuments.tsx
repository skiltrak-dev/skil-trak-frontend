import { EmptyData, LoadingAnimation, NoData, Typography } from '@components'
import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { IndustryDocumentCard } from './cards'
import { AdminApi } from '@queries'

export const IndustryInsuarabceDocuments = ({
    selectedType,
}: {
    selectedType: number | null
}) => {
    const getIndustriesByInsuranceType =
        AdminApi.Insurance.industriesByInsuranceType(Number(selectedType), {
            skip: !selectedType,
        })

    const industriesListing =
        getIndustriesByInsuranceType?.data?.[0]?.industryRequiredDocuments

    console.log({ industriesListing })
    return (
        <div className="px-3.5 py-3 rounded-[5px] bg-[#24556D0F]">
            <div className="flex justify-between items-center">
                <Typography variant="small" bold>
                    Industry
                </Typography>
                <CiFilter size={20} />
            </div>

            {/*  */}
            {getIndustriesByInsuranceType?.isError ? (
                <div className="p-3">
                    <NoData text="There is some technical issue!" />
                </div>
            ) : null}
            {getIndustriesByInsuranceType?.isLoading ||
            getIndustriesByInsuranceType?.isFetching ? (
                <LoadingAnimation size={90} />
            ) : getIndustriesByInsuranceType?.data &&
              getIndustriesByInsuranceType?.data?.length > 0 &&
              industriesListing &&
              industriesListing?.length > 0 ? (
                <div className="flex flex-col gap-y-2.5 mt-2.5">
                    {industriesListing?.map((industries: any) => (
                        <IndustryDocumentCard
                            key={industries?.id}
                            industries={industries}
                        />
                    ))}
                </div>
            ) : getIndustriesByInsuranceType?.isSuccess ? (
                <EmptyData
                    imageUrl="/images/workplace/document.png"
                    title="No Document Uploaded by Industry"
                    description="."
                    height="100%"
                />
            ) : null}
        </div>
    )
}
