import { ReactNode, useEffect } from 'react'
import {
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'

import { StudentProfileForm } from '@partials/common'

import ProgressBar from '@ramonak/react-progress-bar'

import {
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { getThemeColors } from '@theme'
import { useNotification } from '@hooks'

const colors = getThemeColors()

// components

interface ModalProps {
    title: string
    subtitle: string
    children: ReactNode
    confirmText?: string
    onConfirmClick: Function
    cancelText?: string
    onCancelClick?: Function
    loading?: boolean
    disabled?: boolean
}

export const ProfileModal = ({
    profileCompletion,
    keys,
}: {
    profileCompletion: number
    keys: string[]
}) => {
    const { notification } = useNotification()
    const profile = useGetStudentProfileDetailQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const values = { ...profile?.data, ...profile?.data?.user }

    const missingFields = keys.filter((key) => {
        const keyValue = values[key as keyof typeof values]
        if (
            !keyValue ||
            keyValue == 'NA' ||
            keyValue == 'N/A' ||
            (Array.isArray(keyValue) && !keyValue?.length)
        ) {
            return key
        }
    })

    useEffect(() => {
        if (updateProfileResult?.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [updateProfileResult])

    useEffect(() => {
        if (
            profile.isSuccess &&
            !profile.isLoading &&
            !profile.isFetching &&
            updateProfileResult?.isSuccess
        ) {
            missingFields.map((f, index) =>
                notification.warning({
                    title: 'Missing Field',
                    description: `${f} is Missing, N/A doesn't support`,
                    uniqueId: index,
                    dissmissTimer: 5500,
                })
            )
        }
    }, [updateProfileResult, profile])

    const onSubmit = (values: any) => {
        if (!values?.courses) {
            delete values?.courses
        }
        const { name, email, ...rest } = values
        updateProfile({
            id: profile?.data?.id,
            body: {
                ...rest,
                ...(rest?.courses
                    ? {
                          courses: rest?.courses?.map((course: any) => ({
                              id: course?.value,
                          })),
                      }
                    : {}),
                isInternational:
                    values?.isInternational === 'international' ? true : false,
                user: {
                    name,
                    email,
                },
            },
        })
    }

    return (
        <div className="bg-[#00000080] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
            <div className="bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-[90vw] h-[90vh] overflow-auto custom-scrollbar">
                <div className="px-4 py-6">
                    <Typography variant={'subtitle'}>
                        Complete Your Profile
                    </Typography>
                    <ProgressBar
                        completed={profileCompletion}
                        bgColor={colors.info.DEFAULT}
                        height={'11px'}
                        labelClassName={
                            'text-center text-[11px] font-semibold mx-auto text-white'
                        }
                    />

                    {missingFields && missingFields?.length > 0 && (
                        <div className="bg-error p-3 rounded-lg w-full mt-2">
                            <Typography variant={'subtitle'} color="text-white">
                                You must complete your profile to 100% to access
                                your data
                            </Typography>
                            <Typography variant={'label'} color="text-white">
                                Missing Fields
                            </Typography>
                            <ul className="unordered-list">
                                {missingFields?.map((field) => (
                                    <li className="text-white capitalize text-xs">
                                        {field}
                                    </li>
                                ))}
                            </ul>
                            <Typography
                                color="text-white"
                                variant="label"
                                medium
                            >
                                N/A Doesn,t works in the fields
                            </Typography>
                        </div>
                    )}
                    {profile.isError && <TechnicalError />}
                    {profile.isLoading ? (
                        <LoadingAnimation height={'h-[70vh]'} />
                    ) : profile.data && profile.isSuccess ? (
                        <StudentProfileForm
                            onSubmit={onSubmit}
                            profile={profile}
                            result={updateProfileResult}
                            student
                            courses={{
                                ...profile,
                                data: [...profile?.data?.courses],
                            }}
                        />
                    ) : (
                        !profile.isError && profile.isSuccess && <EmptyData />
                    )}
                </div>{' '}
            </div>
        </div>
    )
}
