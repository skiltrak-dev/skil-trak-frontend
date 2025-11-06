import { Command, CommandGroup, CommandItem, CommandList } from '@components/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Search, Sparkles } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'
import { NoResultsInDropdown } from './EmptySearchState'
import { TextInput } from '@components'

export interface Student {
    id: string
    name: string
    email: string
    studentId: string
    avatar?: string
    course?: string
}

interface StudentSearchBarProps {
    students: Student[]
    onSelectStudent: (student: Student) => void
    onSearchChange?: (query: string) => void
}

export const StudentSearchBar = forwardRef<
    HTMLInputElement,
    StudentSearchBarProps
>(({ students, onSelectStudent, onSearchChange }, ref) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [hasTyped, setHasTyped] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSelectStudent = (student: Student) => {
        onSelectStudent(student)
        setSearchQuery('')
        setIsOpen(false)
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    // Simulate search delay
    useEffect(() => {
        if (searchQuery.length > 0) {
            setIsSearching(true)
            const timer = setTimeout(() => {
                setIsSearching(false)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [searchQuery])

    return (
        <div className="relative w-full">
            <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
                {/* <TextInput /> */}
                <Search className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
                <input
                    ref={ref}
                    value={searchQuery}
                    onChange={(e) => {
                        const newValue = e.target.value
                        setSearchQuery(newValue)
                        setIsOpen(newValue.length > 0)
                        setHasTyped(newValue.length > 0)
                        onSearchChange?.(newValue)
                    }}
                    onFocus={() => searchQuery.length > 0 && setIsOpen(true)}
                    placeholder="Search by student name, ID, or email..."
                    className={`h-14 w-full rounded-2xl border-2 pl-16 pr-6 text-lg shadow-lg transition-all focus-visible:ring-4 placeholder:text-sm text-sm  ${
                        hasTyped &&
                        filteredStudents.length === 0 &&
                        searchQuery.length > 2
                            ? 'border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/10'
                            : 'focus-visible:border-primaryNew focus-visible:ring-primaryNew/10'
                    }`}
                />
                <AnimatePresence mode="wait">
                    {isSearching ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                rotate: {
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'linear',
                                },
                            }}
                            className="absolute z-50 right-6 top-1/2 -translate-y-1/2"
                        >
                            <Loader2 className="h-5 w-5 text-primary" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sparkles"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, rotate: [0, 10, -10, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: { duration: 0.2 },
                                rotate: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                },
                            }}
                            className="absolute right-6 top-1/2 -translate-y-1/2"
                        >
                            <Sparkles className="h-5 w-5 text-primary" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isOpen && searchQuery.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 z-50 w-full rounded-2xl border-2 border-border bg-card shadow-2xl"
                    >
                        {filteredStudents.length > 0 ? (
                            <Command>
                                <CommandList>
                                    <CommandGroup>
                                        {filteredStudents
                                            .slice(0, 5)
                                            .map((student, index) => (
                                                <motion.div
                                                    key={student.id}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.05,
                                                    }}
                                                >
                                                    <CommandItem
                                                        onSelect={() =>
                                                            handleSelectStudent(
                                                                student
                                                            )
                                                        }
                                                        className="flex cursor-pointer items-center gap-4 rounded-xl p-4 !text-gray-700 !hover:text-gray-700 transition-colors hover:bg-blue-50"
                                                    >
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage
                                                                src={
                                                                    student.avatar
                                                                }
                                                                alt={
                                                                    student.name
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {getInitials(
                                                                    student.name
                                                                )}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="font-medium">
                                                                {student.name}
                                                            </div>
                                                            <div className="text-sm ">
                                                                {
                                                                    student.studentId
                                                                }{' '}
                                                                •{' '}
                                                                {student.email}
                                                            </div>
                                                            {student.course && (
                                                                <div className="text-xs ">
                                                                    {
                                                                        student.course
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CommandItem>
                                                </motion.div>
                                            ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        ) : (
                            <NoResultsInDropdown searchQuery={searchQuery} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
})

StudentSearchBar.displayName = 'StudentSearchBar'
