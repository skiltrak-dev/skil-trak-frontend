import React, { ReactElement, useEffect, useState } from 'react'
import { IndustryCard } from './components'
import {
    AuthorizedUserComponent,
    GlobalModal,
    NoData,
    Portal,
    Typography,
} from '@components'
import { Course, Student } from '@types'
import { getUserCredentials, WorkplaceCurrentStatus } from '@utils'
import { ViewMoreIndustriesModal } from '@partials/sub-admin/workplace/modals'
import { useContextBar, useNotification } from '@hooks'
import { AddIndustryCB } from '@partials/sub-admin/workplace/contextBar'
import { Actions } from './Actions'
import { StudentProvidedActions } from './StudentProvidedActions'
import { StudentProvidedABNActions } from './StudentProvidedABNActions'
import { AgreementView } from '../AgreementView'
import { ViewOnMapIndustriesModal } from '@partials/common/MapBox'
import {
    IWorkplaceIndustries,
    WorkplaceWorkIndustriesType,
} from 'redux/queryTypes'
import { UserRoles } from '@constants'
import { ViewContactedIndustryModal } from '../../modals'
import { AvailabelMeetingDate } from '@partials/student/workplace/components/WorkplaceApproval/AvailabelMeetingDate'

export const IndustryDetail = ({
    course,
    workplace,
    appliedIndustry,
    approvalDate,
}: {
    approvalDate: string
    course: Course
    workplace: IWorkplaceIndustries
    appliedIndustry: WorkplaceWorkIndustriesType
}) => {
    const contextBar = useContextBar()
    const { notification } = useNotification()
    const [showMap, setShowMap] = useState<boolean>(false)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const suggestedIndustries = workplace?.industries?.filter(
        (i: any) => !i.applied
    )

    const onCancelClicked = () => setModal(null)

    // const onViewMoreIndustries = () => {
    //     setModal(
    //         <ViewMoreIndustriesModal
    //             onCancel={onCancelClicked}
    //             workplaceId={Number(workplace?.id)}
    //             title={'View More Industries'}
    //             subtitle={'View More Industries'}
    //             suggestedIndustriesIds={
    //                 suggestedIndustries
    //                     ?.filter(
    //                         (industry: any) =>
    //                             industry?.industryResponse !==
    //                                 WorkplaceCurrentStatus.Rejected &&
    //                             industry?.industryResponse !==
    //                                 WorkplaceCurrentStatus.NoResponse
    //                     )
    //                     ?.map((ind: any) => ind?.industry?.id) as number[]
    //             }
    //         />
    //     )
    // }

    const onViewContactedIndustries = () => {
        setModal(<ViewContactedIndustryModal onCancel={onCancelClicked} />)
    }

    const onViewOnMap = () => {
        setModal(
            <div
                className={`bg-[#00000050] ${
                    contextBar.isVisible ? 'w-[calc(100%-321px)]' : 'w-full'
                } h-screen flex items-center justify-center fixed top-0 left-0 px-2 z-40`}
            >
                <div
                    className="bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full md:w-auto md:min-w-[450px]"
                    style={{ zIndex: 111 }}
                >
                    <ViewOnMapIndustriesModal
                        workplace={workplace}
                        courseId={course?.id}
                        onCancel={onCancelClicked}
                        appliedIndustry={appliedIndustry}
                        suggestedIndustries={suggestedIndustries}
                    />
                </div>
            </div>
        )
    }
    // useEffect(() => {
    //     if (appliedIndustry && suggestedIndustries?.length) {
    //         onCancelClicked()
    //     }
    // }, [appliedIndustry, suggestedIndustries])

    console.log({
        appliedIndustry:
            !appliedIndustry &&
            !workplace?.byExistingAbn &&
            !workplace?.studentProvidedWorkplace &&
            role !== UserRoles.RTO,
        workplace,
    })

    return (
        <>
            {modal}
            <div className="h-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-between w-full">
                        <Typography variant="small" capitalize semibold>
                            Industry Detail
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-3">
                        {appliedIndustry?.AgreementSigned && (
                            <AgreementView workplace={workplace} />
                        )}
                        <Typography variant={'small'} color={'text-info'}>
                            <span
                                className="font-semibold cursor-pointer whitespace-pre"
                                onClick={() => {
                                    if (!appliedIndustry) {
                                        onViewContactedIndustries()
                                    } else {
                                        notification.warning({
                                            title: 'Already Applied',
                                            description:
                                                'Student have already applied to industry',
                                        })
                                    }
                                }}
                            >
                                View Contacted Industry
                            </span>
                        </Typography>
                        {!appliedIndustry &&
                        !workplace?.byExistingAbn &&
                        !workplace?.studentProvidedWorkplace &&
                        role !== UserRoles.RTO ? (
                            <>
                                {/* <Typography
                                    variant={'small'}
                                    color={'text-info'}
                                >
                                    <span
                                        className="font-semibold cursor-pointer whitespace-pre"
                                        onClick={() => {
                                            if (!appliedIndustry) {
                                                onViewMoreIndustries()
                                            } else {
                                                notification.warning({
                                                    title: 'Already Applied',
                                                    description:
                                                        'Student have already applied to industry',
                                                })
                                            }
                                        }}
                                    >
                                        View More Industry
                                    </span>
                                </Typography> */}
                                {process.env.NODE_ENV === 'development' ? (
                                    <Typography
                                        variant={'small'}
                                        color={'text-info'}
                                    >
                                        <span
                                            className="font-semibold cursor-pointer whitespace-pre"
                                            onClick={() => {
                                                if (!appliedIndustry) {
                                                    contextBar.setContent(
                                                        <AddIndustryCB
                                                            studentId={
                                                                workplace
                                                                    ?.student
                                                                    ?.id
                                                            }
                                                            workplaceId={
                                                                workplace?.id
                                                            }
                                                            courseId={
                                                                course?.id
                                                            }
                                                        />
                                                    )
                                                    contextBar.show()
                                                } else {
                                                    notification.warning({
                                                        title: 'Already Applied',
                                                        description:
                                                            'Student have already applied to industry',
                                                    })
                                                }
                                            }}
                                        >
                                            + Add Industry
                                        </span>
                                    </Typography>
                                ) : null}
                                {/* <button
                                    onClick={onViewOnMap}
                                    className="text-blue-500 underline text-sm whitespace-nowrap"
                                >
                                    VIEW ON MAP
                                </button> */}
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="h-48 overflow-auto custom-scrollbar flex flex-col gap-y-2 border border-[#6B7280] rounded-md  mt-2.5">
                    {!appliedIndustry ? (
                        // <div onClick={onViewOnMap}>

                        //     <ViewOnMapIndustriesModal
                        //         suggestedIndustries={suggestedIndustries}
                        //         onCancel={onCancelClicked}
                        //         workplace={workplace}
                        //         courseId={course?.id}
                        //     />
                        // </div>
                        // <button
                        //     onClick={onViewOnMap}
                        //     className="text-blue-500 underline text-sm whitespace-nowrap"
                        // >
                        //     VIEW ON MAP
                        // </button>
                        <div className="relative w-full h-full">
                            {!showMap ? (
                                <div className="px-4 absolute top-0 left-0 w-full h-full bg-[#00000095] flex flex-col gap-y-1.5 justify-center">
                                    <AuthorizedUserComponent
                                        excludeRoles={[
                                            UserRoles.OBSERVER,
                                            UserRoles.RTO,
                                        ]}
                                    >
                                        <Typography
                                            variant="small"
                                            color={'text-white'}
                                            center
                                        >
                                            Click here to view nearby industries
                                            on the map, facilitating your search
                                            for potential workplaces to apply
                                            for student.
                                        </Typography>
                                    </AuthorizedUserComponent>
                                    <AuthorizedUserComponent
                                        roles={[
                                            UserRoles.OBSERVER,
                                            UserRoles.RTO,
                                        ]}
                                    >
                                        <Typography
                                            variant="small"
                                            color={'text-white'}
                                            center
                                        >
                                            Skiltrak coordinators are actively
                                            working to find the best suitable
                                            workplace for student. Thank you
                                            for your patience!
                                        </Typography>{' '}
                                    </AuthorizedUserComponent>
                                    <AuthorizedUserComponent
                                        excludeRoles={[
                                            UserRoles.OBSERVER,
                                            UserRoles.RTO,
                                        ]}
                                    >
                                        <p
                                            className={
                                                'underline text-white text-center text-[15px] cursor-pointer'
                                            }
                                            onClick={() => {
                                                onViewOnMap()
                                            }}
                                        >
                                            VIEW MAP
                                        </p>
                                    </AuthorizedUserComponent>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div className="p-2.5">
                            {!workplace?.industries?.length ? (
                                <NoData text="No Industries were found!" />
                            ) : (
                                ''
                            )}
                            {appliedIndustry && (
                                <>
                                    <IndustryCard
                                        industry={appliedIndustry}
                                        workplace={workplace}
                                        applied
                                        courseId={course?.id}
                                    />
                                    {/*  */}
                                    <AuthorizedUserComponent
                                        excludeRoles={[UserRoles.OBSERVER]}
                                    >
                                        {workplace.studentProvidedWorkplace ? (
                                            <StudentProvidedActions
                                                workplace={workplace}
                                                student={
                                                    workplace?.student as Student
                                                }
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                                courses={
                                                    workplace?.courses as Course[]
                                                }
                                            />
                                        ) : workplace?.byExistingAbn ? (
                                            <StudentProvidedABNActions
                                                workplace={workplace}
                                                student={
                                                    workplace?.student as Student
                                                }
                                                courses={
                                                    workplace?.courses as Course[]
                                                }
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                            />
                                        ) : (
                                            <Actions
                                                appliedIndustry={
                                                    appliedIndustry
                                                }
                                                currentStatus={
                                                    workplace?.currentStatus
                                                }
                                                student={
                                                    workplace?.student as Student
                                                }
                                                courses={
                                                    workplace?.courses as Course[]
                                                }
                                                workplace={workplace}
                                            />
                                        )}
                                    </AuthorizedUserComponent>
                                    {approvalDate ? (
                                        <div className="mt-3 w-fit">
                                            <Typography variant="small" medium>
                                                Accepted Date
                                            </Typography>
                                            <AvailabelMeetingDate
                                                date={approvalDate}
                                            />
                                        </div>
                                    ) : null}
                                </>
                            )}

                            {suggestedIndustries?.map(
                                (industry: any, index: number) => (
                                    <IndustryCard
                                        key={industry?.id}
                                        industry={industry}
                                        workplace={workplace}
                                        courseId={course?.id}
                                        appliedIndustry={appliedIndustry}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
