import { useContextBar, useNotification } from '@hooks'
import { SubAdminForm } from '@partials/admin/sub-admin/form'
import { RtoApi } from '@queries'
import { SubAdmin } from '@types'

export const EditCoordinatorCB = ({
    coordinator,
}: {
    coordinator: SubAdmin
}) => {
    const { notification } = useNotification()

    const contextBar = useContextBar()

    const rto = RtoApi.Rto.useProfile()

    const [updateCoordinator, updateCoordinatorResult] =
        RtoApi.Coordinator.useUpdate()

    const rtoCoursesOptions = rto?.data?.courses?.map((course: any) => ({
        label: course?.title,
        value: course?.id,
        item: course,
    }))

    const onSubmit = (values: any) => {
        delete values?.rtos
        delete values?.sectors
        updateCoordinator({
            id: coordinator?.id,
            ...values,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Coordinator Updated',
                    description: 'Coordinator Updated Successfully',
                })
                contextBar.hide()
                contextBar.setContent(null)
                contextBar.setTitle(null)
            }
        })
        console.log({ values })
    }

    return (
        <div>
            <SubAdminForm
                edit
                onSubmit={onSubmit}
                subAdmin={coordinator}
                result={updateCoordinatorResult}
                rtoCoursesOptions={rtoCoursesOptions}
            />
        </div>
    )
}
