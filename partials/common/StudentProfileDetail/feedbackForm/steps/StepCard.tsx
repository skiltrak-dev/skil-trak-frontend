// components/FeedbackForm/components/StepCard.tsx

'use client'
import React from 'react'

import { CheckCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { Card, Typography } from '@components'

export const StepCard = ({
    children,
    title,
    description,
    icon,
    color = 'brand-primary',
    isComplete = false,
}: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <Card
            // className={`border-l-4 shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 overflow-hidden`}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-accent/10 to-transparent rounded-bl-full" />

                <div className={`relative`}>
                    <div className="flex items-center justify-between">
                        <div className={`flex items-center`}>
                            {icon}
                            <span className="ml-3">{title}</span>
                        </div>
                        {isComplete && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Complete
                            </motion.div>
                        )}
                    </div>
                    {description && <Typography>{description}</Typography>}
                </div>

                <div className="space-y-8 pt-8">{children}</div>
            </Card>
        </motion.div>
    )
}
