import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type RTOStatus =
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'archived'
    | 'blocked'
    | 'all'

const getRtoCount = async (status: RTOStatus = 'all') => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${status}`
    )
    return data
}

const getAllRto = async (status: RTOStatus = 'all') => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${status}`
    )
    return data
}

export const rtoQueries = {
    useRtoCount: async (status: RTOStatus) =>
        useQuery(['rto-count', { status }], () => getRtoCount(status)),
    useAllRto: async (status: RTOStatus) =>
        useQuery(['rto', { status }], () => getAllRto(status)),
}
