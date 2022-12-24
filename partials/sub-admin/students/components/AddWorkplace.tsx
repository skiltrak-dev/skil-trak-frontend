import { Button } from '@components'
import { useRouter } from 'next/router'
import { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

export const AddWorkplace = ({ id }: { id: number }) => {
    const router = useRouter()
    const [addWorkplace, setAddWorkplace] = useState<boolean>(false)
    const workplaceActions = [
        {
            text: 'Provide Workplace Detail',
            onClick: () => {
                router.push(`${id}/provide-workplace-detail`)
            },
        },
        {
            text: 'Request Workplace Detail',
            onClick: () => {
                router.push(`${id}/request-workplace-detail`)
            },
        },
    ]
    return (
        <div className="relative">
            <Button
                text="Add Workplace"
                onClick={() => {
                    setAddWorkplace((workplace: boolean) => !workplace)
                }}
            />
            {addWorkplace && (
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setAddWorkplace(false)
                    }}
                >
                    <div className="absolute z-20 mt-2 bg-white py-2 shadow-lg rounded">
                        {workplaceActions.map(({ text, onClick }) => (
                            <p
                                key={text}
                                className="whitespace-pre text-sm text-gray-600 font-medium py-2 border-b border-gray-200 cursor-pointer px-2 hover:bg-gray-200"
                                onClick={() => {
                                    onClick()
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
    )
}
