import { Button } from '@components'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { CheckAgreementSignedStatus } from '@partials/sub-admin/assessmentEvidence'
import { EsignDocumentStatus, getUserCredentials } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

type Props = { selectedFolder: any }

export const WorkplaceAgreementDetail = ({ selectedFolder }: Props) => {
    const router = useRouter()

    const getRoute = (id: number) => {
        const role = getUserCredentials()?.role
        if (role === UserRoles.RTO) {
            return `/portals/rto/tasks/e-sign/${id}`
        }
        if (role === UserRoles.INDUSTRY) {
            return `/portals/industry/students/e-sign/${id}`
        }
        if (role === UserRoles.STUDENT) {
            return `/portals/student/assessments/e-sign/${id}`
        }
        if (role === UserRoles.SUBADMIN) {
            return `/portals/sub-admin/e-sign/${id}`
        }
    }

    const signerStatus = selectedFolder?.signers?.find(
        (signer: any) => signer?.user?.role === getUserCredentials()?.role
    )
    return (
        <div>
            <div className="p-2 flex justify-between items-center border-b">
                <div className="flex items-center gap-x-1">
                    <div>
                        <Typography variant="subtitle" color="text-neutral-900">
                            {selectedFolder?.template?.name}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="label" color="text-neutral-400">
                            - Viewer
                        </Typography>
                    </div>
                </div>

                <div>
                    <Typography variant="muted" color="text-gray-400">
                        Filed On:{' '}
                        {moment(selectedFolder?.createdAt).format(
                            'DD MMM, YYYY'
                        )}
                    </Typography>
                </div>
            </div>
            <div className="pt-2 px-4 min-h-[360px]">
                <CheckAgreementSignedStatus
                    document={selectedFolder}
                    documentSigned={signerStatus?.status}
                />
                <div className="flex gap-x-2 justify-end p-4">
                    {/* <Button
                            variant="error"
                            outline
                            text="Clear Signature"
                        /> */}
                    <Button
                        variant="success"
                        text={
                            signerStatus?.status === EsignDocumentStatus.SIGNED
                                ? 'View Document'
                                : 'Sign Document'
                        }
                        onClick={() => {
                            const route = getRoute(selectedFolder?.id)
                            if (route) {
                                router.push(route)
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
