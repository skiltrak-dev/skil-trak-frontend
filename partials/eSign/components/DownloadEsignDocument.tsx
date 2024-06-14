import { Button } from '@components'
import { isBrowser } from '@utils'
import { useRouter } from 'next/router'

export const DownloadEsignDocument = () => {
    const router = useRouter()

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
                }}
            />
        </div>
    )
}
