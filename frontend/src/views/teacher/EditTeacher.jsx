import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editTeacher, fetchTeacher } from './store/teacher.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditTeacher = () => {
    const { id: teacherId } = useParams()

    const teacher = useSelector((state) =>
        state.teacher.entities.find(
            (teacher) => teacher.id.toString() === teacherId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [tname, setTname] = useState(teacher.tname)

    const [age, setAge] = useState(teacher.age)

    const handleTname = (e) => setTname(e.target.value)
    const handleAge = (e) => setAge(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editTeacher({
                id: teacherId,
                tname,
                age,
            })
        ).then(() => {
            dispatch(fetchTeacher())
        })
        navigate('/teacher')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditTeacher', path: '/teacher' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="tname"
                                id="tnameInput"
                                onChange={handleTname}
                                value={tname}
                                validators={['required']}
                                label="Tname"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age}
                                validators={['required']}
                                label="Age"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditTeacher
