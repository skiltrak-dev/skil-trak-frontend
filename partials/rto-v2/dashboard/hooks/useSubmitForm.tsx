import { RtoV2Api } from '@queries'
import { useNotification } from '@hooks'

export const useSubmitForm = ({ onCancel }: { onCancel: () => void }) => {
    const [submit, submitResult] =
        RtoV2Api.AvailableServices.submitAvailableService()

    const { notification } = useNotification()

    const onSubmit = async (values: any) => {
        const { fileUpload, ...rest } = values
        const formData = new FormData()

        Object.entries(rest).forEach(([keyBy, value]: [string, any]) => {
            formData.append(keyBy, value)
        })

        fileUpload &&
            fileUpload?.length > 0 &&
            fileUpload.forEach((filedata: { id: string; file: File }) => {
                formData.append('files', filedata?.file)
            })
        const res: any = await submit(formData)

        if (res?.data) {
            notification.success({
                title: 'Query Submitted',
                description: 'Query Submitted Successfully',
            })
            onCancel()
        }
    }
    return { submitResult, onSubmit }
}
