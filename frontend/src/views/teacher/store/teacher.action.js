import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'teacher'

export const fetchTeacher = createAsyncThunk(
    'teacher/fetchTeacher',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const teacher = await response.data
        return teacher
    }
)

export const addTeacher = createAsyncThunk(
    'teacher/addTeacher',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const teacher = await response.data
        thunkAPI.dispatch(showSuccess('Teacher added successfully'))
        return teacher
    }
)

export const editTeacher = createAsyncThunk(
    'teacher/editTeacher',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const teacher = await response.data
        thunkAPI.dispatch(showSuccess('Teacher updated successfully'))
        return teacher
    }
)

export const deleteTeacher = createAsyncThunk(
    'teacher/deleteTeacher',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected teacher deleted successfully.')
            )
            return data.id
        }
    }
)
