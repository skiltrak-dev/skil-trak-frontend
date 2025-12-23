import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Card, NoData } from '@components'
import { CheckCircle2, ChevronRight, Zap } from 'lucide-react'
import { useRouter } from 'next/router'
import { RtoV2Api } from '@queries'

export const EnhancedHighlightedTasksCard = ({
    highlightedTasks,
    confirmedTasks,
    confirmTaskWithWorkplace,
    data,
}: any) => {
    return (
        <Card noPadding className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#F7A619] to-[#F7A619]/80 px-5 py-4">
                <div className="flex items-center gap-2.5 text-white">
                    <Zap className="h-5 w-5" />
                    <h3 className="font-semibold">Highlighted Tasks</h3>
                </div>
            </div>

            <div className="p-6 max-h-96 overflow-auto">
                <div className="space-y-3">
                    {data && data?.length > 0 ? (
                        data?.map((task: any, index: any) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: index * 0.05,
                                }}
                                className="flex flex-col gap-3 p-4 rounded-lg border border-slate-200 hover:border-[#F7A619]/30 hover:bg-orange-50/30 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-1 bg-[#F7A619]/10 rounded-lg flex-shrink-0 mt-0.5">
                                        <ChevronRight className="h-4 w-4 text-[#F7A619]" />
                                    </div>
                                    <span className="text-slate-700 text-sm leading-relaxed flex-1">
                                        {task}
                                    </span>
                                </div>

                                {confirmedTasks[index] ? (
                                    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span className="font-medium">
                                            Confirmed
                                        </span>
                                        <span className="text-slate-500 mx-1">
                                            •
                                        </span>
                                        <span className="text-slate-600">
                                            {confirmedTasks[index].date}
                                        </span>
                                        <span className="text-slate-500 mx-1">
                                            •
                                        </span>
                                        <span className="text-slate-600">
                                            {confirmedTasks[index].person}
                                        </span>
                                    </div>
                                ) : (
                                    <Button
                                        outline
                                        variant="primary"
                                        className="w-full h-9 border-[#F7A619]/30 text-[#F7A619] hover:bg-[#F7A619] hover:text-white hover:border-[#F7A619]"
                                        onClick={() =>
                                            confirmTaskWithWorkplace(index)
                                        }
                                        Icon={CheckCircle2}
                                        text="Confirm with Workplace"
                                    />
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <NoData text="No Highlighted Tasks Found" />
                    )}
                </div>
            </div>
        </Card>
    )
}
