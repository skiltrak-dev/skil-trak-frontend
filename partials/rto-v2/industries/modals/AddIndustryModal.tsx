import { useState } from 'react'
import { Building2, Plus, Sparkles } from 'lucide-react'
import { GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { SingleIndustryForm } from '@partials/rto-v2/industries/forms/SingleIndustryForm'
import { BulkIndustryImportForm } from '@partials/rto-v2/industries/forms/BulkIndustryImportForm'
import { AddBulkIndustries, AddSingleIndustry } from '../component'

interface AddIndustryModalProps {
    onClose: () => void
}

export const AddIndustryModal = ({ onClose }: AddIndustryModalProps) => {
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')

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
                <Tabs
                    value={activeTab}
                    onValueChange={(value) =>
                        setActiveTab(value as 'single' | 'bulk')
                    }
                    className="flex flex-col gap-4"
                >
                    <TabsList className="bg-muted/60 border border-border/60 rounded-xl p-1 inline-flex w-full sm:w-auto">
                        <TabsTrigger
                            value="single"
                            className="data-[state=active]:bg-background data-[state=active]:text-primaryNew data-[state=active]:shadow-sm px-4 py-2 gap-2"
                        >
                            <Sparkles className="h-4 w-4 text-primaryNew" />
                            <span>Single Partner</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="bulk"
                            className="data-[state=active]:bg-background data-[state=active]:text-primaryNew data-[state=active]:shadow-sm px-4 py-2 gap-2"
                        >
                            <Plus className="h-4 w-4 text-primaryNew" />
                            <span>Bulk Import</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="single">
                        <AddSingleIndustry onClose={onClose} />
                    </TabsContent>

                    <TabsContent value="bulk">
                        <AddBulkIndustries onClose={onClose} />
                    </TabsContent>
                </Tabs>
            </div>
        </GlobalModal>
    )
}
