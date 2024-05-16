import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout, SubAdmin } from '@types'
import { ColumnDef } from '@tanstack/react-table'
//components
import {
    HelpQuestionSet,
    TableAction,
    Typography,
    EmptyData,
    Table,
    TechnicalError,
    Card,
    LoadingAnimation,
    PageTitle,
    Button,
    TableActionOption,
    InitialAvatar,
    TabProps,
    TabNavigation,
} from '@components'
// queries
import { RtoApi } from '@queries'
// Link
import Link from 'next/link'
// React icons
import { toNamespacedPath } from 'path'
import { useJoyRide, useNotification } from '@hooks'
import { DeleteModal } from '@partials/admin/sub-admin/modals'
import { UserRoles } from '@constants'
import {
    AssignedCoordinators,
    MyCoordinators,
} from '@partials/rto/coordinators'

type Props = {}

const RtoCoordinators: NextPageWithLayout = (props: Props) => {
    const [changeStatusResult, setChangeStatusResult] = useState<any>({})
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { notification } = useNotification()

    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    const [removeCoordinator, removeCoordinatorResult] =
        RtoApi.Coordinator.useRemove()

    // ADD COORDINATOR JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    // ADD COORDINATOR JOY RIDE - END

    useEffect(() => {
        if (removeCoordinatorResult.isSuccess) {
            notification.error({
                title: 'Coordinato Removed',
                description: 'Coordinato Removed Successfully',
            })
        }
    }, [removeCoordinatorResult])

    const RelatedQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: '#',
        },
        {
            text: `I don't have a workplace. What should I do?`,
            link: '#',
        },
        {
            text: `I want to book an appointment`,
            link: '#',
        },
        {
            text: `I want to look for a job`,
            link: '#',
        },
    ]

    const OtherQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: '#',
        },
        {
            text: `I don't have a workplace. What should I do?`,
            link: '#',
        },
        {
            text: `I want to book an appointment`,
            link: '#',
        },
        {
            text: `I want to look for a job`,
            link: '#',
        },
    ]

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onArchivedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <DeleteModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
                setChangeStatusResult={setChangeStatusResult}
            />
        )
    }

    const tabs: TabProps[] = [
        {
            label: 'My Coordinators',
            href: {
                pathname: 'coordinators',
                query: { tab: 'my-coordinators' },
            },
            element: <MyCoordinators />,
        },
        {
            label: 'Assigned Coordinators',
            href: {
                pathname: 'coordinators',
                query: { tab: 'assigned-coordinators' },
            },
            element: <AssignedCoordinators />,
        },
    ]

    return (
        <div>
            <div className="flex justify-between items-end mb-6">
                <PageTitle title="Coordinators" backTitle="Users" />
                <div id="add-coordinator">
                    <Button
                        text="+ Add Coordinator"
                        onClick={() => {
                            router.push('coordinators/create')
                        }}
                    />
                </div>
            </div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => (
                    <div>
                        <div>{header}</div>
                        <div className="mt-3">{element}</div>
                    </div>
                )}
            </TabNavigation>
            {/* <div className="mt-6 flex justify-between">
                <HelpQuestionSet
                    title={'What you want to do here?'}
                    questions={RelatedQuestions}
                />

                <HelpQuestionSet
                    title={'What else you want to do?'}
                    questions={OtherQuestions}
                />
            </div> */}
        </div>
    )
}
RtoCoordinators.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default RtoCoordinators
