import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const TeacherList = Loadable(lazy(() => import('./TeacherList')))
const EditTeacher = Loadable(lazy(() => import('./EditTeacher')))
const AddTeacher = Loadable(lazy(() => import('./AddTeacher')))

const teacherRoutes = [
    {
        path: '/teacher',
        element: <TeacherList />,
    },
    {
        path: '/teacher/edit/:id',
        element: <EditTeacher />,
    },
    {
        path: '/teacher/add',
        element: <AddTeacher />,
    },
]

export default teacherRoutes
