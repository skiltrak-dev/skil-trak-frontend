import { Badge, Button, Card, Select, Switch, Typography } from '@components'
import { ScrollArea } from '@components/ui/scroll-area'
import { useSectorsAndCoursesOptions } from '@hooks'
import { AdminApi } from '@queries'
import { OptionType } from '@types'
import {
    CheckCircle2,
    Clock,
    FileCheck,
    FolderOpen,
    GraduationCap,
    Info,
    ListChecks,
    Save,
    Shield,
    X,
} from 'lucide-react'
import { useState } from 'react'
import { SaveDialogModal } from '../modal'
import { AllocatedFolders } from './AllocatedFolders'

interface CheckFolder {
    id: string
    name: string
}

interface FolderAllocation {
    folderId: string
    required: boolean
    dueBy: string
}

interface AllocationHistoryItem {
    id: string
    timestamp: Date
    sectorId: string
    sectorName: string
    courseIds: string[]
    courseNames: string[]
    allocations: FolderAllocation[]
    totalChecks: number
    mandatoryChecks: number
    industryChecks: number
}

const sectors: OptionType[] = [
    { value: '1', label: 'Health' },
    { value: '2', label: 'Community Services' },
    { value: '3', label: 'Hospitality' },
]

interface CheckFolderExtended extends CheckFolder {
    mandatory?: boolean
}

const checkFolders: CheckFolderExtended[] = [
    { id: '1', name: 'Working with Children Check' },
    { id: '2', name: 'Police Check' },
    { id: '3', name: 'First Aid Certificate' },
    { id: '4', name: 'Food Safety Certificate' },
    { id: '5', name: 'Immunisation Records' },
    { id: '6', name: 'Placement Agreement', mandatory: true },
    { id: '7', name: 'Eligibility Checklist', mandatory: true },
    { id: '8', name: 'Placement Logbook', mandatory: true },
]

