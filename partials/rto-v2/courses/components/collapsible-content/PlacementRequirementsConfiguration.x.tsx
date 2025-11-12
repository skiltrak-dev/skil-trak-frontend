import { Badge } from '@components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible'
import { Textarea } from '@components/ui/textarea'
import { ChevronDown, Sparkles, Zap } from 'lucide-react'
import React, { useState } from 'react'

export const PlacementRequirementsConfiguration = ({ course }: any) => {
    const [tgaAdminOpen, setTgaAdminOpen] = useState<{ [courseId: string]: boolean }>({});
    return (

        <div >
            {/* Placement Requirements Configuration */}
            <div className="flex items-center gap-2 mb-4" >
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-semibold text-base">Placement Requirements Configuration</h3>
                {
                    course.placementRequirements.aiAnalyzed && (
                        <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white border-0 gap-1.5 ml-auto">
                            <Zap className="h-3 w-3" />
                            AI Analyzed
                        </Badge>
                    )
                }
            </div >

            <div className="space-y-4">
                {/* TGA Admin Placement Requirements */}
                <Collapsible
                    open={tgaAdminOpen[course.id] ?? true}
                    onOpenChange={(open) => setTgaAdminOpen({ ...tgaAdminOpen, [course.id]: open })}
                >
                    <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl border border-border/50 overflow-hidden">
                        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium cursor-pointer">TGA Admin Placement Requirements</label>
                                <span className="text-xs text-muted-foreground px-2 py-1 bg-background/50 rounded-md">
                                    {20} / 5000 words
                                </span>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${tgaAdminOpen[course.id] ?? true ? '' : '-rotate-90'}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="px-5 pb-5">
                                <Textarea
                                    // value={currentAdminText}
                                    // onChange={(e) => setAdminTextValues({ ...adminTextValues, [course.id]: e.target.value })}
                                    className="min-h-[120px] resize-y bg-background/50"
                                    placeholder="Enter TGA admin placement requirements..."
                                />
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            </div>
        </div >
    )
}
