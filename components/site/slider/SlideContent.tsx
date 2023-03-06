import React from 'react'

export const SlideContent = ({ title, description }: any) => {
    return (
        <div className="absolute z-10 bottom-3/4 left-p-15 right-p-15 transform translate-y-3/4">
            <h5 className="text-white text-2xl lg:text-5xl font-bold text-center">
                {title}
            </h5>
            <p className="text-white text-xl lg:text-2xl text-center mt-8">
                {description}
            </p>
        </div>
    )
}