export const AllocateFolders = () => {
    const [showSaveDialog, setShowSaveDialog] = useState(false)
    const [allocationHistory, setAllocationHistory] = useState<
        AllocationHistoryItem[]
    >([])

    const {
        courseOptions,
        selectedCourses,
        onCourseChange,
        onSectorChanged,
        sectorOptions,
        selectedSector,
        sectorLoading,
        setSelectedSector,
        setSelectedCourses,
    } = useSectorsAndCoursesOptions()

    const defaultDocuments = AdminApi.DefaultDocuments.defaultDocuments({
        search: ``,
        skip: 0,
        limit: 200,
    })

    // Initialize with mandatory folders already enabled
    const [allocations, setAllocations] = useState<
        Record<string, FolderAllocation>
    >(() => {
        const initial: Record<string, FolderAllocation> = {}
        checkFolders.forEach((folder) => {
            if (folder.mandatory) {
                initial[folder.id] = {
                    folderId: folder.id,
                    required: true,
                    dueBy: 'before-placement',
                }
            }
        })
        return initial
    })

    const selectAllCourses = () => {
        setSelectedCourses(courseOptions?.map((c: any) => c.value))
    }

    const deselectAllCourses = () => {
        setSelectedCourses([])
    }

    const [selectedFolders, setSelectedFolders] = useState<
        { id: number; isMandatory: boolean }[]
    >([])

    const toggleFolderRequired = (folderId: number) => {
        setSelectedFolders((prev) =>
            prev?.find((folder) => folder.id === folderId)
                ? prev.filter((folder) => folder.id !== folderId)
                : [...prev, { id: folderId, isMandatory: false }]
        )
    }

    const toggleFolderMandatory = (folderId: number) => {
        setSelectedFolders((prev) =>
            prev?.find((folder) => folder.id === folderId)
                ? prev.map((folder) =>
                      folder.id === folderId
                          ? { ...folder, isMandatory: !folder.isMandatory }
                          : folder
                  )
                : [...prev, { id: folderId, isMandatory: true }]
        )
    }

    const confirmSave = () => {
        setShowSaveDialog(true)
    }

    const handleCancel = () => {
        setSelectedCourses([])
        // Reset allocations to only mandatory folders
        const initial: Record<string, FolderAllocation> = {}
        checkFolders.forEach((folder) => {
            if (folder.mandatory) {
                initial[folder.id] = {
                    folderId: folder.id,
                    required: true,
                    dueBy: 'before-placement',
                }
            }
        })
        setAllocations(initial)
    }

    // Calculate summary stats
    const enabledIndustryChecks = Object.values(allocations)?.filter(
        (a) =>
            a.required &&
            !checkFolders.find((f) => f.id === a.folderId)?.mandatory
    )?.length
    const mandatoryChecks = checkFolders?.filter(
        (f: any) => f.mandatory
    )?.length
    const totalEnabledChecks = enabledIndustryChecks + mandatoryChecks

    // Determine step completion
    const step1Complete = !!selectedSector
    const step2Complete = selectedCourses?.length > 0
    const step3Complete = totalEnabledChecks > 0

    const steps = [
        {
            id: 1,
            title: 'Select Sector',
            description:
                selectedSector &&
                selectedSector?.filter((s: any) => s)?.length > 0
                    ? sectorOptions?.find(
                          (s: any) => s?.value === selectedSector?.[0]?.value
                      )?.label
                    : 'Choose industry sector',
            isComplete: step1Complete,
        },
        {
            id: 2,
            title: 'Select Courses',
            description:
                selectedCourses?.length > 0
                    ? `${selectedCourses?.length} course(s) selected`
                    : 'Choose course(s)',
            isComplete: step2Complete,
        },
        {
            id: 3,
            title: 'Configure Checks',
            description:
                totalEnabledChecks > 0
                    ? `${totalEnabledChecks} check(s) enabled`
                    : 'Set requirements',
            isComplete: step3Complete,
        },
    ]

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2">
                    <FolderOpen className="w-6 h-6 text-gray-700" />
                    <h2 className="text-gray-900">
                        Allocate Folders to Sector/Courses
                    </h2>
                </div>
                <p className="text-gray-600 mt-1">
                    Follow the steps below to assign industry check requirements
                </p>
            </div>

            {/* Progress Steps */}
            <Card className="!border !border-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="grid md:grid-cols-3 gap-4">
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-start gap-3">
                            <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                    step.isComplete
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-gray-400 border-2 border-gray-300'
                                }`}
                            >
                                {step.isComplete ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                    <span>{step.id}</span>
                                )}
                            </div>
                            <div>
                                <h3
                                    className={`font-medium ${
                                        step.isComplete
                                            ? 'text-gray-900'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-0.5">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Two-column Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Panel - Sector & Courses */}
                <Card className="p-6 space-y-6 shadow-sm !border !border-gray-300/80">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap className="w-5 h-5 text-gray-600" />
                            <Typography variant="label" color="text-gray-900">
                                Select Sector *
                            </Typography>
                        </div>
                        <Select
                            required
                            name="sector"
                            loading={sectorLoading}
                            disabled={sectorLoading}
                            options={sectorOptions}
                            value={selectedSector}
                            onChange={(option: any) =>
                                onSectorChanged([option], [])
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FileCheck className="w-5 h-5 text-gray-600" />
                                <Typography
                                    variant="label"
                                    className="text-gray-900"
                                >
                                    Select Courses *
                                </Typography>
                            </div>
                            {courseOptions && courseOptions?.length > 0 && (
                                <div className="flex gap-2">
                                    <Button
                                        variant="info"
                                        outline
                                        onClick={selectAllCourses}
                                        className="!py-1"
                                    >
                                        Select All
                                    </Button>
                                    {selectedCourses &&
                                        selectedCourses?.length > 0 && (
                                            <Button
                                                outline
                                                variant="dark"
                                                className="!py-1"
                                                onClick={deselectAllCourses}
                                            >
                                                Clear
                                            </Button>
                                        )}
                                </div>
                            )}
                        </div>
                        {!selectedSector ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                                <GraduationCap className="w-12 h-12 text-gray-300 mb-2" />
                                <p className="text-gray-600 font-medium">
                                    Please select a sector first
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                    Choose a sector above to see available
                                    courses
                                </p>
                            </div>
                        ) : !courseOptions?.length ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                                <GraduationCap className="w-12 h-12 text-gray-300 mb-2" />
                                <p className="text-gray-500">
                                    No courses available for this sector
                                </p>
                            </div>
                        ) : (
                            <>
                                <ScrollArea className="h-[350px] border border-gray-200 rounded-lg bg-white">
                                    <div className="space-y-1 p-2">
                                        {courseOptions?.map((course: any) => (
                                            <label
                                                key={course.id}
                                                className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                                                    selectedCourses.includes(
                                                        course?.value
                                                    )
                                                        ? 'bg-blue-50 border-2 border-blue-300 shadow-sm'
                                                        : 'bg-white hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCourses.includes(
                                                        course?.value
                                                    )}
                                                    onChange={() => {
                                                        const updated =
                                                            selectedCourses.includes(
                                                                course?.value
                                                            )
                                                                ? selectedCourses.filter(
                                                                      (
                                                                          c: any
                                                                      ) =>
                                                                          c !==
                                                                          course?.value
                                                                  )
                                                                : [
                                                                      ...selectedCourses,
                                                                      course?.value,
                                                                  ]
                                                        onCourseChange(updated)
                                                    }}
                                                    className="mt-0.5 rounded border-gray-300"
                                                />
                                                <div className="flex-1">
                                                    <div
                                                        className={`font-medium ${
                                                            selectedCourses.includes(
                                                                course?.value
                                                            )
                                                                ? 'text-blue-900'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {course?.item?.code}
                                                    </div>
                                                    <div className="text-gray-600 text-sm">
                                                        {course?.item?.title}
                                                    </div>
                                                </div>
                                                {selectedCourses.includes(
                                                    course?.value
                                                ) && (
                                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                </ScrollArea>
                                {selectedCourses.length > 0 && (
                                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                        <p className="text-sm text-blue-900">
                                            <span className="font-medium">
                                                {selectedCourses.length}
                                            </span>{' '}
                                            course
                                            {selectedCourses.length !== 1
                                                ? 's'
                                                : ''}{' '}
                                            will receive the same check
                                            requirements
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Card>

                {/* Right Panel - Check Folders */}
                <Card className="p-6 space-y-6 shadow-sm !border !border-gray-300/80">
                    {!selectedSector || selectedCourses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center h-full">
                            <div className="max-w-sm">
                                <Shield className="w-16 h-16 text-gray-300 mb-3 mx-auto" />
                                <p className="text-gray-900 font-medium mb-2">
                                    Ready to Configure Checks
                                </p>
                                <p className="text-gray-600 text-sm mb-4">
                                    Complete steps 1 and 2 on the left to
                                    configure which industry checks are required
                                    for your selected courses
                                </p>
                                <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span>
                                            Mandatory placement documents are
                                            pre-enabled
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span>
                                            Toggle industry checks as needed
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        <span>
                                            Set due dates for each requirement
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Summary Banner */}
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <ListChecks className="w-5 h-5 text-green-700 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 mb-1">
                                            Requirements Summary
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant="primaryNew"
                                                    text={`${mandatoryChecks}`}
                                                    className="bg-green-600"
                                                ></Badge>
                                                <span className="text-gray-700">
                                                    Mandatory documents
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant="primaryNew"
                                                    text={`${enabledIndustryChecks}`}
                                                    className="bg-blue-50 text-blue-700 border-blue-300"
                                                ></Badge>
                                                <span className="text-gray-700">
                                                    Industry checks
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="h-[520px] pr-4">
                                <div className="space-y-6">
                                    {/* Industry Checks Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 border-b-2 border-blue-200 pb-3">
                                            <Shield className="w-5 h-5 text-blue-600" />
                                            <div className="flex-1">
                                                <h3 className="text-gray-900 font-medium">
                                                    Industry Checks
                                                </h3>
                                                <p className="text-gray-600 text-sm mt-0.5">
                                                    Select checks required for
                                                    this course
                                                </p>
                                            </div>
                                            <Badge
                                                variant="primaryNew"
                                                text={`${enabledIndustryChecks} industry`}
                                                className="bg-blue-50 text-blue-700 border-blue-300"
                                            ></Badge>
                                        </div>
                                        <div className="space-y-3">
                                            {defaultDocuments?.data?.data?.map(
                                                (folder) => {
                                                    const allocation =
                                                        selectedFolders?.find(
                                                            (f) =>
                                                                f.id ===
                                                                folder.id
                                                        )

                                                    const isEnabled = allocation

                                                    return (
                                                        <label
                                                            key={folder.id}
                                                            className={`flex items-center gap-3 border-2 rounded-lg p-4 transition-all shadow-sm cursor-pointer ${
                                                                isEnabled
                                                                    ? 'border-blue-200 bg-blue-50'
                                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                // checked={
                                                                //     isEnabled
                                                                // }
                                                                onChange={() =>
                                                                    toggleFolderRequired(
                                                                        folder.id
                                                                    )
                                                                }
                                                                className="rounded border-gray-300 w-4 h-4"
                                                            />
                                                            <span
                                                                className={`font-medium flex-1 ${
                                                                    isEnabled
                                                                        ? 'text-blue-900'
                                                                        : 'text-gray-900'
                                                                }`}
                                                            >
                                                                {folder.name}
                                                            </span>

                                                            {isEnabled && (
                                                                <div className="flex gap-2">
                                                                    <Switch
                                                                        name="isMandatory"
                                                                        customStyleClass={
                                                                            'profileSwitch'
                                                                        }
                                                                        onChange={() => {
                                                                            toggleFolderMandatory(
                                                                                folder?.id
                                                                            )
                                                                        }}
                                                                        // defaultChecked={
                                                                        //     isHighPriority
                                                                        // }
                                                                        // loading={
                                                                        //     makeAsHighPriorityResult.isLoading
                                                                        // }
                                                                        // disabled={
                                                                        //     makeAsHighPriorityResult.isLoading ||
                                                                        //     disabled
                                                                        // }
                                                                        showError={
                                                                            false
                                                                        }
                                                                    />
                                                                    <Badge
                                                                        variant="primaryNew"
                                                                        text="Mandatory"
                                                                        className="bg-blue-600 text-white"
                                                                    ></Badge>
                                                                </div>
                                                            )}
                                                        </label>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>

                                    {/* Placement Mandatory Documents Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 border-b-2 border-green-200 pb-3">
                                            <FileCheck className="w-5 h-5 text-green-600" />
                                            <div className="flex-1">
                                                <h3 className="text-gray-900 font-medium">
                                                    Placement Mandatory
                                                    Documents
                                                </h3>
                                                <p className="text-gray-600 text-sm mt-0.5">
                                                    Auto-enabled for all
                                                    placements • Cannot be
                                                    disabled
                                                </p>
                                            </div>
                                            <Badge
                                                variant="primaryNew"
                                                text={`${mandatoryChecks}`}
                                                className="bg-green-600"
                                            ></Badge>
                                        </div>
                                        <div className="space-y-3">
                                            {checkFolders
                                                .filter((f) => f.mandatory)
                                                .map((folder) => {
                                                    const allocation =
                                                        allocations[folder.id]

                                                    return (
                                                        <div
                                                            key={folder.id}
                                                            className="border-2 border-green-200 bg-green-50 rounded px-4 py-2 shadow-sm"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-gray-900 font-medium">
                                                                        {
                                                                            folder.name
                                                                        }
                                                                    </span>
                                                                    <Badge
                                                                        variant="primaryNew"
                                                                        text={`${mandatoryChecks} mandatory`}
                                                                        className="bg-green-600 text-white"
                                                                    ></Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </Card>
            </div>

            {/* Footer Actions */}
            <Card className="border-gray-200 shadow-lg sticky bottom-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        {selectedCourses && selectedCourses?.length > 0 ? (
                            <>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span className="text-gray-700">
                                        <span className="font-semibold text-gray-900">
                                            {selectedCourses?.length}
                                        </span>{' '}
                                        course(s) selected
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                        {totalEnabledChecks} total check(s)
                                        configured ({mandatoryChecks} mandatory
                                        + {enabledIndustryChecks} industry)
                                    </span>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No courses selected yet
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button
                            variant="action"
                            onClick={handleCancel}
                            className="flex items-center gap-2 flex-1 sm:flex-none"
                        >
                            <X className="w-4 h-4" />
                            Reset
                        </Button>
                        <Button
                            variant="primaryNew"
                            onClick={confirmSave}
                            className="flex items-center gap-2 flex-1 sm:flex-none"
                            disabled={
                                !step1Complete ||
                                !step2Complete ||
                                !step3Complete
                            }
                        >
                            <Save className="w-4 h-4" />
                            Save Allocation
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Save Confirmation Dialog */}
            <SaveDialogModal
                isOpen={showSaveDialog}
                setIsOpen={() => setShowSaveDialog(false)}
                selectedSector={selectedSector}
                selectedCourses={selectedCourses}
                courses={courseOptions}
                selectedFolders={selectedFolders}
                mandatoryChecks={mandatoryChecks}
                enabledIndustryChecks={enabledIndustryChecks}
                sectors={sectors}
            />

            {/* Allocation History */}
            <AllocatedFolders />
        </div>
    )
}
