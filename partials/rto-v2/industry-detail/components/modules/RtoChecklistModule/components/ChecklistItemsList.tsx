import { ChecklistItemCard } from './ChecklistItemCard'

interface ChecklistItemsListProps {
    items: {
        id: number
        isExist: boolean
        documentName: string
        initiatedBy: string
        rtoName: string
        dueDate: string
        url: string
        status: 'completed' | 'pending' | 'required'
    }[]
}

export function ChecklistItemsList({ items }: ChecklistItemsListProps) {
    if (Array.isArray(items)) {
        return (
            <div className="space-y-2.5">
                {items.map((item, index) => (
                    <ChecklistItemCard
                        key={item.id}
                        item={item}
                        index={index}
                    />
                ))}
            </div>
        )
    }
    return (
        <div className="space-y-2.5">
            <ChecklistItemCard item={items} />
        </div>
    )
}
