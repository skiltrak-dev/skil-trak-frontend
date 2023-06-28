import { ReactNode } from 'react'

interface PageHeadingProps {
    children?: ReactNode
    title: string
    subtitle: string
}
export const PageHeading = ({
    children,
    title,
    subtitle,
}: PageHeadingProps) => {
    return (
        <div className="w-full flex justify-between items-end">
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{subtitle}</p>
            </div>

            {children && (
                <div className="flex items-center gap-x-2">{children}</div>
            )}
        </div>
    )
}
