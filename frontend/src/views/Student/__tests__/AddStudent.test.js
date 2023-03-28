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
import AddStudent from '../AddStudent'

beforeEach(() => {
    const endPoint = 'Student'
    const getStudentListResponse = [
        {
            id: 1,
            sname: 'sname',
            age: 34,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddStudent />
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

describe('testing view StudentAdd Component', () => {
    test('should render AddStudent and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addStudentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const snameElement = screen.getByLabelText(/Sname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        expect(addStudentButtonElement).toBeInTheDocument()

        expect(snameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Student add form', async () => {
        const snameElement = screen.getByLabelText(/Sname/i)
        const ageElement = screen.getByLabelText(/Age/i)

        fireEvent.change(snameElement, { target: { value: 'sname' } })
        fireEvent.change(ageElement, { target: { value: 13 } })
    })

    test('should return error message when add Student button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addStudentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addStudentButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
