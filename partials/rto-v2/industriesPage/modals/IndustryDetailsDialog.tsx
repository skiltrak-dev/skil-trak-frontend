import {
  Building2,
  CheckCircle2,
  Users,
  Shield,
  Edit,
  Mail,
  Phone,
  AlertCircle,
  MapPin,
  Award,
  Activity,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../../../components/buttons";
import { Card } from "../../../../components/cards";
import { LinearProgress } from "../../../../components/LinearProgress/LinearProgress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { Industry } from "../types/industry.types";

interface IndustryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  industry: Industry | null;
}

export function IndustryDetailsDialog({
  open,
  onOpenChange,
  industry,
}: IndustryDetailsDialogProps) {
  if (!industry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-premium">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {industry.name}
          </DialogTitle>
          <DialogDescription>
            Complete industry profile and placement information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-3">
          {/* Status Banner */}
          <div className={`p-4 rounded-lg border flex items-start ${industry.placementReady ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"}`}>
            {industry.placementReady ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                <div className="ml-2 text-sm">
                  <span className="font-semibold">Placement Ready</span> - All compliance requirements met
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                <div className="ml-2 text-sm">
                  <span className="font-semibold">Not Ready</span> - Compliance requirements pending
                </div>
              </>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <div className="p-3.5 text-center">
                <Users className="h-7 w-7 text-primary mx-auto mb-1.5" />
                <p className="text-xl font-semibold">{industry.placementsActive}/{industry.placementsTotal}</p>
                <p className="text-xs text-muted-foreground">Placements</p>
              </div>
            </Card>
            <Card>
              <div className="p-3.5 text-center">
                <Award className="h-7 w-7 text-success mx-auto mb-1.5" />
                <p className="text-xl font-semibold">{industry.complianceScore}%</p>
                <p className="text-xs text-muted-foreground">Compliance</p>
              </div>
            </Card>
            <Card>
              <div className="p-3.5 text-center">
                <Activity className="h-7 w-7 text-secondary mx-auto mb-1.5" />
                <p className="text-xl font-semibold">{industry.lastInteraction}</p>
                <p className="text-xs text-muted-foreground">Last Contact</p>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <div className="p-6">
              <h3 className="text-base font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2.5">
                {industry.contactPerson && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Contact Person</p>
                      <p className="font-semibold text-sm">{industry.contactPerson}</p>
                    </div>
                  </div>
                )}
                {industry.contactEmail && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${industry.contactEmail}`} className="font-semibold text-sm hover:text-primary">
                        {industry.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                {industry.contactPhone && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a href={`tel:${industry.contactPhone}`} className="font-semibold text-sm hover:text-primary">
                        {industry.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold text-sm">{industry.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Compliance Status */}
          {industry.placementReady && (
            <Card>
              <div className="p-6">
                <h3 className="text-base font-semibold mb-3">Compliance Status</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-success/5 border border-success/20">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span className="font-semibold text-sm">WHS Documentation</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-success/5 border border-success/20">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span className="font-semibold text-sm">Child Safety Check</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-success/5 border border-success/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="font-semibold text-sm">Supervisor Verified</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Sector Capacities */}
          {industry.sectorCapacities && industry.sectorCapacities.length > 0 && (
            <Card>
              <div className="p-6">
                <h3 className="text-base font-semibold mb-3">Placement Capacity by Sector</h3>
                <div className="space-y-3">
                  {industry.sectorCapacities.map((sector, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold">{sector.sector}</span>
                        <span className="text-sm text-muted-foreground">
                          {sector.current} / {sector.total}
                        </span>
                      </div>
                      <LinearProgress percent={sector.percentage} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button outline text="Close" onClick={() => onOpenChange(false)} />
          <Button
            className="gap-2 bg-gradient-to-r from-primary to-secondary"
            text="Edit Industry"
            Icon={Edit}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
