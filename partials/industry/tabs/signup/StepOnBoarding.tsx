import { Animations } from '@animations'
import {
    Button,
    TextInput
} from '@components'
import { OnBoardingLink } from '@partials/industry/components'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdOutlineTextsms } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'

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
        </div>
    )
}
