import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course, Student } from '@types'
import { IWorkplaceIndustries } from 'redux/queryTypes'

type initialStateType = {
    studentDetail: Student | null
    selectedCourse: Course | null
    selectedWorkplace: IWorkplaceIndustries | null
}

const initialState: initialStateType = {
    studentDetail: null,
    selectedCourse: null,
    selectedWorkplace: null,
}

export const studentSlice = createSlice({
    name: 'student-slice',
    initialState,
    reducers: {
        setStudentDetail: (state, action: PayloadAction<Student>) => {
            state.studentDetail = action.payload
        },
        setSelectedCourse: (state, action: PayloadAction<Course>) => {
            state.selectedCourse = action.payload
        },
        setSelectedWorkplace: (
            state,
            action: PayloadAction<IWorkplaceIndustries | null>
        ) => {
            state.selectedWorkplace = action.payload
        },
    },
})

export const { setStudentDetail, setSelectedCourse, setSelectedWorkplace } =
    studentSlice.actions
export default studentSlice.reducer
