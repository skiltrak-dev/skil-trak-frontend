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
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { Typography } from '@components'

interface DetailedViewProps {
    data: any
}

export function DetailedView({ data }: DetailedViewProps) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#044866] via-[#0D5468] to-[#044866] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F7A619] rounded-full blur-3xl"></div>
                </div>
                <div className="relative">
                    <Typography color="text-white" className="mb-2">
                        Detailed Workplace Information
                    </Typography>
                    <Typography color="text-white">
                        Comprehensive verification and compliance documentation
                    </Typography>
                </div>
            </div>

            <Tabs defaultValue="compliance" className="p-4 md:p-6">
                <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-100 p-1.5 rounded-xl h-auto gap-1">
                    <TabsTrigger
                        value="compliance"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#044866] transition-all py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-2"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Compliance</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="programs"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#044866] transition-all py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-2"
                    >
                        <GraduationCap className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Programs</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="supervisor"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#044866] transition-all py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-2"
                    >
                        <Users className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Supervisors</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="requirements"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#044866] transition-all py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-2"
                    >
                        <ClipboardList className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Requirements</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="resources"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-[#044866] transition-all py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-2"
                    >
                        <FolderOpen className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Resources</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value="compliance"
                    className="mt-0 animate-fade-in"
                >
                    <ComplianceDetails />
                </TabsContent>

                <TabsContent value="programs" className="mt-0 animate-fade-in">
                    <ProgramsInfo />
                </TabsContent>

                <TabsContent
                    value="supervisor"
                    className="mt-0 animate-fade-in"
                >
                    <SupervisorInfo />
                </TabsContent>

                <TabsContent
                    value="requirements"
                    className="mt-0 animate-fade-in"
                >
                    <PlacementDetails />
                </TabsContent>

                <TabsContent value="resources" className="mt-0 animate-fade-in">
                    <ResourcesView />
                </TabsContent>
            </Tabs>
        </div>
    )
}
