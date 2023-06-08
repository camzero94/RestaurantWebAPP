import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core'
import React, { FormEventHandler } from 'react'
import Image from 'next/image'
import Terser from '../../public/terser.svg'

interface LayoutAuthSignupProps {
  submitForm?: FormEventHandler<HTMLFormElement>
  children: React.ReactNode
  pageName: string
}

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}))
const LayoutAuthSignup: React.FC<LayoutAuthSignupProps> = ({
  children,
  submitForm,
  pageName,
}) => {
  const paperStyle = {
    padding: 20,
    height: `${
      pageName === 'HomePage'
        ? '90vh'
        : `${pageName === 'SignupPage' ? '60vh'  
        :`${pageName === 'NewProject' ? '70vh':'70vh'
        }`}`}`,
    width: 500,
    margin: '25px auto',
    borderRadius: 50,
  }

  const classes = useStyles()
  return (
    <>
      <Container maxWidth='xs'>
        <form onSubmit={submitForm}>
          <Box width='100 %' height='100vh' display='flex'>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              className={classes.fieldContainer}
            >
              <Paper elevation={10} style={paperStyle}>
                <Grid item container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant='h5' align='left'>
                      {pageName === 'NewProject' ? 'New Project' :
                      pageName === 'EditProject'? 'Edit Project':null}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Image src={Terser} alt='terser logo' height={100} />
                  </Grid>
                </Grid>
                {children}
              </Paper>
            </Grid>
          </Box>
        </form>
      </Container>
    </>
  )
}

export default LayoutAuthSignup
