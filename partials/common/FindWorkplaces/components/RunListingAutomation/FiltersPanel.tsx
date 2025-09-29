import React, { useCallback, useMemo, useState } from 'react'
import { MdPlayArrow } from 'react-icons/md'
import * as Yup from 'yup'
import { Button, Select, SelectOption, TextArea, Typography } from '@components'
import { AuthApi } from '@queries'
import { Sector } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import { Courses } from './Courses'
import styles from './css/FiltersPanel.module.css'
import { LoadingAnimation } from './LoadingAnimation'
import { Location } from './Location'
import { RadiusBuckets } from './RadiusBuckets'
import { ResultsDisplay } from './ResultsDisplay'
import { WorkplaceTypes } from './WorkplaceTypes'
import { yupResolver } from '@hookform/resolvers/yup'

interface FiltersPanelProps {
    onClose: () => void
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ onClose }) => {
    const [selectedSector, setSelectedSector] = useState<number | null>(null)
    const [currentView, setCurrentView] = useState<
        'filters' | 'loading' | 'results'
    >('filters')

    const sectorResponse = AuthApi.useSectors({})

    const validationSchema = Yup.object({
        sector: Yup.number().required('Sector is required'),
        location: Yup.string().required('Location is required'),
        keywords: Yup.string().required('Keyword is required'),
        wpTypes: Yup.array().min(1, 'Must select at least 1 Workplace Type'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const handleSectorChange = useCallback(
        (option: number | null) => {
            const selectedSectorData = sectorResponse.data?.find(
                (s: Sector) => s?.id === option
            )
            methods.setValue(
                'keywords',
                selectedSectorData?.keywords?.join(', ')
            )
            setSelectedSector(option)
        },
        [setSelectedSector, sectorResponse.data]
    )

    const handleRunAutomation = useCallback(async (values: any) => {
        setCurrentView('loading')
        // Simulate API call with 15 second delay for 25 listings
        await new Promise((resolve) => setTimeout(resolve, 15000))
        setCurrentView('results')
    }, [])

    const handleBackToFilters = useCallback(() => {
        setCurrentView('filters')
    }, [])

    const sectorsOptions = useMemo(
        () =>
            sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            })),
        [sectorResponse.data, sectorResponse.isSuccess]
    )

    if (currentView === 'loading') {
        return <LoadingAnimation />
    }

    if (currentView === 'results') {
        return (
            <ResultsDisplay
                onBack={handleBackToFilters}
                onClose={onClose}
                selectedSector={Number(selectedSector)}
            />
        )
    }

    return (
        <div className={styles.slideUpFade}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleRunAutomation)}>
                    <div className="w-full flex flex-col space-y-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                        {/* Sector Selection */}
                        <div className="w-full flex flex-col space-y-1">
                            <Select
                                name="sector"
                                label={'Sector'}
                                required
                                onlyValue
                                value={sectorsOptions?.find(
                                    (s: SelectOption) =>
                                        s?.value === Number(selectedSector)
                                )}
                                options={sectorsOptions}
                                loading={sectorResponse?.isLoading}
                                disabled={sectorResponse?.isLoading}
                                onChange={handleSectorChange}
                                placeholder="Search and select a sector..."
                            />
                        </div>

                        {/* Sector Notes */}
                        {sectorsOptions && (
                            <TextArea
                                label={'Sector Keywords (auto)'}
                                id="sector-notes"
                                // value={selectedSectorData.notes}
                                name={'keywords'}
                                placeholder="Sector Keywords....."
                                disabled
                                className="w-full bg-gray-50 border-gray-200 resize-none text-xs"
                                rows={1}
                            />
                        )}

                        {/* Courses Selection */}
                        {sectorsOptions && sectorsOptions?.length > 0 && (
                            <Courses selectedSector={Number(selectedSector)} />
                        )}

                        {/* Location */}
                        <Location />

                        {/* Workplace Types */}
                        <WorkplaceTypes
                            name={'wpTypes'}
                            selectedSector={Number(selectedSector)}
                        />

                        {/* Radius Buckets */}
                        <RadiusBuckets />

                        {/* Run Automation Button */}
                        <div className="w-full flex flex-col space-y-1 pt-2 border-t">
                            <Button
                                submit
                                onClick={handleRunAutomation}
                                variant="primaryNew"
                                Icon={MdPlayArrow}
                                text="Run Automation"
                            />

                            <Typography
                                variant="xs"
                                color="text-gray-500"
                                center
                            >
                                Scrapes and adds up to 25 industries, nearest
                                first.
                            </Typography>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
