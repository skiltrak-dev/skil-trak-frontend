import { useState } from 'react'
import {
    RTOAccessNotice,
    ChecklistStats,
    CategoryFilter,
    ChecklistItemsList,
    checklistItems,
} from './components'

export function RTOChecklistModule() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [uploadingId, setUploadingId] = useState<string | null>(null)

    const categories = [
        'all',
        ...Array.from(new Set(checklistItems.map((item) => item.category))),
    ]

    const filteredItems =
        selectedCategory === 'all'
            ? checklistItems
            : checklistItems.filter(
                  (item) => item.category === selectedCategory
              )

    const stats = {
        total: checklistItems.length,
        completed: checklistItems.filter((i) => i.status === 'completed')
            .length,
        pending: checklistItems.filter((i) => i.status === 'pending').length,
        required: checklistItems.filter((i) => i.status === 'required').length,
    }

    const handleFileUpload = (itemId: string) => {
        setUploadingId(itemId)
        // Simulate upload
        setTimeout(() => {
            setUploadingId(null)
        }, 1500)
    }

    return (
        <div className="space-y-4 px-4">
            <RTOAccessNotice />
            <ChecklistStats stats={stats} />
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <ChecklistItemsList
                items={filteredItems}
                uploadingId={uploadingId}
                onFileUpload={handleFileUpload}
            />
        </div>
    )
}
