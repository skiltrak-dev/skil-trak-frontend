import { Rto } from '@types'
import { Service } from '../components'
import {
    AdvancedSimulationRoomForm,
    ExpertIndustryConsultation,
    MOULegalServicesForm,
    ProfessionalWebinarSeminarForm,
} from '../forms'
import { RtoDashboardBaseModal } from './RtoDashboardBaseModal'

export const ServicesFeaturesFormModal = ({
    rto,
    service,
    onCancel,
}: {
    rto: Rto
    service: Service
    onCancel: () => void
}) => {
    const getForms = () => {
        switch (service?.title) {
            case 'Expert Industry Consultation':
                return (
                    <ExpertIndustryConsultation
                        rto={rto}
                        service={service}
                        onCancel={onCancel}
                    />
                )
            case 'MOU & Legal Services':
                return (
                    <MOULegalServicesForm
                        rto={rto}
                        service={service}
                        onCancel={onCancel}
                    />
                )
            case 'Advanced Simulation Tools':
                return (
                    <AdvancedSimulationRoomForm
                        rto={rto}
                        service={service}
                        onCancel={onCancel}
                    />
                )
            case 'Professional Webinar Platform':
                return (
                    <ProfessionalWebinarSeminarForm
                        rto={rto}
                        service={service}
                        onCancel={onCancel}
                    />
                )
            default:
                return (
                    <MOULegalServicesForm
                        rto={rto}
                        service={service}
                        onCancel={onCancel}
                    />
                )
        }
    }
    return (
        <RtoDashboardBaseModal
            onCancel={onCancel}
            title={service?.title}
            variant={service?.variant}
            description={service?.description}
        >
            <div className="px-6">{getForms()}</div>
        </RtoDashboardBaseModal>
    )
}
