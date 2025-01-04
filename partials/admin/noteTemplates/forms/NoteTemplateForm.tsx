import {
    Button,
    Card,
    InputContentEditor,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
type Props = {
    onSubmit: (values: any) => void
    edit?: boolean
    initialValues?: any
    result: any
}

export const NoteTemplateForm = ({
    onSubmit,
    edit,
    result,
    initialValues,
}: Props) => {
    const validationSchema = yup.object().shape({
        subject: yup.string().required('Subject is required'),
        // content: yup.object()
        //     .test(
        //         'has text',
        //         'Cannot save an empty note',
        //         (value: any) => {
        //             let content = ''
        //             if (!value?.content) {
        //                 content = draftToHtml(
        //                     convertToRaw(value?.content?.getCurrentContent())
        //                 )
        //             }
        //         }
        //     ).required('This field is required.'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    return (
        <>
            <Card>
                <div className="px-2 py-4">
                    <Typography variant="h4">Create Note Template</Typography>
                </div>

                <FormProvider {...formMethods}>
                    <form
                        className="flex flex-col"
                        onSubmit={formMethods.handleSubmit(onSubmit)}
                    >
                        <TextInput
                            label={'Subject'}
                            name={'subject'}
                            placeholder="Subject"
                        />
                        <InputContentEditor name="content" />

                        <Button
                            disabled={result?.isLoading}
                            loading={result?.isLoading}
                            submit
                            text={edit ? 'Update' : 'Create'}
                        />
                    </form>
                </FormProvider>
            </Card>
        </>
    )
}
