'use client'
import { AlertCircle, HelpCircle, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
export const AnimatedTextarea = ({
    label,
    value,
    onChange,
    placeholder,
    id,
    color = 'primaryNew',
    validation,
    helpText,
    rows = 4,
}: any) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const wordCount = value?.trim()
        ? value
              .trim()
              .split(/\s+/)
              .filter((w: string) => w.length > 0).length
        : 0
    return (
        <motion.div className={`space-y-2 `} whileHover={{ scale: 1.01 }}>
            <div className="flex items-center justify-between">
                <label
                    htmlFor={id}
                    className={`text-${color} flex items-center gap-2 text-sm font-medium`}
                >
                    <MessageCircle className="w-4 h-4" />
                    {label}
                    {helpText && (
                        <div
                            className="relative inline-flex"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onFocus={() => setShowTooltip(true)} // accessibility
                            onBlur={() => setShowTooltip(false)}
                        >
                            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />

                            {showTooltip && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-max max-w-xs px-3 py-2 text-sm rounded-md shadow-lg bg-[#044866] text-white">
                                    {helpText}
                                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-4 h-4 -z-10 bg-[#044866] rotate-45"></div>
                                </div>
                            )}
                        </div>
                    )}
                </label>
                <span className="text-xs text-muted-foreground">
                    {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </span>
            </div>

            <motion.div
                className={`relative rounded-xl border-2 transition-all duration-300 ${
                    isFocused
                        ? `border-${color} shadow-lg`
                        : 'border-gray-200 dark:border-gray-700'
                } ${validation && !validation.isValid ? 'border-red-500' : ''}`}
                whileFocus={{ scale: 1.02 }}
            >
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`border-none focus:!ring-0 bg-transparent min-h-16 w-full rounded-md px-3 py-2 !text-sm outline-none`}
                    rows={rows}
                />

                <motion.div
                    className={`absolute bottom-2 right-2 w-2 h-2 rounded-full bg-${color} opacity-0 ${
                        isFocused ? 'opacity-100' : ''
                    }`}
                    animate={{ scale: isFocused ? [1, 1.2, 1] : 1 }}
                    transition={{
                        repeat: isFocused ? Infinity : 0,
                        duration: 2,
                    }}
                />
            </motion.div>

            {validation && !validation.isValid && validation.message && (
                <motion.p
                    className="text-sm !text-red-500 flex items-center gap-1"
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
