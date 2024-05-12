import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { RtoProfileDetail } from '@partials'
import { ProfileViewContextBar } from '@partials/admin/rto/UpdatedRtoProfileDetail/ProfileViewContextBar'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

const RtoProfile = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const router = useRouter()

    const navBar = useNavbar()
    const contextBar = useContextBar()

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        navBar.setSubTitle(rto?.data?.user?.name)
    }, [rto.data])

    const handleMouseMove = (event: any) => {
        if (!contextBar.content) {
            setMousePosition({ x: event.clientX, y: event.clientY })
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [contextBar])

    useEffect(() => {
        if (rto.isSuccess) {
            contextBar.setContent(<ProfileViewContextBar rto={rto?.data} />)
            contextBar.show(false)
        }

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [rto.data, mousePosition])
    return (
        <div>
            {rto.isError && <TechnicalError />}
            {rto?.isLoading ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : rto.data ? (
                <RtoProfileDetail rto={rto?.data} />
            ) : (
                !rto.isError &&
                rto.isSuccess && (
                    <EmptyData
                        title={'No RTO Found'}
                        description={'There is no RTO Detail found'}
                    />
                )
            )}
        </div>
    )
}

RtoProfile.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoProfile
