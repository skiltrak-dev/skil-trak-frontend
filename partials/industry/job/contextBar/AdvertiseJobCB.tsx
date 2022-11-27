import { useRouter } from 'next/router'
import { Button } from 'components'

export const AdvertiseJobCB = () => {
    const router = useRouter()

    return (
        <>
            <div className="">
                <Button onClick={() => {}}>Advertise New Job</Button>
            </div>
        </>
    )
}
