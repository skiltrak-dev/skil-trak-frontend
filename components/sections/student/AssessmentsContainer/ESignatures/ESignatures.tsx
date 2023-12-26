import { useState, useEffect } from 'react'
import { CommonApi } from '@queries'
import { ESignTitleCards } from './ESignTitleCards'
import { WorkplaceAgreementDetail } from './components'
import { PuffLoader } from 'react-spinners'
import { Card, NoData } from '@components'

type Props = {}

export const ESignatures = (props: Props) => {
    const [selectedFolder, setSelectedFolder] = useState<any>(null)

    const pendingDocuments = CommonApi.ESign.usePendingDocumentsList(
        {},
        {
            refetchOnMountOrArgChange: true,
        }
    )

    useEffect(() => {
        if (
            pendingDocuments.isSuccess &&
            pendingDocuments?.data &&
            pendingDocuments?.data?.length > 0
        ) {
            setSelectedFolder(pendingDocuments?.data?.[0])
        }
    }, [pendingDocuments])

    return (
        <>
            {/* <AssessmentCourseCard /> */}
            <div className="flex gap-x-2">
                <div className="w-[33%]">
                    <Card noPadding>
                        <div className="min-h-[370px]">
                            {pendingDocuments.isError && (
                                <NoData
                                    text={'There is some technical issue!'}
                                />
                            )}
                            {pendingDocuments.isLoading ? (
                                <div className="min-h-[inherit] flex justify-center items-center">
                                    <PuffLoader />
                                </div>
                            ) : pendingDocuments?.isSuccess &&
                              pendingDocuments.data &&
                              pendingDocuments?.data?.length > 0 ? (
                                <ESignTitleCards
                                    selectedFolder={selectedFolder}
                                    pendingDocuments={pendingDocuments?.data}
                                    setSelectedFolder={(e: any) => {
                                        setSelectedFolder(e)
                                    }}
                                />
                            ) : (
                                pendingDocuments.isSuccess && (
                                    <NoData text="There is no document list" />
                                )
                            )}
                        </div>
                    </Card>
                </div>
                <div className="w-[67%]">
                    <Card noPadding>
                        {selectedFolder ? (
                            <WorkplaceAgreementDetail
                                selectedFolder={selectedFolder}
                            />
                        ) : (
                            <div className="h-80 p-5">
                                <NoData text="No Document Selected" />
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    )
}
