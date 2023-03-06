import React from 'react'

export const FeatureCard = ({ icon, name, description }: any) => {
    const Icon = () => icon
    return (
        <div className="w-full sm:w-2/5 md:w-3/12 shadow-xl bg-white mb-4 sm:m-2 rounded-md flex flex-col items-center p-8 ">
            <div className="text-theme-secondary text-4xl shadow-md bg-white px-8 py-4 rounded-md">
                <Icon />
            </div>
            <h4 className="mt-4 font-bold text-xl">{name}</h4>
            <p className="mt-2 text-md text-center">{description}</p>
        </div>
    )
}
