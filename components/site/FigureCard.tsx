import React from 'react'

export const FigureCard = ({ img, caption, figures }: any) => {
    return (
        <div className="flex flex-col justify-center items-center h-52">
            <img src={img} alt="" className="fig-icon" />
            <p
                className="
                    text-center
                    mt-7
                    lg:mt-14
                    font-bold
                    text-3xl
                    lg:text-5xl
                "
            >
                {figures}
            </p>
            <p className="text-center text-xl">{caption}</p>
        </div>
    )
}
