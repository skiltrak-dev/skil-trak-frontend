import { Typography } from '@components'
import { EsignDocumentStatus, getUserCredentials, isBrowser } from '@utils'
import moment from 'moment'
import { ReactNode, useState } from 'react'
import { AgreementSignStatusCard } from './AgreementSignStatusCard'

export const CheckAgreementSignedStatus = ({
    document,
    documentSigned,
}: {
    document: any
    documentSigned: EsignDocumentStatus
}) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const onCancelClicked = () => setModal(null)

    const role = getUserCredentials()?.role

    return (
        <div>
            {modal}
            <div className="flex justify-center items-center border-2 border-dashed m-1 px-1 py-0.5">
                <div>
                    <div className="flex flex-col gap-y-1">
                        <div className="flex justify-between items-center gap-x-2">
                            <Typography
                                color="text-muted-dark"
                                variant="label"
                                bold
                            >
                                {documentSigned === EsignDocumentStatus.SIGNED
                                    ? 'Document Signed'
                                    : 'Awaiting Signature'}
                            </Typography>
                            <div className="bg-info px-2 py-0.5 rounded">
                                <Typography
                                    variant="small"
                                    color="text-white"
                                    bold
                                    cursorPointer
                                >
                                    <span
                                        onClick={() => {
                                            if (isBrowser()) {
                                                window.open(
                                                    `${process.env.NEXT_PUBLIC_END_POINT}/esign/document/${document?.id}/download`
                                                )
                                            }
                                            // downloadEsignDocument.refetch()
                                            // setIsDownload(true)
                                        }}
                                    >
                                        Download Document
                                    </span>
                                </Typography>
                            </div>
                        </div>

                        <Typography variant="small" color="text-muted-dark">
                            Your document was sent for signing on{' '}
                            {moment(document?.createdAt).format('DD, MM YYYY')}{' '}
                            and is currently undergoing signature from the
                            necessary parties. Once the signing process is
                            completed, your document will be available for
                            download. Thank you for your patience
                        </Typography>
                    </div>

                    <div className="mt-1 p-1">
                        {/* <div
                            className={`grid ${
                                role === UserRoles.ADMIN ||
                                role === UserRoles.SUBADMIN
                                    ? 'grid-cols-6'
                                    : 'grid-cols-3'
                            } items-center py-0.5`}
                        >
                            <Typography
                                variant="small"
                                color={'text-muted-dark'}
                            >
                                Signer
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-muted-dark'}
                            >
                                Status
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-muted-dark'}
                            >
                                Dated
                            </Typography>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <Typography
                                    variant="small"
                                    color={'text-muted-dark'}
                                >
                                    Resign
                                </Typography>
                            </AuthorizedUserComponent>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <Typography
                                    variant="small"
                                    color={'text-muted-dark'}
                                >
                                    Resend
                                </Typography>
                            </AuthorizedUserComponent>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <Typography
                                    variant="small"
                                    color={'text-muted-dark'}
                                >
                                    Reminder
                                </Typography>
                            </AuthorizedUserComponent>
                        </div> */}

                        <div className="flex flex-col gap-y-2">
                            {document?.signers?.map((signer: any) => (
                                <AgreementSignStatusCard
                                    signer={signer}
                                    document={document}
                                />
                            ))}
                        </div>

                        {/* {document?.signers?.map((signer: any, i: number) => (
                            <>
                                <div
                                    className={`grid ${
                                        role === UserRoles.ADMIN ||
                                        role === UserRoles.SUBADMIN
                                            ? 'grid-cols-6'
                                            : 'grid-cols-3'
                                    } border-t-2 border-[#D9D9D9] py-1`}
                                >
                                    <div>
                                        <Typography
                                            variant="xs"
                                            color={'text-black'}
                                            semibold
                                            uppercase
                                        >
                                            {signer?.user?.role}
                                        </Typography>
                                        <div className="flex items-center">
                                            <TiUser className="text-sm" />
                                            <Typography
                                                variant="xs"
                                                color={'text-gray-700'}
                                                medium
                                                capitalize
                                            >
                                                {signer?.user?.name}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center">
                                            <MdEmail className="text-sm min-w-4" />
                                            <Typography
                                                variant="xs"
                                                color={'text-gray-700'}
                                                medium
                                            >
                                                {signer?.user?.email}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography
                                        variant="small"
                                        color={
                                            signer.status ===
                                            EsignDocumentStatus.PENDING
                                                ? 'text-[#FB970C]'
                                                : 'text-green-400'
                                        }
                                        medium
                                        capitalize
                                    >
                                        {signer.status}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color={'text-muted-dark'}
                                        medium
                                    >
                                        {signer.status ===
                                        EsignDocumentStatus.SIGNED
                                            ? moment(signer?.updatedAt).format(
                                                  'DD MMM, YYYY'
                                              )
                                            : 'Not Signed'}
                                    </Typography>
                                    <AuthorizedUserComponent
                                        roles={[
                                            UserRoles.ADMIN,
                                            UserRoles.SUBADMIN,
                                        ]}
                                    >
                                        <FaSignature
                                            className={`text-2xl ${
                                                signer?.status ===
                                                EsignDocumentStatus.SIGNED
                                                    ? 'text-primary cursor-pointer'
                                                    : 'text-muted cursor-not-allowed'
                                            }`}
                                            onClick={() => {
                                                if (
                                                    signer?.status ===
                                                    EsignDocumentStatus.SIGNED
                                                ) {
                                                    onRequestResign({
                                                        ...signer,
                                                        template:
                                                            document?.template,
                                                        document: document?.id,
                                                    })
                                                }
                                            }}
                                        />
                                    </AuthorizedUserComponent>
                                    <AuthorizedUserComponent
                                        roles={[
                                            UserRoles.ADMIN,
                                            UserRoles.SUBADMIN,
                                        ]}
                                    >
                                        <div className="relative group">
                                            <RiMailSendLine
                                                onClick={() => {
                                                    if (
                                                        signer?.status !==
                                                        EsignDocumentStatus.SIGNED
                                                    ) {
                                                        onResendMailClicked(
                                                            signer?.user?.id
                                                        )
                                                    }
                                                }}
                                                className={`text-xl  ml-5 ${
                                                    signer?.status !==
                                                    EsignDocumentStatus.SIGNED
                                                        ? 'cursor-pointer text-primary'
                                                        : 'cursor-not-allowed text-muted'
                                                } `}
                                            />
                                            <Tooltip>
                                                {signer?.status !==
                                                EsignDocumentStatus.SIGNED
                                                    ? 'Resend Email'
                                                    : 'Document Signed'}
                                            </Tooltip>
                                        </div>
                                    </AuthorizedUserComponent>
                                    <AuthorizedUserComponent
                                        roles={[
                                            UserRoles.ADMIN,
                                            UserRoles.SUBADMIN,
                                        ]}
                                    >
                                        <Switch
                                            name="toggleReminderEmail"
                                            customStyleClass={'profileSwitch'}
                                            onChange={() => {
                                                toggleReminderEmail(signer?.id)
                                            }}
                                            value={signer?.isReminderEnabled}
                                            defaultChecked={
                                                signer?.isReminderEnabled
                                            }
                                        />
                                    </AuthorizedUserComponent>
                                </div>
                            </>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
