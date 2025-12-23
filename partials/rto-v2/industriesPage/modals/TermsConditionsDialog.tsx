import { Alert, AlertDescription } from '@components/ui/alert'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    CheckCircle2,
    Crown,
    FileCheck,
    Info,
    Network,
    Shield,
    Upload,
    XCircle,
    Zap,
} from 'lucide-react'
import { Button } from '../../../../components/buttons'
import { Card } from '../../../../components/cards'
import { Checkbox } from '../../../../components/inputs'

interface TermsConditionsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    termsAccepted: boolean
    onTermsAccept: (accepted: boolean) => void
    onAcceptAndContinue: () => void
}

export function TermsConditionsDialog({
    open,
    onOpenChange,
    termsAccepted,
    onTermsAccept,
    onAcceptAndContinue,
}: TermsConditionsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <FileCheck className="h-4 w-4 text-white" />
                        </div>
                        SkilTrak Shareable Network – Terms & Conditions
                    </DialogTitle>
                    <DialogDescription>
                        Credit-Based Model for Training Organisations
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-3">
                    {/* Section 1 */}
                    <div className="space-y-2.5">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            1. What the Shareable Network Is
                        </h3>
                        <Alert className="border-primary/40 bg-primary/5">
                            <Network className="h-4 w-4 text-primary" />
                            <AlertDescription className="ml-2 space-y-2 text-sm">
                                <p className="font-semibold">
                                    The SkilTrak Shareable Network is NOT a
                                    browsable database.
                                </p>
                                <p>
                                    It is a controlled, curated, fully vetted
                                    industry ecosystem that includes only:
                                </p>
                                <ul className="list-disc list-inside space-y-0.5 ml-3 text-xs">
                                    <li>Placement-ready industries</li>
                                    <li>
                                        Verified against UoC mandatory placement
                                        requirements
                                    </li>
                                    <li>
                                        Signed WHS & Child Safety documentation
                                    </li>
                                    <li>Confirmed supervisor details</li>
                                    <li>Capacity-verified sites</li>
                                    <li>
                                        Industries willing to accept students
                                        via SkilTrak
                                    </li>
                                </ul>
                                <p className="italic mt-1.5 text-xs">
                                    The network is dynamic and continuously
                                    updated by SkilTrak. This network is the
                                    intellectual property of SkilTrak.
                                </p>
                            </AlertDescription>
                        </Alert>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-2.5">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Zap className="h-4 w-4 text-secondary" />
                            2. How You Access the Network (Credit System)
                        </h3>
                        <div className="space-y-2.5">
                            <p className="text-sm text-muted-foreground">
                                You do NOT receive industry lists, contact
                                information, or full network view. Instead:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                                <Card className="border-secondary/20 bg-secondary/5">
                                    <div className="p-3.5">
                                        <p className="font-semibold mb-1.5 text-sm">
                                            Purchase Workplace Request Credits
                                        </p>
                                        <p className="text-xs text-muted-foreground mb-2.5">
                                            1 credit = 1 AI-matched workplace
                                            request
                                        </p>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle className="h-3 w-3 text-success" />
                                                <span>
                                                    19-point matching system
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle className="h-3 w-3 text-success" />
                                                <span>
                                                    Best workplace option
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle className="h-3 w-3 text-success" />
                                                <span>No raw data exposed</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="border-warning/20 bg-warning/5">
                                    <div className="p-3.5">
                                        <p className="font-semibold mb-1.5 text-sm">
                                            What You Get Per Credit
                                        </p>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <ArrowRight className="h-3 w-3 text-warning" />
                                                <span>Workplace option</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ArrowRight className="h-3 w-3 text-warning" />
                                                <span>
                                                    Industry account link
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ArrowRight className="h-3 w-3 text-warning" />
                                                <span>
                                                    Suitability evidence
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ArrowRight className="h-3 w-3 text-warning" />
                                                <span>
                                                    WHS & compliance
                                                    confirmations
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ArrowRight className="h-3 w-3 text-warning" />
                                                <span>
                                                    Task alignment details
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ArrowRight className="h-3 w-3 text-warning" />
                                                <span>Supervisor details</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-2.5">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Upload className="h-4 w-4 text-accent" />
                            3. Uploading Your Industry Network
                        </h3>
                        <Alert className="border-accent/40 bg-accent/5">
                            <AlertCircle className="h-4 w-4 text-accent" />
                            <AlertDescription className="ml-2 space-y-2 text-sm">
                                <p className="font-semibold">
                                    You may upload your own industry contacts
                                    into the CRM:
                                </p>
                                <div className="space-y-1.5 mt-1.5">
                                    <div className="p-2.5 rounded-lg bg-card border border-border">
                                        <p className="font-semibold text-xs mb-1">
                                            If SkilTrak is already partnered
                                            with that industry:
                                        </p>
                                        <ul className="list-disc list-inside space-y-0.5 text-xs ml-2">
                                            <li>System will flag it</li>
                                            <li>
                                                SkilTrak verifies the
                                                affiliation
                                            </li>
                                            <li>
                                                Industry becomes active for you
                                            </li>
                                            <li>
                                                No duplicate onboarding required
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-card border border-border">
                                        <p className="font-semibold text-xs mb-1">
                                            If SkilTrak is NOT partnered with
                                            that industry:
                                        </p>
                                        <ul className="list-disc list-inside space-y-0.5 text-xs ml-2">
                                            <li>
                                                Industry MUST complete
                                                SkilTrak&apos;s onboarding
                                            </li>
                                            <li>
                                                Sign WHS + suitability
                                                documentation
                                            </li>
                                            <li>Provide supervisor details</li>
                                            <li>
                                                Undergo UoC task & capacity
                                                verification
                                            </li>
                                            <li>
                                                Agree to host students via
                                                SkilTrak platform
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="font-semibold mt-2 text-xs">
                                    Only after successful verification does the
                                    industry become &quot;Active.&quot;
                                </p>
                            </AlertDescription>
                        </Alert>
                    </div>

                    {/* Section 4 */}
                    <div className="space-y-2.5">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Shield className="h-4 w-4 text-success" />
                            4. Conditions of Use
                        </h3>
                        <div className="space-y-1.5">
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        Use credits for each workplace request
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        No credit = no workplace option
                                        delivered
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        No mass downloading of industry data
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Credits are for placement matching only
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        Ethical & compliant use of matched
                                        workplaces
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        All placements must follow industry
                                        standards
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        Your own industries are always
                                        prioritized first
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Shared network is used when your
                                        industries are full
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="space-y-2.5">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-destructive" />
                            5. What You CANNOT Do
                        </h3>
                        <div className="space-y-1.5">
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-destructive/5 border border-destructive/20">
                                <XCircle className="h-3.5 w-3.5 text-destructive mt-0.5 flex-shrink-0" />
                                <p className="text-xs">
                                    Extract or scrape industry contact
                                    information for use outside SkilTrak
                                </p>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-destructive/5 border border-destructive/20">
                                <XCircle className="h-3.5 w-3.5 text-destructive mt-0.5 flex-shrink-0" />
                                <p className="text-xs">
                                    Share or resell matched workplaces to third
                                    parties
                                </p>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-destructive/5 border border-destructive/20">
                                <XCircle className="h-3.5 w-3.5 text-destructive mt-0.5 flex-shrink-0" />
                                <p className="text-xs">
                                    Use credits to &quot;test&quot; or game the
                                    system
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="space-y-2.5">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Info className="h-4 w-4 text-primary" />
                            6. Important Notes
                        </h3>
                        <Alert className="border-primary/40 bg-primary/5">
                            <Crown className="h-4 w-4 text-primary" />
                            <AlertDescription className="ml-2 space-y-1.5 text-xs">
                                <p>
                                    <span className="font-semibold">
                                        Priority Matching:
                                    </span>{' '}
                                    Your own industries are matched first. If
                                    unavailable, SkilTrak&apos;s network is
                                    used.
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Network Transparency:
                                    </span>{' '}
                                    You will see the total number of available
                                    industries in the shared network but not
                                    individual details.
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Credit Validity:
                                    </span>{' '}
                                    Credits do not expire and can be used at any
                                    time.
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Refund Policy:
                                    </span>{' '}
                                    Credits are non-refundable once purchased.
                                </p>
                            </AlertDescription>
                        </Alert>
                    </div>

                    {/* Acceptance Checkbox */}
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border-2 border-primary/20">
                        <Checkbox
                            name="terms"
                            defaultChecked={termsAccepted}
                            onChange={(e: any) =>
                                onTermsAccept(e.target.checked)
                            }
                            label=""
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm cursor-pointer"
                        >
                            <span className="font-semibold">
                                I have read and agree to the Terms & Conditions
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                                By accepting, you agree to use the SkilTrak
                                Shareable Network responsibly and in accordance
                                with these terms.
                            </p>
                        </label>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t">
                    <Button
                        outline
                        onClick={() => onOpenChange(false)}
                        className="flex-1"
                        text="Cancel"
                    />
                    <Button
                        onClick={onAcceptAndContinue}
                        disabled={!termsAccepted}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                        text="Accept & Continue"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
