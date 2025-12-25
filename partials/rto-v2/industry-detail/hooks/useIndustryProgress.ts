import {
    BookOpen,
    CheckCircle,
    ClipboardCheck,
    Clock,
    FileText,
    HelpCircle,
    Shield,
    Target,
    UserCheck,
    Users,
} from 'lucide-react'
import { SubAdminApi } from '@queries'
import { useAppSelector } from '@redux/hooks'

export const getChecklistItems = (data: any, isRtoAssociated: boolean = false) => {
    // For RTO industries, we only validate these specific items
    // All others are considered "done" automatically
    const rtoRequiredItems = [
        'Workplace Type',
        'Courses Configured',
        'Capacity',
    ]

    const getStatus = (
        title: string,
        dataKey: boolean,
        isRto: boolean
    ): 'done' | 'pending' => {
        if (isRto) {
            // If it's an RTO and the item is NOT in the required list, it's auto-done
            if (!rtoRequiredItems.includes(title)) return 'done'
            // Otherwise check the actual data
            return dataKey ? 'done' : 'pending'
        }
        // Non-RTO checks everything normally
        return dataKey ? 'done' : 'pending'
    }

    return [
        {
            title: 'Basic Information',
            description: 'ABN, address, contact details verified',
            status: getStatus(
                'Basic Information',
                data?.ProfileUpdated,
                isRtoAssociated
            ),
            icon: FileText,
            color: '#044866',
            targetSection: 'basic-details',
        },
        {
            title: 'Trading Hours Set',
            description: 'Schedule and slots configured',
            status: getStatus(
                'Trading Hours Set',
                data?.trading_hours_and_shifts,
                isRtoAssociated
            ),
            icon: Clock,
            color: '#8B5CF6',
            targetTab: 'hours',
        },
        {
            title: 'Courses Configured',
            description: 'Programs and activities defined',
            status: getStatus(
                'Courses Configured',
                data?.courseAdded,
                isRtoAssociated
            ),
            icon: BookOpen,
            color: '#EC4899',
            targetTab: 'courses',
        },
        {
            title: 'Capacity',
            description: 'Partner capacity configured',
            status: getStatus(
                'Capacity',
                data?.CapacityUpdated,
                isRtoAssociated
            ),
            icon: Users,
            color: '#0D5468',
            targetTab: 'courses',
            targetSection: 'capacity',
        },
        {
            title: 'Interview Availability',
            description: 'Interview schedule and availability set',
            status: getStatus(
                'Interview Availability',
                data?.interviewAvailabilities,
                isRtoAssociated
            ),
            icon: ClipboardCheck,
            color: '#F59E0B',
            targetSection: 'interview-availability',
        },
        {
            title: 'Primary Contact',
            description: 'Primary contact person assigned',
            status: getStatus(
                'Primary Contact',
                data?.contactPerson,
                isRtoAssociated
            ),
            icon: UserCheck,
            color: '#10B981',
            targetSection: 'contact-details',
        },
        {
            title: 'Workplace Type',
            description: 'Industry sector and workplace type defined',
            status: getStatus(
                'Workplace Type',
                data?.hasWorkplaceType,
                isRtoAssociated
            ),
            icon: Shield,
            color: '#14B8A6',
            targetTab: 'courses',
        },
    ]
}

export const useIndustryProgress = () => {
    const { industryDetail } = useAppSelector((state) => state.industry)

    const { data: progressData, isLoading } =
        SubAdminApi.Industry.industryProgress(industryDetail?.id!, {
            skip: !industryDetail?.id,
        })

    const checklistItems = getChecklistItems(
        progressData || {},
        !!industryDetail?.isRtoAssociated
    )

    const completedItems = checklistItems.filter(
        (item) => item.status === 'done'
    ).length
    const totalItems = checklistItems.length

    // Use API percentage calculation
    const progressPercentage =
        Number(((Number(completedItems) * 100) / totalItems).toFixed(0)) || 0

    const isPlacementReady = progressPercentage === 100

    return {
        progressPercentage,
        completedItems,
        totalItems,
        checklistItems,
        isPlacementReady,
        isLoading,
    }
}
