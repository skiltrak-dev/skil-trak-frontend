import React, { useEffect, useState } from 'react'
import { CommonApi, SubAdminApi } from '@queries'
import {
    Button,
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { ArrowUpDown, CircleAlert, Edit, RefreshCw, X } from 'lucide-react'
import Modal from '@modals/Modal'
import { useNotification } from '@hooks'

interface SectorData {
    id: string
    capacity: number
    sector: {
        id: string
        name: string
    }
    enrolled: number
}

export const SectorBaseCapacityModal = ({
    id,
    onCloseModal,
    prevIndCapacity,
    industry,
}: any) => {
    const [editingSectorId, setEditingSectorId] = useState<string | null>(null)
    const [editingCapacity, setEditingCapacity] = useState<number | null>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [editedCapacities, setEditedCapacities] = useState<
        { sector: string; capacity: number }[]
    >([])
    const { notification } = useNotification()

    // API Calls
    // Getting sector based capacity data
    const { data, isLoading, isError } =
        SubAdminApi.Industry.useSectorBasedCapacity(id, { skip: !id })

    // Getting SubAdmin Courses
    const subadminCourses = CommonApi.Courses.subadminCoursesList()

    // Update New Capacity
    const [updateCapacity, updateCapacityResult] =
        SubAdminApi.Industry.useSectorBaseCapacity()

    //  Update Old Capacity
    const [updateOldCapacity, updateOldCapacityResult] =
        SubAdminApi.Industry.useUpdateOldCapacityToSectorBase()

    // // Extracted Industry Sectors from its own courses
    const extractIndustrySectors = (() => {
        const sectors = industry.courses.map((item: any) => item.sector)
        const seen = new Set()
        return sectors?.filter((sector: any) => {
            if (seen.has(sector.id)) {
                return false
            } else {
                seen.add(sector.id)
                return true
            }
        })
    })()

    // // SubAdmin Assign Sectors from
    const uniqueSectors = (() => {
        const sectors = subadminCourses?.data?.map((item: any) => item?.sector)
        const seen = new Set()
        return sectors?.filter((sector: any) => {
            if (seen.has(sector.id)) {
                return false
            } else {
                seen.add(sector.id)
                return true
            }
        })
    })()
    // const extractIndustrySectors = React.useMemo(() => {
    //     const sectors = industry?.courses?.map((item: any) => item.sector)
    //     const seen = new Set()
    //     return sectors?.filter((sector: any) => {
    //         if (seen?.has(sector?.id)) return false
    //         seen?.add(sector?.id)
    //         return true
    //     })
    // }, [industry?.courses])

    // const uniqueSectors = React.useMemo(() => {
    //     const sectors = subadminCourses?.data?.map((item: any) => item?.sector)
    //     const seen = new Set()
    //     return sectors?.filter((sector: any) => {
    //         if (seen?.has(sector?.id)) return false
    //         seen?.add(sector?.id)
    //         return true
    //     })
    // }, [subadminCourses?.data])

    useEffect(() => {
        if (
            updateCapacityResult.isSuccess ||
            updateOldCapacityResult.isSuccess
        ) {
            notification.success({
                title: 'Capacity updated',
                description: 'Capacity updated successfully',
            })
            // onCloseModal()
            setEditingSectorId(null)
            setEditingCapacity(null)
        }
    }, [updateCapacityResult.isSuccess, updateOldCapacityResult.isSuccess])

    const handleEditClick = (sectorId: string, capacity: number) => {
        setEditingSectorId(sectorId)
        setEditingCapacity(capacity) // Prefill the input with the current capacity
    }

    const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingCapacity(Number(e.target.value))
    }

    const handleUpdateCapacity = () => {
        if (editingSectorId && editingCapacity !== null) {
            const currentSector = data?.find(
                (sector: SectorData) => sector?.id === editingSectorId
            )
            if (editingCapacity <= (currentSector?.capacity ?? 0)) {
                notification.error({
                    title: 'Invalid Capacity',
                    description:
                        'The new capacity must be greater than the current capacity.',
                })
                return
            }
            updateCapacity({
                id: editingSectorId,
                body: { capacity: editingCapacity },
            })
        }
    }

    // check if sectors are unique or not
    const isSectorInUniqueSectors = (sectorId: string) => {
        return uniqueSectors?.some((sector: any) => sector.id === sectorId)
    }

    const handleMultipleSectorsCapClick = () => {
        const editableSectors = extractIndustrySectors.filter((sector: any) =>
            isSectorInUniqueSectors(sector?.id)
        )

        setEditedCapacities(
            editableSectors.map((sector: any) => {
                return {
                    sector: sector?.id,
                    capacity: Number(sector?.capacity) ?? 0,
                }
            })
        )
        setIsEditing(true)
    }

    const handleMultiCapacityChange = (
        sectorId: string,
        newCapacity: number
    ) => {
        setEditedCapacities((prev) => {
            return prev.map((sector) =>
                sector?.sector === sectorId
                    ? { ...sector, capacity: Number(newCapacity) }
                    : sector
            )
        })
    }

    const handleSubmit = () => {
        updateOldCapacity({
            id: industry?.id,
            body: { capacity: editedCapacities },
        })
    }

    // those sectors which have old capacity and are not in the new capacity
    const filteredSectors = extractIndustrySectors?.filter(
        (sector: any) =>
            !data?.some((item: any) => item?.sector?.id === sector?.id)
    )

    // checking sub-admin course and industry
    const matchSubAdminSectors = uniqueSectors?.filter(
        (sector: any) =>
            !extractIndustrySectors?.some(
                (item: any) => item?.id === sector?.id
            )
    )

    return (
        <>
            <ShowErrorNotifications
                result={updateCapacityResult ?? updateOldCapacityResult}
            />
            {data && data?.length > 0 && (
                <>
                    <div className=" py-4 border-b border-gray-200 mt-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Placement Capacity by Sector
                        </h2>
                    </div>
                    <div className="py-3">
                        {isError && <NoData text="Something went wrong" />}
                        {isLoading ? (
                            <LoadingAnimation />
                        ) : data && data?.length ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Typography variant="label">
                                            Sector
                                        </Typography>
                                    </div>
                                    <Typography variant="label">
                                        Capacity / Enrolled
                                    </Typography>
                                </div>

                                <div className="space-y-3">
                                    {data?.map(
                                        (sector: SectorData, index: number) => (
                                            <div
                                                key={sector?.id}
                                                className="flex justify-between gap-x-12 items-center p-3 rounded-lg bg-gray-50 transition-colors duration-150"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Typography
                                                        variant="muted"
                                                        color="text-gray-700"
                                                    >
                                                        {index + 1} -
                                                    </Typography>
                                                    <Typography
                                                        variant="muted"
                                                        color="text-gray-700"
                                                    >
                                                        {sector?.sector?.name ??
                                                            'NA'}
                                                    </Typography>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                                        {sector?.capacity ?? 0}{' '}
                                                        /{' '}
                                                        {sector?.enrolled ?? 0}
                                                    </div>
                                                    {editingSectorId !==
                                                        sector?.id &&
                                                        isSectorInUniqueSectors(
                                                            sector?.sector?.id
                                                        ) && (
                                                            <div
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        sector?.id,
                                                                        sector?.capacity
                                                                    )
                                                                }
                                                                className="cursor-pointer text-[9px] py-2 px-1 text-info hover:bg-gray-200"
                                                            >
                                                                <Edit
                                                                    size={15}
                                                                />
                                                            </div>
                                                        )}
                                                    {editingSectorId ===
                                                        sector?.id && (
                                                        <div className="flex items-center gap-x-2">
                                                            <div className="w-20">
                                                                <TextInput
                                                                    name="capacity"
                                                                    type="number"
                                                                    placeholder="Capacity"
                                                                    showError={
                                                                        false
                                                                    }
                                                                    value={
                                                                        editingCapacity ??
                                                                        ''
                                                                    }
                                                                    onChange={
                                                                        handleCapacityChange
                                                                    }
                                                                />
                                                            </div>

                                                            <button
                                                                onClick={
                                                                    handleUpdateCapacity
                                                                }
                                                                className="text-[9px] px-2 py-1 bg-info text-white rounded-md"
                                                                title="Update Capacity"
                                                            >
                                                                <RefreshCw
                                                                    size={15}
                                                                />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingSectorId(
                                                                        null
                                                                    )
                                                                    setEditingCapacity(
                                                                        null
                                                                    )
                                                                }}
                                                                className="p-1 bg-red-400 text-white rounded-md"
                                                                title="Cancel"
                                                            >
                                                                <X size={15} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            !isError && <NoData text="No data found" />
                        )}
                    </div>
                </>
            )}
            {matchSubAdminSectors?.length > 0 &&
                filteredSectors?.length > 0 && (
                    <div className="space-y-4 mt-4 pt-4 border-t-2 ">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Typography variant="title">
                                    Industry Old Capacity
                                </Typography>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-12 justify-between border-t border-b border-gray-200 rounded-md p-3 bg-gray-50">
                            <Typography variant="label">
                                Previous Whole Industry Capacity
                            </Typography>
                            <Typography
                                variant="body"
                                color="text-gray-700"
                                semibold
                            >
                                {prevIndCapacity}
                            </Typography>
                        </div>
                        <div className="space-y-4 mt-2">
                            {isEditing ? (
                                <>
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <Typography variant="label">
                                                Sector
                                            </Typography>
                                        </div>
                                        <Typography variant="label">
                                            Capacity / Enrolled
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className=" ">
                                            <CircleAlert className="text-red-400" />
                                        </div>
                                        <Typography
                                            variant="label"
                                            color="text-red-400"
                                        >
                                            Update the previous capacity of the
                                            industry to newly updated flow
                                            sector based capacity
                                        </Typography>
                                    </div>
                                    {filteredSectors?.map(
                                        (sector: any, index: number) =>
                                            isSectorInUniqueSectors(
                                                sector?.id
                                            ) && (
                                                <div
                                                    key={sector?.id}
                                                    className="flex justify-between gap-x-12 items-center p-3 rounded-lg bg-gray-50"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Typography
                                                            variant="muted"
                                                            color="text-gray-700"
                                                        >
                                                            {index + 1} -
                                                        </Typography>
                                                        <Typography
                                                            variant="muted"
                                                            color="text-gray-700"
                                                        >
                                                            {sector?.name ??
                                                                'NA'}
                                                        </Typography>
                                                    </div>

                                                    <div className="w-20">
                                                        <TextInput
                                                            name={`capacity-${sector?.id}`}
                                                            type="number"
                                                            value={
                                                                editedCapacities?.find(
                                                                    (item) =>
                                                                        item?.sector ===
                                                                        sector?.id
                                                                )?.capacity ??
                                                                ''
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                handleMultiCapacityChange(
                                                                    sector?.id,
                                                                    Number(
                                                                        e
                                                                            ?.target
                                                                            ?.value
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                    )}
                                    <div className="flex justify-center">
                                        <Button
                                            onClick={handleSubmit}
                                            variant="success"
                                            loading={
                                                updateOldCapacityResult.isLoading
                                            }
                                            disabled={
                                                updateOldCapacityResult.isLoading
                                            }
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Button
                                    onClick={handleMultipleSectorsCapClick}
                                    variant="info"
                                >
                                    Edit Capacity
                                </Button>
                            )}
                        </div>
                    </div>
                )}
        </>
    )
}
