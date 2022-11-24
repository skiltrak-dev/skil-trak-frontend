// import { GiCardboardBox } from "react-icons/gi";

import { Animations } from '@animations'
import Link from 'next/link'
import Lottie from 'react-lottie'

interface EmptyDataProps {
    title?: string
    description?: string
    actionLink?: any
    actionText?: string
    height?: string
}
export const EmptyData = ({
    title,
    description,
    actionLink,
    actionText,
    height,
}: EmptyDataProps) => {
    const animationOptions = {
        loop: true,
        autoplay: true,
        animationData: Animations.Common.ShakeEmptyBox,
    }

    // const Icon = icon || GiCardboardBox;
    return (
        <div
            className="flex justify-center items-center"
            style={{ height: height || '70vh' }}
        >
            <div className="flex flex-col justify-center items-center p-16 rounded-lg">
                {/* <div className="text-gray-500">
					<Icon className="text-6xl" />
				</div> */}
                <div>
                    <Lottie
                        options={animationOptions}
                        height={250}
                        width={250}
                    />
                </div>

                <p className="text-gray-500 text-lg font-bold">
                    {title || 'It seems your data is empty'}
                </p>
                <p className="text-gray-400">
                    {description ||
                        'It may be due to you have not added any thing yet'}
                </p>
                {actionLink && (
                    <div className="text-sm mt-4">
                        <Link href={actionLink} className="text-blue-500">
                            Click Here
                        </Link>
                        {`to ${actionText || 'add now'}`}
                    </div>
                )}
            </div>
        </div>
    )
}
