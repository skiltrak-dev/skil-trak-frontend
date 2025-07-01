import React from 'react'

interface ProfileFieldItem {
    key: string
    label: string
}

interface IndustryProfileChecklistProps {
    industry: any
    profileFields: ProfileFieldItem[]
}

export const IndustryProfileChecklist = ({
    industry,
    profileFields,
}: IndustryProfileChecklistProps) => {
    const {
        courseAdded,
        CapacityUpdated,
        ProfileUpdated,
        trading_hours_and_shifts,
        hasInsuranceDocuments,
        hasIndustryChecks,
        hasBookmarked,
        hasCourseApproved,
        hasEmailVerified,
        hasSupervisor,
        hasWorkplaceType,
    } = industry

    const profileChecks = {
        courseAdded,
        CapacityUpdated,
        ProfileUpdated,
        trading_hours_and_shifts,
        hasInsuranceDocuments,
        hasIndustryChecks,
        hasBookmarked,
        hasCourseApproved,
        hasEmailVerified,
        hasSupervisor,
        hasWorkplaceType,
    }
    // Find the completed and incomplete items
    const completedItems = profileFields
        .filter(
            (field) => profileChecks[field.key as keyof typeof profileChecks]
        )
        .map((field) => field.label)

    const incompleteItems = profileFields
        .filter(
            (field) => !profileChecks[field.key as keyof typeof profileChecks]
        )
        .map((field) => field.label)

    const uploadedCount = completedItems.length
    const missingCount = incompleteItems.length

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm min-w-72">
            <div className="flex flex-col space-y-4">
                {profileFields.map((field) => {
                    const isCompleted =
                        profileChecks[field.key as keyof typeof profileChecks]
                    return (
                        <div
                            key={field.key}
                            className="flex items-center space-x-3"
                        >
                            {isCompleted ? (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            ) : (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            )}
                            <span
                                className={`text-lg ${
                                    isCompleted
                                        ? 'text-gray-700'
                                        : 'text-gray-500'
                                }`}
                            >
                                {field.label}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6 flex justify-between border-t border-gray-200 pt-4">
                <div className="text-green-600">
                    <span className="font-medium">Uploaded: </span>
                    <span className="font-bold">{uploadedCount}</span>
                </div>
                <div className="text-red-600">
                    <span className="font-medium">Missing: </span>
                    <span className="font-bold">{missingCount}</span>
                </div>
            </div>
        </div>
    )
}
