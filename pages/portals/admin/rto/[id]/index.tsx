import {
    ActionButton,
    BackButton,
    Button,
    EmptyData,
    LoadingAnimation,
    RtoProfileSidebar,
    TechnicalError,
} from '@components'
import { useActionModal, useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import {
    FaArchive,
    FaBan,
    FaChevronDown,
    FaFileImport,
    FaUserGraduate,
} from 'react-icons/fa'

import { FigureCard } from '@components/sections/subAdmin'
import { PinnedNotes } from '@partials'
import { useActionModals } from '@partials/admin/rto/hooks/useActionModals'
import { DetailTabs } from '@partials/admin/rto/tabs'
import { AdminApi } from '@queries'

const RtoDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const {
        modal,
        onAcceptClicked,
        onRejectClicked,
        onArchiveClicked,
        onUnArchiveClicked,
        onUnblockClicked,
        onDeleteClicked,
        onBlockClicked,
    } = useActionModals()
    const { passwordModal, onViewPassword } = useActionModal()

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })
    const statisticsCount = AdminApi.Rtos.useStatisticsCount(
        Number(rto?.data?.user?.id),
        { skip: !rto?.data?.user?.id }
    )
    useEffect(() => {
        navBar.setTitle('RTO Detail')
        navBar.setSubTitle(rto?.data?.user?.name)
    }, [rto.data])

    useEffect(() => {
        if (rto.isSuccess) {
            contextBar.setContent(
                <RtoProfileSidebar
                    rto={rto}
                    loading={rto?.isLoading}
                    data={rto?.data}
                />
            )
            contextBar.show(false)
        }

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [rto.data])

    const [showDropDown, setShowDropDown] = useState(false)

    const statusBaseActions = () => {
        switch (rto.data?.user?.status) {
            case UserStatus.Pending:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            variant={'success'}
                            Icon={FaArchive}
                            onClick={() => onAcceptClicked(rto?.data)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onRejectClicked(rto?.data)}
                        >
                            Reject
                        </ActionButton>
                    </div>
                )
            case UserStatus.Approved:
                return (
                    <div className="flex gap-x-2">
                        <div className="flex items-center gap-x-3">
                            <div
                                className="relative"
                                onMouseEnter={() => setShowDropDown(true)}
                                onMouseLeave={() => setShowDropDown(false)}
                            >
                                <Button>
                                    <span
                                        id="add-students"
                                        className="flex items-center gap-x-2"
                                    >
                                        <span>Add Students</span>
                                        <FaChevronDown />
                                    </span>
                                </Button>

                                {showDropDown ? (
                                    <ul className="bg-white shadow-xl rounded-xl overflow-hidden absolute">
                                        <li>
                                            <button
                                                onClick={() => {
                                                    router.push(
                                                        `${rto?.data?.id}/student-list`
                                                    )
                                                }}
                                                className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                            >
                                                <span className="text-gray-500">
                                                    <FaFileImport />
                                                </span>
                                                <span className="whitespace-nowrap">
                                                    {' '}
                                                    Import Students
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    router.push(
                                                        `${rto?.data?.id}/add-individual-student`
                                                    )
                                                }}
                                                className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                                            >
                                                <span className="text-gray-500">
                                                    <FaUserGraduate />
                                                </span>
                                                <span> Add Individual</span>
                                            </button>
                                        </li>
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                        <Button variant="dark">Summary Report</Button>
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onArchiveClicked(rto?.data)}
                        >
                            Archive
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onBlockClicked(rto?.data)}
                        >
                            Block
                        </ActionButton>
                    </div>
                )
            case UserStatus.Blocked:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onUnblockClicked(rto?.data)}
                        >
                            Un Block
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(rto?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )
            case UserStatus.Rejected:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onAcceptClicked(rto?.data)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(rto?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )
            case UserStatus.Archived:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onUnArchiveClicked(rto?.data)}
                        >
                            Un Archive
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(rto?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )

            default:
                return
        }
    }

    return (
        <>
            {modal && modal}
            {passwordModal}
            {rto.isError && <TechnicalError />}
            {rto?.isLoading ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : rto.data ? (
                <div className="p-6 mb-32 flex flex-col gap-y-6">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <BackButton
                            text="RTOs"
                            link={
                                sessionStorage.getItem('rto') ||
                                '/portals/admin/rto?tab=approved&page=1&pageSize=50'
                            }
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                text={'View Password'}
                                onClick={() => {
                                    onViewPassword({ user: rto?.data?.user })
                                }}
                            />
                            {statusBaseActions()}
                        </div>
                    </div>

                    <div className="flex gap-x-4">
                        <FigureCard
                            imageUrl="/images/icons/students.png"
                            count={Number(
                                statisticsCount?.data?.currentStudent
                            )}
                            title={'Current Students'}
                            link={`/portals/admin/student?tab=active&page=1&pageSize=50&status=${UserStatus.Approved}&rtoId=${rto?.data?.id}`}
                        />
                        <FigureCard
                            imageUrl="/images/icons/pending-student.png"
                            count={Number(
                                statisticsCount?.data?.pendingStudent
                            )}
                            title={'Pending Students'}
                            link={`/portals/admin/student?tab=active&page=1&pageSize=50&status=${UserStatus.Pending}&rtoId=${rto?.data?.id}`}
                        />
                        <FigureCard
                            imageUrl="/images/icons/industry.png"
                            count={Number(
                                statisticsCount?.data?.workplaceRequest
                            )}
                            title={'Workplace Requests'}
                            link={`/portals/admin/workplaces?tab=all-student-provided-workplace&rtoId=${rto?.data?.id}`}
                        />
                        <FigureCard
                            imageUrl="/images/icons/job.png"
                            count={Number(statisticsCount?.data?.pendingResult)}
                            title={'Pending Result'}
                            link={'#'}
                        />
                    </div>

                    <PinnedNotes id={rto?.data?.user?.id} />
                    <DetailTabs id={router.query?.id} rto={rto} />
                </div>
            ) : (
                !rto.isError &&
                rto.isSuccess && (
                    <EmptyData
                        title={'No RTO Found'}
                        description={'There is no RTO Detail found'}
                    />
                )
            )}
        </>
    )
}

RtoDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoDetail
