import { ChecklistItem } from './types';
import { ChecklistItemCard } from './ChecklistItemCard';

interface ChecklistItemsListProps {
  items: ChecklistItem[];
  uploadingId: string | null;
  onFileUpload: (itemId: string) => void;
}

export function ChecklistItemsList({ items, uploadingId, onFileUpload }: ChecklistItemsListProps) {
  return (
    <div className="space-y-2.5">
      {items.map((item, index) => (
        <ChecklistItemCard
          key={item.id}
          item={item}
          index={index}
          uploadingId={uploadingId}
          onFileUpload={onFileUpload}
        />
      ))}
    </div>
  );
}
