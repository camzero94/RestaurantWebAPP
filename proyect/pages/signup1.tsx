import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useRef, FormEventHandler, useState } from 'react'
import LayoutAuthSignup from '../components/Auth/LayoutAuthSignup'
import { useRouter } from 'next/router'
import User from '../namespaces/User'
import { Alert } from '@mui/material'
import decodeJwt from 'jwt-decode'
import { isAuthenticated } from '../utils/aut'
import { makeStyles, createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'
import LogoRestaurant from '../public/LogoRestaurant.png'

function signup() {
  const passwordRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLFormElement>()
  const passwordConfirmationRef = useRef<HTMLFormElement>()
  const [error, setError] = useState<String | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const [userId, setUserId] = useState<string>('')
  const [userInit, setuserInit] = useState<User.SignupDescription>({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    console.log(
      passwordRef.current?.value,
      passwordConfirmationRef.current?.value
    )

    if (passwordRef.current?.value !== passwordConfirmationRef.current?.value) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const keys = Object.keys(userInit) as Array<keyof User.SignupDescription>
      console.log(keys)
      let valid = true

      keys.forEach((key) => {
        if (
          key !== 'email' &&
          key !== 'password' &&
          key !== 'passwordConfirmation' &&
          userInit[key] === ''
        )
          valid = false
      })

      if (!valid) {
        console.log('Not Filled Correctly')
        setError('Error, must fill correctly form')
        setLoading(false)
        return
      }

      const form_data = new FormData()
      form_data.append('username', emailRef.current?.value)
      form_data.append('password', passwordRef.current?.value)

      console.log(form_data.get('username'), form_data.get('password'))
      const request = new Request('http://localhost:8000/api/signup', {
        method: 'POST',
        body: form_data,
      })

      if (form_data) {
        const response = await fetch(request)
        if (response.status === 500) {
          throw new Error('Internal Server error')
        }
        const data = await response.json()
        if (response.status > 400 && response.status < 500) {
          if (data.detail) {
            throw data.detail
          }
        }
        if ('access_token' in data) {
          const decodeToken: any = decodeJwt(data['access_token'])
          localStorage.setItem('token', data['access_token'])
          localStorage.setItem('permissions', decodeToken.permissions)
          localStorage.setItem('id', decodeToken.id)
          setUserId(decodeToken.id)
          console.log(decodeToken.id)
        }
      }
    } catch (e: any) {
      console.log(e)
      setError('Error while POST')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated() && userId !== '') {
      router.push(`main_home`)
    }
  }, [userId])

  const theme = createTheme({
    typography: {
      fontFamily: ['Roboto Mono', 'monospace'].join(','),
    },
  })

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg,	#00008B 60%,#B0C4DE 90% )',
      borderRadius: 20,
      border: 0,
      color: 'white',
      // height: 35,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      justifyContent: 'center',
    },
    label: {
      textTransform: 'capitalize',
    },
    background: {
      justifyContent: 'center',
      alignItem: 'center',
      backgroundColor: '#3E54AC',
    },
    image: {
      display: 'flex',
      marginTop:'150px',
      justifyContent: 'center',
      alignItem: 'center',
      height: 350,
    },
    boxTitle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      display: 'flex',
      margin:'0px',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center',
      color: 'white',
      fontSize: '38px',
    },
  })
  const classes = useStyles()

  const formStyle = {
    marginTop: '20px ',
  }

  return (
    <>
      <Grid container >
        <Grid item xs={6} direction='column' className={classes.background}>

          <Grid item xs={12} className={classes.image}>
            <Image src={LogoRestaurant}  alt="Logo"width={450}height={350}/>
          </Grid>
          <Grid item xs={12} className={classes.boxTitle}>
            <Grid item xs={8}>
              <h2 className={classes.title}>
                {' '}
                Create your Own Menus in an Instant!!
              </h2>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <LayoutAuthSignup pageName={'SignupPage'} submitForm={handleSubmit}>

            {error && (
              <Grid item xs={12}>
                <Alert severity='error'>{error}</Alert>
              </Grid>
            )}

            <Grid container spacing={3} style={formStyle}>
              <Grid item xs={12}>
                <TextField
                  label='Email'
                  size='small'
                  variant='outlined'
                  placeholder='Enter Email'
                  fullWidth
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Password'
                  size='small'
                  variant='outlined'
                  type='password'
                  placeholder='Enter Password'
                  fullWidth
                  inputRef={passwordRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Password Confirmation'
                  size='small'
                  variant='outlined'
                  type='password'
                  placeholder='Confirm Password'
                  fullWidth
                  inputRef={passwordConfirmationRef}
                />
              </Grid>
              <Grid
                container
                spacing={6}
                style={{
                  display: 'flex',
                  marginTop: 5,
                  justifyContent: 'center',
                }}
              >
                <Grid item xs={9}>
                  <Button
                    classes={{
                      root: classes.root,
                      label: classes.label,
                    }}
                    variant='contained'
                    fullWidth
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </LayoutAuthSignup>
        </Grid>
      </Grid>
    </>
  )
}

export default signup
// <ThemeProvider theme={theme}>
// <Typography
//   variant='h2'
//   align='center'
//   style={{ marginTop: '12px' }}
// >

// </Typography>
// </ThemeProvider>
