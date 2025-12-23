import {
  Building2,
  CheckCircle2,
  Clock,
  Archive,
  Users,
  TrendingUp,
} from "lucide-react";
import { Card } from "../../../../components/cards";
import { IndustryStats } from "../types/industry.types";

interface StatsCardsProps {
  stats: IndustryStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ready</p>
            <p className="text-xl font-bold">{stats.ready}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-9 w-9 rounded-lg bg-warning/10 flex items-center justify-center">
            <Clock className="h-4 w-4 text-warning" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-xl font-bold">{stats.pending}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-muted/5 to-muted/10 border-muted/20">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-9 w-9 rounded-lg bg-muted/10 flex items-center justify-center">
            <Archive className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Archived</p>
            <p className="text-xl font-bold">{stats.archived}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-9 w-9 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Placements</p>
            <p className="text-xl font-bold">{stats.totalPlacements}</p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Capacity</p>
            <p className="text-xl font-bold">{stats.capacity}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
