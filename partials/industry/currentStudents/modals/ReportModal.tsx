import { Modal, Select, ShowErrorNotifications } from '@components'
import { useEffect, useState } from 'react'

// query
import { useAddReportMutation } from '@queries'
import { useNotification } from '@hooks'

export const ReportModal = ({ onCancel, workIndustry, student }: any) => {
    // const [values, setValues] = useState<valuesTypes>({
    //     subject: '',
    //     comment: '',
    // })

    const { notification } = useNotification()

    const [selectedReport, setSelectedReport] = useState<string>('')

    const [addReport, addReportResult] = useAddReportMutation()

    useEffect(() => {
        if (addReportResult.isSuccess) {
            notification.success({
                title: 'Report Sent',
                description: 'Report Sent Successfully to admin',
            })
            onCancel()
        }
    }, [addReportResult])

    // const onChange = (e: any) => {
    //     const { name, value } = e.target
    //     setValues((val: valuesTypes) => ({
    //         ...val,
    //         [name]: value,
    //     }))
    // }

    const reportOptions = [
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
            <ShowErrorNotifications result={addReportResult} />
            <Modal
                title={'Add Report'}
                subtitle={'Add Report'}
                onCancelClick={onCancel}
                onConfirmClick={() => {
                    addReport({
                        comment: selectedReport,
                        workIndustry,
                        student,
                    })
                }}
                confirmText={'Add Report'}
                loading={addReportResult?.isLoading}
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
                    options={reportOptions}
                    onChange={(e: any) => {
                        setSelectedReport(e?.value)
                    }}
                />
            </Modal>
        </>
    )
}
