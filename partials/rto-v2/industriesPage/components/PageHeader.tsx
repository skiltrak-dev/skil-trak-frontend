import { Building2, Plus, Download, Zap } from "lucide-react";
import { Button } from "../../../../components/buttons";
import { Badge } from "../../../../components/Badge";

interface PageHeaderProps {
  networkType: 'private' | 'shared' | null;
  workplaceCredits: number;
  onAddIndustry: () => void;
  onPurchaseCredits: () => void;
}

export function PageHeader({
  networkType,
  workplaceCredits,
  onAddIndustry,
  onPurchaseCredits,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-premium">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl">Industries</h1>
            <p className="text-sm text-muted-foreground">
              Manage your industry partnerships and placement opportunities
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {networkType === 'shared' && (
          <div className="flex items-center gap-2">
            <Badge
              variant="warning" // Using warning/secondary logic
              Icon={Zap}
              text={`${workplaceCredits} Credits`}
              className="bg-gradient-to-r from-secondary to-warning text-white border-0 px-3 py-1.5"
            />
            <Button
              variant="secondary"
              outline
              onClick={onPurchaseCredits}
              Icon={Plus}
              text="Buy Credits"
            />
          </div>
        )}

        <Button
          variant="secondary"
          outline
          Icon={Download}
          text="Export"
        />

        <Button
          onClick={onAddIndustry}
          variant="primaryNew" // Or primary, usually primaryNew matches gradient style better if available, or just primary
          Icon={Plus}
          text="Add Industry"
          className="bg-gradient-to-r from-primary to-secondary text-white border-none"
        />
      </div>
    </div>
  );
}
