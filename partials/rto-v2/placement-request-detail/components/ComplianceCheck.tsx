import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock } from 'lucide-react'
import { Badge, Typography } from '@components'

interface ComplianceCheckProps {
    name: string
    status: 'verified' | 'pending'
    expiry: string
    index: number
}

export function ComplianceCheck({
    name,
    status,
    expiry,
    index,
}: ComplianceCheckProps) {
    const Icon = status === 'verified' ? CheckCircle2 : Clock
    const iconColor =
        status === 'verified' ? 'text-emerald-600' : 'text-amber-600'
    const bgColor = status === 'verified' ? 'bg-emerald-100' : 'bg-amber-100'
    const badgeVariant = status === 'verified' ? 'success' : 'warning'

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 hover:shadow-md transition-all"
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${bgColor}`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                    <Typography
                        variant="small"
                        className="text-gray-900 font-medium"
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="small"
                        className="text-gray-600 text-xs mt-0.5"
                    >
                        Expiry: {expiry}
                    </Typography>
                </div>
            </div>
            <Badge
                text={status === 'verified' ? 'Verified' : 'Pending'}
                variant={badgeVariant}
                outline
            />
        </motion.div>
    )
}
