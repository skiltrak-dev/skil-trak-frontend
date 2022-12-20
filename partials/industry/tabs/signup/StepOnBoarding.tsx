import { Animations } from '@animations'
import {
    ActionButton,
    AuthBreadCrumb,
    Button,
    NotificationMethodButton,
    TextInput,
    Typography,
} from '@components'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiMailSend } from 'react-icons/bi'
import { MdOutlineTextsms } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'
import { TbMessageDots } from 'react-icons/tb'
import { OnBoardingLink } from '@partials/industry/components'

// const NotificationTypes = [
//   {
//     text: 'Via Email',
//     Icon: RiMailSendLine,
//     animation: Animations.Auth.SignUp.CommunicationMethod.ViaEmail,
//     type: 'email',
//   },
//   {
//     text: 'Via SMS',
//     Icon: MdOutlineTextsms,
//     animation: Animations.Auth.SignUp.CommunicationMethod.ViaSMS,
//     type: 'sms',
//   },
// ]
const UsageType = [
    {
        text: 'I want to use it once',
        Icon: RiMailSendLine,
        animation: Animations.Industry.UsageMethod.Once,
        type: 'once',
    },
    {
        text: 'I want to be a partner',
        Icon: MdOutlineTextsms,
        animation: Animations.Industry.UsageMethod.Partner,
        type: 'partner',
    },
]

export const StepOnBoarding = () => {
    const router = useRouter()
    const signUpValues = SignUpUtils.getValuesFromStorage()

    const [onceSelected, setOnceSelected] = useState(true)
    const [partner, setPartner] = useState(false)
    const [studentCapacityError, setStudentCapacityError] = useState(false)
    const [studentCapacity, setStudentCapacity] = useState()
    const [selected, setSelected] = useState<any>()

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
                isPartner: selected === UsageType[1].type,
                ...(studentCapacity ? { studentCapacity } : {}),
            })
            if (UsageType[0].type || UsageType[1].type) {
                router.push({ query: { step: 'review-info' } })
            }
        }
    }

    // const getSelected = (type: string) => {
    //   switch (type) {
    //     case 'once':
    //       return onceSelected
    //     case 'partner':
    //       return partner
    //   }
    //   return false
    // }

    const onSelect = (type: string) => {
        setSelected(type)
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
            <div className="flex flex-col gap-y-12 items-start mt-8">
                <div className="flex gap-x-8">
                    {UsageType.map((link) => (
                        <OnBoardingLink
                            key={link.type}
                            value={link.type}
                            text={link.text}
                            selected={selected === link.type}
                            onClick={onSelect}
                            animation={link.animation}
                            vertical
                        />
                    ))}
                </div>
                {selected === UsageType[1].type && (
                    <div className="flex flex-col">
                        <TextInput
                            onChange={(e: any) => {
                                setStudentCapacity(e.target.value)
                            }}
                            name={'studentCapacity'}
                            label={'Student Capacity'}
                            type={'number'}
                        />
                    </div>
                )}
                <Button
                    variant={'primary'}
                    onClick={onSubmit}
                    disabled={
                        (selected === UsageType[1].type && !studentCapacity) ||
                        !selected
                    }
                    text={'Continue'}
                />
            </div>

            {/* Notification Selection */}
            {/* <div className="flex flex-col gap-y-4 items-start w-60 mt-8"> */}
            {/* <div className="w-full flex gap-x-16">
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
        </div> */}
            {/* {
          UsageType.map((link) => (
            <ActionButton onClick={() => onSelect(link.type)} variant='light' Icon={link.Icon}>
              {link.text}
            </ActionButton>
          ))
        } */}

            {/* <Button
          variant={'primary'}
          onClick={onSubmit}
          disabled={!onceSelected && !partner}
          text={'Continue'}
        /> */}
            {/* </div> */}
        </div>
    )
}
