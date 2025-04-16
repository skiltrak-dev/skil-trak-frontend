import React, { useEffect, useState } from 'react'
import { SubAdminApi } from '@queries'
import { AssessmentEvidenceDetailType, Folder, Rto } from '@types'
import { DocumentView } from './DocumentView'
import { BackButton, LoadingAnimation, NoData } from '@components'
import { queryToUrl } from '@utils'

export const PreviewAsSignerTemplate = ({
    rto,
    folder,
    goBack,
    userIds,
    template,
}: {
    rto: Rto
    userIds: any
    template: any
    folder: AssessmentEvidenceDetailType | null
    goBack: () => void
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const [pdfBytes, setPdfBytes] = useState<any>()
    useEffect(() => {
        const getPdfBytes = async () => {
            try {
                setIsLoading(true)
                setIsError(false)
                const response = await fetch(
                    `${
                        process.env.NEXT_PUBLIC_END_POINT
                    }/esign/template/get-updated/${
                        template?.id
                    }?users=${Object.values(userIds)?.join(',')}&userId=${
                        rto?.user?.id
                    }`
                )
                const pdfData = await response.arrayBuffer()
                setPdfBytes(new Uint8Array(pdfData))
                setIsLoading(false)
                setIsSuccess(true)
            } catch (error) {
                setIsError(true)
                setIsLoading(false)
            }
        }
        getPdfBytes()
    }, [])

    return (
        <div>
            <BackButton onClick={() => goBack()} />
            {isError && <NoData text="There is some technical issue" isError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : pdfBytes ? (
                <DocumentView file={{ data: pdfBytes }} />
            ) : (
                isSuccess && <NoData text="There is no Template" />
            )}
        </div>
    )
}
