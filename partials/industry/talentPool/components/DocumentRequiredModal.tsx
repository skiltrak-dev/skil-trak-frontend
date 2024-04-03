import { Button, Select, TextInput, Typography } from '@components'
import { MdOutlineClose } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import {
    Controller,
    FormProvider,
    useForm,
    useFieldArray,
} from 'react-hook-form'
import { IndustryApi } from '@queries'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const DocumentRequiredModal = ({
    onCancelClicked,
    onSubmit,
    sentConnectionReqResult,
}: any) => {
    const { data } = IndustryApi.TalentPool.useRequiredDocsList()
    const validationSchema = Yup.object().shape({
        requiredDocs: Yup.array()
            .min(1, 'Must select at least 1 document')
            .required(),
        otherDocs: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required(
                    'Please enter the name of the document'
                ),
            })
        ),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    })
    const { control } = methods
    const [otherFlag, setOtherFlag] = useState(false)
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'otherDocs',
    })
    const docsOption = [
        {
            label: 'CV/Resume',
            value: 'cv/resume',
        },
        {
            label: 'Cover Letter',
            value: 'coverLetter',
        },
    ]
    const handleAddMore = () => {
        append({ name: '' }) // Append an empty object to the "otherDocs" array
    }
    return (
        <div className="px-12 pt-7 pb-12 overflow-auto custom-scrollbar h-screen">
            <div onClick={onCancelClicked} className="flex justify-end">
                <MdOutlineClose className="cursor-pointer" size={30} />
            </div>
            <div className="flex flex-col gap-y-3 items-center mb-8">
                <div>
                    <CgFileDocument size={30} />
                </div>
                <div>
                    <Typography variant="subtitle">
                        Document Required
                    </Typography>
                </div>
            </div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <Select
                        name="requiredDocs"
                        options={docsOption}
                        // onlyValue
                        // onChange={(e: any) => {
                        //     console.log('on other', e)
                        //     // setOtherDocument(e)
                        // }}
                        // onChange={handleOptionSelect}
                        required
                        multi
                    />
                    <div className="flex flex-col items-start w-full">
                        {/* {otherFlag && (
                            <TextInput
                                name="other"
                                placeholder="enter other docs"
                            />
                        )}
                        {otherFlag ? (
                            <div className="whitespace-nowrap mt-1">
                                <Button
                                    text={'Remove'}
                                    onClick={() => setOtherFlag(false)}
                                    variant="error"
                                />
                            </div>
                        ) : (
                            <div className="whitespace-nowrap mt-1 mb-4">
                                <Button
                                    text={'Add More'}
                                    onClick={() => setOtherFlag(true)}
                                    variant="primaryNew"
                                />
                            </div>
                        )} */}
                        {fields.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-start mt-2 w-full"
                            >
                                <TextInput
                                    // {...methods.register(
                                    //     `otherDocs.${index}.name`
                                    // )}
                                    name={`otherDocs.${index}.name`}
                                    // defaultValue={item.name}
                                    placeholder="Enter other docs"
                                    required
                                />
                                <button
                                    className="bg-red-400 px-3 py-2.5 relative z-30  -ml-1.5 rounded-md"
                                    onClick={() => remove(index)}
                                >
                                    <FaPlus className="text-white rotate-45" />
                                </button>
                                {/* <div className="whitespace-nowrap mt-1">
                                    <Button
                                        onClick={() => remove(index)}
                                        text="Remove"
                                        variant="error"
                                    />
                                </div> */}
                            </div>
                        ))}
                        <div className="whitespace-nowrap mb-2">
                            <Button
                                text={'Add More'}
                                variant="primaryNew"
                                onClick={handleAddMore}
                            />
                        </div>
                    </div>
                    <Button
                        loading={sentConnectionReqResult.isLoading}
                        disabled={sentConnectionReqResult.isLoading}
                        text="Send Request"
                        submit
                    />
                </form>
            </FormProvider>
        </div>
    )
}
