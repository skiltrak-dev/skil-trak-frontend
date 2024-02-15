import { Button, Card, LoadingAnimation, Typography } from '@components'
import React, { ReactElement, useEffect, useState } from 'react'
import {
    IndustryStatus,
    ViewAvailability,
    WorkplaceCoordinators,
    WorkplaceHistory,
    WorkplaceStatusView,
    WorkplaceTab,
} from './components'
import {
    useGetSubAdminStudentWorkplaceDetailQuery,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'
import { IndustryDetail } from './components/IndustryDetail'

export const Workplace = ({ studentId }: { studentId: number }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [active, setActive] = useState<number>(0)
    const [selectedWorkplace, setSelectedWorkplace] = useState<any>(null)

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
            workplaceId: Number(studentWorkplace?.data?.id),
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
            setSelectedWorkplace(studentWorkplace?.data?.[0])
        }
    }, [studentWorkplace])

    console.log({ selectedWorkplace, studentWorkplace })

    return (
        <>
            {modal}
            <Card noPadding fullHeight>
                <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                    <Typography variant="label" semibold>
                        Workplace
                    </Typography>
                    <Button>Add Workplace</Button>
                </div>

                {studentWorkplace?.data &&
                    studentWorkplace?.data?.length > 1 && (
                        <div className="border-b border-secondary-dark p-4 flex items-center gap-x-2.5 cursor-pointer">
                            {studentWorkplace?.data?.map(
                                (workplace: any, i: number) => (
                                    <WorkplaceTab
                                        index={i}
                                        key={workplace.id}
                                        active={active === i}
                                        onClick={() => {
                                            setActive(i)
                                        }}
                                    />
                                )
                            )}
                        </div>
                    )}

                {/*  */}
                {studentWorkplace?.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Notes Loading...
                        </Typography>
                    </div>
                ) : (
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
                        <div className="p-4 grid grid-cols-10 gap-x-3 h-60 overflow-hidden">
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
                    </div>
                )}
            </Card>
        </>
    )
}
