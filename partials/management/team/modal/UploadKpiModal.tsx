import { Button, TextInput, Typography } from '@components'
import { read, utils } from 'xlsx'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { LoadingAnimation } from '@components'

import { ManagementApi } from '@queries'
import { ExcelFileBinaryUpload } from '@partials/management/form'
// Tabs

type UploadKpiModalProps = {
    onCancel: any
    member: any
}
export const UploadKpiModal = ({ onCancel, member }: UploadKpiModalProps) => {
    const [kpi, setKpi] = useState<any>([])
    const router = useRouter()
    // const member = router?.query?.id
    // APi
    const [upload, uploadResults] = ManagementApi.Documents.useUploadKpiReport()

    // --------- File ----------- //
    const onFileChange = async (e: any) => {
        // const selectedFile = e.target.files[0];
        // const wb = readFile(e.target.result)
        const wb = read(e.target.result, { type: 'binary' })
        const sheets = wb.SheetNames

        if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
            setKpi(rows)
        }
    }
    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        // defaultValues: initialValues,
        mode: 'all',
    })
    useEffect(() => {
        if (uploadResults.isSuccess) {
            onCancel()
        }
    }, [uploadResults.isSuccess])
    // --------- File ----------- //

    const onSubmit = async (values: any) => {
        const { from, to } = values
        const kpiReportData = kpi
        const restructuredData = {
            member,
            from,
            to,
            kpiReportData,
        }
        upload(restructuredData)
    }
    return (
        <div className="flex justify-center w-full overflow-auto remove-scrollbar">
            <div
                className={`w-[545px] bg-white/80 px-6 py-4 border rounded-lg overflow-hidden relative`}
            >
                <div>
                    {uploadResults.isLoading ? (
                        <LoadingAnimation />
                    ) : (
                        <>
                            <FormProvider {...methods}>
                                <form
                                    className="w-full"
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                >
                                    <ExcelFileBinaryUpload
                                        name="list"
                                        onChange={onFileChange}
                                        label={'Upload KPI'}
                                    />

                                    <TextInput
                                        shadow="shadow-lg"
                                        name="from"
                                        type="date"
                                        label={'From'}
                                    />
                                    <TextInput
                                        shadow="shadow-lg"
                                        name="to"
                                        type="date"
                                        label={'To'}
                                    />
                                    {/* <button
                                        className="bg-[#03c9d7] !px-4 !pb-2 pt-1 !rounded-md text-center  !text-white !font-semibold hover:!bg-[#4cbec6e6]"
                                        type="submit"
                                    >
                                        Import
                                    </button> */}
                                    <div className="flex justify-center items-center gap-x-2">
                                        <Button
                                            text="Upload"
                                            variant="primaryNew"
                                            submit
                                        />
                                        <Button
                                            text="Cancel"
                                            variant="error"
                                            onClick={onCancel}
                                        />
                                    </div>
                                </form>
                            </FormProvider>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
