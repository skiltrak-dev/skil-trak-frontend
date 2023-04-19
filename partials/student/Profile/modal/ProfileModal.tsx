import {
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'

import { StudentProfileForm } from '@partials/common'

import { useRouter } from 'next/router'
import {
    EmptyData,
    LoadingAnimation,
    SelectOption,
    TechnicalError,
    Typography,
} from '@components'
import { useEffect } from 'react'

// components

interface ModalProps {
    title: string
    subtitle: string
    children: any
    confirmText?: string
    onConfirmClick: Function
    cancelText?: string
    onCancelClick?: Function
    loading?: boolean
    disabled?: boolean
}

export const ProfileModal = () => {
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
                <Typography variant={'subtitle'}>Complete Your Profile</Typography>
                    {profile.isError && <TechnicalError />}
                    {profile.isLoading ? (
                        <LoadingAnimation height={'h-[70vh]'} />
                    ) : profile.data && profile.isSuccess ? (
                        <StudentProfileForm
                            onSubmit={onSubmit}
                            profile={profile}
                            result={updateProfileResult}
                            studentId
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
