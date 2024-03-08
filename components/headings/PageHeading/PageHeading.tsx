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
        <div className="w-full flex flex-col sm:flex-row justify-between sm:items-end gap-y-1.5">
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{subtitle}</p>
            </div>

            {children && (
                <div className="flex items-center gap-x-2 ml-auto">
                    {children}
                </div>
            )}
        </div>
    )
}
