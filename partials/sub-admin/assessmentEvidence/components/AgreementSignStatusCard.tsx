import {
    AuthorizedUserComponent,
    Switch,
    Tooltip,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { getStatusColor } from '@partials/sub-admin/eSign/components'
import { CommonApi } from '@queries'
import { ReactElement, useState } from 'react'
import { RequestResign, ResendMailModal } from '../modal'
import { FaSignature } from 'react-icons/fa'
import { EsignDocumentStatus } from '@utils'
import { RiMailSendLine } from 'react-icons/ri'
import moment from 'moment'

export const AgreementSignStatusCard = ({
    signer,
    document,
}: {
    signer: any
    document: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [toggleReminderEmail, toggleReminderEmailResult] =
        CommonApi.ESign.useToggleReminderEmail()
    // #128C7F1A

    const getPhoneNumber = (user: any) => {
        if (!user) return 'NA'

        switch (user?.role) {
            case UserRoles.INDUSTRY:
                return user.industry?.phoneNumber ?? 'NA'
            case UserRoles.STUDENT:
                return user.student?.phone ?? 'NA'
            case UserRoles.RTO:
                return user.rto?.phone ?? 'NA'
            default:
                return 'NA'
        }
    }

    const getBackgroundClass = (status: string) => {
        if (status === 'signed') {
            return 'bg-[#128C7F1A]'
        }
        return 'bg-[#24556d0d] bg-opacity-5'
    }
    const backgroundClass = getBackgroundClass(signer?.status)
    const phoneNumber = getPhoneNumber(signer?.user)

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

    return (
        <>
            {modal}
            <div
                className={`${backgroundClass} rounded-md px-2 py-1.5 border-dashed border border-primaryNew`}
            >
                <div className="mb-2">
                    <Typography
                        variant="small"
                        bold
                        color="text-gray-400"
                        capitalize
                    >
                        {signer?.user?.role ?? 'NA'}
                    </Typography>
                </div>

                <div className="flex justify-between gap-x-5">
                    <div className="flex flex-col gap-y-1 justify-center">
                        <div>
                            <Typography variant="small" semibold>
                                {signer?.user?.name ?? 'NA'}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="xs" color="text-gray-400">
                                {signer?.user?.email ?? 'NA'}
                            </Typography>
                        </div>
                    </div>

                    <div className=" flex flex-col gap-y-2">
                        <div className="grid grid-cols-4 gap-3 border-b border-gray-300 pb-2">
                            <div className="border-r border-gray-300 pr-3">
                                <div>
                                    <Typography
                                        variant="xs"
                                        color="text-gray-400"
                                    >
                                        Status
                                    </Typography>
                                    <Typography
                                        variant="muted"
                                        color={getStatusColor(signer?.status)}
                                        semibold
                                    >
                                        {signer?.status || 'NA'}
                                    </Typography>
                                </div>
                            </div>
                            <div className="border-r border-gray-300 pr-3">
                                <div>
                                    <Typography
                                        variant="xs"
                                        color="text-gray-400"
                                    >
                                        Dated
                                    </Typography>
                                    <Typography variant="muted" semibold>
                                        {signer.status ===
                                        EsignDocumentStatus.SIGNED
                                            ? moment(signer?.updatedAt).format(
                                                  'DD MMM, YYYY'
                                              )
                                            : 'Not Signed'}
                                    </Typography>
                                </div>
                            </div>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
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
                                                template: document?.template,
                                                document: document?.id,
                                            })
                                        }
                                    }}
                                />
                            </AuthorizedUserComponent>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
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
                                        className={`text-xl ml-5 ${
                                            signer?.status !==
                                            EsignDocumentStatus.SIGNED
                                                ? 'cursor-pointer text-primary'
                                                : 'cursor-not-allowed text-muted'
                                        }`}
                                    />
                                    <Tooltip>
                                        {signer?.status !==
                                        EsignDocumentStatus.SIGNED
                                            ? 'Resend Email'
                                            : 'Document Signed'}
                                    </Tooltip>
                                </div>
                            </AuthorizedUserComponent>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <Switch
                                    name="toggleReminderEmail"
                                    customStyleClass={'profileSwitch'}
                                    onChange={() => {
                                        toggleReminderEmail(signer?.id)
                                    }}
                                    value={signer?.isReminderEnabled}
                                    defaultChecked={signer?.isReminderEnabled}
                                />
                            </AuthorizedUserComponent>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <Typography variant="xs" color="text-gray-400">
                                    Status
                                </Typography>
                            </AuthorizedUserComponent>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <Typography variant="xs" color="text-gray-400">
                                    Submit Sign
                                </Typography>
                            </AuthorizedUserComponent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
