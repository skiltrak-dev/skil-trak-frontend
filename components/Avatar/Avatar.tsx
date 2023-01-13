import React, { useEffect } from 'react'

// components
import { ShowErrorNotifications } from '@components'
import { AvatarCard } from './AvatarCard'

// query
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'

export const Avatar = ({ avatar }: { avatar: string }) => {
    const { notification } = useNotification()
    const [changeProfileImage, changeProfileImageResult] =
        CommonApi.Avatar.useChangeProfile()

    useEffect(() => {
        if (changeProfileImageResult.isSuccess) {
            notification.success({
                title: 'Avatar Updated',
                description: 'Avatar Updated Successfully',
            })
        }
    }, [changeProfileImageResult])

    const onChange = (event: any) => {
        const formData = new FormData()
        formData.append('profile', event)
        changeProfileImage({ body: formData })
    }
    return (
        <>
            <ShowErrorNotifications result={changeProfileImageResult} />
            <AvatarCard
                avatar={avatar}
                onChange={(e: any) => onChange(e)}
                result={changeProfileImageResult}
            />
        </>
    )
}
