import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course, Industry, Student } from '@types'
import { IWorkplaceIndustries } from 'redux/queryTypes'

type initialStateType = {
    industryDetail: Industry | null
    activeSector: number | null
}

const initialState: initialStateType = {
    industryDetail: null,
    activeSector: null,
}

export const industrySlice = createSlice({
    name: 'industry-slice',
    initialState,
    reducers: {
        setIndustryDetail: (state, action: PayloadAction<Industry>) => {
            state.industryDetail = action.payload
        },
        setActiveSector: (state, action: PayloadAction<number | null>) => {
            state.activeSector = action.payload
        },
    },
})

export const { setIndustryDetail, setActiveSector } = industrySlice.actions
export default industrySlice.reducer
