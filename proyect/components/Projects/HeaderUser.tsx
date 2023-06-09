import React, { useContext, useRef, useState, useEffect } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import { Divider } from '@mui/material'
import { Project_Page_Ctx, IContext } from '../../store/context/project-context'

const box_header = {
  display: 'flex',
  mt: 2,
  ml: 2,
  mr: 2,
  mb: 1.5,
}

const HeaderUserPage: React.FC = () => {
  const { setOpen, open } = useContext(Project_Page_Ctx) as IContext
  const nameProjectRef = useRef()
  const nameLeader = useRef()
  const [description, setDescription] = useState<string[]>([])

  const openModal = () => {
    setOpen ? setOpen(true) : null
  }

  return (
    <>
      <Box className='Header_Component'>
        <Grid container sx={box_header}>

          <Grid
            item
            lg={6}
            md={3}
            xs={6}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <Typography variant='h6'>MY WORK</Typography>
          </Grid>

          <Grid
            item

            lg={6}
            md={3}
            xs={6}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant='outlined'
              type='submit'
              style={{ marginRight: '20px' }}
              onClick={() => openModal()}
            >
              <Typography variant='body1'>Create new Project</Typography>
            </Button>


          </Grid>

        </Grid>
        <Divider />
      </Box>
    </>
  )
}

export default HeaderUserPage
