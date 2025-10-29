import { Industry } from '@types'
import { Building2, MapPin } from 'lucide-react'

export const IndustryInfo = ({ industry }: { industry: Industry }) => {
    return (
        <div>
            {industry?.isPartner && (
                <div className="flex items-center gap-1.5 mb-1">
                    <Building2 className="h-3.5 w-3.5 text-primaryNew" />
                    <span className="text-xs text-muted-foreground">
                        Industry Partner
                    </span>
                </div>
            )}
            <p className="font-semibold text-sm">{industry?.user?.name}</p>
            <p className="text-xs text-primaryNew/80 font-medium mt-0.5">
                {industry?.workplaceType?.name}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" />
                {industry?.addressLine1}
            </p>
        </div>
    )
}
