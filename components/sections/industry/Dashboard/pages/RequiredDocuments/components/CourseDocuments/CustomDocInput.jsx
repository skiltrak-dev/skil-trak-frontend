import { DocsCheckbox } from '../DocsCheckbox'
import { SwitchField } from 'components'
import { useAddOrUpdateRequiredDocumentMutation } from 'redux/query'
import { useEffect } from 'react'
import { useState } from 'react'

import { MdCheck, MdEdit, MdOutlineClose } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteActionPopup } from 'components'
import { useDeleteDocumentMutation } from 'redux/query'
import { useNotification } from 'hooks'
import { Formik, Form } from 'formik'
import { InputField } from 'components'
import { SelectFieldOption } from 'components'
import { MiniActionButton } from 'components'
import { useEditDocumentMutation } from 'redux/query'

export const CustomDocInput = ({ name, checked, required, type, folder }) => {
    const { notification } = useNotification()

    const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
    const [isChecked, setChecked] = useState(checked)

    const [deletePopup, setDeletePopUp] = useState(null)
    const [deleteDocument, deleteResult] = useDeleteDocumentMutation()

    const [editDocument, editResult] = useEditDocumentMutation()

    const [editing, setEditing] = useState(false)

    const onCheckChange = (event) => {
        updateDocument({ ...folder, checked: event.target.checked })
    }

    useEffect(() => {
        if (result.data?.checked !== checked) {
            setChecked(result.data?.checked)
        }
    }, [result])

    const onConfirmDelete = () => {
        deleteDocument({ id: folder.folderId })
        setDeletePopUp(null)
    }

    const onCancelDelete = () => {
        setDeletePopUp(null)
    }

    const onDelete = () => {
        setDeletePopUp(
            <DeleteActionPopup
                title="Delete Folder Requirement"
                description={`You are about to delete '${name}' folder requirement`}
                onCancel={onCancelDelete}
                onConfirm={onConfirmDelete}
            />
        )
    }

    const onEdit = (values) => {
        editDocument({
            ...values,
            id: folder.documentId,
        })
    }

    useEffect(() => {
        if (deleteResult && deleteResult.isSuccess) {
            notification.error({
                title: `Requirement Deleted!`,
                description: `Your folder requirement '${name}' was deleted successfully.`,
            })
        }

        if (editResult && editResult.isSuccess) {
            notification.info({
                title: `Requirement Updated!`,
                description: `Your folder requirement '${name}' was updated successfully.`,
            })

            setEditing(false)
        }
    }, [deleteResult, editResult, name])

    return (
        <>
            {deletePopup && deletePopup}
            {editing ? (
                <Formik
                    initialValues={{
                        name,
                        type,
                    }}
                    onSubmit={(values) => {
                        !editResult.isLoading && onEdit(values)
                    }}
                >
                    {({ touched, errors, setFieldValue }) => {
                        return (
                            <Form>
                                <div
                                    key={name}
                                    className="flex items-center justify-between gap-x-4 border-t border-gray-200 py-2 bg-gray-100 px-2"
                                >
                                    <div className="w-2/5">
                                        <InputField
                                            name={'name'}
                                            placeholder={'Some Text Here...'}
                                            errorIcons
                                            touched={touched}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className="w-1/5 flex justify-center"></div>
                                    <div className="w-1/5 capitalize text-sm text-center">
                                        <SelectFieldOption
                                            setFieldValue={setFieldValue}
                                            defaultValue={{
                                                label: type,
                                                value: type,
                                            }}
                                            name={'type'}
                                            options={[
                                                {
                                                    value: 'docs',
                                                    label: 'Docx',
                                                },
                                                {
                                                    value: 'images',
                                                    label: 'Images',
                                                },
                                                {
                                                    value: 'videos',
                                                    label: 'Videos',
                                                },
                                            ]}
                                            onlyValue
                                        />
                                    </div>
                                    <div className="w-1/5 flex items-center justify-center gap-x-2">
                                        <MiniActionButton
                                            icon={MdCheck}
                                            color={'text-success'}
                                            loading={editResult.isLoading}
                                            submit
                                        />
                                        {!editResult.isLoading && (
                                            <MiniActionButton
                                                icon={MdOutlineClose}
                                                color={'text-error'}
                                                onClick={() => {
                                                    setEditing(false)
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            ) : (
                <div
                    key={name}
                    className="flex items-center justify-between gap-x-4 border-t border-gray-200 py-2 bg-gray-100 px-2"
                >
                    <div className="w-2/5">
                        <DocsCheckbox
                            onChange={(event) => onCheckChange(event)}
                            checked={isChecked}
                            label={name}
                            loading={result.isLoading}
                        />
                    </div>
                    <div className="w-1/5 flex justify-center">
                        <SwitchField
                            value={required}
                            name={name}
                            // setFieldValue={isRequiredForCustomField}
                            // disabled={!isChecked}
                        />
                    </div>
                    <div className="w-1/5 capitalize text-sm text-center">
                        {type}
                    </div>
                    <div className="w-1/5 flex items-center justify-center gap-x-2">
                        <MiniActionButton
                            icon={MdEdit}
                            color={'text-info'}
                            onClick={() => {
                                setEditing(true)
                            }}
                        />

                        <MiniActionButton
                            icon={AiFillDelete}
                            color={'text-error'}
                            onClick={() => {
                                !deleteResult.isLoading && onDelete()
                            }}
                            loading={deleteResult.isLoading}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
