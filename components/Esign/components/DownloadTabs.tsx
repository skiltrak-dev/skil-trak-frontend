import { Button } from '@components/buttons'
import { isBrowser } from '@utils'
import { useRouter } from 'next/router'
import React from 'react'

export const DownloadTabs = () => {
    const router = useRouter()
    return (
        <div className="mt-3">
            <Button
                text="Download Tabs"
                variant="info"
                outline
                onClick={() => {
                    // onDownladTabs()
                    if (isBrowser()) {
                        window.open(
                            `${
                                process.env.NEXT_PUBLIC_END_POINT
                            }/esign/document/tabs/download/${Number(
                                router.query?.id
                            )}`
                        )
                    }
                }}
            />
        </div>
    )
}
