import { Shield, Info } from 'lucide-react'
import { Card } from '@components'
import { Button } from '@components'

export function InsuranceSection() {
    return (
        <Card className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] p-4 border-2 border-[#FDE68A]">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F7A619] to-[#EA580C] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-[#1A2332] mb-2">
                        Insurance Documents (Optional but Recommended)
                    </h4>
                    <p className="text-xs text-[#92400E] leading-relaxed mb-3">
                        While optional, uploading insurance documents is highly
                        recommended for compliance and liability protection.
                        This helps protect both your organization and students
                        during placements.
                    </p>
                    <div className="flex items-center gap-2">
                        <Button className="bg-gradient-to-br from-[#F7A619] to-[#EA580C] hover:shadow-lg text-white text-xs font-medium">
                            Upload Insurance Documents
                        </Button>
                        <Button variant="action">
                            <Info className="w-3.5 h-3.5 mr-1.5" />
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
