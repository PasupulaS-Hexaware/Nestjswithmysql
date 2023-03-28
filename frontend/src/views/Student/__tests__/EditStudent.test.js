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
import EditStudent from '../EditStudent'
import { StudentAdded } from '../store/StudentSlice'
beforeAll(() => {
    store.dispatch(
        StudentAdded({
            id: 1,
            sname: 'sname',
            age: 10,
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
                                    <Navigate to="Student/edit/1" replace />
                                }
                            />
                            <Route
                                path="Student/edit/:id"
                                element={<EditStudent />}
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

describe('testing view of StudentEdit Component', () => {
    test('should render EditStudent and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveStudentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const snameElement = screen.getByLabelText(/Sname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        expect(saveStudentButtonElement).toBeInTheDocument()

        expect(snameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Student edit form', async () => {
        const snameElement = screen.getByLabelText(/Sname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        fireEvent.change(snameElement, { target: { value: 'sname' } })
        fireEvent.change(ageElement, { target: { value: 96 } })

        expect(snameElement.value).toBe('sname')

        expect(ageElement.value).toBe(96)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const snameElement = screen.getByLabelText(/Sname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        fireEvent.change(snameElement, { target: { value: '' } })
        fireEvent.change(ageElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveStudentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveStudentButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
