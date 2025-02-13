// components
import {
    NoData,
    Typography,
    LoadingAnimation,
    AssessmentFolderCard,
} from '@components'

import { AssessmentFolderDetailX } from './AssessmentFolderDetailX'
import { AssessmentEvidenceDetailType } from '@types'
type Props = {
    assessmentsFolders: any
    setSelectedFolder: any
    selectedFolder: any
    result: any
    otherDocs: any
}
export const AssessmentsEvidence = ({
    selectedFolder,
    setSelectedFolder,
    assessmentsFolders,
    result,
    otherDocs,
}: Props) => {
    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-full ">
                    <div className="flex items-center gap-x-1 mb-1">
                        <Typography variant="label" color="text-black">
                            Assessment Submission -
                        </Typography>
                        <Typography variant="muted" color="text-gray-500">
                            Submission #
                            {result?.totalSubmission
                                ? result?.totalSubmission + 1
                                : 1}
                        </Typography>
                    </div>
                    <div className="bg-white border-r min-h-[400px]">
                        {assessmentsFolders.isError && (
                            <NoData text={'There is Some Network Issue'} />
                        )}
                        {assessmentsFolders.isLoading ||
                        assessmentsFolders.isFetching ? (
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
                                        <div>
                                            {assessmentsFolders?.data?.map(
                                                (folder: any) => (
                                                    <AssessmentFolderCard
                                                        key={folder.id}
                                                        id={folder.id}
                                                        isAgreement={
                                                            folder?.isAgreement
                                                        }
                                                        name={folder.name}
                                                        isActive={
                                                            folder.isActive
                                                        }
                                                        response={
                                                            folder
                                                                ?.studentResponse?.[0]
                                                        }
                                                        isIndustryCheck={
                                                            folder?.isIndustryCheck
                                                        }
                                                        selectedFolderId={
                                                            selectedFolder?.id
                                                        }
                                                        onClick={() => {
                                                            setSelectedFolder(
                                                                folder
                                                            )
                                                        }}
                                                        assessment
                                                    />
                                                )
                                            )}
                                            {otherDocs &&
                                                otherDocs?.length > 0 && (
                                                    <div>
                                                        <Typography
                                                            variant="xs"
                                                            color="text-gray-500"
                                                        >
                                                            Other Documents From
                                                            Industry
                                                        </Typography>
                                                        {otherDocs?.map(
                                                            (
                                                                folder: AssessmentEvidenceDetailType
                                                            ) => (
                                                                <AssessmentFolderCard
                                                                    key={
                                                                        folder.id
                                                                    }
                                                                    id={
                                                                        folder.id
                                                                    }
                                                                    isAgreement={
                                                                        folder?.isAgreement
                                                                    }
                                                                    name={
                                                                        folder.name
                                                                    }
                                                                    isActive={
                                                                        folder.isActive
                                                                    }
                                                                    response={
                                                                        folder
                                                                            ?.studentResponse?.[0]
                                                                    }
                                                                    isIndustryCheck={
                                                                        folder?.isIndustryCheck
                                                                    }
                                                                    selectedFolderId={
                                                                        selectedFolder?.id
                                                                    }
                                                                    onClick={() => {
                                                                        setSelectedFolder(
                                                                            folder
                                                                        )
                                                                    }}
                                                                    assessment
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                        </div>
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

                <div className="w-full md:w-2/3 h-full relative">
                    <AssessmentFolderDetailX
                        fileUpload
                        folder={selectedFolder}
                        result={result}
                    />
                </div>
            </div>
        </>
    )
}
