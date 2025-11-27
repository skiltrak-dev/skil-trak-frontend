import { Badge } from '@components/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { LucideIcon } from 'lucide-react'

export interface TabConfig {
    value: string
    label: string
    icon?: LucideIcon
    component: any
    count?: string | number
}

export const ConfigTabs = ({
    defaultValue,
    tabs,
    props,
    className,
    tabsClasses,
    tabsTriggerClasses,
}: {
    defaultValue?: string
    props?: any
    className?: string
    tabs: TabConfig[]
    tabsClasses?: string
    tabsTriggerClasses?: string
}) => {
    return (
        <Tabs
            defaultValue={defaultValue || tabs?.[0]?.value}
            className={` ${className}`}
        >
            <TabsList
                className={`border border-gray-300 shadow grid w-full grid-cols-5 mb-2 bg-slate-100 p-1.5 rounded-xl h-auto gap-1 ${tabsClasses}`}
            >
                {tabs.map((tab) => {
                    const Icon = tab?.icon
                    return (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={`data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#044866] transition-all py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-2 ${tabsTriggerClasses}`}
                        >
                            {Icon && <Icon className="w-4 h-4" />}
                            <span>{tab.label}</span>
                            {tab.count && (
                                <Badge
                                    variant="primaryNew"
                                    text={tab.count.toString()}
                                />
                            )}
                        </TabsTrigger>
                    )
                })}
            </TabsList>

            {tabs.map((tab) => {
                const Component = tab.component
                return (
                    <TabsContent
                        key={tab.value}
                        value={tab.value}
                        className="mt-0 animate-fade-in"
                    >
                        <Component {...props} />
                    </TabsContent>
                )
            })}
        </Tabs>
    )
}
