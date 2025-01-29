import { ReactElement, useCallback, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
    SectorsTabs,
    TalentPoolHiredProfiles,
} from '@partials/industry/talentPool'
import { IndustryApi } from '@queries'
// components

const HiredProfiles: NextPageWithLayout = () => {
    const [selectedSector, setSelectedSector] = useState<any>(null)
    const { data, isLoading, isError, isSuccess } =
        IndustryApi.Courses.useGetIndustrySectorsQuery(null)
    const hiredProfiles = IndustryApi.TalentPool.useTalentPoolHiredProfiles(
        selectedSector?.id,
        {
            skip: !selectedSector?.id,
        }
    )

    // const getFolders = data?.sectors
    useEffect(() => {
        if (isSuccess && data && data.length > 0 && !selectedSector) {
            setSelectedSector(data[0]) // Select the first sector by default if selectedSector is not set
        }
    }, [data, isSuccess, selectedSector])

    const onSelectSector = useCallback((data: any) => {
        setSelectedSector(data)
    }, [])

    // useEffect(() => {
    //     if (data && isSuccess && data?.length > 0) {
    //         const folder = data?.find(
    //             (folder: any) => folder?.id === Number(selectedSector?.id)
    //         )
    //         onSelectSector(selectedSector && folder ? folder : data?.[0])
    //     }
    // }, [data])
    useEffect(() => {
        if (isSuccess && data && selectedSector && data.length > 0) {
            const folder = data.find(
                (folder: any) => folder.id === selectedSector.id
            )
            if (folder) {
                onSelectSector(folder)
            }
        }
    }, [data, isSuccess, selectedSector, onSelectSector])
    return (
        <div className="flex flex-col gap-y-5 md:flex-row gap-x-2.5 w-full">
            <div className="md:w-1/3">
                <SectorsTabs
                    sectorsList={data}
                    selectedSector={selectedSector}
                    onSelectSector={onSelectSector}
                />
            </div>
            <div className="md:w-2/3">
                <TalentPoolHiredProfiles
                    getHiredResponse={hiredProfiles}
                    selectedSector={selectedSector}
                />
            </div>
        </div>
    )
}

HiredProfiles.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default HiredProfiles
