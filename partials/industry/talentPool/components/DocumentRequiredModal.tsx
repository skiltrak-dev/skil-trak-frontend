import { Button, Select, Typography } from '@components'
import { MdOutlineClose } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import { FormProvider, useForm } from 'react-hook-form'
import { IndustryApi } from '@queries'
export const DocumentRequiredModal = ({
    onCancelClicked,
    onSubmit,
    sentConnectionReqResult,
}: any) => {
    const { data } = IndustryApi.TalentPool.useRequiredDocsList()
    const methods = useForm()

    const requiredDocsOptions = data?.map((folder: any) => ({
        value: folder?.folder?.id,
        label: folder?.folder?.name,
    }))


    return (
        <div className="px-12 pt-7 pb-12">
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
                        options={requiredDocsOptions}
                        // onlyValue
                        multi
                    />
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
