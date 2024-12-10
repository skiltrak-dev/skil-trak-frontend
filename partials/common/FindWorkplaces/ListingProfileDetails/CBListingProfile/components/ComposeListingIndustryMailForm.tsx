import {
    Button,
    InputContentEditor,
    inputEditorErrorMessage,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { InputErrorMessage } from '@partials/common/MailsListing'

export const ComposeListingIndustryMailForm = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const inputClasses =
        'placeholder:text-[#686868] border-b border-secondary-dark outline-none h-8 placeholder:text-[11px] px-1.5 text-[13px] text-gray-700'
    const validationSchema = Yup.object({
        receiver: Yup.string()
            .email('Invalid Email')
            .required('Must provide email'),
        subject: Yup.string().required('Must provide subject'),
        message: Yup.mixed().test('Message', 'Must Provide Message', (value) =>
            inputEditorErrorMessage(value)
        ),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (result?.isSuccess) {
            methods.reset()
        }
    }, [result])

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col px-3">
                        <input
                            {...methods.register('receiver')}
                            className={inputClasses}
                            placeholder="To"
                        />
                        <InputErrorMessage name="receiver" />
                        <input
                            {...methods.register('subject')}
                            className={inputClasses}
                            placeholder="Subject"
                        />
                        <InputErrorMessage name="subject" />

                        <div className="mt-2">
                            <InputContentEditor
                                name={'message'}
                                onChange={(e: any) => {
                                    const mail = draftToHtml(
                                        convertToRaw(e.getCurrentContent())
                                    )
                                    // setMailContent(mail)
                                }}
                                showError={false}
                                height="h-80"
                            />
                        </div>
                        <InputErrorMessage name="message" />

                        {/*  */}
                        <div className="mt-3 flex gap-x-3 items-center justify-between">
                            <div className="min-w-32">
                                <Button
                                    submit
                                    fullWidth
                                    loading={result.isLoading}
                                    disabled={result.isLoading}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
