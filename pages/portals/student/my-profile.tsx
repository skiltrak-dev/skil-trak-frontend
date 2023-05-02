import { ReactElement, useEffect } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query

import {
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'

import { StudentProfileForm } from '@partials/common'

import { useRouter } from 'next/router'
import {
    Avatar,
    Button,
    EmptyData,
    LoadingAnimation,
    SelectOption,
    TechnicalError,
} from '@components'
import { useActionModal } from '@hooks'

const MyProfile: NextPageWithLayout = () => {
    const { onUpdatePassword, passwordModal } = useActionModal()

    const router = useRouter()
    const profile = useGetStudentProfileDetailQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    useEffect(() => {
        if (updateProfileResult.isSuccess) {
            router.back()
        }
    }, [updateProfileResult])

    const onSubmit = (values: any) => {
        if (!values?.courses) {
            delete values?.courses
        }
        const { name, email, ...rest } = values
        const dob = new Date(values.dob)
        dob.setDate(dob.getDate() + 1)
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
                dob,
                user: {
                    name,
                    email,
                },
            },
        })
    }

    return (
        <div className="px-4">
            <Avatar
                avatar={profile?.data?.user?.avatar}
                user={profile?.data?.user?.id}
            />
            {passwordModal && passwordModal}
            <div className="flex justify-end mb-3">
                <Button
                    text={'Update Password'}
                    onClick={() => onUpdatePassword(profile?.data)}
                />
            </div>
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
        </div>
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'My Profile' }}>
            {page}
        </StudentLayout>
    )
}

export default MyProfile
