import { EmptyData, LoadingAnimation, NoData, Typography } from '@components'
import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { RtoDocumentCard } from './cards'
import { AdminApi } from '@queries'
import { useAssessmentDocumentsView } from '@partials/common/StudentProfileDetail/components'

export const RtoInsuranceDocuments = ({
    selectedType,
}: {
    selectedType: number | null
}) => {
    const { onFileClicked, documentsViewModal } = useAssessmentDocumentsView()

    const getRtoByInsuranceType = AdminApi.Insurance.getRtoByInsuranceType(
        Number(selectedType),
        {
            skip: !selectedType,
        }
    )

    return (
        <>
            {documentsViewModal}
            <div className="px-3.5 py-3 rounded-[5px] bg-[#24556D0F]">
                <div className="flex justify-between items-center">
                    <Typography variant="small" bold>
                        RTO
                    </Typography>
                    <CiFilter size={20} />
                </div>

                {/*  */}
                {getRtoByInsuranceType?.isError ? (
                    <div className="p-3">
                        <NoData text="There is some technical issue!" isError />
                    </div>
                ) : null}
                {getRtoByInsuranceType?.isLoading ||
                getRtoByInsuranceType?.isFetching ? (
                    <LoadingAnimation size={90} />
                ) : getRtoByInsuranceType?.data?.document &&
                  getRtoByInsuranceType?.data?.document?.length > 0 ? (
                    <div className="flex flex-col gap-y-2.5 mt-2.5">
                        {getRtoByInsuranceType?.data?.document?.map(
                            (document: any) => (
                                <RtoDocumentCard
                                    key={document?.id}
                                    insDocument={document}
                                    onViewDocument={() => {
                                        onFileClicked({
                                            ...document,
                                            showEdit: false,
                                            file: document?.file
                                                .replaceAll('{"', '')
                                                .replaceAll('"}', ''),
                                            extension: document?.file
                                                ?.split('.')
                                                ?.reverse()?.[0],
                                            type: 'all',
                                        })
                                    }}
                                />
                            )
                        )}
                    </div>
                ) : getRtoByInsuranceType?.isSuccess ? (
                    <EmptyData
                        imageUrl="/images/workplace/document.png"
                        title="No Document Uploaded by Rto"
                        description="."
                        height="100%"
                    />
                ) : null}
            </div>
        </>
    )
}
