import { Card, EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { StudentLayout } from '@layouts'
import {
    IndustryDocsFolders,
    IndustryRequiredDocsFiles,
    TalentPoolNotification,
} from '@partials/common/TalentPool'
import { TalentPoolIndustryProfileDetails } from '@partials/student/talentPool'
import { StudentApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { TalentPoolStatusEnum } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState, useEffect, useCallback, useMemo } from 'react'
import { object } from 'yup'

const RequiredDocsPage: NextPageWithLayout = () => {
    const [selectedFolder, setSelectedFolder] = useState<any>(null)
    const [view, setView] = useState<boolean>(false)
    const router = useRouter()
    const profileId = router.query.id as string
    const getRequiredDocsResponse =
        StudentApi.TalentPool.useRequiredDocsResponse(selectedFolder?.id, {
            skip: !selectedFolder?.id,
        })
    const { data, isSuccess, isLoading, isError, isFetching } =
        StudentApi.TalentPool.useAcceptedTalentPoolIndustryProfile(profileId, {
            skip: !profileId,
        })
    // const {data:folders } = StudentApi.TalentPool.useConnectionRequiredDocs(profileId,{
    //     skip: !profileId,
    // })
    const getFolders = data?.talentPoolRequiredDocuments

    const getSectors = useMemo(() => {
        return data?.industry?.courses?.map((course: any) => course?.sector)
    }, [data])

    useEffect(() => {
        if (data && isSuccess && data?.length > 0) {
            const folder = getFolders?.find(
                (folder: any) => folder?.id === Number(selectedFolder?.id)
            )
            onSelectFolder(selectedFolder && folder ? folder : getFolders?.[0])
        }
    }, [data])

    useEffect(() => {
        const timeout: any = setTimeout(() => {
            setView(false)
        }, 8000)

        return () => clearTimeout(timeout)
    }, [view])

    const onSelectFolder = useCallback((data: any) => {
        setSelectedFolder(data)
    }, [])

    return (
        <>
            {view && (
                <TalentPoolNotification
                    setViewNotification={() => setView(false)}
                    text={
                        'You can view profile and details of industry only when you accept the industry request'
                    }
                />
            )}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && Object.keys(data).length > 0 ? (
                    <div className="flex gap-x-5">
                        <TalentPoolIndustryProfileDetails
                            profile={data}
                            setView={setView}
                            getSectors={getSectors}
                        />
                        <div className="h-screen overflow-hidden w-full">
                            <div className="grid grid-cols-3 h-[inherit] w-full">
                                <div className="py-4 border-r h-[inherit]">
                                    <IndustryDocsFolders
                                        requiredDocsFolders={getFolders}
                                        selectedFolder={selectedFolder}
                                        onSelectFolder={onSelectFolder}
                                    />
                                </div>
                                <div className="col-span-2 h-[inherit]">
                                    <div className="h-[84%]">
                                        {/* <AssessmentFiles
                            selectedFolder={selectedFolder}
                            course={selectedCourse}
                            getAssessmentResponse={getRequiredDocsResponse}
                        /> */}
                                        {data?.status ===
                                            TalentPoolStatusEnum.Requested ||
                                        data?.status ===
                                            TalentPoolStatusEnum.Rejected ? (
                                            <div className="flex justify-center mx-10 items-center mt-[20%] border-2 border-dashed border-gray-300 px-8 py-20">
                                                <span className="text-gray-300 text-sm font-medium">
                                                    You can upload documents
                                                    only when you Accept the
                                                    industry request.
                                                </span>
                                            </div>
                                        ) : (
                                            <IndustryRequiredDocsFiles
                                                getRequiredDocsResponse={
                                                    getRequiredDocsResponse
                                                }
                                                selectedFolder={selectedFolder}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Card>
        </>
    )
}

RequiredDocsPage.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Upload Required Docs' }}>
            {page}
        </StudentLayout>
    )
}

export default RequiredDocsPage
