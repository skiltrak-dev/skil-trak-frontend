import { Button } from '@components'
import { useRouter } from 'next/router'

import { LuLayoutTemplate } from 'react-icons/lu'

export const ShowNotificationModal = ({ onCancel }: { onCancel: any }) => {
    const router = useRouter()

    return (
        <>
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white modal-animation rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] px-16 py-4">
                    <div className={`text-orange-500`}>
                        <LuLayoutTemplate size={48} />
                    </div>
                    <div className="flex flex-col items-center gap-y-2">
                        <p className="text-lg font-semibold">Template Saved</p>
                        <p className="text-gray-500 max-w-[400px] text-center">
                            You have Successfully created the template
                        </p>
                    </div>

                    <div className="flex gap-x-4 items-center">
                        <Button
                            text="Go Back"
                            variant="info"
                            onClick={() => {
                                if (router?.query?.tab === 'industry-esign') {
                                    router.push(
                                        `/portals/admin/e-sign?tab=industry-e-sign&page=1&pageSize=50`
                                    )
                                } else {
                                    router.push(
                                        `/portals/admin/e-sign?tab=approved&page=1&pageSize=50`
                                    )
                                }
                            }}
                        />
                        <Button
                            text={'Stay here'}
                            variant={'primary'}
                            outline
                            // disabled={(input && !keyMatched) || loading}
                            onClick={() => {
                                onCancel && onCancel()
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
