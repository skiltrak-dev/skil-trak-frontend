import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { Tab } from './Tab'
import { TabProps } from '@components'

export const Tabs = ({
    children,
    tabs,
    type,
    defaultTabSelected,
    className,
}: {
    children: ({ header, element }: any) => JSX.Element
    tabs: TabProps[]
    type?: any
    defaultTabSelected?: number
    className?: any
}) => {
    const [element, setElement] = useState<any>(null)

    useEffect(() => {
        if (defaultTabSelected === 0) {
            setElement(tabs[0])
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
                            setElement(tab)
                        }}
                    />
                ))}
            </div>
        ),
        element: element?.element,
    })
}
