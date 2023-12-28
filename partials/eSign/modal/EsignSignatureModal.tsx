import {
    BackButton,
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import React, { useEffect, useRef } from 'react'
import { DocumentSignature } from '../components'
import ReactSignatureCanvas from 'react-signature-canvas'
import { MdCancel } from 'react-icons/md'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { useNotification } from '@hooks'
import jwt from 'jwt-decode'

export const EsignSignatureModal = ({
    tab,
    action,
    onCancel,
}: {
    tab: any
    action?: any
    onCancel: () => void
}) => {
    const router = useRouter()

    const ref = useRef<ReactSignatureCanvas>()

    const { notification } = useNotification()

    const [signDocument, signDocumentResult] = action
        ? action()
        : CommonApi.ESign.useSignDocumentByUser()

    useEffect(() => {
        if (signDocumentResult.isSuccess) {
            notification.success({
                title: 'Signed',
                description: 'Signed',
            })
            onCancel()
        }
    }, [signDocumentResult])

    const onClear = () => {
        ref?.current?.clear()
    }

    const onSubmit = async () => {
        var dataURL = ref?.current?.toDataURL('image/jpg+xml')
        const token: any = router.query?.token
            ? await jwt(String(router.query?.token))
            : {}

        if (!ref?.current?.isEmpty()) {
            await signDocument({
                tabId: tab?.id,
                signature: String(dataURL),
                documentId: Number(router.query?.id),
                ...(action
                    ? {
                          id: token?.id,
                      }
                    : {}),
            })
        }
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={signDocumentResult} />
            <div className="p-8">
                <div>
                    <div className="flex justify-end">
                        <MdCancel
                            onClick={onCancel}
                            className="transition-all duration-500 text-gray-400 hover:text-black text-2xl cursor-pointer hover:rotate-90"
                        />
                    </div>
                    <Typography color="text-[#6B7280]" variant="label" medium>
                        Please sign in given here
                    </Typography>
                    <div className="mt-4">
                        <DocumentSignature ref={ref} />
                    </div>
                    <div className="flex justify-end mt-4 gap-x-2">
                        <Button onClick={onClear} variant="secondary">
                            Clear
                        </Button>
                        <Button
                            text="Sign Document"
                            onClick={() => onSubmit()}
                            loading={signDocumentResult.isLoading}
                            disabled={signDocumentResult.isLoading}
                        />
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
