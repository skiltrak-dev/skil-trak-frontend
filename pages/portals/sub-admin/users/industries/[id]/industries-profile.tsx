import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { NextPageWithLayout } from '@types'
import { useActionModal, useContextBar, useNavbar } from '@hooks'
import {
    BackButton,
    Button,
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { IndustryProfile } from '@components/IndustryProfile'
import { DetailTabs } from '@partials/sub-admin/Industries/tabs'
import { useGetSubAdminIndustriesProfileQuery } from '@queries'
import { getLink } from '@utils'
import { SubAdminLayout } from '@layouts'

const IndustriesProfile: NextPageWithLayout = () => {
    const { setContent, show, hide } = useContextBar()

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
        if (isSuccess && data) {
            setContent(<IndustryProfile data={data} />)
            show(false)
        }
        return () => {
            setContent(null)
            hide()
        }
    }, [data, isSuccess, setContent])

    const onSnooze = () => {}
    return (
        <>
            {passwordModal}
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
                    {/* <Button
                        text={'View Password'}
                        onClick={() => {
                            onViewPassword({ user: data?.user })
                        }}
                    /> */}
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
                    <Button text="Snooze" variant="action" />
                </div>
            </div>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <DetailTabs industry={data} />
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
