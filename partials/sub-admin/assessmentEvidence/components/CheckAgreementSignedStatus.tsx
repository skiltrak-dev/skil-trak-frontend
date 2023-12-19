import { AuthorizedUserComponent, Button, Typography } from '@components'
import moment from 'moment'
import React, { ReactElement, ReactNode, useState } from 'react'
import { EsignDocumentStatus, getUserCredentials } from 'utils'
import { InitiateSigningModal, RequestResign } from '../modal'
import { UserRoles } from '@constants'

export const CheckAgreementSignedStatus = ({
    document,
    documentSigned,
}: {
    documentSigned: EsignDocumentStatus
    document: any
}) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const onCancelClicked = () => setModal(null)

    const onRequestResign = (eSign: any) => {
        setModal(<RequestResign onCancel={onCancelClicked} eSign={eSign} />)
    }

    const role = getUserCredentials()?.role
    return (
        <div>
            {modal}
            <div className="flex justify-center items-center border-2 border-dashed m-3 px-4 py-2">
                <div>
                    <div className="flex flex-col gap-y-1">
                        <Typography
                            color="text-muted-dark"
                            variant="label"
                            bold
                        >
                            {documentSigned === EsignDocumentStatus.SIGNED
                                ? 'Document Signed'
                                : 'Waiting For Signing'}
                        </Typography>
                        <Typography variant="small" color="text-muted-dark">
                            Your document is being signed by concerned parties.
                            Once the signing is completed, your document will be
                            available for download.
                        </Typography>
                    </div>

                    <div className="mt-4 p-2">
                        <div
                            className={`grid ${
                                role === UserRoles.ADMIN ||
                                role === UserRoles.SUBADMIN
                                    ? 'grid-cols-4'
                                    : 'grid-cols-3'
                            }  py-1`}
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
                        </div>

                        {document?.signers?.map((signer: any, i: number) => (
                            <>
                                <div
                                    className={`grid ${
                                        role === UserRoles.ADMIN ||
                                        role === UserRoles.SUBADMIN
                                            ? 'grid-cols-4'
                                            : 'grid-cols-3'
                                    } border-t-2 border-[#D9D9D9] py-2`}
                                >
                                    <Typography
                                        variant="small"
                                        color={'text-muted-dark'}
                                        medium
                                        capitalize
                                    >
                                        {signer?.user?.role}
                                    </Typography>
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
                                        <Typography
                                            variant="small"
                                            color={
                                                signer?.status ===
                                                EsignDocumentStatus.SIGNED
                                                    ? 'text-primary'
                                                    : 'text-muted'
                                            }
                                            medium
                                        >
                                            <span
                                                onClick={() => {
                                                    if (
                                                        signer?.status ===
                                                        EsignDocumentStatus.SIGNED
                                                    ) {
                                                        onRequestResign({
                                                            ...signer,
                                                            template:
                                                                document?.template,
                                                            document:
                                                                document?.id,
                                                        })
                                                    }
                                                }}
                                                className={`${
                                                    signer?.status ===
                                                    EsignDocumentStatus.SIGNED
                                                        ? 'cursor-pointer'
                                                        : 'cursor-not-allowed'
                                                }`}
                                            >
                                                Request Resign
                                            </span>
                                        </Typography>
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
