import { Sparkles } from 'lucide-react'
import React from 'react'
import { Service } from '../AvailableServices'

export const InfoBanner = ({
    colors,
    service,
}: {
    service: Service
    colors: any
}) => {
    const getSuccessMessage = () => {
        if (!service)
            return {
                title: 'Enquiry submitted!',
                description: "We'll contact you soon.",
            }
        switch (service.title) {
            case 'Expert Industry Consultation':
                return {
                    title: 'Consultation Request Received!',
                    description:
                        'Thanks! A SkilTrak specialist will contact you within 2 business days.',
                }
            case 'MOU & Legal Services':
                return {
                    title: 'MOU Request Received!',
                    description:
                        "MOU request received. We'll confirm scope & ETA.",
                }
            case 'Advanced Simulation Tools':
                return {
                    title: 'Simulation Room Enquiry Received!',
                    description: "We'll reply with availability and a quote.",
                }
            case 'Professional Webinar Platform':
                return {
                    title: 'Expert Session Request Received!',
                    description:
                        "Thanks! We'll propose speaker(s) and confirm logistics.",
                }
            default:
                return {
                    title: 'Enquiry submitted!',
                    description: "We'll contact you soon.",
                }
        }
    }
    return (
        <div
            className={`relative overflow-hidden rounded-xl border ${colors.bg} p-4`}
        >
            <div className="flex gap-3">
                <div className="shrink-0">
                    <div
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${colors.from} ${colors.to} flex items-center justify-center shadow-premium`}
                    >
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-sm mb-1">
                        What happens next?
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {getSuccessMessage().description}
                    </p>
                </div>
            </div>
        </div>
    )
}
