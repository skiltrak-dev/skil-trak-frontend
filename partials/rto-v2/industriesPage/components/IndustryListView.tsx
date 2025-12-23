import { Building2 } from "lucide-react";
import { IndustryCard } from "../cards/IndustryCard";
import { Industry } from "../types/industry.types";

interface IndustryListViewProps {
  industries: Industry[];
  onViewDetails: (industry: Industry) => void;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  isArchived?: boolean;
  emptyMessage?: string;
}

export function IndustryListView({
  industries,
  onViewDetails,
  onArchive,
  onUnarchive,
  isArchived = false,
  emptyMessage = "No industries found",
}: IndustryListViewProps) {
  if (industries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center mb-4">
          <Building2 className="h-10 w-10 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Industries Found</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {industries.map((industry) => (
        <IndustryCard
          key={industry.id}
          industry={industry}
          onViewDetails={onViewDetails}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          isArchived={isArchived}
        />
      ))}
    </div>
  );
}
