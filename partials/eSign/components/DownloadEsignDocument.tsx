import { Button } from '@components'
import { CommonApi } from '@queries'
import { isBrowser } from '@utils'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const DownloadEsignDocument = () => {
    const router = useRouter()
    const [isDownload, setIsDownload] = useState<boolean>(false)

    const downloadEsignDocument = CommonApi.ESign.useDownloadEsignDocument(
        Number(router.query?.id),
        {
            skip: !router.query?.id || !isDownload,
        }
    )

    // useEffect(() => {
    //     if (
    //         downloadEsignDocument.isError ||
    //         downloadEsignDocument.isSuccess ||
    //         downloadEsignDocument.isUninitialized
    //     ) {
    //         setIsDownload(false)
    //     }
    //     if (downloadEsignDocument.isSuccess) {
    //         win
    //     }
    // }, [downloadEsignDocument])

    return (
        <div className="pb-2 flex justify-end">
            <Button
                variant="dark"
                text="Download Documnet"
                onClick={() => {
                    if (isBrowser()) {
                        window.open(
                            `${process.env.NEXT_PUBLIC_END_POINT}/esign/document/${router.query?.id}/download`
                        )
                    }
                    // downloadEsignDocument.refetch()
                    // setIsDownload(true)
                }}
            />
        </div>
    )
}
