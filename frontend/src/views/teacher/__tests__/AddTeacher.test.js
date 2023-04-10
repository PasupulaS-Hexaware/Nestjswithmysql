const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddTeacher from '../AddTeacher'

beforeEach(() => {
    const endPoint = 'teacher'
    const getStudentListResponse = [
        {
            id: 1,
            tname: 'tname',
            age: 'age',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddTeacher />
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

describe('testing view TeacherAdd Component', () => {
    test('should render AddTeacher and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addTeacherButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const tnameElement = screen.getByLabelText(/Tname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        expect(addTeacherButtonElement).toBeInTheDocument()

        expect(tnameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Teacher add form', async () => {
        const tnameElement = screen.getByLabelText(/Tname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        fireEvent.change(tnameElement, { target: { value: 'tname' } })
        fireEvent.change(ageElement, { target: { value: 'age' } })
    })

    test('should return error message when add Teacher button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addTeacherButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addTeacherButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
