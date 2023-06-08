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
import List from '@mui/material/List'
import {
  FormEventHandler,
  } from 'react'
import { useStyles } from '../Styles'
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

const OrderFinishComponent: React.FC<props> = ({ order }) => {
  const classes = useStyles()
  let token = order.token.split('-')

  const deleteOrderAsync:FormEventHandler<HTMLFormElement> = async(e) =>{
      // e.preventDefault()
      try{
      const token = localStorage.getItem('token')

        const deletedOrder = {
          email: order.email,
          content: order.content,
          delivered: true,
          deleted: true,
          updatedAtTime: new Date().toISOString(),
          }
        const requestOptions = {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
          body: JSON.stringify(deletedOrder),
        }
        const res = await fetch(`http://localhost:8000/api/v1/order/${order.orderId}`, requestOptions)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`)
        }
        console.log(data)

      }catch(err){
        console.log(err)
    }
  }

  console.log("Order Id====>"+order.orderId)
  return (
    <>
      <Grid container sx={cardOrder.root}>
      <form onSubmit={deleteOrderAsync} >
        <Card className={classes.card} sx={cardOrder.paperOverlay}>
          <Grid container direction='row'>
            <span
              style={{
                position: 'relative',
                width: 150,
                maxWidth: 150,
                height: 20,
                top: 10,
                right: 65,
                bottom: 20,

                maxHeight: 25,
                backgroundColor: '#111111',
                color: '#ffffff',
                transform: 'rotate(-45deg)',
              }}
            >
              <Typography
                variant='body1'
                style={{
                  display: 'flex',
                  fontSize: '12px',
                  fontWeight: 600,
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                Delivered
              </Typography>
            </span>
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
              <Grid item xs={8}>
                <Button
                  className={classes.button}
                  variant='outlined'
                  fullWidth
                  color='primary'
                  type='submit'
                >
                 Delete 
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        </form>
      </Grid>
    </>
  )
}

export default OrderFinishComponent
