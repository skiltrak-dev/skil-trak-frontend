import {
    Modal,
    Select,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { useEffect, useState } from 'react'
import ReactStars from 'react-stars'

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
    const [feedback, setFeedback] = useState<string>('')
    const [rating, setRating] = useState<number>(0)

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
                        rating,
                        comment: feedback,
                        workIndustry,
                        student,
                    })
                }}
                confirmText={'Add Feedback'}
                loading={addFeedBackResult?.isLoading}
            >
                {/* <Select
                    name={'comment'}
                    options={feedBackOptions}
                    onChange={(e: any) => {
                        setSelectedFeedback(e?.value)
                    }}
                /> */}
                <Typography>Rating</Typography>
                <ReactStars
                    count={5}
                    value={rating}
                    onChange={(e) => {
                        setRating(e)
                    }}
                    size={24}
                    color2={'#ffd700'}
                />
                <TextArea
                    name={'comment'}
                    label={'Feedback'}
                    placeholder={'Add Feedback'}
                    rows={6}
                    onChange={(e: any) => {
                        setFeedback(e.target.value)
                    }}
                />{' '}
            </Modal>
        </>
    )
}
