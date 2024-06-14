import { AuthorizedUserComponent, Tooltip, Typography } from '@components'
import { UserRoles } from '@constants'
import { EsignDocumentStatus, getUserCredentials } from '@utils'
import moment from 'moment'
import { ReactNode, useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { TiUser } from 'react-icons/ti'
import { RequestResign, ResendMailModal } from '../modal'
import { RiMailSendLine } from 'react-icons/ri'
import { FaSignature } from 'react-icons/fa'

export const CheckAgreementSignedStatus = ({
    document,
    documentSigned,
}: {
    document: any
    documentSigned: EsignDocumentStatus
}) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const onCancelClicked = () => setModal(null)

    const onRequestResign = (eSign: any) => {
        setModal(<RequestResign onCancel={onCancelClicked} eSign={eSign} />)
    }
    const onResendMailClicked = (signerId: number) => {
        setModal(
            <ResendMailModal
                onCancel={onCancelClicked}
                documentId={document?.id}
                signerId={signerId}
            />
        )
    }

    const role = getUserCredentials()?.role

    console.log({ document })
    return (
        <div>
            {modal}
            <div className="flex justify-center items-center border-2 border-dashed m-3 px-4 py-0.5">
                <div>
                    <div className="flex flex-col gap-y-1">
                        <Typography
                            color="text-muted-dark"
                            variant="label"
                            bold
                        >
                            {documentSigned === EsignDocumentStatus.SIGNED
                                ? 'Document Signed'
                                : 'Awaiting Signature'}
                        </Typography>
                        <Typography variant="small" color="text-muted-dark">
                            Your document is currently undergoing signature from
                            the necessary parties. Upon completion of the
                            signing process, your document will be ready for
                            download. Thank you for your patience.
                        </Typography>
                    </div>

                    <div className="mt-1 p-1">
                        <div
                            className={`grid ${
                                role === UserRoles.ADMIN ||
                                role === UserRoles.SUBADMIN
                                    ? 'grid-cols-5'
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
                                    Resend Mail
                                </Typography>
                            </AuthorizedUserComponent>
                        </div>

                        {document?.signers?.map((signer: any, i: number) => (
                            <>
                                <div
                                    className={`grid ${
                                        role === UserRoles.ADMIN ||
                                        role === UserRoles.SUBADMIN
                                            ? 'grid-cols-5'
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
                                                    onResendMailClicked(
                                                        signer?.user?.id
                                                    )
                                                }}
                                                className=" text-xl text-primary ml-5 cursor-pointer"
                                            />
                                            <Tooltip>Resend Email</Tooltip>
                                        </div>
                                    </AuthorizedUserComponent>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
