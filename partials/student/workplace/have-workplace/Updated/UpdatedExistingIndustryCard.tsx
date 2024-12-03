import {
    Button,
    InitialAvatar,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import {
    useApplyWorkplaceOnExistingIndustryMutation,
    useApplyWorkplaceWithAbnIndustryMutation,
} from '@queries'
import { Industry } from '@types'
import { getUserCredentials } from '@utils'
import { ReactElement, useState } from 'react'
import { EmployerDocuments } from '../../modal'

interface IndustryExtend extends Industry {
    locationId?: number
}

export const UpdatedExistingIndustryCard = ({
    student,
    setActive,
    industry,
    selectedCourse,
}: {
    student?: number
    setActive: any
    industry: IndustryExtend
    selectedCourse: number | null
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [showEmployerDocModal, setShowEmployerDocModal] =
        useState<boolean>(false)
    const { notification } = useNotification()
    console.log('industry', industry)
    const role = getUserCredentials()?.role

    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceWithAbnIndustryMutation()
    const [applyForWorkplaceSubadmin, applyForWorkplaceSubadminResult] =
        useApplyWorkplaceOnExistingIndustryMutation()

    const onApplyForWorkplace = async () => {
        if (selectedCourse) {
            setShowEmployerDocModal(true)
            // const wp: any = await applyForWorkplace({
            //     IndustryId: industry?.id,
            //     courseId: selectedCourse,
            // })
            // if (wp?.data) {
            //     notification.success({
            //         title: 'Workplace Created',
            //         description: 'Workplace Created Successfully',
            //     })
            //     setModal(<WorkplaceCreatedModal onCancel={() => {}} />)
            // }
        } else {
            notification.warning({
                title: 'Course Required',
                description: 'Course Must be selected',
            })
        }
    }
    return (
        <>
            <ShowErrorNotifications result={applyForWorkplaceSubadminResult} />
            {showEmployerDocModal && (
                <EmployerDocuments
                    onCancel={() => {
                        setShowEmployerDocModal(false)
                    }}
                    action={async (document: any) => {
                        if (role === UserRoles.SUBADMIN) {
                            return await applyForWorkplaceSubadmin({
                                student: Number(student),
                                IndustryId: industry?.id,
                                courseId: Number(selectedCourse),
                                location: industry?.locationId,
                                document: document?.id,
                            })
                        }
                        return await applyForWorkplace({
                            IndustryId: industry?.id,
                            courseId: Number(selectedCourse),
                            document: document?.id,
                        })
                    }}
                    result={
                        role === UserRoles.SUBADMIN
                            ? applyForWorkplaceSubadminResult
                            : applyForWorkplaceResult
                    }
                    setActive={setActive}
                />
            )}
            <div className="-mt-2 bg-gray-100 py-2 px-4 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    <InitialAvatar
                        name={industry?.user?.name}
                        imageUrl={industry?.user?.avatar}
                        large
                    />
                    <div>
                        {/* <Typography variant={'muted'} color={'gray'}>
                        5km away
                    </Typography> */}
                        <div className="flex gap-x-2 items-center">
                            <Typography variant={'label'}>
                                {industry?.user?.name}
                            </Typography>
                            {!industry?.locations && (
                                <Typography
                                    variant={'muted'}
                                    color={'text-orange-500'}
                                >
                                    (Branch)
                                </Typography>
                            )}
                        </div>
                        <Typography variant={'muted'} color={'gray'}>
                            {industry?.addressLine1}, {industry?.addressLine2}
                        </Typography>
                    </div>
                </div>
                <Button
                    variant={'primary'}
                    text={'Add Workplace'}
                    onClick={async () => {
                        onApplyForWorkplace()
                    }}
                    loading={applyForWorkplaceResult.isLoading}
                    disabled={applyForWorkplaceResult.isLoading}
                />
            </div>
        </>
    )
}
