import { useState } from "react";
import {
  Network,
  Lock,
  Globe,
  CheckCircle,
  Shield,
  Sparkles,
  ArrowRight,
  Eye,
  UserCheck,
} from "lucide-react";
import { Button } from "../../../../components/buttons";
import { Card } from "../../../../components/cards";
import { NetworkType, SharedNetworkRadius } from "../types/industry.types";
import { useNotification } from "../../../../hooks/useNotification";

interface NetworkSelectionScreenProps {
  onNetworkSelect: (networkType: NetworkType, radius: SharedNetworkRadius) => void;
}

export function NetworkSelectionScreen({ onNetworkSelect }: NetworkSelectionScreenProps) {
  const [sharedNetworkRadius, setSharedNetworkRadius] = useState<SharedNetworkRadius>(null);
  const { notification } = useNotification();

  return (
    <div className="space-y-5 p-5">
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="max-w-5xl w-full mx-auto py-6">
          <Card
            className="border-primary/20 shadow-premium-lg bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden"
            noPadding
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>

            <div className="border-b border-primary/10 relative text-center pb-5 pt-7">
              <div className="flex flex-col items-center gap-2.5">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-premium animate-float">
                  <Network className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl mb-1 text-primary">Choose Your Placement Network</h1>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    Select the network that best fits your Training Organisation's needs and budget
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 relative">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Private Network Option */}
                <Card
                  className="group relative overflow-hidden rounded-2xl border-2 border-border/60 hover:border-primary/50 bg-card hover:shadow-premium-lg transition-all duration-300 transform hover:scale-[1.02]"
                  noPadding
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>

                  <div className="relative p-5 space-y-4">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-premium">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg mb-1">Private Network</h3>
                      <p className="text-xs text-muted-foreground">
                        Use only your own industries
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-primary" />
                        </div>
                        <p className="text-xs leading-relaxed">
                          Use only your own industries that you upload to SkilTrak
                        </p>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-primary" />
                        </div>
                        <p className="text-xs leading-relaxed">
                          Your industries are always used first
                        </p>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-primary" />
                        </div>
                        <p className="text-xs leading-relaxed">
                          When you upload industries, they receive an email to log in and complete their Placement Ready setup
                        </p>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-primary" />
                        </div>
                        <p className="text-xs leading-relaxed">
                          You will see your industry list with tags: <span className="font-semibold text-success">Placement Ready</span> / <span className="font-semibold text-warning">Placement Not Ready</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20">
                      <Shield className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Perfect for:</span> RTOs with established industry partnerships
                      </p>
                    </div>

                    <Button
                      className="w-full h-10 bg-gradient-to-r from-primary to-primary/80 text-white hover:opacity-90 transition-all shadow-premium text-sm"
                      onClick={() => {
                        onNetworkSelect('private', null);
                        notification.success({
                          title: "Private Network Selected",
                          description: "Private Network activated! You can now add your industry partners."
                        });
                      }}
                      text="Use Private Network"
                      Icon={ArrowRight}
                    />
                  </div>
                </Card>

                {/* Shared Network Option */}
                <Card
                  className="group relative overflow-hidden rounded-2xl border-2 border-border/60 hover:border-secondary/50 bg-card hover:shadow-premium-lg transition-all duration-300 transform hover:scale-[1.02]"
                  noPadding
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>

                  <div className="relative p-5 space-y-4">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-secondary via-warning to-secondary/80 flex items-center justify-center shadow-premium">
                        <Globe className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg mb-1">Shared Network</h3>
                      <p className="text-xs text-muted-foreground">
                        Your industries + SkilTrak network
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-center mb-2.5">Choose your access level:</p>

                      {/* Australia-Wide Option */}
                      <div
                        className={`p-2.5 rounded-lg border-2 cursor-pointer transition-all ${sharedNetworkRadius === 'australia-wide'
                            ? 'border-secondary bg-secondary/10'
                            : 'border-border/50 hover:border-secondary/30'
                          }`}
                        onClick={() => setSharedNetworkRadius('australia-wide')}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${sharedNetworkRadius === 'australia-wide'
                              ? 'border-secondary bg-secondary'
                              : 'border-border'
                            }`}>
                            {sharedNetworkRadius === 'australia-wide' && (
                              <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold mb-0.5">Australia-Wide Access</p>
                            <p className="text-xs text-muted-foreground">
                              Your industries first, plus thousands of verified industries across Australia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Eye className="h-3 w-3 text-secondary" />
                        </div>
                        <p className="text-xs leading-relaxed">
                          RTO cannot see SkilTrak's industry list, only the number of available industries
                        </p>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <UserCheck className="h-3 w-3 text-secondary" />
                        </div>
                        <p className="text-xs leading-relaxed">
                          SkilTrak Sourcing Team configures and prepares shared-network industries for placement readiness
                        </p>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Network className="h-3 w-3 text-secondary" />
                        </div>
                        <p className="text-xs leading-relaxed">
                          If your industries are not available, SkilTrak will provide workplaces from its own network
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-secondary/5 border border-secondary/20">
                      <Sparkles className="h-3.5 w-3.5 text-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Perfect for:</span> Maximum placement opportunities and flexibility
                      </p>
                    </div>

                    <Button
                      className="w-full h-10 bg-gradient-to-r from-secondary to-warning text-white hover:opacity-90 transition-all shadow-premium text-sm disabled:opacity-50"
                      disabled={!sharedNetworkRadius}
                      onClick={() => {
                        if (sharedNetworkRadius) {
                          onNetworkSelect('shared', sharedNetworkRadius);
                          notification.success({
                            title: "Shared Network Selected",
                            description: "Shared Network (Australia-wide) selected! Access to thousands of verified industries."
                          });
                        }
                      }}
                      text="Use Shared Network"
                      Icon={ArrowRight}
                    />
                    {!sharedNetworkRadius && (
                      <p className="text-xs text-center text-muted-foreground -mt-2">
                        Please select an access level above
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
