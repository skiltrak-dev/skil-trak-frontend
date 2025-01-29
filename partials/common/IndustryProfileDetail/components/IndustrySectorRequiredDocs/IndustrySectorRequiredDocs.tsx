import React, { useEffect, useMemo, useState } from 'react'
import { IndustryApi, useGetIndustryCoursesQuery } from '@queries'
import { Course, Industry, Sector } from '@types'
import { Card, Select, SelectOption, Typography } from '@components'
import { Waypoint } from 'react-waypoint'
import { SectorDocuments } from './components'

export const IndustrySectorRequiredDocs = ({
    industry,
}: {
    industry: Industry
}) => {
    const [selectedSector, setSelectedSector] = useState<number | null>(null)
    const [isViewd, setIsViewd] = useState<boolean>(false)

    const { data, isError, isLoading } =
        IndustryApi.Courses.useGetIndustrySectorsQuery(
            Number(industry?.user?.id)
            // {
            //     skip: !isViewd,
            // }
        )

    const sectorOptions = useMemo(
        () =>
            data?.map((sector: Sector) => ({
                value: sector?.id,
                label: sector?.name,
            })),
        [data]
    )

    useEffect(() => {
        if (sectorOptions && sectorOptions?.length > 0) {
            setSelectedSector(sectorOptions?.[0]?.value)
        }
    }, [sectorOptions])

    return (
        <div>
            {/* <Waypoint
                onEnter={() => {
                    setIsViewd(true)
                }}
                onLeave={() => {
                    setIsViewd(false)
                }}
            > */}
            <Card>
                <div className="px-4 py-3 flex justify-between items-center border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Required Documents</span>
                    </Typography>
                </div>
                <Select
                    label={'Select by Courses'}
                    name={'courseId'}
                    showError={false}
                    options={sectorOptions}
                    placeholder={'Select Courses...'}
                    value={sectorOptions?.find(
                        (sector: SelectOption) =>
                            sector?.value === Number(selectedSector)
                    )}
                    onChange={(e: number) => {
                        setSelectedSector(e)
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                    onlyValue
                />

                {/*  */}
                <SectorDocuments
                    industry={industry}
                    selectedSector={selectedSector}
                />
            </Card>
            {/* </Waypoint> */}
        </div>
    )
}
