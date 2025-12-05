import { CheckCircle, Clock, FileText, Upload, XCircle } from 'lucide-react'

export const getStatusConfig = (status: string) => {
    switch (status) {
        case 'approved':
            return {
                icon: CheckCircle,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                border: 'border-emerald-200',
                badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            }
        case 'pending':
            return {
                icon: Clock,
                color: 'text-amber-600',
                bg: 'bg-amber-50',
                border: 'border-amber-200',
                badge: 'bg-amber-100 text-amber-700 border-amber-200',
            }
        case 'rejected':
            return {
                icon: XCircle,
                color: 'text-red-600',
                bg: 'bg-red-50',
                border: 'border-red-200',
                badge: 'bg-red-100 text-red-700 border-red-200',
            }
        case 'uploaded':
            return {
                icon: Upload,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                badge: 'bg-blue-100 text-blue-700 border-blue-200',
            }
        default:
            return {
                icon: FileText,
                color: 'text-slate-600',
                bg: 'bg-slate-50',
                border: 'border-slate-200',
                badge: 'bg-slate-100 text-slate-700 border-slate-200',
            }
    }
}
