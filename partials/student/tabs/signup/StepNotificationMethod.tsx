import { Animations } from '@animations'
import { Button, NotificationMethodButton } from '@components'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdOutlineTextsms } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'

const NotificationTypes = [
    {
        text: 'Via Email',
        Icon: RiMailSendLine,
        animation: Animations.Auth.SignUp.CommunicationMethod.ViaEmail,
        type: 'email',
    },
    {
        text: 'Via SMS',
        Icon: MdOutlineTextsms,
        animation: Animations.Auth.SignUp.CommunicationMethod.ViaSMS,
        type: 'sms',
    },
]

export const StepNotificationMethod = () => {
    const router = useRouter()
    const signUpValues = SignUpUtils.getValuesFromStorage()

    const [emailSelected, setEmailSelected] = useState(true)
    const [smsSelected, setSmsSelected] = useState(false)

    // useEffect(() => {
    //     if (!signUpValues) {
    //         router.push({ query: { step: 'notification-method' } })
    //     }
    // }, [])

    const onSubmit = () => {
        const values = SignUpUtils.getValuesFromStorage()

        if (values) {
            SignUpUtils.setValuesToStorage({
                ...values,
                notifyByEmail: emailSelected,
                notifyBySms: smsSelected,
            })
            if (emailSelected || smsSelected) {
                router.push({ query: { step: 'review-info' } })
            }
        }
    }

    const getSelected = (type: string) => {
        switch (type) {
            case 'email':
                return emailSelected
            case 'sms':
                return smsSelected
        }
        return false
    }

    const onSelect = (type: string) => {
        switch (type) {
            case 'email':
                return setEmailSelected(!emailSelected)
            case 'sms':
                return setSmsSelected(!smsSelected)
        }
    }

    return (
        <div className="w-full">
            <div>
                <p className="font-semibold text-lg">
                    How You Want To Receive Notifications?
                </p>
                <p className="font-medium text-sm text-gray-400">
                    Important notifications and updates will be sent to you
                    using following option(s)
                </p>
            </div>

            {/* Notification Selection */}
            <div className="flex flex-col gap-y-12 items-start w-60 mt-8">
                <div className="w-full flex flex-col md:flex-row gap-x-16 gap-y-8">
                    {NotificationTypes.map((link) => (
                        <NotificationMethodButton
                            key={link.type}
                            value={link.type}
                            text={link.text}
                            selected={getSelected(link.type)}
                            onClick={() => onSelect(link.type)}
                            animation={link.animation}
                        />
                    ))}
                </div>
                <Button
                    variant={'primary'}
                    onClick={onSubmit}
                    disabled={!emailSelected && !smsSelected}
                    text={'Continue'}
                />
            </div>
        </div>
    )
}
