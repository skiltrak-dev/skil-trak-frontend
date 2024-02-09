import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// hooks
import { useActionModal, useContextBar, useNavbar } from '@hooks'
//components
import {
    Alert,
    BackButton,
    Button,
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { IndustryProfile } from '@components/IndustryProfile'

// icons
// import { FaEdit } from 'react-icons/fa'
// queries
import { SnoozeIndustryModal } from '@partials/common'
import { DetailTabs } from '@partials/sub-admin/Industries/tabs'
import { useGetSubAdminIndustriesProfileQuery } from '@queries'
import { getLink } from '@utils'

type Props = {}

const IndustriesProfile: NextPageWithLayout = (props: Props) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isMouseMove, setIsMouseMove] = useState<any>(null)

    const contextBar = useContextBar()

    const pathname = useRouter()
    const { id } = pathname.query

    const { passwordModal, onViewPassword } = useActionModal()

    const navBar = useNavbar()

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminIndustriesProfileQuery(Number(id), {
            skip: !id,
            refetchOnMountOrArgChange: true,
        })

    useEffect(() => {
        navBar.setSubTitle(data?.user?.name)
    }, [data])

    useEffect(() => {
        window.addEventListener('mousemove', () => setIsMouseMove(true))
        return () => {
            window.removeEventListener('mousemove', () => setIsMouseMove(false))
        }
    }, [])

    useEffect(() => {
        if (!contextBar.content) {
            setIsMouseMove(false)
        }
    }, [contextBar])

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                contextBar.setContent(<IndustryProfile data={data} />)
                contextBar.show(false)
            }
        }

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [data, isSuccess, isMouseMove])

    const onCancelModal = () => setModal(null)

    const onSnooze = () => {
        setModal(
            <SnoozeIndustryModal onCancel={onCancelModal} industry={data} />
        )
    }
    return (
        <>
            {modal}
            {passwordModal}

            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <>
                    {data?.snoozedDate && (
                        <Alert
                            title="Industry Snoozed"
                            description="Industry Snoozed"
                            variant="warning"
                            autoDismiss={false}
                        />
                    )}
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <BackButton
                                text={'Industry'}
                                link={`${
                                    getLink('subadmin-industries') ||
                                    'portals/sub-admin/users/industries?tab=all'
                                }`}
                            />
                            <PageTitle title="Industry Profile" />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button
                                text={'View Password'}
                                onClick={() => {
                                    onViewPassword({ user: data?.user })
                                }}
                            />
                            <Button
                                text="Book Appointment"
                                variant="info"
                                onClick={() => {
                                    pathname.push({
                                        pathname:
                                            '/portals/sub-admin/tasks/appointments/create-appointment',
                                        query: { industry: data?.user?.id },
                                    })
                                }}
                                disabled={!isSuccess}
                            />
                            <Button
                                text="Snooze"
                                variant="action"
                                onClick={() => {
                                    onSnooze()
                                }}
                            />
                        </div>
                    </div>
                    <DetailTabs industry={data} />
                </>
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Industry were found'}
                        description={'No Industry Detail were found'}
                    />
                )
            )}
        </>
    )
}
IndustriesProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default IndustriesProfile
