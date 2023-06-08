import { Button, Grid, TextField } from '@material-ui/core'
import React, { useRef, FormEventHandler, useState, useContext } from 'react'
import LayoutAuthSignup from '../components/Auth/LayoutAuthSignup'
import User from '../namespaces/User'
import { Alert } from '@mui/material'
import { isProjectInfoComplete } from '../utils/aut'
import { Project_Page_Ctx, IContext } from '../store/context/project-context'

const Edit_ProjectComponent: React.FC = () => {
  const { setOpen,projectId,setProjectId } = useContext(Project_Page_Ctx) as IContext
  const [error, setError] = useState<String | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const projectNameRef = useRef<HTMLInputElement>()
  const nameOfLeaderRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()

  console.log("ProjectId================>", projectId)
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      setLoading(true)

      if (projectNameRef.current?.value) {
        const token = localStorage.getItem('token')
        const dateNow = new Date().toISOString()
        console.log(dateNow)

        const projectToBePosted = {
          projectName: projectNameRef.current?.value,
          nameOfLeader: nameOfLeaderRef.current?.value,
          description: descriptionRef.current?.value,
          updatedAtTime: dateNow,
        }

        const requestOptions = {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectToBePosted),
        }
        console.log(requestOptions)
        const response = await fetch(
          `http://localhost:8000/api/v1/project/${Number(projectId)}`,
          requestOptions
        )
        const data = await response.json()
        console.log("Data outside ===> ",data)
        if (isProjectInfoComplete(data)) {
        console.log("Data inside ===> ",data)
          setOpen ? setOpen(false) : null
        }
      }
    } catch (e: any) {
      console.log(e)
      setError('Error while POST')
      setLoading(false)
    }
  }

  const formStyle = {
    // padding: 20,
    // margin: '10px auto',
    //     marginLeft: '50px',
    marginTop: '20px ',
  }

  return (
    <>
      <LayoutAuthSignup submitForm={handleSubmit} pageName={'EditProject'}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>
        )}
        <Grid container spacing={3} style={formStyle}>
          <Grid item xs={12}>
            <TextField
              label='NameOfProject'
              variant='outlined'
              placeholder='Enter Name of Project'
              fullWidth
              inputRef={projectNameRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Name of Leader'
              variant='outlined'
              placeholder='Enter Name of Leader'
              fullWidth
              inputRef={nameOfLeaderRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Description'
              multiline
              variant='outlined'
              rows={4}
              placeholder='Enter Description'
              fullWidth
              inputRef={descriptionRef}
            />
          </Grid>
        </Grid>
        <Grid container spacing={6} style={formStyle}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </LayoutAuthSignup>
    </>
  )
}

export default Edit_ProjectComponent
