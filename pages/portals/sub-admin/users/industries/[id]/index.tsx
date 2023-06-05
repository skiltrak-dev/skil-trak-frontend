import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// hooks
import { useContextBar, useNavbar } from '@hooks'
//components
import {
    BackButton,
    Button,
    CalendarEvent,
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { IndustryProfile } from '@components/IndustryProfile'

// icons
// import { FaEdit } from 'react-icons/fa'
// queries
import { DetailTabs } from '@partials/sub-admin/Industries/tabs'
import { useGetSubAdminIndustriesProfileQuery } from '@queries'
import { getLink } from '@utils'

type Props = {}

const IndustriesProfile: NextPageWithLayout = (props: Props) => {
    const { setContent, show, hide } = useContextBar()
    const pathname = useRouter()
    const { id } = pathname.query

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

    return (
        <>
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
                    <Button text="More" variant="action" />
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
