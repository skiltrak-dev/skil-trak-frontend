import { useEffect, useState } from 'react'
import { Student } from './StudentSearchBar'
import {
    Search,
    Clock,
    Sparkles,
    Keyboard,
    SearchX,
    HelpCircle,
} from 'lucide-react'
import { Button } from '@components'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@components/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
// import { Button } from "./ui/button";

interface CommandPaletteProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    students: Student[]
    recentStudents: Student[]
    onSelectStudent: (student: Student) => void
}

export function CommandPalette({
    open,
    onOpenChange,
    students,
    recentStudents,
    onSelectStudent,
}: CommandPaletteProps) {
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange(!open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [open, onOpenChange])

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search students by name, ID, or email..." />
            <CommandList>
                <CommandEmpty>
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 rounded-full bg-muted/50 p-6">
                            <SearchX className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h4 className="mb-2">No students found</h4>
                        <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                            Try searching with different keywords or check the
                            spelling
                        </p>
                        <Button variant="action" className="gap-2">
                            <HelpCircle className="h-4 w-4" />
                            Get Help
                        </Button>
                    </div>
                </CommandEmpty>

                {recentStudents.length > 0 && (
                    <>
                        <CommandGroup heading="Recent Students">
                            {recentStudents.map((student) => (
                                <CommandItem
                                    key={student.id}
                                    value={`${student.name} ${student.email} ${student.studentId}`}
                                    onSelect={() => {
                                        onSelectStudent(student)
                                        onOpenChange(false)
                                    }}
                                    className="gap-3"
                                >
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <Avatar className="h-8 w-8">
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
                                    <div className="flex flex-col">
                                        <span>{student.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {student.studentId}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator />
                    </>
                )}

                <CommandGroup heading="All Students">
                    {students.map((student) => (
                        <CommandItem
                            key={student.id}
                            value={`${student.name} ${student.email} ${student.studentId}`}
                            onSelect={() => {
                                onSelectStudent(student)
                                onOpenChange(false)
                            }}
                            className="gap-3"
                        >
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Avatar className="h-8 w-8">
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
                            <div className="flex flex-col">
                                <span>{student.name}</span>
                                <span className="text-xs text-muted-foreground">
                                    {student.studentId}
                                </span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

export function CommandPaletteHint() {
    return (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Keyboard className="h-4 w-4" />
            <span>Press</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
            </kbd>
            <span>to open quick search</span>
        </div>
    )
}
