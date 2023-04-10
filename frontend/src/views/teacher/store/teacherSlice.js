import { createSlice } from '@reduxjs/toolkit'
import { fetchTeacher } from './teacher.action'
import { addTeacher } from './teacher.action'
import { editTeacher } from './teacher.action'
import { deleteTeacher } from './teacher.action'

const fetchTeacherExtraReducer = {
    [fetchTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [fetchTeacher.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}

const addTeacherExtraReducer = {
    [addTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [addTeacher.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}

const editTeacherExtraReducer = {
    [editTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [editTeacher.fulfilled]: (state, action) => {
        const { id, tname, age } = action.payload
        const existingTeacher = state.entities.find(
            (teacher) => teacher?.id?.toString() === id?.toString()
        )
        if (existingTeacher) {
            existingTeacher.tname = tname
            existingTeacher.age = age
        }
        state.loading = false
    },
    [editTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteTeacherExtraReducer = {
    [deleteTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [deleteTeacher.fulfilled]: (state, action) => {
        const id = action.payload
        const existingTeacher = state.entities.find(
            (teacher) => teacher.id.toString() === id.toString()
        )
        if (existingTeacher) {
            state.entities = state.entities.filter(
                (teacher) => teacher.id !== id
            )
        }
        state.loading = false
    },
    [deleteTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}
const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        teacherAdded(state, action) {
            state.entities.push(action.payload)
        },
        teacherUpdated(state, action) {
            const { id, tname, age } = action.payload
            const existingTeacher = state.entities.find(
                (teacher) => teacher.id.toString() === id.toString()
            )
            if (existingTeacher) {
                existingTeacher.tname = tname
                existingTeacher.age = age
            }
        },
        teacherDeleted(state, action) {
            const { id } = action.payload
            const existingTeacher = state.entities.find(
                (teacher) => teacher.id.toString() === id.toString()
            )
            if (existingTeacher) {
                state.entities = state.entities.filter(
                    (teacher) => teacher.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchTeacherExtraReducer,
        ...addTeacherExtraReducer,
        ...editTeacherExtraReducer,
        ...deleteTeacherExtraReducer,
    },
})

export const { teacherAdded, teacherUpdated, teacherDeleted } =
    teacherSlice.actions

export default teacherSlice.reducer
