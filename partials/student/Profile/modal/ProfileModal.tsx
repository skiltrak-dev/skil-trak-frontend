import { ReactNode } from 'react'
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
}: {
    profileCompletion: number
}) => {
    const profile = useGetStudentProfileDetailQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

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
                user: {
                    name,
                    email,
                },
            },
        })
    }

    return (
        <div className="bg-[#00000080] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
            <div className="bg-white rounded-2xl flex flex-col justify-between shadow-md w-[90vw] h-[90vh] overflow-auto custom-scrollbar">
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
