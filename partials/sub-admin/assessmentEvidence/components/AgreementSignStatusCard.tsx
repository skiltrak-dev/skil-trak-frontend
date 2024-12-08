import {
    ActionButton,
    AuthorizedUserComponent,
    Switch,
    Tooltip,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import {
    FillEsignFieldsModal,
    SubmitDocumentModal,
} from '@partials/common/StudentProfileDetail/modals'
import { getStatusColor } from '@partials/sub-admin/eSign/components'
import { CommonApi } from '@queries'
import { EsignDocumentStatus } from '@utils'
import moment from 'moment'
import { ReactElement, useMemo, useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { RiMailSendLine } from 'react-icons/ri'
import { RequestResign, ResendMailModal } from '../modal'

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

    const fillDocumentFields = () => {
        setModal(
            <FillEsignFieldsModal
                documentId={document?.id}
                onCancel={onCancelClicked}
                signerId={signer?.user?.id}
            />
        )
    }

    const onSubmitDocClicked = (signerUser: number) => {
        setModal(
            <SubmitDocumentModal
                onCancel={(isOpen?: boolean) => {
                    if (isOpen) {
                        fillDocumentFields()
                    } else {
                        onCancelClicked()
                    }
                }}
            />
        )
    }

    const AllResponse = signer?.document?.template?.tabs?.find(
        (t: any) => t?.type === 'date'
    )?.responses

    const signResponse = useMemo(() => {
        return AllResponse?.reduce(
            (latest: any, current: any) =>
                new Date(current?.createdAt) > new Date(latest?.createdAt)
                    ? current
                    : latest,
            AllResponse?.[0]
        )
    }, [AllResponse])

    return (
        <>
            {modal}
            <div
                className={`${backgroundClass} rounded-md px-2 py-1.5 border-dashed border border-primaryNew`}
            >
                <div className="flex gap-x-5">
                    <div className="flex flex-col gap-y-1">
                        <div className="">
                            <Typography
                                variant="small"
                                bold
                                color="text-gray-400"
                                capitalize
                            >
                                {signer?.user?.role ?? 'NA'}
                            </Typography>
                        </div>
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
                                        Document Status
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
                                        Finish Date
                                    </Typography>
                                    <Typography variant="muted" semibold>
                                        {signer.status ===
                                        EsignDocumentStatus.SIGNED
                                            ? moment(signer?.updatedAt).format(
                                                  'DD MMM, YYYY'
                                              )
                                            : 'Not Submitted'}
                                    </Typography>
                                </div>
                            </div>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <div className="border-r border-gray-300">
                                    <Typography
                                        variant="xs"
                                        color="text-gray-400"
                                    >
                                        Resign Document
                                    </Typography>
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
                                </div>
                            </AuthorizedUserComponent>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <div className="relative group border-r border-gray-300">
                                    <Typography
                                        variant="xs"
                                        color="text-gray-400"
                                    >
                                        Resend Email
                                    </Typography>
                                    <ActionButton
                                        mini
                                        Icon={RiMailSendLine}
                                        variant="info"
                                        disabled={
                                            signer?.status !==
                                            EsignDocumentStatus.SIGNED
                                                ? false
                                                : true
                                        }
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
                                <div className="border-r border-gray-300">
                                    <Typography
                                        variant="xs"
                                        color="text-gray-400"
                                    >
                                        Reminder
                                    </Typography>
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
                                </div>
                            </AuthorizedUserComponent>

                            <div className="border-r border-gray-300">
                                <Typography variant="xs" color="text-gray-400">
                                    Sign Status
                                </Typography>
                                <Typography
                                    variant="muted"
                                    color={getStatusColor(
                                        signResponse?.id ? 'signed' : 'pending'
                                    )}
                                    semibold
                                >
                                    {signResponse?.id ? 'Signed' : 'Pending'}
                                </Typography>
                            </div>

                            <div className="border-r border-gray-300">
                                <Typography variant="xs" color="text-gray-400">
                                    Sign Date
                                </Typography>
                                <Typography variant="muted" semibold>
                                     {signResponse?.id
                                        ? moment(
                                              signResponse?.data ||
                                                  signer?.updatedAt
                                          ).format('DD MMM, YYYY')
                                        : 'Not Signed'}
                                    {/* {moment(signer?.createdAt).format(
                                        'DD MMM, YYYY'
                                    )} */}
                                </Typography>
                            </div>
                            <AuthorizedUserComponent
                                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                            >
                                <div className="relative group">
                                    <Typography
                                        variant="xs"
                                        color="text-gray-400"
                                    >
                                        Edit/Submit Document
                                    </Typography>
                                    <ActionButton
                                        mini
                                        Icon={IoMdSend}
                                        variant="info"
                                        // disabled={
                                        //     signResponse?.id ? false : true
                                        // }
                                        onClick={() => {
                                            // if (signResponse?.id) {
                                            onSubmitDocClicked(signer?.user?.id)
                                            // }
                                        }}
                                        // className={`text-xl ml-5 ${
                                        //     signResponse?.id &&
                                        //     signer?.status !==
                                        //         EsignDocumentStatus.SIGNED
                                        //         ? 'cursor-pointer text-primary'
                                        //         : 'cursor-not-allowed text-muted'
                                        // }`}
                                    />

                                    {signResponse?.id &&
                                    signer?.status !==
                                        EsignDocumentStatus.SIGNED ? (
                                        <Tooltip>Submit Document</Tooltip>
                                    ) : null}
                                </div>
                            </AuthorizedUserComponent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
