import {
    Button,
    GlobalModal,
    InitialAvatar,
    Modal,
    Typography,
} from '@components'
import { useRouter } from 'next/router'

export const ViewUsersForEsignModal = ({
    documents,
    onClick,
    route,
    onCancel,
}: {
    documents: any
    onClick: () => void
    route: string
    onCancel?: any
}) => {
    const router = useRouter()

    return (
        <Modal
            showActions={false}
            {...(onCancel
                ? {
                      onCancelClick: onCancel,
                  }
                : {})}
            onCancelClick={onCancel}
            title="Following documents are pending to be signed"
            subtitle={`${documents?.length} Pending Documents Esigns`}
        >
            <div className="px-2 max-h-[85vh] overflow-auto custom-scrollbar">
                <div>
                    <div className="mt-3.5">
                        {documents?.map((document: any) => (
                            <div className="pb-2">
                                <div className="grid grid-cols-2 gap-1.5">
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Template
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {' '}
                                            {document?.template?.name}{' '}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Course
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {document?.template?.course?.title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Folder
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {document?.template?.folder?.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 ">
                                    {document?.signers?.map((signer: any) => (
                                        <div className="flex items-center gap-x-1">
                                            {signer?.user?.name && (
                                                <InitialAvatar
                                                    name={signer?.user?.name}
                                                    imageUrl={
                                                        signer?.user?.avatar
                                                    }
                                                />
                                            )}
                                            <div>
                                                <h3 className="text-sm font-bold ">
                                                    {signer?.user?.name}
                                                </h3>
                                                <p className="text-xs text-gray-400">
                                                    {signer?.user?.email}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {signer?.user?.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-end gap-x-3 py-4 mt-1">
                                    <Button
                                        text={'Sign Document'}
                                        onClick={() => {
                                            router.push(
                                                `${route}/${document?.id}`
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            {onCancel && (
                                <Button
                                    text={'Sign Later'}
                                    onClick={() => {
                                        onCancel()
                                    }}
                                    outline
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
