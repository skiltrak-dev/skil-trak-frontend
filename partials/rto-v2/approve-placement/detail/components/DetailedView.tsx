import { ComplianceDetails } from './ComplianceDetails'
import { SupervisorInfo } from './SupervisorInfo'
import { PlacementDetails } from './PlacementDetails'
import { ProgramsInfo } from './ProgramsInfo'
import { ResourcesView } from './ResourcesView'
import {
    ShieldCheck,
    GraduationCap,
    Users,
    ClipboardList,
    FolderOpen,
    LucideIcon,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { Typography } from '@components'
import { RtoApprovalWorkplaceRequest } from '@types'

interface DetailedViewProps {
    approval: RtoApprovalWorkplaceRequest
}

interface TabConfig {
    value: string
    label: string
    icon: LucideIcon
    component: React.ComponentType<any>
}

export function DetailedView({ approval }: DetailedViewProps) {
    const tabs: TabConfig[] = [
        {
            value: 'compliance',
            label: 'Compliance',
            icon: ShieldCheck,
            component: ComplianceDetails,
        },
        {
            value: 'programs',
            label: 'Programs',
            icon: GraduationCap,
            component: ProgramsInfo,
        },
        {
            value: 'supervisor',
            label: 'Supervisors',
            icon: Users,
            component: SupervisorInfo,
        },
        // {
        //     value: 'requirements',
        //     label: 'Requirements',
        //     icon: ClipboardList,
        //     component: PlacementDetails,
        // },
        {
            value: 'resources',
            label: 'Resources',
            icon: FolderOpen,
            component: ResourcesView,
        },
    ]

    return (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#044866] via-[#0D5468] to-[#044866] p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F7A619] rounded-full blur-3xl"></div>
                </div>
                <div className="relative">
                    <Typography color="text-white">
                        Detailed Workplace Information
                    </Typography>
                    <Typography color="text-white">
                        Comprehensive verification and compliance documentation
                    </Typography>
                </div>
            </div>

            <Tabs defaultValue="compliance" className="p-4 md:p-6">
                <TabsList className="grid w-full grid-cols-5 mb-2 bg-slate-100 p-1.5 rounded-xl h-auto gap-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#044866] transition-all py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-2"
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-xs md:text-sm">
                                    {tab.label}
                                </span>
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
                            <Component approval={approval} />
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
    )
}
