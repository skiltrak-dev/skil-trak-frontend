import { Button, TableAction, TableActionOption } from '@components'
import { UserRoles } from '@constants'
import {
    EsignDocumentStatus,
    checkListLength,
    getUserCredentials,
} from '@utils'
import { useRouter } from 'next/router'
import React from 'react'

export const EsignAction = ({
    data,
    index,
    rowData,
    tableActionOptions,
}: {
    data: any
    index: any
    rowData: any
    tableActionOptions: TableActionOption[]
}) => {
    const router = useRouter()

    const signersRoles = rowData?.signers?.map(
        (signer: any) => signer?.user?.role
    )

    const coordinator = rowData?.signers?.find(
        (s: any) => s?.user?.role === UserRoles.SUBADMIN
    )
    console.log({ tableActionOptions })
    const id = getUserCredentials()?.id
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-[135px]">
                {signersRoles.includes(UserRoles.SUBADMIN) &&
                    coordinator?.user?.id === id && (
                        <Button
                            text={
                                coordinator?.status ===
                                EsignDocumentStatus.SIGNED
                                    ? 'View Document'
                                    : 'Sign Document'
                            }
                            onClick={() => {
                                router.push(
                                    `/portals/sub-admin/e-sign/${rowData?.id}`
                                )
                            }}
                        />
                    )}
            </div>
            <div className="flex gap-x-1 items-center">
                <TableAction
                    options={tableActionOptions}
                    rowItem={rowData}
                    lastIndex={checkListLength<any>(data as any)?.includes(
                        index
                    )}
                />
            </div>
        </div>
    )
}
