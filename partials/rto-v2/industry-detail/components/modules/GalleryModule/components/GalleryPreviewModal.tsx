import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Portal } from '@components'
import { IndustryGalleryItem } from '@types'

interface GalleryPreviewModalProps {
    item: IndustryGalleryItem | null
    onClose: () => void
}

export function GalleryPreviewModal({
    item,
    onClose,
}: GalleryPreviewModalProps) {
    const isPhoto = (fileUrl?: string) => {
        if (!fileUrl) return false
        const extension = fileUrl.split('.').pop()?.toLowerCase()
        return extension !== 'pdf'
    }

    if (!item || !isPhoto(item.file)) return null

    return (
        <AnimatePresence>
            <Portal>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="relative max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img
                            src={item.file}
                            alt={item.title}
                            className="w-full rounded-xl shadow-2xl"
                        />
                        <div className="mt-3 text-center text-white">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-white/70 mt-0.5">
                                {item.fileSize} MB
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </Portal>
        </AnimatePresence>
    )
}
