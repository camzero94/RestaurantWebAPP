import { Button, Typography, Card, Grid, Box, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Chip from '@mui/material/Chip'
import { useState, useContext, useEffect } from 'react'
import ItemLogo from '../../public/Item.svg'
import Image from 'next/image'
import { Project_Page_Ctx_2 } from '../../pages/users/[id]/projects/[projectid]/index'
import Item from '../../namespaces/Item'
import Ingredient from '../../namespaces/Ingredient'
import Order from '../../namespaces/Order'
import { cardOrder } from '../Styles'

import { useStyles } from '../Styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
interface props {
  order?: Order.Description
}

interface itemProps {
  item?: Item.Description
}

let ingredientsItemName: Ingredient.Description[] = []

const ItemCard: React.FC<itemProps> = ({ item }) => {
  return (
    <Grid item sx={cardOrder.items} xs={12}>
      <Grid
        item
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
        xs={6}
      >
        {item.nameOrderItem}
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          fontWeight: 'bold',
        }}
      >
        x {item.quantity}
      </Grid>
    </Grid>
  )
}

const OrderCardComponent: React.FC<props> = ({ order }) => {

  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [startOpen, setStartOpen] = useState<boolean>(false)

  let token = order.token.split('-')
  const classes = useStyles()

  let timer
  const startTimerOpen = () => {
    console.log('Heree Enter')
    setStartOpen(true)
  }

  const startTimer = () => {
    return (timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
      if (seconds === 59) {
        setMinutes((minutes) => minutes + 1)
        setSeconds(0)
      }
    }, 1000))
  }

  const handleDeliverOrderAsync = async (e) => {
    // e.preventDefault() 
    const token = localStorage.getItem('token')
    console.log('Token', token)

    const deliveredPayload ={
      email: order.email,
      content: order.content,
      delivered: true,
      deleted: false,
      updatedAtTime: new Date().toISOString(),
    }
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(deliveredPayload)
    };
    try{
      const response = await fetch(
        `http://localhost:8000/api/v1/order/${order.orderId}`,
        requestOptions
      )
      const data = await response.json()
      console.log('Data', data)
      if (data.success) {
        console.log('Success')
      }
    }catch(err){
      console.log('Error', err)
    }
}


  useEffect(() => {
    if (startOpen) {
      timer = startTimer()
      console.log(`Minutes: ${minutes} Seconds: ${seconds}`)
      return () => clearInterval(timer)
    }
  })

  console.log('Set Open Start', startOpen)
  return (
    <>
      <form onSubmit={handleDeliverOrderAsync}>
      <Grid container sx={cardOrder.root}>
        <Card className={classes.card} sx={cardOrder.paper}>
          <Grid container direction='row'>
            <Grid container xs={12} sx={cardOrder.title1}>
              {order.orderId}
            </Grid>
            <Grid container xs={12} sx={cardOrder.title}>
              OrderId {token[0]}
            </Grid>
            <List
              sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'background.paper',
                overflow: 'auto',
                maxHeight: 120,
                height: 120,
                flexDirection: 'row',
                // backgroundColor:'blue',
              }}
            >
              {order.items.map((item, idx) => (
                <ItemCard item={item} />
              ))}
            </List>

            <Grid container xs={12} sx={cardOrder.price}>
              <Grid container xs={12}>
                <Grid item xs={4}>
                  <Typography
                    variant='body1'
                    style={{
                      display: 'flex',
                      fontSize: '12px',
                      fontWeight: 600,
                      justifyContent: 'right',
                      color: 'red',
                    }}
                  >
                    Tax :
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography
                    variant='body1'
                    style={{
                      display: 'flex',
                      fontSize: '12px',
                      fontWeight: 600,
                      justifyContent: 'right',
                    }}
                  >
                    {order.tax * 100} %
                  </Typography>
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid item xs={4}>
                  <Typography
                    variant='body1'
                    style={{
                      display: 'flex',
                      fontSize: '12px',
                      fontWeight: 600,
                      justifyContent: 'right',
                      color: 'red',
                    }}
                  >
                    SubTotal :
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography
                    variant='body1'
                    style={{
                      display: 'flex',
                      fontSize: '12px',
                      fontWeight: 600,
                      justifyContent: 'right',
                    }}
                  >
                    $ {order.subTotal} Ntd
                  </Typography>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={4}>
                  <Typography
                    variant='body1'
                    style={{
                      display: 'flex',
                      fontSize: '12px',
                      fontWeight: 600,
                      justifyContent: 'right',
                      color: 'red',
                    }}
                  >
                    Total :
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography
                    variant='body1'
                    style={{
                      display: 'flex',
                      fontSize: '12px',
                      fontWeight: 600,
                      justifyContent: 'right',
                    }}
                  >
                    $ {order.total} Ntd
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              style={{ display: 'flex', justifyContent: 'space-around' }}
              xs={12}
            >
              <Grid item xs={4}>
                <Button
                  className={classes.button}
                  variant='outlined'
                  fullWidth
                  color='primary'
                  onClick={() => {
                    startTimerOpen()
                  }}
                >
                  {startOpen
                    ? minutes < 10
                      ? `0${minutes}:`
                      : `${minutes}:`
                    : 'Start'}
                  {startOpen
                    ? seconds < 10
                      ? `0${seconds}`
                      : `${seconds}`
                    : null}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  className={classes.button}
                  variant='outlined'
                  fullWidth
                  color='primary'
                  type='submit'
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      </form>
    </>
  )
}

export default OrderCardComponent
