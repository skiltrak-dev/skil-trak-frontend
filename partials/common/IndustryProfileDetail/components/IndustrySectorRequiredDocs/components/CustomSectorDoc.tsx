import {
    ActionButton,
    AuthorizedUserComponent,
    ShowErrorNotifications,
    Switch,
    Typography,
} from '@components'
import { IndustryApi } from '@queries'
import { ReactElement, useState } from 'react'

import { AiFillDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
// import { DeleteActionPopup } from '@components'
import { Industry } from '@types'
import {
    DeleteIndustryCustomDocModal,
    UpdateCustomSectorFolderModal,
} from '../modals'
import { UserRoles } from '@constants'

export const CustomSectorDoc = ({
    doc,
    industry,
}: {
    doc: any
    industry: Industry
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [result, setResult] = useState(null)

    const [isChecked, setChecked] = useState<boolean | null>(doc?.checked)

    const [makeOptional, makeOptionalResult] =
        IndustryApi.Folders.customeIndustryOptional()

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
                    <Typography variant={'label'}>{doc?.name}</Typography>
                </div>
                <div className="w-1/5 flex justify-center">
                    <Switch
                        name={doc?.name}
                        value={doc?.isRequired}
                        defaultChecked={doc?.isRequired}
                        customStyleClass={'profileSwitch'}
                        disabled={makeOptionalResult?.isLoading}
                        loading={makeOptionalResult?.isLoading}
                        onChange={() => {
                            onMakeOptional()
                        }}
                    />
                </div>

                <AuthorizedUserComponent excludeRoles={[UserRoles.RTO]}>
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
                </AuthorizedUserComponent>
            </div>
        </>
    )
}
