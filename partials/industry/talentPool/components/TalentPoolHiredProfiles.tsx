import { Card, LoadingAnimation, NoData, Typography } from '@components'
import { TalentPoolHiredProfileCard } from './TalentPoolHiredProfileCard'
import { useState } from 'react'
import { PaginatedItems } from '@partials/common'

type TalentPoolHiredProfilesProps = {
    selectedSector: any
    getHiredResponse: any
}
export const TalentPoolHiredProfiles = ({
    selectedSector,
    getHiredResponse,
}: TalentPoolHiredProfilesProps) => {

    const [currentItems, setCurrentItems] = useState([])
    return (
        <Card noPadding>
            <div className="md:h-[49.5rem]">
                <div className="px-4 pt-5 pb-4 border-b mb-6">
                    <Typography variant="title">Hired Students</Typography>
                </div>

                {getHiredResponse?.isLoading || getHiredResponse?.isFetching ? (
                    <LoadingAnimation height="md:h-[30vh]" />
                ) : getHiredResponse?.data &&
                  getHiredResponse?.data?.length > 0 ? (
                    <>
                        <div className="p-5">
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                                {currentItems?.map(
                                    (response: any) => (
                                        <TalentPoolHiredProfileCard
                                            data={response}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        {getHiredResponse?.data && getHiredResponse.data.length > 0 && (
                    <div className="flex items-center justify-center gap-x-4 h-12 ">
                        <PaginatedItems
                            data={getHiredResponse?.data}
                            itemsPerPage={3}
                            setCurrentItems={setCurrentItems}
                            url='/portals/industry/talent-pool/hired-profiles'
                        />
                    </div>
                )}
                    </>
                ) : !getHiredResponse.isError ? (
                    <div className="p-5">
                        <NoData text="No Data Found" />
                    </div>
                ) : null}
            </div>
        </Card>
    )
}
