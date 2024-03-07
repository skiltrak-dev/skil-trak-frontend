import { ReactElement, useCallback, useEffect, useState } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { SectorsTabs } from '@partials/industry/talentPool'
import { AuthApi } from '@queries'
// components

const MatchingProfiles: NextPageWithLayout = () => {
    const [selectedSector, setSelectedSector] = useState<any>(null)
    // const { data, isLoading, isError, isSuccess } = AuthApi.useSectors({})
    // const getFolders = data?.sectors

    // useEffect(() => {
    //     if (data && isSuccess && data?.length > 0) {
    //         const folder = getFolders?.find(
    //             (folder: any) => folder?.id === Number(selectedSector?.id)
    //         )
    //         onSelectSector(selectedSector && folder ? folder : getFolders?.[0])
    //     }
    // }, [data])

    // const onSelectSector = useCallback((data: any) => {
    //     setSelectedSector(data)
    // }, [])
    return (
        <div>
            {/* <SectorsTabs
                sectorsList={data}
                selectedSector={selectedSector}
                onSelectSector={onSelectSector}
            /> */}
            Hired page
        </div>
    )
}

MatchingProfiles.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default MatchingProfiles
