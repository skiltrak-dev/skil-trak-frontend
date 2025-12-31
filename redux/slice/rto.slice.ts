import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Rto } from '@types'

type initialStateType = {
    rtoDetail: Rto | null
}

const initialState: initialStateType = {
    rtoDetail: null,
}

export const rtoSlice = createSlice({
    name: 'rto-slice',
    initialState,
    reducers: {
        setRtoDetail: (state, action: PayloadAction<Rto>) => {
            state.rtoDetail = action.payload
        },
    },
})

export const { setRtoDetail } = rtoSlice.actions
export default rtoSlice.reducer
