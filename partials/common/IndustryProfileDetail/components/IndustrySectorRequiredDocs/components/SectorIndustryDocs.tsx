import { useEffect, useState } from 'react'
import { Checkbox, ShowErrorNotifications, Switch } from '@components'

// query
import { Industry } from '@types'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { useAddOrUpdateRequiredDocumentMutation } from '@queries'

export const SectorIndustryDocs = ({
    doc,
    folder,
    industry,
}: {
    doc: any
    folder: any
    industry: Industry
}) => {
    const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
    const [isChecked, setChecked] = useState(doc?.checked)

    const onCheckChange = (event: any) => {
        updateDocument({
            ...folder,
            checked: event.target.checked,
            industry: industry?.user?.id,
        })
    }

    useEffect(() => {
        if (doc?.checked) {
            setChecked(doc?.checked)
        }
    }, [doc?.checked])

    useEffect(() => {
        if (result.data?.checked !== doc?.checked) {
            setChecked(result.data?.checked)
        }
    }, [result])
    const role = getUserCredentials()?.role
    const checkRto = role === UserRoles.RTO

    return (
        <>
            <ShowErrorNotifications result={result} />
            <div className="flex items-center gap-x-4 my-1">
                <div className="flex-grow">
                    <Checkbox name={doc?.name} label={doc?.name} />
                </div>
                <Switch
                    name={doc?.name}
                    value={doc?.required}
                    customStyleClass={'profileSwitch'}
                    disabled={checkRto}
                    // setFieldValue={isRequiredForCustomField}
                    // disabled={!isChecked}
                />
            </div>
        </>
    )
}
