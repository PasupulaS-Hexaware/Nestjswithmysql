const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import StudentList from '../StudentList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Student rows when api response has data', async () => {
    const endPoint = 'student'
    const getStudentListResponse = [
        {
            id: 1,
            sname: 'sname',
            age: 30,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <StudentList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const studentSnameCell = await screen.findByText(/sname/i)

    expect(studentSnameCell).toHaveTextContent(/sname/i)
    mock.reset()
})
