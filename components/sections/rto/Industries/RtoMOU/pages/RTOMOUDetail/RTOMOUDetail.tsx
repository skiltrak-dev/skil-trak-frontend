import React, { useRef, useState, useEffect } from 'react'
import { MOUDetailContainer } from '@components/MOU'
import ReactSignatureCanvas from 'react-signature-canvas'
import { useRouter } from 'next/router'

// query
import {
    useGetRtoMOUDetailQuery,
    useCreateMOUbyRTOMutation,
    useAcceptMOUbyRTOMutation,
    useGetDefaultMouContentQuery,
} from '@queries'
import { useNotification } from '@hooks'

export const RTOMOUDetail = () => {
    const router = useRouter()
    const id = router.query.mouDetail

    const ref = useRef<ReactSignatureCanvas>(null)

    const [content, setContent] = useState<any | null>(null)

    const { notification } = useNotification()

    const getMou = useGetRtoMOUDetailQuery(String(id), { skip: !id })
    const [createMou, createMouResult] = useCreateMOUbyRTOMutation()
    const [acceptMou, acceptMouResult] = useAcceptMOUbyRTOMutation()
    const defaultMou = useGetDefaultMouContentQuery(null, {
        skip: getMou?.data,
    })

    useEffect(() => {
        if (createMouResult.isSuccess || acceptMouResult.isSuccess) {
            setTimeout(() => {
                router.push('/portals/rto/industries/mous')
            }, 1500)
        }
    }, [createMouResult.isSuccess, acceptMouResult.isSuccess, router])

    const onSubmit = async () => {
        var dataURL = ref?.current?.toDataURL('image/svg+xml')
        if (!ref?.current?.isEmpty()) {
            if (getMou.data) {
                await acceptMou({
                    rtoSignature: dataURL,
                    id,
                })
            } else {
                // Create Mou
                if (content) {
                    await createMou({
                        rtoSignature: dataURL,
                        content: JSON.stringify(content),
                        industry: id,
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
                role={'rto'}
                ref={ref}
                content={content}
                onSubmit={onSubmit}
                getMouResult={getMou}
                setContent={setContent}
                defaultMou={defaultMou}
                createMouResult={createMouResult}
                acceptMouResult={acceptMouResult}
                isSigned={getMou?.data?.rtoSignature}
            />
        </div>
    )
}
