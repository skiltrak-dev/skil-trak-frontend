import { BackButton, Card, PageTitle } from '@components'
import { useAlert, useContextBar } from '@hooks'
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { PageHeading } from '@components/headings'
import { SubAdminForm } from '@partials/admin/sub-admin/form'
import { RtoApi } from '@queries'
import { UserRoles } from '@constants'
import { AuthUtils } from '@utils'

const AddCoordinator: NextPageWithLayout = () => {
    const { alert } = useAlert()
    const router = useRouter()
    const contextBar = useContextBar()
    const [createCoordinator, createCoordinatorResult] =
        RtoApi.Coordinator.useCreate()

    const credentials = AuthUtils.getUserCredentials()

    const onSubmit = async (values: any) => {
        await createCoordinator({
            // id: credentials.id,
            ...values,
            role: UserRoles.SUBADMIN,
            status: 'approved',
        })
    }

    useEffect(() => {
        if (createCoordinatorResult.isSuccess) {
            alert.success({
                title: 'Coordinator created successfully',
                description: 'A new coordinator has been created and assigned',
            })

            router.back()
        }
    }, [createCoordinatorResult])

    return (
        <div className="p-6 flex flex-col gap-y-4 mb-20">
            <PageTitle title="Create Coordinator" backTitle="Coordinators" />
            <div className="w-3/4">
                <Card>
                    <SubAdminForm onSubmit={onSubmit} />
                </Card>
            </div>
        </div>
    )
}

AddCoordinator.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default AddCoordinator
