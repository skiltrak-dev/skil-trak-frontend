import { useEffect, useState } from 'react'
import { DocsCheckbox } from '../DocsCheckbox'
import { ShowErrorNotifications, Switch } from '@components'

// query
import { useAddOrUpdateRequiredDocumentMutation } from '@queries'
import { Industry } from '@types'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const DocumentInputField = ({
    name,
    checked,
    required,
    folder,
    industry,
}: {
    name: any
    checked: any
    required: any
    folder: any
    industry: Industry
}) => {
    const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
    const [isChecked, setChecked] = useState(checked)

    const onCheckChange = (event: any) => {
        updateDocument({
            ...folder,
            checked: event.target.checked,
            industry: industry?.user?.id,
        })
    }

    useEffect(() => {
        if (checked) {
            setChecked(checked)
        }
    }, [checked])

    useEffect(() => {
        if (result.data?.checked !== checked) {
            setChecked(result.data?.checked)
        }
    }, [result])
    const { role } = getUserCredentials()
    const checkRto = role === UserRoles.RTO

    return (
        <>
            <ShowErrorNotifications result={result} />
            <div key={name} className="flex items-center gap-x-4 my-1">
                <div className="flex-grow">
                    <DocsCheckbox
                        onChange={(event: any) => onCheckChange(event)}
                        checked={isChecked}
                        label={name}
                        loading={result.isLoading}
                        disabled={checkRto}
                    />
                </div>
                <Switch
                    name={name}
                    value={required}
                    customStyleClass={'profileSwitch'}
                    disabled={checkRto}
                    // setFieldValue={isRequiredForCustomField}
                    // disabled={!isChecked}
                />
            </div>
        </>
    )
}
