import { Badge, Button, Card } from '@components'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { ScrollArea } from '@components/ui/scroll-area'
import { useNotification } from '@hooks'
import {
    ArrowRight,
    CheckCircle2,
    Globe,
    Lock,
    Network,
    Star,
    Target,
} from 'lucide-react'
import React from 'react'

interface ChoosePlacementNetworkProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (type: 'private' | 'shared') => void
    credits: string | number
    onPurchaseCredits?: () => void
}

const NETWORK_OPTIONS = [
    {
        id: 'private',
        title: 'Private Network',
        description: 'Your partner industries only',
        icon: Lock,
        gradient: 'from-primaryNew/10 to-transparent',
        iconBg: 'bg-primaryNew',
        targetIconColor: 'text-primaryNew',
        bestFor: 'Established RTOs with existing partners',
        features: [
            'Complete control & privacy',
            '100% free to use',
            'No third-party access',
        ],
        buttonText: 'Select Private',
        variant: 'primaryNew',
    },
    {
        id: 'shared',
        title: 'Shared Network',
        description: '5,000+ verified industries',
        icon: Globe,
        gradient: 'from-secondary/10 to-transparent',
        iconBg: 'bg-primaryNew',
        targetIconColor: 'text-primaryNew',
        bestFor: 'Flexible options & rapid growth',
        features: [
            'Australia-wide coverage',
            'Token-based (pay per use)',
            'Verified industry partners',
        ],
        buttonText: 'Select Premium',
        variant: 'primaryNew',
        recommended: true,
    },
]

export const ChoosePlacementNetworkModal = ({
    open,
    onOpenChange,
    onSelect,
    credits,
    onPurchaseCredits,
}: ChoosePlacementNetworkProps) => {
    const notificationContext = useNotification()
    const notification = notificationContext?.notification

    const handleSelect = (
        type: 'private' | 'shared',
        title: string,
        description: string
    ) => {
        if (type === 'shared' && (!credits || Number(credits) <= 0)) {
            onOpenChange(false)
            onPurchaseCredits?.()
            return
        }

        if (type === 'private' && credits && Number(credits) > 0) {
            notification?.error({
                dissmissTimer: 7000,
                title: 'Active Credits Found',
                description:
                    'You have active credits. You must be in the Shared Network to utilize your workplace request credits.',
            })
            return
        }

        onSelect(type)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden p-0 [&>button]:text-white">
                <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-6 py-3.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
                            <Network className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg text-white font-bold mb-1">
                                Choose Your Placement Network
                            </DialogTitle>
                            <p className="text-sm text-white/80 max-w-lg">
                                Select the network that best fits your Training
                                Organisation's needs and budget
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <ScrollArea className="max-h-[70vh] overflow-y-auto">
                    <div className="p-6 bg-gradient-to-br from-primaryNew/5 via-background to-secondary/5">
                        <div className="grid md:grid-cols-2 gap-6">
                            {NETWORK_OPTIONS.map((option) => (
                                <Card
                                    key={option.id}
                                    border
                                    className={`group relative overflow-hidden rounded-xl border-2 border-border/60 hover:border-primaryNew/50 bg-card hover:shadow-premium transition-all duration-300 transform hover:scale-[1.01] cursor-pointer p-5`}
                                    onClick={() =>
                                        handleSelect(
                                            option.id as any,
                                            option.title,
                                            option.description
                                        )
                                    }
                                >
                                    <div
                                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${option.gradient} rounded-full blur-2xl`}
                                    ></div>

                                    {option.recommended && (
                                        <Badge
                                            Icon={Star}
                                            variant="primaryNew"
                                            className="absolute top-3 right-3"
                                        >
                                            Recommended
                                        </Badge>
                                    )}

                                    <div className="relative space-y-4">
                                        <div className="flex justify-center">
                                            <div
                                                className={`h-12 w-12 rounded-lg ${option.iconBg
                                                    } flex items-center justify-center shadow-md ${option.id === 'shared'
                                                        ? 'animate-float'
                                                        : ''
                                                    }`}
                                            >
                                                <option.icon className="h-6 w-6 text-white" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold mb-1">
                                                {option.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {option.description}
                                            </p>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            {option.features.map(
                                                (feature, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-gray-200/65"
                                                    >
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                                        <p className="text-xs">
                                                            {feature}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className="flex items-start gap-1.5 px-3 py-2 rounded-md bg-primaryNew/5 border border-primaryNew/20">
                                            <Target
                                                className={`h-3.5 w-3.5 ${option.targetIconColor} flex-shrink-0 mt-0.5`}
                                            />
                                            <p className="text-xs leading-snug text-muted-foreground">
                                                <span className="font-semibold text-foreground">
                                                    Best for:
                                                </span>{' '}
                                                {option.bestFor}
                                            </p>
                                        </div>

                                        <Button
                                            variant={option.variant as any}
                                            fullWidth
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleSelect(
                                                    option.id as any,
                                                    option.title,
                                                    option.description
                                                )
                                            }}
                                        >
                                            {option.id === 'shared' &&
                                                (!credits || Number(credits) <= 0)
                                                ? 'Credits Required'
                                                : option.id === 'private' &&
                                                    credits &&
                                                    Number(credits) > 0
                                                    ? 'Utilize Credits First'
                                                    : option.buttonText}
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
