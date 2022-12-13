// components
import {
    Button,
    Checkbox,
    Typography,
    Card,
    NoData,
    LoadingAnimation,
} from '@components'

import { AssessmentFolderCard } from './components'
import { AssessmentFolderDetailX } from './AssessmentFolderDetailX'

type Props = {
    assessmentsFolders: any
    setSelectedFolder: any
    selectedFolder: any
}

export const AssessmentsEvidence = ({
    assessmentsFolders,
    selectedFolder,
    setSelectedFolder,
}: Props) => {
    return (
        <>
            <div className="flex">
                <div className="w-1/3 h-full ">
                    <div className="flex items-center gap-x-1 mb-1">
                        <Typography variant="label" color="text-black">
                            Assessment Submission -
                        </Typography>
                        <Typography variant="muted" color="text-gray-500">
                            Submission #1
                        </Typography>
                    </div>
                    <div className="bg-white border-r min-h-[400px]">
                        {assessmentsFolders.isError && (
                            <NoData text={'There is Some Network Issue'} />
                        )}
                        {assessmentsFolders.isLoading ? (
                            <div className="flex flex-col items-center pt-12">
                                <LoadingAnimation size={50} />
                                <Typography variant={'subtitle'}>
                                    Assessment Folders Loading
                                </Typography>
                            </div>
                        ) : (
                            assessmentsFolders.isSuccess && (
                                <>
                                    <div className="p-2 bg-white border-b border-gray-200">
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Submission For
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {
                                                assessmentsFolders?.data[0]
                                                    ?.course?.title
                                            }
                                        </Typography>
                                    </div>
                                    {assessmentsFolders?.data &&
                                    assessmentsFolders?.data?.length > 0 ? (
                                        assessmentsFolders?.data?.map(
                                            (folder: any) => (
                                                <AssessmentFolderCard
                                                    key={folder.id}
                                                    id={folder.id}
                                                    name={folder.name}
                                                    isActive={folder.isActive}
                                                    selectedFolderId={
                                                        selectedFolder?.id
                                                    }
                                                    negativeComment={
                                                        folder.negativeComment
                                                    }
                                                    positiveComment={
                                                        folder.positiveComment
                                                    }
                                                    onClick={() => {
                                                        setSelectedFolder(
                                                            folder
                                                        )
                                                    }}
                                                />
                                            )
                                        )
                                    ) : (
                                        <NoData
                                            text={'No Folders Were Found'}
                                        />
                                    )}
                                </>
                            )
                        )}
                    </div>
                </div>

                <div className="w-2/3 h-full relative">
                    <AssessmentFolderDetailX
                        fileUpload
                        folder={selectedFolder}
                    />
                </div>
            </div>
        </>
    )
}
