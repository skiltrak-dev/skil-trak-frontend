import { Card } from '@components'
import { StudentLayout } from '@layouts'
import {
    IndustryDocsFolders,
    IndustryRequiredDocsFiles,
} from '@partials/common/TalentPool'
import { TalentPoolIndustryProfileDetails } from '@partials/student/talentPool'
import { StudentApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState, useEffect, useCallback } from 'react'

const RequiredDocsPage: NextPageWithLayout = () => {
    const [selectedFolder, setSelectedFolder] = useState<any>(null)
    const router = useRouter()
    const profileId = router.query.id as string
    const getRequiredDocsResponse =
        StudentApi.TalentPool.useRequiredDocsResponse(selectedFolder?.id, {
            skip: !selectedFolder?.id,
        })
    const { data, isSuccess, isLoading, isError } =
        StudentApi.TalentPool.useAcceptedTalentPoolIndustryProfile(profileId, {
            skip: !profileId,
        })

    const getFolders = data?.talentPoolRequiredDocuments

    useEffect(() => {
        if (data && isSuccess && data?.length > 0) {
            const folder = getFolders?.find(
                (folder: any) => folder?.id === Number(selectedFolder?.id)
            )
            onSelectFolder(selectedFolder && folder ? folder : getFolders?.[0])
        }
    }, [data])

    const onSelectFolder = useCallback((data: any) => {
        setSelectedFolder(data)
    }, [])

    return (
        <Card noPadding>
            <div className="flex gap-x-5">
                <TalentPoolIndustryProfileDetails profile={data} />
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
                                <IndustryRequiredDocsFiles
                                    getRequiredDocsResponse={
                                        getRequiredDocsResponse
                                    }
                                    selectedFolder={selectedFolder}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
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
