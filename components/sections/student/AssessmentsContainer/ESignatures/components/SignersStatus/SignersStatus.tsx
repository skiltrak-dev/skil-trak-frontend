import { Typography } from '@components/Typography'
import { EsignDocumentStatus, getUserCredentials } from '@utils'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { SignerCard } from './SignerCard'
import { Button } from '@components/buttons'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'

export const SignersStatus = ({ selectedFolder }: { selectedFolder: any }) => {
    const router = useRouter()

    const signerStatus = selectedFolder?.signers?.find(
        (signer: any) => signer?.user?.role === getUserCredentials()?.role
    )
    const documentSigned = signerStatus?.status

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
    return (
        <div>
            <div className="relative py-2.5 border-b border-secondary-dark">
                <div className="absolute top-1/2 -translate-y-1/2 right-6">
                    <Typography variant="muted" color="text-gray-400">
                        Filed On:{' '}
                        {moment(selectedFolder?.createdAt).format(
                            'DD MMM, YYYY'
                        )}
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-1.5">
                    <Image
                        src={'/images/esignDoc.png'}
                        alt={''}
                        width={20}
                        height={20}
                    />
                    <Typography
                        variant="label"
                        color="text-primaryNew"
                        semibold
                        capitalize
                    >
                        {selectedFolder?.template?.name}
                    </Typography>
                    <Typography variant="small" color="text-[#767F8C]">
                        Document
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div className="flex flex-col justify-center items-center gap-y-1 py-3">
                <Typography color="text-muted-dark" variant="label" bold>
                    {documentSigned === EsignDocumentStatus.SIGNED
                        ? 'Document Signed'
                        : 'Waiting For Signing'}
                </Typography>
                <Typography variant="small" color="text-muted-dark" center>
                    {documentSigned === EsignDocumentStatus.SIGNED
                        ? 'Congratulations! Your document has been successfully signed by all relevant parties. You can now download the finalized document. Thank you for your patience throughout this process.'
                        : ' Your document is being signed by the relevant parties. Once the signing process is complete, your document will be available for download.Thank You For your Patience'}
                </Typography>
            </div>

            {/*  */}
            <div className="px-3.5">
                <div className="border border-dashed border-secondary-dark rounded-[10px] px-5 py-3.5">
                    <Typography
                        variant="small"
                        color="text-[#18191C]"
                        bold
                        center
                    >
                        Signers
                    </Typography>
                    <div className="pt-3.5 flex items-center justify-center gap-x-1.5">
                        {selectedFolder?.signers?.map(
                            (signer: any, i: number) => (
                                <SignerCard signer={signer} key={i} />
                            )
                        )}
                    </div>
                </div>

                {/*  */}
            </div>

            {/*  */}
            <div className="flex gap-x-2 justify-center p-4">
                {/* <Button
                            variant="error"
                            outline
                            text="Clear Signature"
                        /> */}
                <Button
                    variant="primaryNew"
                    outline
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
            {/* <div className="p-2 flex justify items-center border-b"> */}
            {/* <div>
                    <Typography variant="muted" color="text-gray-400">
                        Filed On:{' '}
                        {moment(selectedFolder?.createdAt).format(
                            'DD MMM, YYYY'
                        )}
                    </Typography>
                </div> */}
            {/* </div> */}
        </div>
    )
}
