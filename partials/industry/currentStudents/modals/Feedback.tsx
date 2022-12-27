import { Modal, Select, ShowErrorNotifications } from '@components'
import { useEffect, useState } from 'react'

// query
import { useAddFeedbackMutation } from '@queries'
import { useNotification } from '@hooks'

type valuesTypes = { subject: string; comment: string }

export const Feedback = ({ onCancel, workIndustry, student }: any) => {
    // const [values, setValues] = useState<valuesTypes>({
    //     subject: '',
    //     comment: '',
    // })

    const { notification } = useNotification()

    const [selectedFeedback, setSelectedFeedback] = useState<string>('')

    const [addFeedBack, addFeedBackResult] = useAddFeedbackMutation()

    useEffect(() => {
        if (addFeedBackResult.isSuccess) {
            notification.success({
                title: 'Feedback Sent',
                description: 'Feedback Sent Successfully to admin',
            })
            onCancel()
        }
    }, [addFeedBackResult])

    // const onChange = (e: any) => {
    //     const { name, value } = e.target
    //     setValues((val: valuesTypes) => ({
    //         ...val,
    //         [name]: value,
    //     }))
    // }

    const feedBackOptions = [
        {
            label: 'Bad',
            value: 'bad',
        },
        {
            label: 'Very Bad',
            value: 'veryBad',
        },
        {
            label: 'Good',
            value: 'good',
        },
        {
            label: 'Very Good ',
            value: 'veryGood',
        },
    ]
    return (
        <>
            <ShowErrorNotifications result={addFeedBackResult} />
            <Modal
                title={'Add FeedBack'}
                subtitle={'Add Feedback'}
                onCancelClick={onCancel}
                onConfirmClick={() => {
                    addFeedBack({
                        comment: selectedFeedback,
                        workIndustry,
                        student,
                    })
                }}
                confirmText={'Add Feedback'}
                loading={addFeedBackResult?.isLoading}
            >
                {/* <TextInput
                name={'subject'}
                placeholder={'Add Feedback Subject'}
                onChange={onChange}
            />
            <TextArea
                name={'comment'}
                placeholder={'Add Feedback'}
                rows={9}
                onChange={onChange}
            /> */}
                <Select
                    name={'comment'}
                    options={feedBackOptions}
                    onChange={(e: any) => {
                        setSelectedFeedback(e?.value)
                    }}
                />
            </Modal>
        </>
    )
}
