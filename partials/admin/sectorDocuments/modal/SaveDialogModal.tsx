import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@components/ui/alert-dialog'
import { Badge, ShowErrorNotifications } from '@components'
import { Separator } from '@components/ui/separator'
import { Course, OptionType } from '@types'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

export const SaveDialogModal = ({
    isOpen,
    selectedFolders,
    setIsOpen,
    selectedSector,
    selectedCourses,
    courses,
    mandatoryChecks,
    enabledIndustryChecks,
    sectors,
}: {
    selectedSector: string
    selectedFolders: number[]
    selectedCourses: number[]
    courses: OptionType[]
    mandatoryChecks: number
    enabledIndustryChecks: number
    isOpen: boolean
    sectors: OptionType[]
    setIsOpen: () => void
}) => {
    const [
        addCourseMultipleIndustryChecks,
        addCourseMultipleIndustryChecksResult,
    ] = AdminApi.IndustryChecks.addCourseMultipleIndustryChecks()

    const coursesData = courses
        ?.filter((c) => selectedCourses.includes(Number(c.value)))
        ?.map((c) => c?.item)

    console.log({ coursesData })

    const { notification } = useNotification()

    const handleSave = async () => {
        const res: any = await addCourseMultipleIndustryChecks({
            courses: selectedCourses,
            documents: selectedFolders?.map((id) => ({
                id,
                isMandatory: true,
            })),
        })
        if (res?.data) {
            notification.success({
                title: 'Industry Checks Added',
                description: 'Industry Checks Added Successfully',
            })
            setIsOpen()
        }
        console.log({ selectedFolders, selectedCourses })
        console.log('Saving allocation...')
    }
    console.log({ isOpen })
    return (
        <>
            <ShowErrorNotifications
                result={addCourseMultipleIndustryChecksResult}
            />
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Allocation</AlertDialogTitle>
                        <AlertDialogDescription>
                            Review the allocation details before saving
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                            <div>
                                <span className="font-medium text-gray-900">
                                    Courses ({selectedCourses.length}):
                                </span>
                                <ul className="mt-1 space-y-1 text-gray-700">
                                    {coursesData.map((course) => {
                                        return (
                                            <li
                                                key={course?.id}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                <span>
                                                    {course?.code} -{' '}
                                                    {course?.title}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <Separator />

                            <div>
                                <span className="font-medium text-gray-900">
                                    Check Requirements:
                                </span>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            text={`${mandatoryChecks} mandatory`}
                                            className="bg-green-600"
                                        ></Badge>
                                        <span className="text-gray-700">
                                            Mandatory placement documents
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            text={`${enabledIndustryChecks} industry`}
                                            className="bg-blue-50 text-blue-700 border-blue-300"
                                        ></Badge>
                                        <span className="text-gray-700">
                                            Industry checks enabled
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                            These requirements will be applied to all selected
                            courses.
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSave}>
                            Confirm & Save
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
