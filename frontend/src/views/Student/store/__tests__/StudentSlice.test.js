import store from 'store/store'
import { studentAdded, studentDeleted, studentUpdated } from '../studentSlice'

describe('testing student redux store reducers', () => {
    test('add student to store test', () => {
        let state = store.getState().student
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            sname: 'sname',
            age: 1,
        }
        store.dispatch(studentAdded(initialInput))
        state = store.getState().student
        expect(state.entities).toHaveLength(1)
    })

    test('update student from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            sname: 'sname',
            age: 19,
        }
        store.dispatch(studentAdded(initialInput))
        let state = store.getState().student
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            sname: 'sname',
            age: 5,
        }
        store.dispatch(studentUpdated(updatedInput))
        state = store.getState().student
        let changedStudent = state.entities.find((p) => p.id === 2)
        expect(changedStudent).toStrictEqual(updatedInput)
    })

    test('delete student from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            sname: 'sname',
            age: 4,
        }
        store.dispatch(studentAdded(initialInput))
        let state = store.getState().student
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            studentDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().student
        expect(state.entities).toHaveLength(2)
    })
})
