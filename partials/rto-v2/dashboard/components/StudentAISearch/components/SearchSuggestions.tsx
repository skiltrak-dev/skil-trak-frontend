import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { Student } from './StudentSearchBar'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

interface SearchSuggestionsProps {
    searchQuery: string
    students: Student[]
    onSelectStudent: (student: Student) => void
}

export function SearchSuggestions({
    searchQuery,
    students,
    onSelectStudent,
}: SearchSuggestionsProps) {
    // Simple fuzzy matching - get students that partially match
    const suggestions = students
        .filter((student) => {
            const query = searchQuery.toLowerCase()
            const nameParts = student.name.toLowerCase().split(' ')
            const emailParts = student.email
                .toLowerCase()
                .split('@')[0]
                .split('.')

            // Check if any part of the name or email starts with the query
            return (
                nameParts.some((part) => part.startsWith(query.slice(0, 3))) ||
                emailParts.some((part) => part.startsWith(query.slice(0, 3))) ||
                student.studentId.toLowerCase().includes(query.slice(0, 3))
            )
        })
        .slice(0, 3)

    if (suggestions.length === 0) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border-2 border-primary/20 bg-primary/5 p-4"
        >
            <div className="mb-3 flex items-center gap-2 text-sm text-primary">
                <Lightbulb className="h-4 w-4" />
                <span>Did you mean one of these?</span>
            </div>

            <div className="space-y-2">
                {suggestions.map((student) => (
                    <motion.button
                        key={student.id}
                        onClick={() => onSelectStudent(student)}
                        className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-all hover:border-primary hover:bg-primary/5"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={student.avatar}
                                alt={student.name}
                            />
                            <AvatarFallback className="text-xs">
                                {student.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()
                                    .slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm">{student.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {student.studentId}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
