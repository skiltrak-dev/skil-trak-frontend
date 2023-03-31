import { useEffect, useState } from 'react'
import { DocsCheckbox } from '../DocsCheckbox'
import { Button, TextInput, Select, Switch, ActionButton } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import {
    useAddOrUpdateRequiredDocumentMutation,
    useEditDocumentMutation,
    useDeleteDocumentMutation,
} from '@queries'

import { MdCheck, MdEdit, MdOutlineClose } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
// import { DeleteActionPopup } from 'components'
import { useNotification } from 'hooks'
import { Formik, Form } from 'formik'

export const CustomDocInput = ({
    name,
    checked,
    required,
    type,
    folder,
}: any) => {
    const { notification } = useNotification()

    const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
    const [isChecked, setChecked] = useState<boolean | null>(checked)

    const [deletePopup, setDeletePopUp] = useState<any | null>(null)
    const [deleteDocument, deleteResult] = useDeleteDocumentMutation()

    const [editDocument, editResult] = useEditDocumentMutation()

    const [editing, setEditing] = useState(false)

    const onCheckChange = (event: any) => {
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
        // setDeletePopUp(
        //   <DeleteActionPopup
        //     title="Delete Folder Requirement"
        //     description={`You are about to delete '${name}' folder requirement`}
        //     onCancel={onCancelDelete}
        //     onConfirm={onConfirmDelete}
        //   />
        // )
    }

    const onEdit = (values: any) => {
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

    const methods = useForm({
        mode: 'all',
    })

    const onSubmit = () => {}

    return (
        <>
            {deletePopup && deletePopup}
            {editing ? (
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div
                            key={name}
                            className="flex items-center justify-between gap-x-4 border-t border-gray-200 py-2 bg-gray-100 px-2"
                        >
                            <div className="w-2/5">
                                <TextInput
                                    name={'name'}
                                    placeholder={'Some Text Here...'}
                                />
                            </div>
                            <div className="w-1/5 flex justify-center"></div>
                            <div className="w-1/5 capitalize text-sm text-center">
                                <Select
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
                                <Button
                                    mini
                                    Icon={MdCheck}
                                    variant={'success'}
                                    loading={editResult.isLoading}
                                    submit
                                />
                                {!editResult.isLoading && (
                                    <Button
                                        mini
                                        Icon={MdOutlineClose}
                                        variant={'error'}
                                        onClick={() => {
                                            setEditing(false)
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </form>
                </FormProvider>
            ) : (
                <div
                    key={name}
                    className="flex items-center justify-between gap-x-4 border-t border-gray-200 py-2 bg-gray-100 px-2"
                >
                    <div className="w-2/5">
                        <DocsCheckbox
                            onChange={(event: any) => onCheckChange(event)}
                            checked={isChecked}
                            label={name}
                            loading={result.isLoading}
                        />
                    </div>
                    <div className="w-1/5 flex justify-center">
                        <Switch
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
                        <ActionButton
                            Icon={MdEdit}
                            variant={'info'}
                            onClick={() => {
                                setEditing(true)
                            }}
                            title={'Edit Custom Docs'}
                        />

                        <ActionButton
                            Icon={AiFillDelete}
                            variant={'error'}
                            onClick={() => {
                                !deleteResult.isLoading && onDelete()
                                onConfirmDelete()
                            }}
                            loading={deleteResult.isLoading}
                            title={'Delete Custom Docs'}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
