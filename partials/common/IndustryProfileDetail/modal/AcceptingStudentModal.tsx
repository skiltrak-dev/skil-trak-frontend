import { Modal, Select, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { Industry, OptionType } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import { IndustryPlacementStatus } from '../enum'
import { useEffect, useState } from 'react'
export const AcceptingStudentModal = ({
    industry,
    onCancel,
}: {
    industry: Industry | undefined | null
    onCancel: Function
}) => {
    const [selectedStatus, setSelectedStatus] =
        useState<IndustryPlacementStatus | null>(null)

    useEffect(() => {
        if (industry?.placementStatus) {
            setSelectedStatus(industry?.placementStatus)
        }
    }, [industry?.placementStatus])

    const { notification } = useNotification()
    const [changeStudentAccepting, changeStudentAcceptingResult] =
        SubAdminApi.Industry.changeIndustryAcceptingStatus()

    const methods = useForm({
        mode: 'all',
        defaultValues: {
            status: industry?.placementStatus,
        },
    })

    console.log({ industry })

    const onSubmit = async (values: any) => {
        const data = {
            id: Number(industry?.id),
            status: values?.status,
        }

        //call the api
        const res: any = await changeStudentAccepting(data)

        if (res.data) {
            notification.success({
                title: `Status Changed`,
                description: `Status Changed Successfully.`,
            })
            onCancel()
        }
    }

    const statusOptions: OptionType[] = [
        {
            label: 'Default',
            value: null,
        },
        {
            label: IndustryPlacementStatus.ACCEPTING_STUDENTS,
            value: IndustryPlacementStatus.ACCEPTING_STUDENTS,
        },
        {
            label: IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS,
            value: IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS,
        },
    ]

    return (
        <>
            <ShowErrorNotifications result={changeStudentAcceptingResult} />
            <Modal
                title="Change Status"
                onCancelClick={onCancel}
                subtitle="Change Placement Status"
                onConfirmClick={methods.handleSubmit(onSubmit)}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <Select
                            onlyValue
                            name="status"
                            label={'Change Status'}
                            value={statusOptions?.find(
                                (status: OptionType) =>
                                    status?.value === selectedStatus
                            )}
                            onChange={(e: IndustryPlacementStatus) => {
                                setSelectedStatus(e)
                            }}
                            options={statusOptions}
                        />
                    </form>
                </FormProvider>
            </Modal>
            {/* <ActionModal
                Icon={HiCheckBadge}
                variant={
                    industry?.placementStatus ===
                    IndustryPlacementStatus.ACCEPTING_STUDENTS
                        ? 'error'
                        : 'success'
                }
                title="Are you sure!"
                description={`You are about to change status for <em>"${industry?.user?.name}"<em>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.user?.email}
                actionObject={industry}
                loading={changeStudentAcceptingResult.isLoading}
            /> */}
        </>
    )
}
