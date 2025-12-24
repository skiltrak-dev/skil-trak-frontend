import { Badge, Button, Card } from '@components'
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
import React, { useState } from 'react'

interface ChoosePlacementNetworkProps {
    onSelect: (type: 'private' | 'shared') => void
}

export const ChoosePlacementNetwork = ({
    onSelect,
}: ChoosePlacementNetworkProps) => {
    const notificationContext = useNotification()
    const notification = notificationContext?.notification

    const handlePrivateSelect = () => {
        onSelect('private')
        notification?.success({
            title: 'Private Network selected!',
            description: 'Using only your uploaded industry partners.',
        })
    }

    const handleSharedSelect = () => {
        onSelect('shared')
        notification?.success({
            title: 'Shared Network selected!',
            description: 'Token-based access to 5,000+ industries.',
        })
    }

    return (
        <div className="space-y-5 p-5">
            <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="max-w-5xl w-full mx-auto py-6">
                    <Card
                        border
                        className="relative border-primary/20 shadow-premium-lg bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>

                        <div className="border-b border-primary/10 relative text-center pb-5 pt-7">
                            <div className="flex flex-col items-center gap-2.5">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-premium animate-float">
                                    <Network className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl mb-1 text-primary">
                                        Choose Your Placement Network
                                    </h1>
                                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                                        Select the network that best fits your
                                        Training Organisation's needs and budget
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 relative">
                            <div className="grid md:grid-cols-3 gap-5">
                                {/* Private Network */}
                                <Card
                                    border
                                    className="group relative overflow-hidden rounded-xl border-2 border-border/60 hover:border-primary/50 bg-card hover:shadow-premium transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                                    onClick={handlePrivateSelect}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>

                                    <div className="relative p-0 space-y-3.5">
                                        <div className="flex justify-center">
                                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center shadow-md">
                                                <Lock className="h-6 w-6 text-white" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <h3 className="text-lg mb-0.5">
                                                Private Network
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Your partner industries only
                                            </p>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                                <p className="text-xs">
                                                    Complete control & privacy
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                                <p className="text-xs">
                                                    100% free to use
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                                <p className="text-xs">
                                                    No third-party access
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-1.5 px-2 py-1.5 rounded-md bg-primary/5 border border-primary/20">
                                            <Target className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                                            <p className="text-xs leading-snug text-muted-foreground">
                                                <span className="font-semibold text-foreground">
                                                    Best for:
                                                </span>{' '}
                                                Established Training
                                                Organisations with existing
                                                partners
                                            </p>
                                        </div>

                                        <Button
                                            className="w-full h-9 bg-gradient-to-r from-primary to-primary/90 text-white hover:opacity-90 transition-all shadow-md text-sm"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handlePrivateSelect()
                                            }}
                                        >
                                            Select Private
                                            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                        </Button>
                                    </div>
                                </Card>

                                {/* Shared Network */}
                                <Card
                                    border
                                    className="group relative overflow-hidden rounded-xl border-2 border-secondary/40 hover:border-secondary/60 bg-card hover:shadow-premium-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                                    onClick={handleSharedSelect}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-2xl"></div>
                                    <Badge className="absolute top-2.5 right-2.5 bg-gradient-to-r from-warning to-accent text-white border-0 shadow-md text-xs px-2 py-0.5">
                                        <Star className="h-3 w-3 mr-1" />
                                        Recommended
                                    </Badge>

                                    <div className="relative p-0 space-y-3.5">
                                        <div className="flex justify-center">
                                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-warning flex items-center justify-center shadow-md animate-float">
                                                <Globe className="h-6 w-6 text-white" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <h3 className="text-lg mb-0.5">
                                                Shared Network
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                5,000+ verified industries
                                            </p>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                                <p className="text-xs">
                                                    Australia-wide coverage
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                                <p className="text-xs">
                                                    Token-based (pay per use)
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                                <p className="text-xs">
                                                    Verified industry partners
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-1.5 px-2 py-1.5 rounded-md bg-secondary/5 border border-secondary/20">
                                            <Target className="h-3 w-3 text-secondary flex-shrink-0 mt-0.5" />
                                            <p className="text-xs leading-snug text-muted-foreground">
                                                <span className="font-semibold text-foreground">
                                                    Best for:
                                                </span>{' '}
                                                Flexible placement options &
                                                growth
                                            </p>
                                        </div>

                                        <Button
                                            className="w-full h-9 bg-gradient-to-r from-secondary to-warning text-white hover:opacity-90 transition-all shadow-md text-sm"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleSharedSelect()
                                            }}
                                        >
                                            Select Premium
                                            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
