import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Student'

export const fetchStudent = createAsyncThunk(
    'Student/fetchStudent',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Student = await response.data
        return Student
    }
)

export const addStudent = createAsyncThunk(
    'Student/addStudent',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Student = await response.data
        thunkAPI.dispatch(showSuccess('Student added successfully'))
        return Student
    }
)

export const editStudent = createAsyncThunk(
    'Student/editStudent',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Student = await response.data
        thunkAPI.dispatch(showSuccess('Student updated successfully'))
        return Student
    }
)

export const deleteStudent = createAsyncThunk(
    'Student/deleteStudent',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Student deleted successfully.')
            )
            return data.id
        }
    }
)
