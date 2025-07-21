import React from 'react'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import {
    X,
    DollarSign,
    Calendar,
    Mail,
    CreditCard,
    CheckCircle,
    Clock,
    User,
} from 'lucide-react'

export const ViewPaymentDetailsModal = () => {
    const router = useRouter()
    const { data, isLoading, isError } =
        AdminApi.Students.useStudentPaymentDetails(router.query?.id, {
            skip: !router.query?.id,
        })
    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const formatAmount = (amount: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'AUD',
        }).format(amount)
    }

    const getStatusColor = (status: any) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'failed':
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status: any) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            case 'pending':
                return <Clock className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }

    console.log('amount', data?.amount)

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Payment Details
                        </h2>
                        <p className="text-sm text-gray-500">
                            Transaction information
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">
                            Loading payment details...
                        </span>
                    </div>
                )}

                {isError && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                                <X className="w-10 h-10 text-red-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Error Loading Payment
                            </h3>
                            <p className="text-gray-600">
                                Unable to load payment details. Please try
                                again.
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-y-4">
                    {data &&
                        !isLoading &&
                        !isError &&
                        data?.map((payment: any) => (
                            <div className="space-y-6">
                                {/* Status and Amount */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                                        payment?.status
                                                    )}`}
                                                >
                                                    {getStatusIcon(
                                                        payment.status
                                                    )}
                                                    <span className="ml-1 capitalize">
                                                        {payment?.status}
                                                    </span>
                                                </span>
                                                {payment?.isActive && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Payment Status
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {formatAmount(payment?.amount)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Amount
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="bg-blue-50 p-2 rounded-lg">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    Payment ID
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    #{payment?.id}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="bg-purple-50 p-2 rounded-lg">
                                                <CreditCard className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    Intent ID
                                                </h4>
                                                <p className="text-sm text-gray-600 font-mono">
                                                    {payment?.intentId}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="bg-green-50 p-2 rounded-lg">
                                            <Mail className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                Email Address
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {payment?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Timestamps */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="bg-orange-50 p-2 rounded-lg">
                                                <Calendar className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    Created
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {formatDate(
                                                        payment?.createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="bg-indigo-50 p-2 rounded-lg">
                                                <Calendar className="w-4 h-4 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    Last Updated
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {formatDate(
                                                        payment?.updatedAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
