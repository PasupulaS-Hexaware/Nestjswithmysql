const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditTeacher from '../EditTeacher'
import { teacherAdded } from '../store/teacherSlice'
beforeAll(() => {
    store.dispatch(
        teacherAdded({
            id: 1,
            tname: 'tname',
            age: 'age',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="teacher/edit/1" replace />
                                }
                            />
                            <Route
                                path="teacher/edit/:id"
                                element={<EditTeacher />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of TeacherEdit Component', () => {
    test('should render EditTeacher and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveTeacherButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const tnameElement = screen.getByLabelText(/Tname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        expect(saveTeacherButtonElement).toBeInTheDocument()

        expect(tnameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Teacher edit form', async () => {
        const tnameElement = screen.getByLabelText(/Tname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        fireEvent.change(tnameElement, { target: { value: 'tname' } })
        fireEvent.change(ageElement, { target: { value: 'age' } })

        expect(tnameElement.value).toBe('tname')

        expect(ageElement.value).toBe('age')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const tnameElement = screen.getByLabelText(/Tname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        fireEvent.change(tnameElement, { target: { value: '' } })
        fireEvent.change(ageElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveTeacherButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveTeacherButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
