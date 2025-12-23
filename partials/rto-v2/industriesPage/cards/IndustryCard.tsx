import {
  Building2,
  MapPin,
  Briefcase,
  Star,
  Eye,
  Archive,
  MoreVertical,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  ArchiveRestore,
} from "lucide-react";
import { Button } from "../../../../components/buttons";
import { Badge } from "../../../../components/Badge";
import { Card } from "../../../../components/cards";
import { LinearProgress } from "../../../../components/LinearProgress";
import { TableAction } from "../../../../components/Table/components/TableAction"; // Safe direct import
import { Industry } from "../types/industry.types";

interface IndustryCardProps {
  industry: Industry;
  onViewDetails: (industry: Industry) => void;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  isArchived?: boolean;
  showActions?: boolean;
}

export function IndustryCard({
  industry,
  onViewDetails,
  onArchive,
  onUnarchive,
  isArchived = false,
  showActions = true,
}: IndustryCardProps) {
  const capacityPercentage = industry.placementsTotal > 0
    ? Math.round((industry.placementsActive / industry.placementsTotal) * 100)
    : 0;

  const actionOptions = [
    {
      text: "View Details",
      Icon: Eye,
      onClick: () => onViewDetails(industry)
    },
    ...(industry.contactEmail ? [{
      text: "Send Email",
      Icon: Mail,
      onClick: () => window.location.href = `mailto:${industry.contactEmail}`
    }] : []),
    ...(industry.contactPhone ? [{
      text: "Call",
      Icon: Phone,
      onClick: () => window.location.href = `tel:${industry.contactPhone}`
    }] : []),
    ...(!isArchived && onArchive ? [{
      text: "Archive",
      Icon: Archive,
      onClick: () => onArchive(industry.id)
    }] : []),
    ...(isArchived && onUnarchive ? [{
      text: "Restore",
      Icon: ArchiveRestore,
      onClick: () => onUnarchive(industry.id)
    }] : [])
  ];

  return (
    <Card className="group hover:shadow-premium transition-all duration-200 border-border/60 hover:border-primary/30">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="font-semibold truncate flex-1">{industry.name}</h3>
                {industry.isFavourite && (
                  <Star className="h-4 w-4 text-warning fill-warning flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{industry.location}</span>
              </div>
            </div>
          </div>

          {showActions && (
            <TableAction
              rowItem={industry}
              options={actionOptions}
            >
              <Button variant="action" mini>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </TableAction>
          )}
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{industry.sector}</span>
          </div>

          {/* Status Badge */}
          {industry.placementReady !== undefined && (
            <div>
              {industry.placementReady ? (
                <Badge
                  variant="success"
                  text="Placement Ready"
                  Icon={CheckCircle}
                />
              ) : (
                <Badge
                  variant="warning"
                  text="Not Ready"
                  Icon={XCircle}
                />
              )}
            </div>
          )}

          {/* Placements Progress */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Placements</span>
              <span className="text-xs font-semibold">
                {industry.placementsActive} / {industry.placementsTotal}
              </span>
            </div>
            <LinearProgress percent={capacityPercentage} strokeColor="#0ea5e9" strokeWidth={2} />
          </div>

          {/* Compliance Score */}
          {industry.complianceScore > 0 && (
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <span className="text-xs text-muted-foreground">Compliance</span>
              <span className="text-xs font-semibold">{industry.complianceScore}%</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            {isArchived && onUnarchive ? (
              <Button
                variant="secondary"
                onClick={() => onUnarchive(industry.id)}
                fullWidth
                text="Restore"
                Icon={ArchiveRestore}
              />
            ) : null}
            <Button
              variant="secondary"
              outline
              onClick={() => onViewDetails(industry)}
              fullWidth
              text="View Details"
              Icon={Eye}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
