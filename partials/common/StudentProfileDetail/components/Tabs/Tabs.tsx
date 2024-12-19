import { TabProps } from '@components'
import { ReactElement, useEffect, useState } from 'react'
import { Tab } from './Tab'

export const Tabs = ({
    children,
    tabs,
    type,
    defaultTabSelected,
    onSetSelectedElement,
    className,
}: {
    onSetSelectedElement?: (element: TabProps) => void
    children: ({ header, element }: any) => ReactElement
    tabs: TabProps[]
    type?: any
    defaultTabSelected?: number
    className?: any
}) => {
    const [element, setElement] = useState<any>(null)

    useEffect(() => {
        if (defaultTabSelected === 0) {
            const zeroIndexTab = tabs?.[0]
            setElement(zeroIndexTab)
            if (onSetSelectedElement) {
                onSetSelectedElement(zeroIndexTab)
            }
        } else if (defaultTabSelected) {
            setElement(tabs[defaultTabSelected])
        }
    }, [defaultTabSelected])

    return children({
        header: (
            <div className={`flex gap-x-11 px-3 bg-white w-full rounded-md`}>
                {tabs.map((tab: any, i: number) => (
                    <Tab
                        key={i}
                        label={tab.label}
                        href={tab.href}
                        badge={tab.badge}
                        active={
                            tab.label
                                ? tab.label === element?.label
                                : tab.Icon === element?.Icon
                        }
                        element={tab.element}
                        Icon={tab?.Icon}
                        type={type}
                        transKey={tab?.transKey}
                        onClick={() => {
                            if (onSetSelectedElement) {
                                onSetSelectedElement(tab)
                            }
                            setElement(tab)
                        }}
                    />
                ))}
            </div>
        ),
        element: element?.element,
    })
}
