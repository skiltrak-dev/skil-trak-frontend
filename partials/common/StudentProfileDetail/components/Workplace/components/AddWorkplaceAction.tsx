import { Button } from '@components'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { CompleteProfileBeforeWpModal } from '../modals'

export const AddWorkplaceAction = ({
    id,
    profileCompletion,
}: {
    profileCompletion: number
    id: number
}) => {
    const router = useRouter()
    const [addWorkplace, setAddWorkplace] = useState<boolean>(false)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const workplaceActions = [
        {
            text: 'Provide Workplace Detail',
            type: 'provide-workplace-detail',
            onClick: () => {
                router.push({
                    pathname: `/portals/sub-admin/students/${id}/provide-workplace-detail`,
                    query: { tab: 'abn' },
                })
            },
        },
        {
            text: 'Request Workplace Detail',
            type: 'request-workplace-detail',
            onClick: () => {
                router.push(
                    `/portals/sub-admin/students/${id}/request-workplace-detail`
                )
            },
        },
    ]

    const onCancelClicked = () => setModal(null)

    const onCompleteProfileClicked = (type: string) => {
        setModal(
            <CompleteProfileBeforeWpModal
                onCancel={onCancelClicked}
                workplaceType={type}
            />
        )
    }
    return (
        <>
            {modal}
            <div className="relative">
                <Button
                    text="Add Workplace"
                    onClick={() => {
                        if (id)
                            setAddWorkplace((workplace: boolean) => !workplace)
                    }}
                    disabled={!id}
                />
                {addWorkplace && (
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setAddWorkplace(false)
                        }}
                    >
                        <div className="absolute z-20 mt-2 bg-white py-2 shadow-lg rounded">
                            {workplaceActions.map(({ text, type, onClick }) => (
                                <p
                                    key={text}
                                    className="whitespace-pre text-sm text-gray-600 font-medium py-2 border-b border-gray-200 cursor-pointer px-2 hover:bg-gray-200"
                                    onClick={() => {
                                        if (profileCompletion === 100) {
                                            onClick()
                                        } else if (profileCompletion < 100) {
                                            onCompleteProfileClicked(type)
                                        }
                                        setAddWorkplace(false)
                                    }}
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </OutsideClickHandler>
                )}
            </div>
        </>
    )
}
