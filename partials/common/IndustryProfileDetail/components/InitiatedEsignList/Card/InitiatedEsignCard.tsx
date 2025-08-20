import { Calendar, FileText, User } from 'lucide-react'
import moment from 'moment'
import { getStatusColor } from '../functions'
import { Typography } from '@components'

export const InitiatedEsignCard = ({ esign }: { esign: any }) => {
    return (
        <div className="h-fit bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <Typography
                            variant="label"
                            semibold
                            color="text-gray-900"
                        >
                            {esign?.template?.name}
                        </Typography>
                        <Typography variant="small" color="text-gray-500">
                            {esign?.template?.sector?.name}
                        </Typography>
                    </div>
                </div>
                <span
                    className={`px-2 py-1 uppercase rounded-md text-xs font-medium border ${getStatusColor(
                        esign?.status
                    )}`}
                >
                    {esign?.status}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <Typography variant="label" color="text-gray-600">
                        Initiated:
                    </Typography>
                    <Typography variant="label" color="text-gray-600">
                        {moment(esign?.createdAt).format('DD MM YYYY')}
                    </Typography>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-600" />
                    <Typography variant="label" color="text-gray-600">
                        By:
                    </Typography>
                    <Typography variant="label" color="text-gray-600">
                        {esign?.initiatedBy?.name}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
