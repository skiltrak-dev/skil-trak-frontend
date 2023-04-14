import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

type Props = {
    content: string
    customerName: string
}

export const ReviewCard = ({
    content,
    customerName,
}: Props) => {
    

    return (
        <>
            <div className="mx-auto rounded-full relative w-96 h-96 mb-4 p-4 border-4 border-black">
                <div className="w-12 h-12 z-10 absolute left-9 rounded-full flex justify-center items-center">
                    <FaQuoteLeft className="text-2xl text-black" />
                </div>
                <div className="w-12 h-12 absolute left-14 top-1 bg-gray-200"></div>
                <div className="w-12 h-12 absolute left-3 mt-8 bg-gray-200"></div>

                <div className="w-12 h-12 absolute right-8 mt-[18rem] z-10  rounded-full flex justify-center items-center">
                    <FaQuoteRight className="text-2xl text-black" />
                </div>
                <div className="w-12 h-12 absolute right-2 mt-[16.4rem] bg-gray-200"></div>
                <div className="w-12 h-12 absolute right-14 mt-[19rem] bg-gray-200"></div>

                <div className="mt-4 p-12 ml-2">
                    <p className='text-sm text'>
                        &quot;{content.substring(0, 265)}... &quot;
                    </p>
                    <p className='text-xs text-blue-500 text-center ml-8 mt-3 w-40'>{customerName.substring(0, 45)}</p>
                </div>
            </div>
        </>
    )
}
