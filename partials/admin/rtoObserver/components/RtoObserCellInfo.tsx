import { InitialAvatar } from '@components'
import { QueryType, queryToUrl } from '@utils'
import { useRouter } from 'next/router'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const RtoObserCellInfo = ({ observer }: { observer: any }) => {
    const router = useRouter()
    const query = queryToUrl(router.query as QueryType)
    return (
        <div className="flex items-center gap-x-2 relative z-10">
            <div className="shadow-inner-image rounded-full">
                {observer?.user?.name && (
                    <InitialAvatar
                        name={observer?.user?.name}
                        imageUrl={observer?.user?.avatar}
                    />
                )}
            </div>
            <div>
                <p className={`'font-semibold`}>{observer?.user?.name}</p>
                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdEmail />
                        </span>
                        {observer?.user?.email}
                    </p>

                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdPhoneIphone />
                        </span>
                        {observer?.phone}
                    </p>
                </div>
            </div>
        </div>
    )
}
