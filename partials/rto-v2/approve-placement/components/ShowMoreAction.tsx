import { Button, CollapsibleTrigger } from '@components'
import { ChevronDown, Info } from 'lucide-react'
import React from 'react'

export const ShowMoreAction = ({ isExpanded }: { isExpanded: boolean }) => {
    return (
        <CollapsibleTrigger>
            <Button variant={isExpanded ? 'primaryNew' : 'primary'} fullWidth>
                <span className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    {isExpanded ? 'Hide' : 'Show'} Workplace Eligibility
                    Assessment
                </span>
                <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                    }`}
                />
            </Button>
        </CollapsibleTrigger>
    )
}
