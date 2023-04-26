import React, { useEffect } from 'react'

// components
import { ShowErrorNotifications } from '@components'
import { AvatarCard } from './AvatarCard'

// query
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'

export const Avatar = ({ avatar, user }: { user?: number; avatar: string }) => {
    const { notification } = useNotification()
    const [changeProfileImage, changeProfileImageResult] =
        CommonApi.Avatar.useChangeProfile()

    useEffect(() => {
        if (changeProfileImageResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [changeProfileImageResult])

    const onChange = (event: any) => {
        const formData = new FormData()
        formData.append('profile', event)
        changeProfileImage({ user, body: formData })
    }
    return (
        <>
            <ShowErrorNotifications result={changeProfileImageResult} />
            <AvatarCard
                avatar={avatar}
                user={user}
                onChange={(e: any) => onChange(e)}
                result={changeProfileImageResult}
            />
        </>
    )
}
