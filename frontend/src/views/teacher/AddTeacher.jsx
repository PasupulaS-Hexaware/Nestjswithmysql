import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addTeacher, fetchTeacher } from './store/teacher.action'

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

const AddTeacher = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [tname, setTname] = useState('')
    const [age, setAge] = useState('')

    const handleTname = (e) => setTname(e.target.value)
    const handleAge = (e) => setAge(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addTeacher({
                tname,
                age,
            })
        ).then(() => {
            dispatch(fetchTeacher())
        })
        navigate('/teacher')
    }

    useEffect(() => {
        return () => {
            setTname('')
            setAge('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddTeacher', path: '/teacher' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="tname"
                                id="tnameInput"
                                onChange={handleTname}
                                value={tname}
                                label="Tname"
                            />

                            <TextField
                                type="text"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age}
                                label="Age"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddTeacher
