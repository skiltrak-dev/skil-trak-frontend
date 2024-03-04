export const WhatNextCard = ({ title, description }: any) => {
    return (
        <div className="">
            <p className="text-sm font-medium text-black">{title}</p>
            <p className="text-xs leading-[14px] mt-1 text-black">
                {description}
            </p>
        </div>
    )
}