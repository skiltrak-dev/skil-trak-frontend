import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Card } from '@components'
import { Button } from '@components'
import {
    AlertCircle,
    ArrowRight,
    Ban,
    CheckCircle,
    CheckCircle2,
    FileCheck,
    Lock,
    Network,
    Shield,
    Upload,
    Zap,
} from 'lucide-react'
import { useNotification } from '@hooks'

interface IndustryTermsModalProps {
    isOpen: boolean
    onClose: () => void
    onAccept?: () => void
}

export const IndustryTermsModal = ({
    isOpen,
    onClose,
    onAccept,
}: IndustryTermsModalProps) => {
    const { notification } = useNotification()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!max-w-3xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <div className="min-h-9 min-w-9 rounded-md bg-primaryNew flex items-center justify-center">
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
                            <CheckCircle className="h-4 w-4 text-primaryNew" />
                            1. What the Shareable Network Is
                        </h3>
                        <Alert className="border-primaryNew/40 bg-primaryNew/5">
                            <Network className="h-4 w-4 text-primaryNew" />
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
                            <Zap className="h-4 w-4 text-primaryNew" />
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
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-200/60">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        Use credits for each workplace request
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        No direct access to the network
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-200/60">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        Allow SkilTrak to manage industry
                                        compliance
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        All WHS, capacity, and suitability
                                        checks performed by SkilTrak
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-200/60">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        All industries interact EXCLUSIVELY via
                                        the platform
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        No external contact or bypassing
                                        SkilTrak
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-200/60">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-xs">
                                        Industry data remains confidential
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Network belongs to SkilTrak, accessed
                                        through credits only
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="space-y-2.5">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <Lock className="h-4 w-4 text-destructive" />
                            5. Data Protection & Network Integrity
                        </h3>
                        <Alert className="border-destructive/40 bg-destructive/5">
                            <Ban className="h-4 w-4 text-destructive" />
                            <AlertDescription className="ml-2 text-sm space-y-2">
                                <p>
                                    To maintain high compliance and safety
                                    standards:
                                </p>
                                <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs">
                                    <li>
                                        Provider industries must adhere to the
                                        same verification level as SkilTrak
                                        industries
                                    </li>
                                    <li>
                                        SkilTrak may suspend industries that do
                                        not meet requirements
                                    </li>
                                    <li>
                                        Providers cannot resell or share
                                        industry access
                                    </li>
                                    <li>
                                        Providers cannot scrape, extract, or
                                        duplicate the network
                                    </li>
                                </ul>
                                <p className="font-semibold mt-1.5 text-xs">
                                    Any breach may result in immediate
                                    termination of access.
                                </p>
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="primaryNew"
                        onClick={() => {
                            onAccept?.()
                            onClose()
                            notification.success({
                                description: 'Terms & Conditions acknowledged',
                                title: 'Success',
                            })
                        }}
                    >
                        <CheckCircle className="h-4 w-4" />I Understand
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
