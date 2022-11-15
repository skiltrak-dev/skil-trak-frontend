import { DocsCheckbox } from "../DocsCheckbox";
import { SwitchField } from "components";
import { useAddOrUpdateRequiredDocumentMutation } from "redux/query";
import { useEffect } from "react";
import { useState } from "react";

export const DocumentInputField = ({ name, checked, required, folder }) => {
  const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation();
  const [isChecked, setChecked] = useState(checked);

  const onCheckChange = (event) => {
    updateDocument({ ...folder, checked: event.target.checked });
  };

  useEffect(() => {
    if (result.data?.checked !== checked) {
      setChecked(result.data?.checked);
    }
  }, [result]);

  return (
    <div key={name} className="flex items-center gap-x-4 my-4">
      <div className="flex-grow">
        <DocsCheckbox
          onChange={(event) => onCheckChange(event)}
          checked={isChecked}
          label={name}
          loading={result.isLoading}
        />
      </div>
      <SwitchField
        value={required}
        name={name}
        // setFieldValue={isRequiredForCustomField}
        // disabled={!isChecked}
      />
    </div>
  );
};
