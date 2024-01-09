import React, { useState } from 'react'
import { read, utils } from 'xlsx'
import { useNotification } from '@hooks'
import { BinaryFileUpload } from '@components/inputs/BinaryFileUpload'
import { Button, ShowErrorNotifications, Typography } from '@components'
import { CommonApi } from '@queries'

export const ImportIndustriesList = () => {
    const [industries, setIndustries] = useState<any>(null)
    const { notification } = useNotification()

    const [importList, importListResult] =
        CommonApi.FindWorkplace.importIndustriesList()

    const onFileChange = async (e: any, fileData: any) => {
        try {
            const wb = read(e.target.result, { type: 'binary' })
            const sheets = wb.SheetNames

            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
                // onStudentFound && onStudentFound(rows, fileData)
                setIndustries(rows)
            }
        } catch (err) {
            notification.error({
                title: 'Invalid File',
                description: 'File should be .csv or .xlsx',
            })
        }
    }

    const onSubmit = () => {
        importList(industries).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Success',
                    description: 'Industries imported successfully',
                })
            }
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={importListResult} />
            <BinaryFileUpload
                name="list"
                onChange={onFileChange}
                fileAsObject={false}
                result={importListResult}
                // acceptTypes={['csv', 'xlsx']}
            />
            <div className="flex items-center justify-end mt-2">
                <Button
                    text={'Upload'}
                    onClick={onSubmit}
                    loading={importListResult.isLoading}
                    disabled={importListResult.isLoading}
                />
            </div>

            <div className="mt-5">
                {importListResult?.data?.errorMails &&
                importListResult?.data?.errorMails?.length > 0 ? (
                    <div className="flex flex-col gap-y-1">
                        <div>
                            <Typography
                                variant={'label'}
                                semibold
                                color={'text-gray-800'}
                            >
                                Emails Already Being Used
                            </Typography>
                            {importListResult?.data?.errorMails
                                ?.filter(
                                    (ind: { source: string }) =>
                                        ind?.source === 'listing'
                                )
                                ?.map((ind: { email: string }) => (
                                    <div className="bg-gray-100 rounded-md px-3 py-1">
                                        <Typography
                                            variant={'small'}
                                            color={'text-red-500'}
                                        >
                                            {ind?.email}
                                        </Typography>
                                    </div>
                                ))}
                        </div>

                        <div>
                            <Typography
                                variant={'label'}
                                semibold
                                color={'text-gray-800'}
                            >
                                Emails Already Being Used
                            </Typography>
                            {importListResult?.data?.errorMails
                                ?.filter(
                                    (ind: { source: string }) =>
                                        ind?.source === 'listing'
                                )
                                ?.map((ind: { email: string }) => (
                                    <div className="bg-gray-100 rounded-md px-3 py-1">
                                        <Typography
                                            variant={'small'}
                                            color={'text-red-500'}
                                        >
                                            {ind?.email}
                                        </Typography>
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
