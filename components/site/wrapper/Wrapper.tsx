import React from 'react'

export const Wrapper = ({
    children,
    sectionName,
    noVerticalPadding,
    className,
}: any) => {
    return (
        <section
            className={`section-${sectionName} mx-auto w-full md:w-4/5 ${
                !noVerticalPadding && 'py-20'
            } px-8 md:px-0 bg-cover ${className}`}
        >
            {children}
        </section>
    )
}
