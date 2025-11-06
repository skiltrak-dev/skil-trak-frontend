import { Student } from './StudentSearchBar'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Mail, Hash, BookOpen, ArrowRight } from 'lucide-react'
import { Badge, Button } from '@components'

interface StudentQuickPreviewProps {
    student: Student
    onSelect: () => void
}

export function StudentQuickPreview({
    student,
    onSelect,
}: StudentQuickPreviewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-lg transition-all hover:border-primaryNew hover:shadow-xl"
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primaryNew/5 via-transparent to-primaryNew/5 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                            <AvatarImage
                                src={student.avatar}
                                alt={student.name}
                            />
                            <AvatarFallback className="text-lg">
                                {student.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()
                                    .slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-xl">{student.name}</h3>
                            <Badge
                                text="Active Student"
                                variant="secondary"
                                className="mt-1"
                            />
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Hash className="h-4 w-4" />
                        <span className="text-foreground">
                            {student.studentId}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="text-foreground">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-foreground">
                            {student.course}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        fullWidth
                        onClick={onSelect}
                        variant="primaryNew"
                        className="mt-6 h-12"
                    >
                        <span>View Full Profile</span>
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </motion.div>
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}
