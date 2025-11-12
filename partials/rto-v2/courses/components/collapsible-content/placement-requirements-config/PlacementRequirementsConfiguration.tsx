import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible';
'lucide-react';
import React, { useState } from 'react'
import { AIDifferences } from './AIDifferences';
import { AIHighlightedTasks } from './AIHighlightedTasks';
import { AdminPlacementRequirements } from './AdminPlacementRequirements';
import { RtoPlacementRequirements } from './RtoPlacementRequirements';
import { RequiredPlacementDocuments } from '../RequiredPlacementDocuments';
import { LogbookSummaryDisplay } from '../logbook-summary';
import { EligibleWpTypes } from '../egilible-wp-types';
import { SupervisorRequirements } from '../supervision-requirements';

export const PlacementRequirementsConfiguration = ({ course }: any) => {

    return (
        <div className="space-y-4">
            <RequiredPlacementDocuments course={course} />
            {/* <LogbookSummaryDisplay course={course} /> */}
            {/* TGA Admin Placement Requirements */}
            <AdminPlacementRequirements course={course} />
            {/* RTO Placement Requirements */}
            <RtoPlacementRequirements course={course} />
            {/* AI Differences */}
            <AIDifferences course={course} />
            {/* AI-Extracted Highlighted Tasks */}
            <AIHighlightedTasks course={course} />
            <EligibleWpTypes courseId={course?.id} />
            <SupervisorRequirements course={course} />
        </div>
    )
}
