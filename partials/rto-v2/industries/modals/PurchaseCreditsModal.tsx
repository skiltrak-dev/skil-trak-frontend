import React from 'react'
import { Zap, Sparkles, Star, Info } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@components/ui/dialog'
import { Card, Button, Badge } from '@components'
import { Alert, AlertDescription } from '@components/ui/alert'
import { useNotification } from '@hooks'

interface PurchaseCreditsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    workplaceCredits: number
    onPurchase: (amount: number) => void
}

export const PurchaseCreditsModal = ({
    open,
    onOpenChange,
    workplaceCredits,
    onPurchase,
}: PurchaseCreditsModalProps) => {
    const { notification } = useNotification()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-accent to-warning flex items-center justify-center">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                        Purchase Workplace Request Credits
                    </DialogTitle>
                    <DialogDescription>
                        Each credit = 1 AI-matched workplace request from the
                        SkilTrak Network
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-3">
                    <Alert className="border-primary/40 bg-primary/5">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <AlertDescription className="ml-2 text-sm">
                            <p className="font-semibold mb-0.5">
                                Current Balance: {workplaceCredits} credits
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Purchase more credits to access the SkilTrak
                                Shareable Network
                            </p>
                        </AlertDescription>
                    </Alert>

                    <div className="grid md:grid-cols-3 gap-3">
                        {[
                            { credits: 10, price: 99, popular: false },
                            { credits: 50, price: 449, popular: true },
                            { credits: 100, price: 799, popular: false },
                        ].map((pkg) => (
                            <Card
                                key={pkg.credits}
                                className={`relative ${
                                    pkg.popular
                                        ? 'border-primary/50 shadow-premium ring-2 ring-primary/20'
                                        : 'border-border/60'
                                }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-2.5 py-0.5">
                                            <Star className="h-3 w-3 mr-1" />
                                            Popular
                                        </Badge>
                                    </div>
                                )}
                                <div className="p-5 text-center space-y-3">
                                    <div>
                                        <p className="text-2xl mb-0.5">
                                            {pkg.credits}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Credits
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xl mb-0.5">
                                            ${pkg.price}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            $
                                            {(pkg.price / pkg.credits).toFixed(
                                                2
                                            )}{' '}
                                            per credit
                                        </p>
                                    </div>
                                    <Button
                                        outline={!pkg.popular}
                                        variant={'primaryNew'}
                                        onClick={() => {
                                            onPurchase(pkg.credits)
                                            onOpenChange(false)
                                            notification.success({
                                                title: 'Success',
                                                description: `Successfully purchased ${pkg.credits} credits!`,
                                            })
                                        }}
                                    >
                                        Purchase
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Alert className="border-secondary/40 bg-secondary/5">
                        <Info className="h-4 w-4 text-secondary" />
                        <AlertDescription className="ml-2 text-xs">
                            Credits never expire and can be used at any time.
                            Each credit provides one matched workplace option
                            through our 19-point matching system.
                        </AlertDescription>
                    </Alert>
                </div>

                <DialogFooter>
                    <Button
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
