import { RtoV2Api } from '@redux'
import { Star } from 'lucide-react'
import { CreditPackage } from '../modals'
import { Badge, Button, Card, ShowErrorNotifications } from '@components'
import { getStripe } from '@utils'

export const RtoPurchaseCreditCard = ({
    pkg,
    onSecretReceived,
}: {
    pkg: CreditPackage
    onSecretReceived: (secret: string, pkg: CreditPackage) => void
}) => {
    const [createIndustryCredit, createIndustryCreditResult] =
        RtoV2Api.RtoCredits.createIndustryCredit()

    const onPurchaseClicked = async (pkg: CreditPackage) => {
        const res: any = await createIndustryCredit({
            cost: pkg.price,
            network: 'shareable',
            token: pkg.credits.toString(),
        })
        if (res?.data) {
            const clientSecret = res?.data?.clientSecret
            if (clientSecret) {
                onSecretReceived(clientSecret, pkg)
            }
        }
    }

    return (
        <>
            <ShowErrorNotifications result={createIndustryCreditResult} />
            <Card
                key={pkg.credits}
                className={`border relative group transition-all duration-300 hover:scale-[1.02] p-0 overflow-hidden ${pkg.popular
                        ? 'border-primaryNew/40 bg-white shadow-premium ring-2 ring-primaryNew/5'
                        : '!border-gray-200 bg-white/50 hover:bg-white'
                    }`}
            >
                {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primaryNew"></div>
                )}
                {pkg.popular && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-10">
                        <Badge
                            Icon={Star}
                            variant="primaryNew"
                            size="sm"
                            className="scale-90"
                        >
                            Popular
                        </Badge>
                    </div>
                )}

                <div className="text-center space-y-3">
                    <div className="space-y-0.5">
                        <p className="text-2xl font-black text-foreground">
                            {pkg.credits}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                            Credits
                        </p>
                    </div>

                    <div className="space-y-0.5">
                        <div className="flex items-center justify-center gap-0.5">
                            <span className="text-sm font-medium text-muted-foreground">
                                $
                            </span>
                            <span className="text-2xl font-black text-primaryNew">
                                {pkg.price}
                            </span>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground/60 italic">
                            ${(pkg.price / pkg.credits).toFixed(2)} / credit
                        </p>
                    </div>

                    <Button
                        variant={pkg.popular ? 'primaryNew' : 'secondary'}
                        outline={!pkg.popular}
                        loading={createIndustryCreditResult.isLoading}
                        disabled={createIndustryCreditResult.isLoading}
                        className="w-full h-8 text-[10px] shadow-sm"
                        onClick={() => {
                            onPurchaseClicked(pkg)
                            // onOpenChange(false)
                            // notification.success({
                            //     title: 'Purchase Successful!',
                            //     description: `You have successfully added ${pkg.credits} credits.`,
                            // })
                        }}
                    >
                        Buy Plan
                    </Button>
                </div>
            </Card>
        </>
    )
}
