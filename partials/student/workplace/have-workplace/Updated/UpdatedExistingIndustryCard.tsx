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
import { ReactElement, useEffect, useState } from 'react'
import { EmployerDocuments } from '../../modal'

interface IndustryExtend extends Industry {
    locationId?: number
}

export const UpdatedExistingIndustryCard = ({
    student,
    setActive,
    industry,
    selectedCourse,
    branch,
}: {
    student?: number
    setActive: any
    industry: IndustryExtend
    selectedCourse: number | null
    branch?: boolean
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [answer, setAnswer] = useState('')
    const [showEmployerDocModal, setShowEmployerDocModal] =
        useState<boolean>(false)
    const { notification } = useNotification()
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
    useEffect(() => {
        if (applyForWorkplaceSubadminResult?.data && answer === 'yes') {
            notification.success({
                title: 'Successfully added to the Talent Pool Programme',
                description:
                    'You have been successfully added to the Talent Pool Programme! Industries in your field can now view your profile and contact you with opportunities.',
            })
        } else if (applyForWorkplaceSubadminResult?.data && answer === 'no') {
            notification.info({
                title: 'You can join the Talent Pool',
                description:
                    'You can join the Talent Pool Programme later from your dashboard',
            })
        }
    }, [applyForWorkplaceSubadminResult?.data, answer])
    console.log('answer', answer)
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
                                answer: answer,
                            })
                        }
                        return await applyForWorkplace({
                            IndustryId: industry?.id,
                            courseId: Number(selectedCourse),
                            document: document?.id,
                            location: industry?.locationId,
                            answer: answer,
                        })
                    }}
                    test={'Student side 2'}
                    setAnswer={setAnswer}
                    answer={answer}
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
                            {branch && (
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
