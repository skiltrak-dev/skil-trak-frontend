import {
    Card,
    EmptyData,
    Typography,
    TechnicalError,
    LoadingAnimation,
    AuthorizedUserComponent,
    ActionButton,
} from '@components'
import { UserRoles } from '@constants'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'
import {
    useGetWorkplaceFoldersQuery,
    useGetSubAdminStudentWorkplaceDetailQuery,
} from '@queries'
import moment from 'moment'
import { ReactElement, useEffect, useState } from 'react'
import {
    WorkplaceTab,
    IndustryStatus,
    ViewAvailability,
    WorkplaceHistory,
    AddWorkplaceAction,
    WorkplaceStatusView,
    WorkplaceCoordinators,
} from './components'
import { IndustryDetail } from './components/IndustryDetail'
import { AddSecondWPCB } from '@partials/sub-admin/students/contextBar'
import { useContextBar } from '@hooks'

export const Workplace = ({
    studentId,
    studentUserId,
}: {
    studentUserId: number
    studentId: number
}) => {
    const [selectedWorkplace, setSelectedWorkplace] = useState<any>(null)

    const contextBar = useContextBar()

    const studentWorkplace = useGetSubAdminStudentWorkplaceDetailQuery(
        studentId,
        {
            skip: !studentId,
        }
    )

    const appliedIndustry = selectedWorkplace?.industries?.find(
        (i: any) => i.applied
    )

    const course = selectedWorkplace?.courses?.find((c: any) => c)

    const workplaceFolders = useGetWorkplaceFoldersQuery(
        {
            workplaceId: Number(selectedWorkplace?.id),
            appliedIndustryId: appliedIndustry?.industry?.id,
            courseId: course?.id,
        },
        { skip: !studentWorkplace || !appliedIndustry || !course }
    )

    const folders = GetFolders(workplaceFolders)

    useEffect(() => {
        if (
            studentWorkplace?.data &&
            studentWorkplace?.isSuccess &&
            studentWorkplace?.data?.length > 0
        ) {
            setSelectedWorkplace(
                selectedWorkplace
                    ? studentWorkplace?.data?.find(
                          (w: any) => w?.id === selectedWorkplace?.id
                      )
                    : studentWorkplace?.data?.[0]
            )
        }
    }, [studentWorkplace])

    console.log({ selectedWorkplace })

    return (
        <>
            <Card noPadding fullHeight>
                <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                    <Typography variant="label" semibold>
                        Workplace
                    </Typography>
                    {studentWorkplace?.data &&
                    studentWorkplace?.data?.length === 1 ? (
                        <div className="whitespace-pre">
                            <ActionButton
                                variant={'link'}
                                onClick={() => {
                                    contextBar.setContent(
                                        <AddSecondWPCB
                                            studentId={studentId}
                                            studentUserId={studentUserId}
                                        />
                                    )
                                    contextBar.show(false)
                                }}
                            >
                                Add Second
                            </ActionButton>
                        </div>
                    ) : studentWorkplace?.data?.length === 0 ? (
                        <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                            <AddWorkplaceAction id={studentId} />
                        </AuthorizedUserComponent>
                    ) : null}
                </div>

                {studentWorkplace?.data &&
                    studentWorkplace?.data?.length > 1 && (
                        <div className="border-b border-secondary-dark p-4 flex items-center gap-x-2.5 cursor-pointer">
                            {studentWorkplace?.data?.map(
                                (workplace: any, i: number) => (
                                    <WorkplaceTab
                                        index={i}
                                        key={workplace.id}
                                        active={
                                            selectedWorkplace?.id ===
                                            workplace?.id
                                        }
                                        onClick={() => {
                                            setSelectedWorkplace(workplace)
                                        }}
                                    />
                                )
                            )}
                        </div>
                    )}

                {/*  */}
                {studentWorkplace.isError ? (
                    <TechnicalError description={false} />
                ) : (
                    ''
                )}
                {studentWorkplace?.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Workplace Loading...
                        </Typography>
                    </div>
                ) : studentWorkplace?.data &&
                  studentWorkplace?.data?.length > 0 ? (
                    <div>
                        <div className="py-2.5 px-4 border-b border-secondary-dark flex justify-between gap-x-4">
                            <IndustryStatus
                                folders={folders}
                                workplace={selectedWorkplace}
                                appliedIndustry={appliedIndustry}
                            />
                            <div className="w-full">
                                <div className="flex justify-end gap-x-1 divide-x-2 mb-1">
                                    <WorkplaceHistory />
                                    <div className="pl-1">
                                        <ViewAvailability
                                            availability={
                                                selectedWorkplace?.generalAvailability
                                            }
                                        />
                                    </div>
                                </div>
                                <WorkplaceStatusView
                                    currentStatus={
                                        selectedWorkplace?.currentStatus
                                    }
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className="p-4 grid grid-cols-10 gap-x-3 h-64 border-b border-secondary-dark">
                            <div className="col-span-3 h-full">
                                <WorkplaceCoordinators
                                    appliedIndustryId={appliedIndustry?.id}
                                    workplace={selectedWorkplace}
                                />
                            </div>
                            <div className="col-span-7 h-full">
                                <IndustryDetail
                                    workplace={selectedWorkplace}
                                    appliedIndustry={appliedIndustry}
                                    course={course}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end items-center p-4">
                            <Typography variant="small" medium>
                                Recieved On:{' '}
                                {moment(selectedWorkplace?.createdAt).format(
                                    'Do MMM, YYYY'
                                )}
                            </Typography>
                        </div>
                    </div>
                ) : (
                    studentWorkplace?.isSuccess && (
                        <EmptyData
                            imageUrl={'/images/workplace/icon.png'}
                            title="No Workplace Found"
                            description="Add a workplace to view workplace here"
                            height="40vh"
                        />
                    )
                )}
            </Card>
        </>
    )
}
