import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { Button } from '@components'

interface FloatingAIButtonProps {
    onClick: () => void
    hasUnreadAnswer?: boolean
}

export function FloatingAIButton({
    onClick,
    hasUnreadAnswer = false,
}: FloatingAIButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: 0.5,
                type: 'spring',
                stiffness: 260,
                damping: 20,
            }}
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Button
                    onClick={onClick}
                    className="relative h-16 w-16 rounded-full shadow-2xl"
                >
                    {/* Pulsing ring animation */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Icon */}
                    <motion.div
                        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Sparkles className="h-6 w-6" />
                    </motion.div>

                    {/* Unread indicator */}
                    <AnimatePresence>
                        {hasUnreadAnswer && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-green-500 ring-2 ring-background"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                    }}
                                    className="h-full w-full rounded-full bg-green-500"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute bottom-1/2 right-20 translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm text-background shadow-lg"
                    >
                        Ask AI Assistant
                        <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-full border-8 border-l-foreground border-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
