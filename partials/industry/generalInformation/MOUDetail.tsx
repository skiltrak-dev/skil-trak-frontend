import { useRef, useState, useEffect } from 'react'
import { MOUDetailContainer } from '@components/MOU'
import ReactSignatureCanvas from 'react-signature-canvas'
import { useRouter } from 'next/router'

// query
import {
    useCreateMouByIndustryMutation,
    useGetDefaultMouContentQuery,
    useGetIndustryMOUDetailQuery,
    useAcceptMouByIndustryMutation,
} from '@queries'
import { useNotification } from '@hooks'

export const IndustryMOUDetail = () => {
    const router = useRouter()
    const id = router.query.mouId

    const ref = useRef<ReactSignatureCanvas>(null)

    const [content, setContent] = useState<any | null>(null)

    const { notification } = useNotification()

    const getMou = useGetIndustryMOUDetailQuery(String(id), { skip: !id })
    const [createMou, createMouResult] = useCreateMouByIndustryMutation()
    const [acceptMou, acceptMouResult] = useAcceptMouByIndustryMutation()
    const defaultMou = useGetDefaultMouContentQuery(null, {
        skip: getMou?.data,
    })

    useEffect(() => {
        if (createMouResult.isSuccess || acceptMouResult.isSuccess) {
            setTimeout(() => {
                router.push('/portals/industry/general-information/mou')
            }, 1500)
        }
    }, [createMouResult.isSuccess, acceptMouResult.isSuccess, router])

    const onSubmit = async () => {
        var dataURL = ref?.current?.toDataURL('image/svg+xml')
        if (!ref?.current?.isEmpty()) {
            if (getMou.data) {
                await acceptMou({
                    industrySignature: dataURL,
                    id,
                })
            } else {
                // Create Mou
                if (content) {
                    await createMou({
                        industrySignature: dataURL,
                        content: JSON.stringify(content),
                        rto: id,
                    })
                } else {
                    notification.error({
                        title: 'Content Must be provided',
                        description: 'Content Must be provided',
                    })
                }
            }
        } else {
            notification.error({
                title: 'Signature Must be provided',
                description: 'Signature Must be provided',
            })
        }
    }
    return (
        <div>
            <MOUDetailContainer
                id={id}
                ref={ref}
                role={'industry'}
                isSigned={getMou?.data?.industrySignature}
                createMouResult={createMouResult}
                acceptMouResult={acceptMouResult}
                defaultMou={defaultMou}
                getMouResult={getMou}
                content={content}
                setContent={setContent}
                onSubmit={onSubmit}
            />
        </div>
    )
}
