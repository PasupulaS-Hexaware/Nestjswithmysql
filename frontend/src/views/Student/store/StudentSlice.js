import { createSlice } from '@reduxjs/toolkit'
import { fetchStudent } from './Student.action'
import { addStudent } from './Student.action'
import { editStudent } from './Student.action'
import { deleteStudent } from './Student.action'

const fetchStudentExtraReducer = {
    [fetchStudent.pending]: (state, action) => {
        state.loading = true
    },
    [fetchStudent.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchStudent.rejected]: (state, action) => {
        state.loading = false
    },
}

const addStudentExtraReducer = {
    [addStudent.pending]: (state, action) => {
        state.loading = true
    },
    [addStudent.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addStudent.rejected]: (state, action) => {
        state.loading = false
    },
}

const editStudentExtraReducer = {
    [editStudent.pending]: (state, action) => {
        state.loading = true
    },
    [editStudent.fulfilled]: (state, action) => {
        const { id, sname, age } = action.payload
        const existingStudent = state.entities.find(
            (Student) => Student.id.toString() === id.toString()
        )
        if (existingStudent) {
            existingStudent.sname = sname
            existingStudent.age = age
        }
        state.loading = false
    },
    [editStudent.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteStudentExtraReducer = {
    [deleteStudent.pending]: (state, action) => {
        state.loading = true
    },
    [deleteStudent.fulfilled]: (state, action) => {
        const id = action.payload
        const existingStudent = state.entities.find(
            (Student) => Student.id.toString() === id.toString()
        )
        if (existingStudent) {
            state.entities = state.entities.filter(
                (Student) => Student.id !== id
            )
        }
        state.loading = false
    },
    [deleteStudent.rejected]: (state, action) => {
        state.loading = false
    },
}
const StudentSlice = createSlice({
    name: 'Student',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        StudentAdded(state, action) {
            state.entities.push(action.payload)
        },
        StudentUpdated(state, action) {
            const { id, sname, age } = action.payload
            const existingStudent = state.entities.find(
                (Student) => Student.id.toString() === id.toString()
            )
            if (existingStudent) {
                existingStudent.sname = sname
                existingStudent.age = age
            }
        },
        StudentDeleted(state, action) {
            const { id } = action.payload
            const existingStudent = state.entities.find(
                (Student) => Student.id.toString() === id.toString()
            )
            if (existingStudent) {
                state.entities = state.entities.filter(
                    (Student) => Student.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchStudentExtraReducer,
        ...addStudentExtraReducer,
        ...editStudentExtraReducer,
        ...deleteStudentExtraReducer,
    },
})

export const { StudentAdded, StudentUpdated, StudentDeleted } =
    StudentSlice.actions

export default StudentSlice.reducer
