import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/buttons";
import { Badge } from "../../../../components/Badge/Badge";
import { Card } from "../../../../components/cards";
import { Zap, Check, Shield, Globe, Award, Sparkles } from "lucide-react";
import { useNotification } from "../../../../hooks/useNotification";

interface CreditPurchaseDialogProps {
  open: boolean;
  onClose: () => void;
}

const creditPackages = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 50,
    price: "$450",
    pricePerCredit: "$9/credit",
    features: ["Valid for 12 months", "Standard support", "Basic reporting"],
    popular: false,
    color: "bg-blue-500",
    icon: Shield,
  },
  {
    id: "growth",
    name: "Growth Pack",
    credits: 200,
    price: "$1,600",
    pricePerCredit: "$8/credit",
    features: ["Valid for 12 months", "Priority support", "Advanced reporting", "API access"],
    popular: true,
    color: "bg-primary",
    icon: Zap,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 1000,
    price: "$7,000",
    pricePerCredit: "$7/credit",
    features: ["No expiry", "Dedicated account manager", "Custom integration", "SLA guarantee"],
    popular: false,
    color: "bg-purple-600",
    icon: Globe,
  },
];

export const CreditPurchaseDialog = ({ open, onClose }: CreditPurchaseDialogProps) => {
  const { notification } = useNotification();

  const handlePurchase = (pkg: typeof creditPackages[0]) => {
    // Simulate purchase process
    notification.success({
      title: "Purchase Successful",
      description: `You have successfully purchased the ${pkg.name}. ${pkg.credits} credits have been added to your account.`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Purchase Credits</DialogTitle>
              <DialogDescription className="mt-1">
                Top up your account with placement credits. Credits never expire.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {creditPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${pkg.popular ? "border-primary shadow-md" : "border-border"
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 inset-x-0 flex justify-center">
                  <Badge
                    variant="warning"
                    shape="rounded"
                    className="shadow-sm"
                  >
                    <span className="flex items-center gap-1">
                      <Sparkles size={10} />
                      Most Popular
                    </span>
                  </Badge>
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${pkg.popular ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                    <pkg.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground">/ {pkg.credits} credits</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{pkg.pricePerCredit}</p>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Total:</span>
                    <span className="font-bold">{pkg.price}</span>
                  </div>
                  <Button
                    fullWidth
                    variant={pkg.popular ? "primary" : "secondary"}
                    outline={!pkg.popular}
                    onClick={() => handlePurchase(pkg)}
                    text={pkg.popular ? "Purchase Now" : "Select Plan"}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Enterprise Solutions</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Need more than 1000 credits? Contact our sales team for custom packages and volume discounts.
              </p>
              <div className="mt-2 text-primary font-medium text-sm cursor-pointer hover:underline">
                Contact Sales &rarr;
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
