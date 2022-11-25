import { useEffect, useState } from 'react'
import { DocsCheckbox } from '../DocsCheckbox'
import { Switch } from '@components'

// query
import { useAddOrUpdateRequiredDocumentMutation } from '@queries'

export const DocumentInputField = ({
  name,
  checked,
  required,
  folder,
}: any) => {
  const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
  const [isChecked, setChecked] = useState(checked)

  const onCheckChange = (event:any) => {
    updateDocument({ ...folder, checked: event.target.checked })
  }

  useEffect(() => {
    if (result.data?.checked !== checked) {
      setChecked(result.data?.checked)
    }
  }, [result])

  return (
    <div key={name} className="flex items-center gap-x-4 my-4">
      <div className="flex-grow">
        <DocsCheckbox
          onChange={(event: any) => onCheckChange(event)}
          checked={isChecked}
          label={name}
          loading={result.isLoading}
        />
      </div>
      <Switch
        value={required}
        name={name}
        // setFieldValue={isRequiredForCustomField}
        // disabled={!isChecked}
      />
    </div>
  )
}
