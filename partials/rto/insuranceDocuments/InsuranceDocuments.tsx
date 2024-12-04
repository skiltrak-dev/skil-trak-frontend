import React from 'react'
import { RtoApi } from '@queries'
import { Button, LoadingAnimation, NoData, Typography } from '@components'
import { InsuranceDocumentCard } from './card'

export const InsuranceDocuments = () => {
    const rtoInsuranceList = RtoApi.Insurance.rtoInsuranceList()
    return (
        <div className="bg-[#24556D0F] rounded-[5px] py-4 px-5">
            <div className="flex justify-between items-center">
                <div>
                    <Typography variant="label" medium>
                        Insurance Documents
                    </Typography>
                    <Typography variant="xs">
                        Please select the appropriate insurance document for the
                        student’s placement.
                    </Typography>
                </div>
                {rtoInsuranceList?.isError ? (
                    <Button
                        variant="action"
                        text={'Refetch'}
                        onClick={() => rtoInsuranceList?.refetch()}
                    />
                ) : null}
            </div>

            {/*  */}

            {rtoInsuranceList?.isError ? (
                <NoData text="There is some technical issue, try reload the page!" />
            ) : null}

            {rtoInsuranceList?.isLoading ? (
                <LoadingAnimation size={90} />
            ) : rtoInsuranceList?.data && rtoInsuranceList?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2.5 mt-3">
                    {rtoInsuranceList?.data?.map((insurance: any) => (
                        <InsuranceDocumentCard
                            key={insurance?.id}
                            insurance={insurance}
                        />
                    ))}
                </div>
            ) : rtoInsuranceList?.isSuccess ? (
                <NoData text={'There is no any documents list'} />
            ) : null}
        </div>
    )
}
