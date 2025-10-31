import classNames from 'classnames'
import React from 'react'

export const Title = ({
    Icon,
    title,
    description,
    iconClasses,
}: {
    Icon: any
    title: string
    iconClasses?: string
    description?: string
}) => {
    const iconClassesName = classNames(
        'h-8 w-8 rounded-lg flex items-center justify-center bg-primaryNew text-white',
        iconClasses
    )
    return (
        <div className="flex items-center gap-2">
            <div className={iconClassesName}>
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <h3 className="font-semibold text-sm">{title}</h3>
                {description && (
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}
