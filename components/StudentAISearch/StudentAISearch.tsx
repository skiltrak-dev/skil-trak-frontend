import { Student } from '@types'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { StudentQuickPreview, StudentSearchBar } from './components'

export const StudentAISearch = () => {
    const [previewStudent, setPreviewStudent] = useState<Student | null>(null)

    const handleSelectStudent = useCallback((student: Student) => {
        setPreviewStudent(student)
    }, [])

    return (
        <div className={`relative z-30 bg-background`}>
            {/* Main Content */}
            <div className="mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key="search"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <div className="w-full space-y-4 text-center">
                            {/* Hero Section */}

                            {/* Search Bar */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <StudentSearchBar
                                    onSelectStudent={handleSelectStudent}
                                    onSearchChange={(query: string) => {
                                        setPreviewStudent(null)
                                    }}
                                />
                            </motion.div>

                            {/* Quick Preview */}
                            <AnimatePresence mode="wait">
                                {previewStudent && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <StudentQuickPreview
                                            student={previewStudent}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
