import { Button } from '@components'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { VerifySubadminModal } from '../modal'

export const VerifyAction = ({ subadmin }: { subadmin: any }) => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const handleVerify = () => {
        setModal(
            <VerifySubadminModal onCancel={onCancel} subAdmin={subadmin} />
        )
    }

    return (
        <div className="flex justify-end pt-2">
            {modal}
            <div className="w-40 h-9">
                <Button
                    text={'Verify'}
                    fullHeight
                    fullWidth
                    disabled={
                        subadmin?.kpiData && subadmin?.kpiData?.length > 0
                    }
                    onClick={() => handleVerify()}
                />
            </div>
        </div>
    )
}
