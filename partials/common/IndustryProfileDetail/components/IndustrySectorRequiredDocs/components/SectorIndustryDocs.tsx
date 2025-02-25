import { ShowErrorNotifications, Switch, Typography } from '@components'
import { useEffect, useState } from 'react'

// query
import { UserRoles } from '@constants'
import { IndustryApi } from '@queries'
import { Industry } from '@types'
import { getUserCredentials } from '@utils'

export const SectorIndustryDocs = ({
    doc,
    industry,
}: {
    doc: any
    industry: Industry
}) => {
    const [result, setResult] = useState(null)

    const [makeOptional, makeOptionalResult] =
        IndustryApi.Folders.addIndustrySectorDocsOptional()

    const onMakeOptional = async () => {
        try {
            const res: any = await makeOptional({
                id: doc?.id,
                userId: industry?.user?.id,
            })
            if (res?.error) {
                setResult(res)
            }
        } catch (e) {
            console.log({ e })
        }
    }

    const role = getUserCredentials()?.role
    const checkRto = role === UserRoles.RTO

    return (
        <>
            <ShowErrorNotifications result={result} />
            <div className="bg-gray-100 p-2 rounded-md flex justify-between items-center gap-x-4 my-1">
                <Typography variant={'label'}>{doc?.name}</Typography>
                <Switch
                    name={doc?.name}
                    value={doc?.isRequired}
                    defaultChecked={doc?.isRequired}
                    // defaultChecked={true}
                    customStyleClass={'profileSwitch'}
                    disabled={checkRto || makeOptionalResult?.isLoading}
                    loading={makeOptionalResult?.isLoading}
                    onChange={() => {
                        onMakeOptional()
                    }}
                    // setFieldValue={isRequiredForCustomField}
                    // disabled={!isChecked}
                />
            </div>
        </>
    )
}
