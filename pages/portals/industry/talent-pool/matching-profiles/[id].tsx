import { ReactElement, useEffect, useState, useCallback } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
    HireModal,
    SkillsTag,
    TalentPoolStudentProfileDetail,
} from '@partials/industry/talentPool'
import { useRouter } from 'next/router'
import { IndustryApi, StudentApi } from '@queries'
import {
    Button,
    Card,
    TechnicalError,
    Typography,
    LoadingAnimation,
} from '@components'
import {
    IndustryDocsFolders,
    IndustryRequiredDocsFiles,
    TalentPoolNotification,
} from '@partials/common/TalentPool'
import { isBrowser } from '@utils'
import Link from 'next/link'
import { useNotification } from '@hooks'
// import { AssessmentSubmissions } from '@partials/common'

const MatchingProfileDetail: NextPageWithLayout = () => {
    const [selectedFolder, setSelectedFolder] = useState<any>(null)
    const { notification } = useNotification()
    const [view, setView] = useState<boolean>(false)
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const profileId = router.query.id as string
    const { data, isLoading, isError, isSuccess, isFetching } =
        IndustryApi.TalentPool.useMatchingProfileDetail(profileId, {
            skip: !profileId,
        })
    const getRequiredDocsResponse =
        StudentApi.TalentPool.useRequiredDocsResponse(selectedFolder?.id, {
            skip: !selectedFolder?.id,
        })
    const [isMouseMove, setIsMouseMove] = useState<any>(null)
    const [onChangeStatus, changeStatusResult] =
        StudentApi.TalentPool.useIndustryRequestStatus()

    // const profile = useGetSubAdminStudentDetailQuery(Number(data?.student?.id), {
    //     skip: !data?.student?.id,
    //     refetchOnMountOrArgChange: true,
    // })

    // useEffect(() => {
    //     window.addEventListener('mousemove', () => setIsMouseMove(true))

    //     return () => {
    //         window.removeEventListener('mousemove', () => setIsMouseMove(false))
    //         contextBar.hide()
    //         contextBar.setContent(null)
    //     }
    // }, [])
    const getFolders =
        data?.connectionRequests?.[0]?.talentPoolRequiredDocuments

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

    useEffect(() => {
        if (view && isBrowser()) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [view])
    useEffect(() => {
        const timeout: any = setTimeout(() => {
            setView(false)
        }, 8000)

        return () => clearTimeout(timeout)
    }, [view])
    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAcceptClicked = (student: any) => {
        setModal(
            <HireModal
                industry={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.success({
                title: 'Student Hired',
                description: 'Student hired Successfully',
            })
        } else if (changeStatusResult.isError) {
            notification.error({
                title: 'Student Hired Failed',
                description: 'Student Hired Failed. Please try again',
            })
        }
    }, [changeStatusResult])
    const connectionStatus =
        data?.connectionRequests &&
        data.connectionRequests?.length > 0 &&
        data?.connectionRequests?.[0]?.status
    return (
        <>
            {modal && modal}
            {view && (
                <TalentPoolNotification
                    setViewNotification={() => setView(false)}
                    text={
                        'You can view profile and details of student only when student accept your request'
                    }
                />
            )}
            {isError && <TechnicalError />}
            {connectionStatus === 'connected' &&
                getRequiredDocsResponse?.data &&
                getRequiredDocsResponse?.data?.length > 0 && (
                    <div className="flex justify-end mb-5">
                        <div className="flex items-center gap-x-2.5">
                            <Link
                                className="px-4 py-1.5 bg-[#6971DD] text-white text-sm uppercase font-medium rounded-md"
                                href={'/portals/industry/students/appointments'}
                            >
                                Book Appointment
                            </Link>
                            {connectionStatus !== 'hired' && (
                                <Button
                                    text="Hire Student"
                                    onClick={() => onAcceptClicked(data)}
                                    loading={changeStatusResult.isLoading}
                                    disabled={changeStatusResult.isLoading}
                                />
                            )}
                        </div>
                    </div>
                )}
            {isLoading || isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data && Object.keys(data).length ? (
                <Card noPadding>
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="md:w-1/3">
                            <TalentPoolStudentProfileDetail
                                setView={setView}
                                profile={data}
                            />
                        </div>
                        <div className="md:w-2/3">
                            <div className="flex flex-col gap-y-6 p-5">
                                <div>
                                    <Typography variant="label">
                                        About
                                    </Typography>
                                    <Typography variant="small">
                                        {data?.about}
                                    </Typography>
                                </div>
                                <div className="bg-[#E6E6E6] w-full h-[1px]"></div>
                                <div className="flex w-full">
                                    <div>
                                        <SkillsTag
                                            tags={data?.skills}
                                            title={'Skill & Talent'}
                                        />
                                        <div className="bg-[#E6E6E6] w-full h-[1px] my-4"></div>
                                        <SkillsTag
                                            tags={data?.socialLinks}
                                            title={'Portfolio/Links'}
                                        />
                                    </div>
                                    <div className="bg-[#E6E6E6] w-[1px] my-auto h-28 mx-9"></div>

                                    <div>
                                        <SkillsTag
                                            tags={data?.interest}
                                            title={'Area of Interest'}
                                        />
                                        <div className="bg-[#E6E6E6] w-full h-[1px] my-4"></div>
                                    </div>
                                </div>
                                {/* <div className="bg-[#E6E6E6] w-full h-[1px]"></div> */}
                            </div>
                            {getFolders && getFolders?.length > 0 && (
                                <div className="h-[350px] border-t border-secondary-dark overflow-hidden w-full ">
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
                                                <IndustryRequiredDocsFiles
                                                    getRequiredDocsResponse={
                                                        getRequiredDocsResponse
                                                    }
                                                    selectedFolder={
                                                        selectedFolder
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            ) : null}
        </>
    )
}

MatchingProfileDetail.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default MatchingProfileDetail
