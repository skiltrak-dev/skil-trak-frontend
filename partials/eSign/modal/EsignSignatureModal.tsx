import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import jwt from 'jwt-decode'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import ReactSignatureCanvas from 'react-signature-canvas'
import { DocumentSignature } from '../components'

export const EsignSignatureModal = ({
    tab,
    action,
    onCancel,
    customFieldsData,
}: {
    tab: any
    action?: any
    onCancel: (cancel?: boolean) => void
    customFieldsData: any
}) => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const ref = useRef<ReactSignatureCanvas>()

    const { notification } = useNotification()

    console.log({ bundData: customFieldsData })

    const [signDocument, signDocumentResult] = action
        ? action()
        : CommonApi.ESign.useSignDocumentByUser()

    const onClear = () => {
        ref?.current?.clear()
    }

    const setModalModal = () => setModal(null)

    useEffect(() => {
        if (signDocumentResult?.isSuccess) {
            console.log({ tab })
            if (tab && tab?.responses && tab?.responses?.length > 0) {
                onCancel()
            }
        }
    }, [signDocumentResult, tab])

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
            }).then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Signed',
                        description: 'Signed',
                    })
                    console.log({ signsignsignsign: tab })
                }
            })
        }
    }
    return (
        <GlobalModal>
            {modal}
            <ShowErrorNotifications result={signDocumentResult} />
            <div className="p-3 md:p-8">
                <div>
                    <div className="flex justify-end">
                        <MdCancel
                            onClick={() => {
                                onCancel(true)
                            }}
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
