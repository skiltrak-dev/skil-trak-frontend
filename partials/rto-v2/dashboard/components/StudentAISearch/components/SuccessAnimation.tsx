import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ticket, FileText, CheckCircle2 } from 'lucide-react'

interface SuccessAnimationProps {
    show: boolean
    onComplete: () => void
    type: 'ticket' | 'note'
    message: string
}

export function SuccessAnimation({
    show,
    onComplete,
    type,
    message,
}: SuccessAnimationProps) {
    const [showCheck, setShowCheck] = useState(false)

    useEffect(() => {
        if (show) {
            // Show checkmark after icon flies up
            const timer = setTimeout(() => {
                setShowCheck(true)
            }, 800)

            // Complete animation
            const completeTimer = setTimeout(() => {
                setShowCheck(false)
                onComplete()
            }, 2500)

            return () => {
                clearTimeout(timer)
                clearTimeout(completeTimer)
            }
        }
    }, [show, onComplete])

    const Icon = type === 'ticket' ? Ticket : FileText

    return (
        <AnimatePresence>
            {show && (
                <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center">
                    {/* Flying Icon */}
                    <motion.div
                        initial={{
                            y: 0,
                            x: 0,
                            scale: 1,
                            opacity: 1,
                            rotate: 0,
                        }}
                        animate={{
                            y: -500,
                            x: 300,
                            scale: 0.3,
                            opacity: 0,
                            rotate: 360,
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="absolute"
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0.8, 0],
                                }}
                                transition={{
                                    duration: 1.2,
                                    ease: 'easeOut',
                                }}
                            />

                            {/* Icon */}
                            <div className="relative rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 shadow-2xl">
                                <Icon className="h-12 w-12 text-primary-foreground" />
                            </div>

                            {/* Sparkles */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute h-1.5 w-1.5 rounded-full bg-primary"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                    }}
                                    initial={{ scale: 0, x: 0, y: 0 }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        x: Math.cos((i * Math.PI * 2) / 6) * 60,
                                        y: Math.sin((i * Math.PI * 2) / 6) * 60,
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: i * 0.05,
                                        ease: 'easeOut',
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Success Message Card */}
                    <AnimatePresence>
                        {showCheck && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: -20 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className="relative"
                            >
                                <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-2xl">
                                    <div className="flex items-center gap-4">
                                        {/* Animated Check Circle */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 200,
                                                damping: 15,
                                            }}
                                            className="flex-shrink-0"
                                        >
                                            <div className="relative">
                                                {/* Pulse rings */}
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-green-500/30"
                                                    animate={{
                                                        scale: [1, 1.5, 2],
                                                        opacity: [0.5, 0.3, 0],
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: 'easeOut',
                                                    }}
                                                />
                                                <CheckCircle2 className="relative h-10 w-10 text-green-500" />
                                            </div>
                                        </motion.div>

                                        {/* Message */}
                                        <div>
                                            <motion.h3
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="text-lg text-foreground"
                                            >
                                                Success!
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {message}
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>

                                {/* Confetti particles */}
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute h-2 w-2 rounded-full"
                                        style={{
                                            background: `hsl(${
                                                (i * 360) / 12
                                            }, 70%, 60%)`,
                                            top: '50%',
                                            left: '50%',
                                        }}
                                        initial={{ scale: 0, x: 0, y: 0 }}
                                        animate={{
                                            scale: [0, 1, 0.5],
                                            x:
                                                Math.cos(
                                                    (i * Math.PI * 2) / 12
                                                ) *
                                                (80 + Math.random() * 40),
                                            y:
                                                Math.sin(
                                                    (i * Math.PI * 2) / 12
                                                ) *
                                                    (80 + Math.random() * 40) -
                                                30,
                                            opacity: [1, 1, 0],
                                            rotate: Math.random() * 360,
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            ease: 'easeOut',
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    )
}
