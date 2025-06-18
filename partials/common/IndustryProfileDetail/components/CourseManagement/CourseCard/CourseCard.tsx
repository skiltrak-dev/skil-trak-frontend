import { AuthorizedUserComponent, Button, Typography } from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { ellipsisText } from '@utils'
import { marked } from 'marked'
import { useMemo } from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

import {
    AddContentForOldIndustry,
    DeleteIndustryCourse,
    EditIndustryCourseContent,
    IndustryCourseSupervisors,
    UploadCourseFile,
} from '../components'
import {
    getCleanExternalUrl,
    groupCoursesBySector,
    groupDirectCoursesBySector,
    isValidUrl,
} from '../functions'

export const CourseCard = ({
    data,
    industry,
    isPreviousCourses = false,
}: any) => {
    const approvals = useMemo(
        () =>
            isPreviousCourses
                ? data?.courses || []
                : data?.industryCourseApprovals || [],
        [data, isPreviousCourses]
    )
    const { notification } = useNotification()
    const [confirmContent, confirmContentResult] =
        SubAdminApi.Industry.useConfirmCourseDescription()
    const onConfirmContent = (courseId: string) => {
        confirmContent(courseId).then((res: any) => {
            if (res.data) {
                notification.success({
                    title: 'Content Confirmed',
                    description:
                        'Course content has been confirmed successfully.',
                })
            } else {
                notification.error({
                    title: 'Error',
                    description:
                        res?.error?.data?.message || 'Something went wrong',
                })
            }
        })
    }

    // Execute the grouping
    const sectorsData = groupCoursesBySector(approvals)

    const groupedCourseData = groupDirectCoursesBySector(approvals)

    const allSectors = isPreviousCourses ? groupedCourseData : sectorsData

    return (
        <div className="flex flex-col gap-y-2">
            {allSectors?.map((sectorData: any) => (
                <div className="flex flex-col  mt-4 bg-gray-100 p-2 rounded border-2 border-dashed border-gray-400">
                    <div className="p-4 bg-gray-50 flex items-center gap-x-2 justify-between">
                        <div className="flex items-center gap-x-2">
                            <Typography variant="subtitle">
                                {sectorData?.sector?.name}
                            </Typography>
                            {!isPreviousCourses && (
                                <span className="p-1 bg-green-100 border border-green-200 text-green-700 rounded-md text-[9px] font-medium">
                                    Approved
                                </span>
                            )}
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                {!isPreviousCourses && sectorData?.actionBy && (
                                    <div className="flex gap-x-1">
                                        <Typography
                                            variant="xxs"
                                            color="text-emerald-500"
                                        >
                                            Approved by:{' '}
                                            {ellipsisText(
                                                sectorData?.actionBy?.name,
                                                5
                                            )}
                                        </Typography>
                                    </div>
                                )}
                            </AuthorizedUserComponent>
                        </div>
                        <IndustryCourseSupervisors
                            industry={industry}
                            sectorData={sectorData}
                        />
                    </div>

                    <div className="flex flex-col gap-y-3">
                        {[...sectorData?.courses]?.map((approval: any) => {
                            const rawText = approval?.description || ''
                            const parsedHtml = marked.parse(rawText)
                            return (
                                <div
                                    key={approval.id}
                                    className="overflow-auto custom-scrollbar"
                                >
                                    <div className="p-4 border rounded-md bg-[#95C6FB26] bg-opacity-15">
                                        <div className="flex justify-between gap-x-12 w-full items-center mb-4">
                                            <div className="flex items-center gap-x-1">
                                                <Typography
                                                    variant="small"
                                                    color="text-gray-600"
                                                >
                                                    COURSES -{' '}
                                                </Typography>

                                                <Typography variant="muted">
                                                    {approval?.course?.title ??
                                                        approval?.title}{' '}
                                                    -{' '}
                                                    {approval?.course?.code ??
                                                        approval?.code}
                                                </Typography>
                                            </div>
                                            <div>
                                                <div className="text-right ">
                                                    <Typography
                                                        variant="small"
                                                        color="text-gray-600"
                                                        whiteSpacePre
                                                    >
                                                        Course Hours
                                                    </Typography>
                                                    <Typography
                                                        variant="muted"
                                                        center
                                                    >
                                                        {approval?.course
                                                            ?.hours ??
                                                            approval?.hours}
                                                    </Typography>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-x-2">
                                                {!isPreviousCourses && (
                                                    <>
                                                        {!approval?.isContentVerified && (
                                                            <AuthorizedUserComponent
                                                                roles={[
                                                                    UserRoles.ADMIN,
                                                                ]}
                                                                isHod
                                                                isAssociatedWithRto={
                                                                    false
                                                                }
                                                            >
                                                                <Button
                                                                    onClick={() => {
                                                                        onConfirmContent(
                                                                            approval?.id
                                                                        )
                                                                    }}
                                                                    text="Confirm"
                                                                    disabled={
                                                                        confirmContentResult.isLoading
                                                                    }
                                                                    loading={
                                                                        confirmContentResult.isLoading
                                                                    }
                                                                    variant="error"
                                                                    outline
                                                                />
                                                            </AuthorizedUserComponent>
                                                        )}
                                                        <>
                                                            <UploadCourseFile
                                                                approval={
                                                                    approval
                                                                }
                                                            />
                                                            <EditIndustryCourseContent
                                                                approval={
                                                                    approval
                                                                }
                                                            />
                                                        </>
                                                        <AuthorizedUserComponent
                                                            roles={[
                                                                UserRoles.ADMIN,
                                                            ]}
                                                            isHod
                                                            isAssociatedWithRto={
                                                                false
                                                            }
                                                        >
                                                            <DeleteIndustryCourse
                                                                approval={
                                                                    approval
                                                                }
                                                            />
                                                        </AuthorizedUserComponent>
                                                    </>
                                                )}
                                                {isPreviousCourses && (
                                                    <AddContentForOldIndustry
                                                        id={approval?.id}
                                                    />
                                                )}
                                            </div>

                                            {!isPreviousCourses &&
                                                !approval?.isPreviousCourse &&
                                                approval?.isCoordinatorAdded && (
                                                    <div>
                                                        <IoCheckmarkDoneOutline
                                                            size={25}
                                                            className="text-emerald-500"
                                                        />
                                                    </div>
                                                )}
                                        </div>
                                        <div
                                            className={`${
                                                isPreviousCourses
                                                    ? 'bg-red-500'
                                                    : 'bg-emerald-700'
                                            } relative text-white p-4 rounded-md w-full mb-4 flex gap-x-5 items-start max-h-56 overflow-auto custom-scrollbar`}
                                        >
                                            <div>
                                                {/* <Typography variant="label" color="white">
                                        Description
                                    </Typography> */}

                                                <div className="w-full min-w-80">
                                                    <div
                                                        className="w-full customTailwingStyles-inline-style customTailwingStyles text-xs text-white !bg-transparent leading-relaxed"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                parsedHtml ||
                                                                'No description available',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-[10px]">
                                            <AuthorizedUserComponent
                                                roles={[
                                                    UserRoles.SUBADMIN,
                                                    UserRoles.ADMIN,
                                                ]}
                                                isAssociatedWithRto={false}
                                            >
                                                <div>
                                                    <span className="text-gray-600">
                                                        Requested by:{' '}
                                                    </span>
                                                    <span>
                                                        {approval?.addedBy
                                                            ?.name || 'N/A'}
                                                    </span>
                                                </div>
                                            </AuthorizedUserComponent>
                                            {/* <div>
                                <span className="text-gray-600">
                                    Reference URL:{' '}
                                </span>
                                <span>{approval?.reference?.[0] || 'N/A'}</span>
                            </div> */}
                                            <div>
                                                <span className="text-gray-600">
                                                    Reference URL:{' '}
                                                </span>

                                                {isValidUrl(
                                                    approval?.reference?.[0]
                                                ) ? (
                                                    <a
                                                        href={getCleanExternalUrl(
                                                            approval
                                                                ?.reference?.[0]
                                                        )}
                                                        className="text-blue-500 hover:underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {getCleanExternalUrl(
                                                            approval
                                                                ?.reference?.[0]
                                                        ) || 'N/A'}
                                                    </a>
                                                ) : (
                                                    <span>
                                                        {approval
                                                            ?.reference?.[0] ??
                                                            'N/A'}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">
                                                    DATE:{' '}
                                                </span>
                                                <span>
                                                    {approval?.updatedAt
                                                        ? approval?.updatedAt?.slice(
                                                              0,
                                                              10
                                                          )
                                                        : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <>
            {/* <ShowErrorNotifications result={confirmContentResult} />  */}
            <div className="flex flex-col gap-4 mt-4">
                {[...approvals]?.map((approval: any) => {
                    const rawText = approval?.description || ''
                    const parsedHtml = marked.parse(rawText)
                    return (
                        <div
                            key={approval.id}
                            className="overflow-auto custom-scrollbar"
                        >
                            <div className="p-4 bg-gray-50 flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <Typography variant="subtitle">
                                        {approval?.course?.sector?.name ??
                                            approval?.sector?.name}
                                    </Typography>
                                    {!isPreviousCourses && (
                                        <span className="p-1 bg-green-100 border border-green-200 text-green-700 rounded-md text-[9px] font-medium">
                                            Approved
                                        </span>
                                    )}
                                    <AuthorizedUserComponent
                                        roles={[
                                            UserRoles.ADMIN,
                                            UserRoles.SUBADMIN,
                                        ]}
                                    >
                                        {!isPreviousCourses &&
                                            approval?.actionBy && (
                                                <div className="flex gap-x-1">
                                                    <Typography
                                                        variant="xxs"
                                                        color="text-emerald-500"
                                                    >
                                                        Approved by:{' '}
                                                        {ellipsisText(
                                                            approval?.actionBy
                                                                ?.name,
                                                            5
                                                        )}
                                                    </Typography>
                                                </div>
                                            )}
                                    </AuthorizedUserComponent>
                                </div>
                                {/* {!isPreviousCourses && ( */}
                                <div className="flex items-center gap-x-2">
                                    {!isPreviousCourses && (
                                        <>
                                            {!approval?.isContentVerified && (
                                                <AuthorizedUserComponent
                                                    roles={[
                                                        UserRoles.ADMIN,
                                                        UserRoles.SUBADMIN,
                                                    ]}
                                                    isAssociatedWithRto={false}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            onConfirmContent(
                                                                approval?.id
                                                            )
                                                        }}
                                                        text="Confirm"
                                                        disabled={
                                                            confirmContentResult.isLoading
                                                        }
                                                        loading={
                                                            confirmContentResult.isLoading
                                                        }
                                                        variant="error"
                                                        outline
                                                    />
                                                </AuthorizedUserComponent>
                                            )}
                                            <>
                                                <UploadCourseFile
                                                    approval={approval}
                                                />
                                                <EditIndustryCourseContent
                                                    approval={approval}
                                                />
                                            </>
                                            <DeleteIndustryCourse
                                                approval={approval}
                                            />
                                        </>
                                    )}
                                    {isPreviousCourses && (
                                        <AddContentForOldIndustry
                                            id={approval?.id}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="p-4 border rounded-md bg-[#95C6FB26] bg-opacity-15">
                                <div className="flex justify-between gap-x-12 w-full items-center mb-4">
                                    <div className="flex items-center gap-x-1">
                                        <Typography
                                            variant="small"
                                            color="text-gray-600"
                                        >
                                            COURSES -{' '}
                                        </Typography>

                                        <Typography variant="muted">
                                            {approval?.course?.title ??
                                                approval?.title}{' '}
                                            -{' '}
                                            {approval?.course?.code ??
                                                approval?.code}
                                        </Typography>
                                    </div>
                                    <div>
                                        <div className="text-right">
                                            <Typography
                                                variant="small"
                                                color="text-gray-600"
                                            >
                                                Course Hours
                                            </Typography>
                                            <Typography variant="muted" center>
                                                {approval?.course?.hours ??
                                                    approval?.hours}
                                            </Typography>
                                        </div>
                                    </div>

                                    {!isPreviousCourses &&
                                        !approval?.isPreviousCourse &&
                                        approval?.isCoordinatorAdded && (
                                            <div>
                                                <IoCheckmarkDoneOutline
                                                    size={25}
                                                    className="text-emerald-500"
                                                />
                                            </div>
                                        )}
                                </div>
                                <div
                                    className={`${
                                        isPreviousCourses
                                            ? 'bg-red-500'
                                            : 'bg-emerald-700'
                                    } relative text-white p-4 rounded-md w-full mb-4 flex gap-x-5 items-start max-h-56 overflow-auto custom-scrollbar`}
                                >
                                    <div>
                                        {/* <Typography variant="label" color="white">
                                        Description
                                    </Typography> */}

                                        <div className="w-full min-w-80">
                                            <div
                                                className="w-full customTailwingStyles-inline-style customTailwingStyles text-xs text-white !bg-transparent leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        parsedHtml ||
                                                        'No description available',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-[10px]">
                                    <AuthorizedUserComponent
                                        roles={[
                                            UserRoles.SUBADMIN,
                                            UserRoles.ADMIN,
                                        ]}
                                        isAssociatedWithRto={false}
                                    >
                                        <div>
                                            <span className="text-gray-600">
                                                Requested by:{' '}
                                            </span>
                                            <span>
                                                {approval?.addedBy?.name ||
                                                    'N/A'}
                                            </span>
                                        </div>
                                    </AuthorizedUserComponent>
                                    {/* <div>
                                <span className="text-gray-600">
                                    Reference URL:{' '}
                                </span>
                                <span>{approval?.reference?.[0] || 'N/A'}</span>
                            </div> */}
                                    <div>
                                        <span className="text-gray-600">
                                            Reference URL:{' '}
                                        </span>

                                        {isValidUrl(
                                            approval?.reference?.[0]
                                        ) ? (
                                            <a
                                                href={getCleanExternalUrl(
                                                    approval?.reference?.[0]
                                                )}
                                                className="text-blue-500 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {getCleanExternalUrl(
                                                    approval?.reference?.[0]
                                                ) || 'N/A'}
                                            </a>
                                        ) : (
                                            <span>
                                                {approval?.reference?.[0] ??
                                                    'N/A'}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-gray-600">
                                            DATE:{' '}
                                        </span>
                                        <span>
                                            {approval?.updatedAt
                                                ? approval?.updatedAt?.slice(
                                                      0,
                                                      10
                                                  )
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
