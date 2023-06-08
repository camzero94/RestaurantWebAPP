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
import { QRCodeSVG } from 'qrcode.react'

interface IProps {
  projectId?: number |string| null 
}

const QRComponent: React.FC<IProps> = ({ projectId}) => {
  
  const [error, setError] = useState<String | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // console.log("HEREEEEE",projectId)
  const boxQR = {
    // padding: 20,
    height: '80vh',
    width: 500,
    margin: '25px auto',
    // borderRadius: 20,
  }
  return (
    <>
      <Grid container style={boxQR}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              margin: '10px',
              borderRadius: '20px',
            }}
          >
            <Grid
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant={'h4'} style={{ marginBottom: '5' }}>
                {' '}
                URL{' '}
              </Typography>
            </Grid>
            <Grid xs={7}>
              <QRCodeSVG value={`https://9b7b-36-237-101-129.ngrok-free.app/api/v1/project/${projectId}`} size={300} />
            </Grid>
            <Grid
              xs={12}
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant={'h4'} style={{ marginBottom: '5' }}>
                {' '}
                SCAN YOUR QR CODE!!{' '}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

              // <QRCodeSVG value={`http://localhost:8000/api/v1/project/${projectId}`} size={300} />
export default QRComponent
