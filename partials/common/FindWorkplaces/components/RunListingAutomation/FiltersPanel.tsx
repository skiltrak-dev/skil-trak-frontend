import * as Yup from 'yup'
import { Sector } from '@types'
import { AuthApi, CommonApi } from '@queries'
import { Courses } from './Courses'
import { Location } from './Location'
import { MdPlayArrow } from 'react-icons/md'
import { RadiusBuckets } from './RadiusBuckets'
import { WorkplaceTypes } from './WorkplaceTypes'
import styles from './css/FiltersPanel.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingAnimation } from './LoadingAnimation'
import { FormProvider, useForm } from 'react-hook-form'
import React, { useCallback, useMemo, useState } from 'react'
import {
    Button,
    Select,
    SelectOption,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { ResultsDisplay } from './ResultsDisplay'

interface FiltersPanelProps {
    onClose: () => void
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ onClose }) => {
    const [selectedSector, setSelectedSector] = useState<number | null>(null)
    const [currentView, setCurrentView] = useState<
        'filters' | 'loading' | 'results'
    >('filters')

    const sectorResponse = AuthApi.useSectors({})
    const [runAutomation, runAutomationResult] =
        CommonApi.FindWorkplace.runListingAutomation()

    const validationSchema = Yup.object({
        sector: Yup.number().required('Sector is required'),
        address: Yup.string().required('Address is required'),
        keywords: Yup.string().required('Keyword is required'),
        // type: Yup.string().required('Workplace Type is required'),
        type: Yup.array().min(1, 'Must select at least 1 Workplace Type'),
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

    const handleRunAutomation = async (values: any) => {
        const keywords = values?.keywords?.split(', ')
        setCurrentView('loading')

        const startTime = Date.now()

        const res: any = await runAutomation({ ...values, keywords })

        const endTime = Date.now()
        const duration = endTime - startTime
        const seconds = (duration / 1000).toFixed(2)
        const totalSeconds = 3500

        totalSeconds > Number(seconds) &&
            (await new Promise((resolve) =>
                setTimeout(resolve, totalSeconds - Number(seconds))
            ))

        if (Object.values(res?.data || {})?.flat()?.length > 0) {
            setCurrentView('results')
        } else {
            setCurrentView('filters')
        }
    }

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
        return (
            <LoadingAnimation
                listingCount={
                    Object.values(runAutomationResult?.data || {})?.flat()
                        ?.length || 0
                }
                isNotPending={runAutomationResult?.status !== 'pending'}
            />
        )
    }

    if (currentView === 'results') {
        return (
            <ResultsDisplay
                onBack={handleBackToFilters}
                onClose={onClose}
                selectedSector={Number(selectedSector)}
                listingResults={runAutomationResult?.data || {}}
            />
        )
    }

    return (
        <div className={styles.slideUpFade}>
            <ShowErrorNotifications result={runAutomationResult} />
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
                        {selectedSector && (
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
                        {selectedSector && (
                            <Courses selectedSector={Number(selectedSector)} />
                        )}

                        {/* Location */}
                        <Location />

                        {/* Workplace Types */}
                        {selectedSector && (
                            <WorkplaceTypes
                                name={'type'}
                                selectedSector={Number(selectedSector)}
                            />
                        )}

                        {/* Radius Buckets */}
                        <RadiusBuckets />

                        {/* Run Automation Button */}
                        <div className="w-full flex flex-col space-y-1 pt-2 border-t">
                            <Button
                                submit
                                variant="primaryNew"
                                Icon={MdPlayArrow}
                                text="Run Automation"
                            />

                            <Typography
                                variant="xs"
                                color="text-gray-500"
                                center
                            >
                                Scrapes and adds available industries from the
                                selected area, prioritizing nearest first
                            </Typography>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
