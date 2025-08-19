import React from 'react'

export const ViewPlacementFeedbackModal = ({ feedbackData }: any) => {
    const groupedData = feedbackData.reduce((acc: any, item: any) => {
        if (!acc[item.step]) {
            acc[item.step] = []
        }
        acc[item.step].push(item)
        return acc
    }, {})

    const getAnswerStyle = (answer: any) => {
        if (answer === 'Strongly Agree')
            return 'bg-green-100 text-green-800 border-green-200'
        if (answer === 'Satisfied')
            return 'bg-blue-100 text-blue-800 border-blue-200'
        if (answer === 'Confident')
            return 'bg-purple-100 text-purple-800 border-purple-200'
        if (answer.includes('4 / 5 stars'))
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        if (answer === 'Maybe')
            return 'bg-orange-100 text-orange-800 border-orange-200'
        if (answer === 'Not provided')
            return 'bg-gray-100 text-gray-600 border-gray-200'
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }

    const getStepIcon = (step: any) => {
        switch (step) {
            case 'Overall Placement Experience':
                return (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                )
            case 'Learning & Skills Development':
                return (
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    </div>
                )
            case 'Host Employer Feedback':
                return (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                    </div>
                )
            case 'Skiltrak & Placement Process':
                return (
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                )
            case 'Final Comments':
                return (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                    </div>
                )
            default:
                return (
                    <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                )
        }
    }

    const renderStars = (answer: any) => {
        if (answer.includes('/') && answer.includes('stars')) {
            const rating = parseInt(answer.split('/')[0].trim())
            return (
                <div className="flex items-center space-x-1 ml-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`w-4 h-4 ${
                                star <= rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                        ({rating}/5)
                    </span>
                </div>
            )
        }
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Placement Feedback Report
                    </h1>
                    <p className="text-lg text-gray-600">
                        Course ID: {feedbackData[0]?.title}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Feedback Sections */}
                <div className="space-y-8">
                    {Object.entries(groupedData).map(
                        ([stepName, questions]: any, sectionIndex) => (
                            <div
                                key={stepName}
                                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                            >
                                {/* Section Header */}
                                <div className="bg-gradient-to-r from-gray-50 to-slate-100 px-8 py-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        {getStepIcon(stepName)}
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {stepName}
                                            </h2>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {questions?.length} questions in
                                                this section
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Questions */}
                                <div className="p-8">
                                    <div className="grid gap-6">
                                        {questions?.map(
                                            (item: any, index: any) => (
                                                <div
                                                    key={item.key}
                                                    className="group hover:bg-gray-50 rounded-xl p-6 transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-md"
                                                >
                                                    <div className="flex items-start justify-between space-x-6">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-3">
                                                                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                                                                    {index + 1}
                                                                </span>
                                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                                    {
                                                                        item.question
                                                                    }
                                                                </h3>
                                                            </div>
                                                            <div className="ml-9">
                                                                <div className="flex items-center flex-wrap">
                                                                    <span
                                                                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${getAnswerStyle(
                                                                            item.answer
                                                                        )}`}
                                                                    >
                                                                        {
                                                                            item.answer
                                                                        }
                                                                    </span>
                                                                    {renderStars(
                                                                        item.answer
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                                {item.key}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Summary Footer */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">
                        Feedback Summary
                    </h3>
                    <p className="text-blue-100 mb-4">
                        Total responses collected: {feedbackData.length} across{' '}
                        {Object.keys(groupedData).length} categories
                    </p>
                    <div className="inline-flex items-center space-x-2 text-blue-100">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Report generated successfully</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
