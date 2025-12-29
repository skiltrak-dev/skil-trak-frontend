import React from 'react'
import { CheckCircle2, ClipboardCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Card, NoData } from '@components'

export const EnhancedRtoRequirementsCard = ({
    confirmedRtoReqs,
    confirmRtoReqWithWorkplace,
    data,
}: any) => {
    return (
        <Card noPadding className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-4">
                <div className="flex items-center gap-2.5 text-white">
                    <ClipboardCheck className="h-5 w-5" />
                    <h3 className="font-semibold">RTO Extra Requirements</h3>
                </div>
            </div>

            <div className="p-6 max-h-96 overflow-auto">
                <div className="space-y-3">
                    {data && data?.length > 0 ? (
                        data?.map((req: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    delay: index * 0.05,
                                }}
                                className="flex flex-col gap-3 p-4 rounded-lg border border-slate-200 hover:border-violet-300 hover:bg-violet-50/30 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-1 bg-violet-100 rounded-lg flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="h-4 w-4 text-violet-600" />
                                    </div>
                                    <span className="text-slate-700 text-sm leading-relaxed flex-1">
                                        {req}
                                    </span>
                                </div>

                                {confirmedRtoReqs[index] ? (
                                    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span className="font-medium">
                                            Confirmed
                                        </span>
                                        <span className="text-slate-500 mx-1">
                                            •
                                        </span>
                                        <span className="text-slate-600">
                                            {confirmedRtoReqs[index].date}
                                        </span>
                                        <span className="text-slate-500 mx-1">
                                            •
                                        </span>
                                        <span className="text-slate-600">
                                            {confirmedRtoReqs[index].person}
                                        </span>
                                    </div>
                                ) : (
                                    <Button
                                        outline
                                        variant="primary"
                                        className="w-full h-9 border-violet-300 text-violet-600 hover:bg-violet-600 hover:text-white hover:border-violet-600"
                                        onClick={() =>
                                            confirmRtoReqWithWorkplace(index)
                                        }
                                        Icon={CheckCircle2}
                                        text="Confirm with Workplace"
                                    />
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <NoData text="No Extra Requirements Found" />
                    )}
                </div>
            </div>
        </Card>
    )
}
