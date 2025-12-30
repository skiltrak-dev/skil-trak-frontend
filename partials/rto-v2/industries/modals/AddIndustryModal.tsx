import { Building2, Plus, Sparkles } from 'lucide-react'
import { GlobalModal, Typography, ConfigTabs } from '@components'
import { AddBulkIndustries, AddSingleIndustry } from '../component'

interface AddIndustryModalProps {
    onClose: () => void
}

export const AddIndustryModal = ({ onClose }: AddIndustryModalProps) => {
    const tabs = [
        {
            value: 'single',
            label: 'Single Partner',
            icon: Sparkles,
            component: AddSingleIndustry,
        },
        {
            value: 'bulk',
            label: 'Bulk Import',
            icon: Plus,
            component: AddBulkIndustries,
        },
    ]

    return (
        <GlobalModal
            onCancel={onClose}
            className="w-full lg:w-[850px] max-h-[85vh] overflow-auto custom-scrollbar"
        >
            <div className="px-5 py-4 border-b border-primaryNew/20 bg-gradient-to-r from-primaryNew/5 via-background to-primaryNew/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew flex items-center justify-center shadow-premium">
                        <Building2 className="h-6 w-6 text-white" />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/0 to-white/20"></div>
                    </div>
                    <div>
                        <Typography variant="title">
                            Add Industry Partner
                        </Typography>
                        <Typography variant="label" color="text-muted">
                            Add one partner or import multiple at once
                        </Typography>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <ConfigTabs
                    tabs={tabs}
                    props={{ onClose }}
                    tabsTriggerClasses="!py-1.5 !rounded-md"
                    tabsClasses="!p-1 !rounded-md"
                />
            </div>
        </GlobalModal>
    )
}
