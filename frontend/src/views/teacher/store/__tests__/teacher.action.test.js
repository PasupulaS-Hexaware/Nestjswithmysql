import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchTeacher,
    addTeacher,
    editTeacher,
    deleteTeacher,
} from '../teacher.action'

const getTeacherListResponse = [
    {
        id: 1,
        tname: 'tname',
        age: 'age',
    },
]

const addTeacherListResponse = (data) => {
    return { id: 2, ...data }
}
const editTeacherListResponse = (data) => {
    return data
}

describe('should test Teacher redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'teacher'
    test('Should be able to fetch the teacher list and update teacher redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getTeacherListResponse)
        const result = await store.dispatch(fetchTeacher())
        const teacherList = result.payload
        expect(result.type).toBe('teacher/fetchTeacher/fulfilled')
        expect(teacherList).toEqual(getTeacherListResponse)

        const state = store.getState().teacher
        expect(state.entities).toEqual(teacherList)
    })

    test('Should be able to add new teacher to list and make post api and update teacher redux store', async () => {
        const body = {
            tname: 'tname',
            age: 'age',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addTeacherListResponse(body)
        )
        const result = await store.dispatch(addTeacher(body))
        const teacherItem = result.payload
        expect(result.type).toBe('teacher/addTeacher/fulfilled')
        expect(teacherItem).toEqual(addTeacherListResponse(body))

        const state = store.getState().teacher
        expect(state.entities).toContainEqual(addTeacherListResponse(body))
    })

    test('Should be able to edit teacher in list and make put api call and update teacher redux store', async () => {
        const body = {
            id: 1,
            tname: 'tname',
            age: 'age',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editTeacherListResponse(body)
        )
        const result = await store.dispatch(editTeacher(body))
        const teacherItem = result.payload
        expect(result.type).toBe('teacher/editTeacher/fulfilled')
        expect(teacherItem).toEqual(editTeacherListResponse(body))

        const state = store.getState().teacher
        let changedTeacher = state.entities.find((p) => p.id === body.id)
        expect(changedTeacher.name).toEqual(body.name)
    })

    test('Should be able to delete teacher in list and update teacher redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().teacher
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteTeacher(input))
        const deletId = result.payload
        expect(result.type).toBe('teacher/deleteTeacher/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().teacher
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
