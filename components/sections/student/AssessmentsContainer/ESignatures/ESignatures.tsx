import { useState, useEffect, useMemo } from 'react'
import { CommonApi } from '@queries'
import { ESignTitleCards } from './ESignTitleCards'
import { SignersStatus, WorkplaceAgreementDetail } from './components'
import { PuffLoader } from 'react-spinners'
import { Card, NoData } from '@components'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

type Props = {}

export const ESignatures = (props: Props) => {
    const [selectedFolder, setSelectedFolder] = useState<any>(null)

    const pendingDocuments = CommonApi.ESign.usePendingDocumentsList(
        {},
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const role = getUserCredentials()?.role

    const otherAllUserSigned = useMemo(
        () =>
            pendingDocuments?.data?.filter((agreement: any) =>
                agreement.signers
                    ?.filter((signer: any) => signer?.user?.role !== 'rto')
                    ?.every((signer: any) => signer.status === 'signed')
            ),
        [pendingDocuments?.data]
    )

    useEffect(() => {
        if (
            pendingDocuments.isSuccess &&
            pendingDocuments?.data &&
            pendingDocuments?.data?.length > 0
        ) {
            if (role === UserRoles.RTO) {
                setSelectedFolder(otherAllUserSigned?.[0])
            } else {
                setSelectedFolder(pendingDocuments?.data?.[0])
            }
        }
    }, [pendingDocuments, otherAllUserSigned])

    return (
        <>
            {/* <AssessmentCourseCard /> */}
            <div className="flex flex-col gap-y-3 lg:flex-row gap-x-2">
                <div className="w-full lg:w-[33%]">
                    <Card noPadding>
                        <div className="lg:min-h-[370px]">
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
                <div className="w-full lg:w-[67%]">
                    <Card noPadding>
                        {selectedFolder ? (
                            // <WorkplaceAgreementDetail
                            //     selectedFolder={selectedFolder}
                            // />
                            <SignersStatus selectedFolder={selectedFolder} />
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
