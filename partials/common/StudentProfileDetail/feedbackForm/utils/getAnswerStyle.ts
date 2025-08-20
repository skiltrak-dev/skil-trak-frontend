export const getAnswerStyle = (answer: string): string => {
    if (answer === 'Strongly Agree')
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    if (answer === 'Very Satisfied')
        return 'bg-green-100 text-green-800 border-green-200'
    if (answer === 'Satisfied')
        return 'bg-blue-100 text-blue-800 border-blue-200'
    if (answer === 'Very Confident')
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    if (answer === 'Confident')
        return 'bg-purple-100 text-purple-800 border-purple-200'
    if (answer?.includes('5 / 5 stars'))
        return 'bg-green-100 text-green-800 border-green-200'
    if (answer?.includes('4 / 5 stars'))
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    if (answer?.includes('3 / 5 stars'))
        return 'bg-orange-100 text-orange-800 border-orange-200'
    if (answer?.includes('2 / 5 stars'))
        return 'bg-red-100 text-red-800 border-red-200'
    if (answer?.includes('1 / 5 stars'))
        return 'bg-red-200 text-red-900 border-red-300'
    if (answer === 'Yes') return 'bg-green-100 text-green-800 border-green-200'
    if (answer === 'Maybe')
        return 'bg-amber-100 text-amber-800 border-amber-200'
    if (answer === 'No') return 'bg-red-100 text-red-800 border-red-200'
    if (answer === 'Not provided')
        return 'bg-gray-100 text-gray-500 border-gray-200'
    return 'bg-slate-100 text-slate-800 border-slate-200'
}
