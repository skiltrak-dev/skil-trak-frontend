import {
    ActionButton,
    Checkbox,
    ShowErrorNotifications,
    Switch,
} from '@components'
import { useAddOrUpdateRequiredDocumentMutation } from '@queries'
import { ReactElement, useEffect, useState } from 'react'

import { AiFillDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
// import { DeleteActionPopup } from '@components'
import { Industry } from '@types'
import {
    DeleteIndustryCustomDocModal,
    UpdateCustomSectorFolderModal,
} from '../modals'

export const CustomSectorDoc = ({
    doc,
    folder,
    industry,
}: {
    doc: any
    folder: any
    industry: Industry
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
    const [isChecked, setChecked] = useState<boolean | null>(doc?.checked)

    const onCheckChange = (event: any) => {
        updateDocument({
            ...folder,
            checked: event.target.checked,
            industry: industry?.user?.id,
        })
    }

    useEffect(() => {
        if (result.data?.checked !== doc?.checked) {
            setChecked(result.data?.checked)
        }
    }, [result])

    const onCancelClicked = () => {
        setModal(null)
    }

    const onDeleteFolder = () => {
        setModal(
            <DeleteIndustryCustomDocModal
                doc={doc}
                onCancel={onCancelClicked}
            />
        )
    }

    const onEditDocClicked = () => {
        setModal(
            <UpdateCustomSectorFolderModal
                doc={doc}
                industryId={industry?.id}
                onCancel={onCancelClicked}
            />
        )
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={result} />

            <div className="flex items-center justify-between gap-x-4 border-t border-gray-200 py-2 bg-gray-100 px-2">
                <div className="w-2/5">
                    <Checkbox
                        value={isChecked}
                        label={doc?.name}
                        name={doc?.name}
                        loading={result.isLoading}
                        onChange={(event: any) => onCheckChange(event)}
                    />
                </div>
                <div className="w-1/5 flex justify-center">
                    <Switch value={doc?.required} name={doc?.name} />
                </div>

                <div className="w-1/5 flex items-center justify-center gap-x-2">
                    <ActionButton
                        Icon={MdEdit}
                        variant={'info'}
                        onClick={() => {
                            onEditDocClicked()
                            // setEditing(true)
                        }}
                        title={'Edit Custom Docs'}
                    />

                    <ActionButton
                        Icon={AiFillDelete}
                        variant={'error'}
                        onClick={() => {
                            onDeleteFolder()
                        }}
                        title={'Delete Custom Docs'}
                    />
                </div>
            </div>
        </>
    )
}
