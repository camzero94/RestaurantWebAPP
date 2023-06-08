import Link from 'next/link'
import {
  Button,
  Grid,
  TextField,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core'
import React, {
  useRef,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from 'react'
import { useRouter } from 'next/router'
import { QRCodeSVG } from 'qrcode.react'
import {box_homeCard} from './Styles'
import Image from 'next/image'
import ImageLogo from '../public/LogoRestaurant.png'
import ImageCreateMenu from '../public/Create_menu.png'
import { useStyles } from './Styles'
import {Project_Page_Ctx, IContext} from '../store/context/project-context'

interface IProps {
  userId?: number | string | null
  projectId?: string| string[]
}

const HomeCardComponent: React.FC<IProps> = ({ userId,projectId}) => {
  

  const classes = useStyles()
  console.log('userId',userId)
  console.log('userId',projectId)



  return (
    <>
      <Grid container style={box_homeCard} >
        <Grid
          className={classes.card}
          item
          xs={12}
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'linear-gradient(187.16deg, rgba(39, 17, 129, 0.86) 17.93%, rgba(26, 17, 129, 0.5934) 77.25%)',
          }}
        >
            <Link href={`/users/${encodeURIComponent(userId)}/projects/${encodeURIComponent(Number(projectId))}`}>
          <Paper
            // elevation={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              margin: '10px',
              borderRadius: '30px',
              background: 'linear-gradient(187.16deg, rgba(39, 17, 129, 0.86) 17.93%, rgba(26, 17, 129, 0.5934) 77.25%)',
            }}
          >
            <Grid
              xs={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: '30px',
              }}
            >

          
            <Grid xs={12}  style={{margin:'80px'}}>
              <Typography  align="center"variant={'h4'} style={{ marginBottom: '5' ,fontFamily:'Roboto Mono',alignItems:'center',color:"#FFFFFF",marginTop:'30px',display:'flex'}}>
                {' '}
                Design Your Own Menu !{' '}
              </Typography>
              </Grid>


              </Grid>

            <Grid
            xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'flex-end',
              }}
            >
              <Image  src={ImageCreateMenu} alt='Create Menu' width={300} height={250} style={{marginRight:'10px'}}  />
            </Grid>
          </Paper>
            </Link>
        </Grid>
      </Grid>
    </>
  )
}

              // <Image  src={ImageCreateMenu} alt='Create Menu' width={400} height={400} layout="fill"   />
export default HomeCardComponent;
