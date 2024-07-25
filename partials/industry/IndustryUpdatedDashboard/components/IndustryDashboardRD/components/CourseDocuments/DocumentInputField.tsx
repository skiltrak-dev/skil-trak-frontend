import { useEffect, useState } from 'react'
import { DocsCheckbox } from '../DocsCheckbox'
import { ShowErrorNotifications, Switch } from '@components'

// query
import { useAddOrUpdateRequiredDocumentMutation } from '@queries'
import { Industry } from '@types'

export const DocumentInputField = ({
    name,
    checked,
    required,
    folder,
}: {
    name: any
    checked: any
    required: any
    folder: any
}) => {
    const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
    const [isChecked, setChecked] = useState(checked)

    const onCheckChange = (event: any) => {
        updateDocument({
            ...folder,
            checked: event.target.checked,
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
                    />
                </div>
                <Switch
                    name={name}
                    value={required}
                    customStyleClass={'profileSwitch'}
                    // setFieldValue={isRequiredForCustomField}
                    // disabled={!isChecked}
                />
            </div>
        </>
    )
}
