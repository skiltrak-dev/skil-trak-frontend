import {
    AssessmentFolderCard,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import React from 'react'

export const AssessmentFolders = ({
    setSelectedFolder,
    selectedFolder,
    getFolders,
    latestWorkplace,
    appliedIndustry,
    selectedCourse,
    AgreementFile,
}: {
    setSelectedFolder: (data: any) => void
    selectedFolder: any
    AgreementFile: string
    getFolders: any
    selectedCourse: any
    appliedIndustry: any
    latestWorkplace: any
}) => {
    return (
        <div className="bg-white h-[inherit] overflow-y-scroll custom-scrollbar">
            {latestWorkplace?.courses &&
                appliedIndustry &&
                latestWorkplace?.courses[0]?.id === selectedCourse?.id &&
                !getFolders?.data?.find((folder: any) =>
                    folder?.name?.split(' ').includes('Agreement')
                ) && (
                    <AssessmentFolderCard
                        id={AgreementFile}
                        name={'Agreement'}
                        // isActive={folder.isActive}
                        selectedFolderId={selectedFolder?.id}
                        // response={{
                        //     files: [viewAgreement?.data?.length],
                        // }}
                        onClick={() => {
                            setSelectedFolder({
                                id: AgreementFile,
                            })
                        }}
                        assessment
                    />
                )}
            {getFolders?.isError && (
                <NoData text={'There is some network issue,Try reload'} />
            )}
            {getFolders?.isLoading || getFolders.isFetching ? (
                <div className="flex flex-col justify-center items-center gap-y-2 py-5">
                    <LoadingAnimation size={50} />
                    <Typography variant={'label'}>Folders Loading</Typography>
                </div>
            ) : getFolders?.data &&
              getFolders?.data?.length > 0 &&
              getFolders.isSuccess ? (
                getFolders?.data?.map((assessment: any) => (
                    <AssessmentFolderCard
                        key={assessment?.id}
                        id={assessment?.id}
                        name={assessment?.name}
                        isAgreement={assessment?.isAgreement}
                        // isActive={folder.isActive}
                        selectedFolderId={selectedFolder?.id}
                        response={assessment?.studentResponse[0]}
                        onClick={() => {
                            setSelectedFolder(assessment)
                        }}
                        assessment
                    />
                ))
            ) : (
                <NoData text={'No Assessment were found'} />
            )}
        </div>
    )
}
