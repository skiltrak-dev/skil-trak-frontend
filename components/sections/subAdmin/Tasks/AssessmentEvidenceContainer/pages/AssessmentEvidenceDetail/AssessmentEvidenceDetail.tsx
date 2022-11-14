import { useState } from 'react'

// components
import {
    Typography,
    Button,
    LoadingAnimation,
    Select,
    TextArea,
    Checkbox,
} from '@components'
import { Action, AssessmentResponse } from './components'

// queries
import {
    useGetAssessmentResponseQuery,
    useSubmitAssessmentEvidenceMutation,
} from '@queries'
import { AssessmentFolderCard } from '@components/sections/student/AssessmentsContainer'

export const AssesmentEvidenceDetail = ({ data }: any) => {
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    const getAssessmentResponse = useGetAssessmentResponseQuery(
        selectedFolder?.id,
        { skip: !selectedFolder }
    )

    return (
        <div>
            <div className="flex justify-between items-center">
                <Typography variant={'label'} color={'text-gray-700'}>
                    <span className="font-bold text-black">
                        Assessment Submission
                    </span>{' '}
                    - Submission #1
                </Typography>
                <Typography variant={'label'} color={'text-gray-500'}>
                    Assessor:{' '}
                    <span className="font-semibold text-black">John Doe</span>{' '}
                </Typography>
            </div>

            {/*  */}
            <div className="grid grid-cols-3">
                <div className="border border-gray-300">
                    <div className="p-2">
                        <Typography variant={'small'} color={'text-gray-700'}>
                            Selected Folder
                        </Typography>
                        <Typography variant={'label'}>
                            Work Effectively As Cook
                        </Typography>
                    </div>

                    {data?.map((assessment: any) => (
                        <AssessmentFolderCard
                            key={assessment?.id}
                            id={assessment?.id}
                            name={assessment?.name}
                            // isActive={folder.isActive}
                            selectedFolderId={selectedFolder?.id}
                            negativeComment={assessment.negativeComment}
                            positiveComment={assessment.positiveComment}
                            onClick={() => {
                                setSelectedFolder(assessment)
                            }}
                        />
                    ))}
                </div>
                <div className="col-span-2 border border-gray-300">
                    {getAssessmentResponse?.isLoading ? (
                        <LoadingAnimation />
                    ) : (
                        getAssessmentResponse?.data && (
                            <AssessmentResponse
                                data={getAssessmentResponse?.data}
                                folder={selectedFolder}
                            />
                        )
                    )}
                </div>
            </div>

            <Action />
        </div>
    )
}
