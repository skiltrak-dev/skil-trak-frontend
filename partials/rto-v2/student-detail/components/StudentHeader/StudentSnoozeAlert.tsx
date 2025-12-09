import moment from 'moment'
import { Student } from '@types'
import { BellOff, Clock } from 'lucide-react'
import { Badge } from '@components'

export const StudentSnoozeAlert = ({ student }: { student: Student }) => {
    const snoozeEndDate = moment(student?.snoozedDate).format('Do MMM YYYY')

    return (
        <div className="relative bg-primary-light/30 border-l-4 border-primary rounded-lg px-4 py-2 shadow-md">
            {/* Content */}
            <div className="flex items-start gap-3 pr-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <BellOff className="w-5 h-5 text-white" />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                    <h4 className=" font-semibold text-slate-900 mb-1">
                        Student Snoozed
                    </h4>

                    {/* Snooze End Info */}
                    {/* <div className="flex items-center gap-2 text-sm text-amber-800 bg-amber-100 rounded-md px-3 py-1.5 inline-flex">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                            Resuming on {snoozeEndDate}
                        </span>
                    </div> */}
                    <Badge
                        className="bg-primary text-white"
                        text={`Resuming on ${snoozeEndDate}`}
                        Icon={Clock}
                    />
                </div>
            </div>
        </div>
    )
}
