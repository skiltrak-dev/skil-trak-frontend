import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export function NoResultsInDropdown({ searchQuery }: { searchQuery: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-8 text-center"
        >
            <div className="mb-4 rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h4 className="mb-2">No students found</h4>
            <p className="mb-4 text-sm text-muted-foreground">
                No students match{' '}
                <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    {searchQuery}
                </span>
            </p>
            <div className="space-y-1.5 text-left text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Suggestions:</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Check the spelling of the student's name</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>
                            Try searching by Student ID or email address
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Use fewer or different keywords</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>
                            Verify the student is enrolled in the system
                        </span>
                    </li>
                </ul>
            </div>
        </motion.div>
    )
}
