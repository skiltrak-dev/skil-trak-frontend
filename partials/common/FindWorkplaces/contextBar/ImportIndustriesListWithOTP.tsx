import React, { ReactElement, useCallback, useState } from 'react'
import { read, utils } from 'xlsx'
import { Workbook, Worksheet } from 'exceljs'
import ExcelJS from 'exceljs'

import { useNotification } from '@hooks'
import { BinaryFileUpload } from '@components/inputs/BinaryFileUpload'
import { Button, ShowErrorNotifications, Typography } from '@components'
import { CommonApi, RtoApi } from '@queries'
import { ImportIndustriesListVerificationModal } from '../modal'

export const ImportIndustriesListWithOTP = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [importListResult, setImportListResult] = useState<any>(null)
    const [industriesCount, setIndustriesCount] = useState<any>(null)
    const [industries, setIndustries] = useState<any>(null)
    const { notification } = useNotification()

    const [sendVerificationCode, sendVerificationCodeResult] =
        RtoApi.Students.useSendVerificationCode()

    const onFileChange = async (e: any, fileData: any) => {
        const validMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ]
        if (!validMimeTypes.includes(fileData?.type)) {
            notification.error({
                title: 'Invalid File',
                description: 'File should be .csv or .xlsx',
            })
            return
        } else {
            const reader = new FileReader()
            const workbook = new ExcelJS.Workbook()

            reader.onload = async (event: any) => {
                const buffer = event.target.result
                await workbook.xlsx.load(buffer)

                const worksheet: any = workbook.getWorksheet(
                    workbook?.worksheets?.[0]?.name
                )
                const rows: any = []

                const headerRow = worksheet.getRow(1)
                const headers = headerRow.values.slice(1)

                worksheet.eachRow((row: any, rowNumber: any) => {
                    if (rowNumber > 1) {
                        // skip header row
                        const rowObject: any = {}
                        row.values
                            .slice(1)
                            .forEach((cell: any, index: number) => {
                                rowObject[headers[index]] = cell
                            })
                        rows.push(rowObject)
                    }
                })
            }

            reader.readAsArrayBuffer(fileData)
        }
    }

    const onSetImportListResult = useCallback((list: any) => {
        setImportListResult(list)
    }, [])

    const onCancel = () => setModal(null)

    const onSubmit = () => {
        sendVerificationCode({ listing: true }).then((res: any) => {
            if (res?.data) {
                setModal(
                    <ImportIndustriesListVerificationModal
                        onCancel={onCancel}
                        industries={industries}
                        onSetImportListResult={onSetImportListResult}
                    />
                )
            }
        })
    }

    const duplicatedIndustries = (source: string) =>
        importListResult?.errorMails?.filter(
            (ind: { source: string }) => ind?.source === source
        )
    return (
        <div>
            {modal}
            <ShowErrorNotifications result={sendVerificationCodeResult} />
            <BinaryFileUpload
                name="list"
                onChange={onFileChange}
                fileAsObject={false}
                // result={importListResult}
                // acceptTypes={['.xlsx, .csv']}
            />
            <div className="flex items-center justify-end mt-2">
                <Button
                    text={'Upload'}
                    onClick={onSubmit}
                    loading={sendVerificationCodeResult.isLoading}
                    disabled={
                        sendVerificationCodeResult.isLoading ||
                        industriesCount > 100
                    }
                />
            </div>

            <div className="mt-5">
                {importListResult?.errorMails &&
                importListResult?.errorMails?.length > 0 ? (
                    <div className="flex flex-col gap-y-1">
                        {duplicatedIndustries('listing') &&
                            duplicatedIndustries('listing')?.length > 0 && (
                                <div>
                                    <Typography
                                        variant={'label'}
                                        semibold
                                        color={'text-gray-800'}
                                    >
                                        Emails Already Being Used in Industries
                                        Listing
                                    </Typography>
                                    {duplicatedIndustries('listing')?.map(
                                        (ind: { email: string }) => (
                                            <div className="bg-gray-100 rounded-md px-3 py-1">
                                                <Typography
                                                    variant={'small'}
                                                    color={'text-red-500'}
                                                >
                                                    {ind?.email}
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                        {duplicatedIndustries('signed-up') &&
                            duplicatedIndustries('signed-up')?.length > 0 && (
                                <div>
                                    <Typography
                                        variant={'label'}
                                        semibold
                                        color={'text-gray-800'}
                                    >
                                        Emails Already Being Used in Industries
                                    </Typography>
                                    {duplicatedIndustries('signed-up')?.map(
                                        (ind: { email: string }) => (
                                            <div className="bg-gray-100 rounded-md px-3 py-1">
                                                <Typography
                                                    variant={'small'}
                                                    color={'text-red-500'}
                                                >
                                                    {ind?.email}
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
