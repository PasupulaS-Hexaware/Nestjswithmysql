import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const StudentList = Loadable(lazy(() => import('./StudentList')))
const EditStudent = Loadable(lazy(() => import('./EditStudent')))
const AddStudent = Loadable(lazy(() => import('./AddStudent')))

const StudentRoutes = [
    {
        path: '/Student',
        element: <StudentList />,
    },
    {
        path: '/Student/edit/:id',
        element: <EditStudent />,
    },
    {
        path: '/Student/add',
        element: <AddStudent />,
    },
]

export default StudentRoutes
