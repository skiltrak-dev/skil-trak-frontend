import { ConfigTabs, TabConfig } from '@components'
import {
    BookOpen,
    Calendar,
    Clock,
    FileText,
    Image,
    MessageSquare,
    Shield,
    Users,
} from 'lucide-react'
import { IndustryCourses } from './courses'
import { AppointmentsModule } from './modules/AppointmentsModule/AppointmentsModule'
import { CommunicationLog } from './modules/CommunicationLog'
import { DocumentsModule } from './modules/DocumentsModule'
import { GalleryModule } from './modules/GalleryModule'
import { RTOChecklistModule } from './modules/RtoChecklistModule'
import { TradingHoursModule } from './modules/TradingHoursModule'
import { StudentsPlacementList } from './StudentsPlacementList'
export function OperationalModules() {
    const tabs: TabConfig[] = [
        {
            value: 'courses',
            label: 'Courses & Programs',
            icon: BookOpen,
            component: IndustryCourses,
            count: 4,
        },
        {
            value: 'students',
            label: 'Students Placement',
            icon: Users,
            component: StudentsPlacementList,
            count: 4,
        },
        {
            value: 'appointments',
            label: 'Appointments',
            icon: Calendar,
            component: AppointmentsModule,
            count: 3,
        },
        {
            value: 'hours',
            label: 'Trading Hours',
            icon: Clock,
            component: TradingHoursModule,
        },
        {
            value: 'documents',
            label: 'Required Documents',
            icon: FileText,
            component: DocumentsModule,
            count: 12,
        },
        {
            value: 'communication',
            label: 'Communication Log',
            icon: MessageSquare,
            component: CommunicationLog,
            count: 24,
        },
        {
            value: 'rto-checklist',
            label: 'RTO Checklist',
            icon: Shield,
            component: RTOChecklistModule,
            count: 6,
        },
        {
            value: 'gallery',
            label: 'Gallery',
            icon: Image,
            component: GalleryModule,
            count: 8,
        },
    ]

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-[#1A2332] mb-0.5 text-base">
                    Operational Modules
                </h2>
                <p className="text-[#64748B] text-xs">
                    Manage day-to-day operations and configurations
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                {/* Tab Navigation */}
                <ConfigTabs tabs={tabs} />
            </div>
        </div>
    )
}
