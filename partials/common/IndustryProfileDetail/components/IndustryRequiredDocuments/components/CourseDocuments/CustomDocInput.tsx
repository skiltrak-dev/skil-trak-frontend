import {
    ActionButton,
    Button,
    Portal,
    Select,
    ShowErrorNotifications,
    Switch,
    TextInput,
} from '@components'
import {
    useAddOrUpdateRequiredDocumentMutation,
    useDeleteDocumentMutation,
    useUpdateFolderMutation,
} from '@queries'
import { ReactElement, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DocsCheckbox } from '../DocsCheckbox'

import { AiFillDelete } from 'react-icons/ai'
import { MdCheck, MdEdit, MdOutlineClose } from 'react-icons/md'
// import { DeleteActionPopup } from '@components'
import { Industry } from '@types'
import { useNotification } from '@hooks'
import { DeleteModal } from '../../modal'

export const CustomDocInput = ({
    name,
    checked,
    required,
    type,
    folder,
    industry,
}: {
    name: string
    checked: boolean
    required: boolean
    type: any
    folder: any
    industry: Industry
}) => {
    const { notification } = useNotification()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [updateDocument, result] = useAddOrUpdateRequiredDocumentMutation()
    const [isChecked, setChecked] = useState<boolean | null>(checked)

    const [updateFolder, updateFolderResult] = useUpdateFolderMutation()
    const [editing, setEditing] = useState(false)

    const onCheckChange = (event: any) => {
        updateDocument({
            ...folder,
            checked: event.target.checked,
            industry: industry?.user?.id,
        })
    }

    useEffect(() => {
        if (result.data?.checked !== checked) {
            setChecked(result.data?.checked)
        }
    }, [result])

    const onCancelClicked = () => {
        setModal(null)
    }

    const onDeleteFolder = () => {
        setModal(
            <Portal>
                <DeleteModal
                    onCancel={onCancelClicked}
                    folder={{ ...folder, name }}
                />
            </Portal>
        )
    }

    useEffect(() => {
        if (updateFolderResult.isSuccess) {
            notification.success({
                title: `Folder Updated!`,
                description: `Your folder requirement '${name}' was updated successfully.`,
            })
            setEditing(false)
        }
    }, [updateFolderResult])

    const methods = useForm({
        mode: 'all',
        defaultValues: {
            name,
        },
    })

    const onSubmit = (values: any) => {
        updateFolder({
            ...values,
            id: folder?.folderId,
        })
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={result} />
            <ShowErrorNotifications result={updateFolderResult} />
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
                                    loading={updateFolderResult.isLoading}
                                    disabled={updateFolderResult.isLoading}
                                    submit
                                />

                                {!updateFolderResult.isLoading && (
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
                        <Switch value={required} name={name} />
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
                                onDeleteFolder()
                            }}
                            title={'Delete Custom Docs'}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
