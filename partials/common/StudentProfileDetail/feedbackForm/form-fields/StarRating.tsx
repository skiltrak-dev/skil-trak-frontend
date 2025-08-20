'use client'
import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { AlertCircle } from 'lucide-react'

export const StarRating = ({
    name,
    value,
    onChange,
    label,
    description,
    validation,
}: any) => {
    const [hoverValue, setHoverValue] = useState(0)
    const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

    return (
        <motion.div
            className="space-y-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
        >
            <div>
                <div className="flex items-center gap-2 font-medium text-sm">
                    <span className="mr-1">{label}</span>
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <motion.button
                            key={rating}
                            type="button"
                            onClick={() => onChange(rating)}
                            onMouseEnter={() => setHoverValue(rating)}
                            onMouseLeave={() => setHoverValue(0)}
                            className="p-2 rounded-lg hover:bg-primaryNew/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Star
                                className={`w-6 h-6 transition-all duration-200 ${
                                    rating <= (hoverValue || value)
                                        ? 'fill-[#f7a619] text-[#f7a619] drop-shadow-sm'
                                        : 'text-gray-300 hover:text-[#f7a619]/50'
                                }`}
                            />
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {(hoverValue || value) > 0 && (
                        <motion.div
                            key={hoverValue || value}
                            className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-primary rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <span className="text-sm font-medium">
                                {ratingLabels[(hoverValue || value) - 1]}
                            </span>
                            <span className="text-xs text-brand-accent">
                                {hoverValue || value}/5
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {validation && !validation.isValid && validation.message && (
                <motion.p
                    className="text-sm text-red-500 flex items-center gap-1 mt-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <AlertCircle className="w-4 h-4" />
                    {validation.message}
                </motion.p>
            )}
        </motion.div>
    )
}
