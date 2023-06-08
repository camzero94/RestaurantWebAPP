
import { Grid, Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import 'swiper/css'
import 'swiper/css/navigation'
import React, { useContext, useState } from 'react'
import { Modal } from '@mui/material'
import OrderFinishComponent from './OrderFinish'
import { Project_Page_Ctx, IContext } from '../../store/context/project-context'
import Order from '../../namespaces/Order'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '5px 0',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiMenuItem-root': {
      justifyContent: 'flex-start',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        marginLeft: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

  const boxOutside = {
    display: 'flex',
    width: 'maxWidth',
    height: 200,
    spacing: 5,
    justifyContent: 'center',
  }

const SliderFinishedOrder: React.FC<IProps> = () => {

  const { orderFinishArr} = useContext(Project_Page_Ctx)
  const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setanchorEl(null)
  }
  const buttonHandleDeleteAsync = async (e) => {
    // try{
    //
    //     const token = await localStorage.getItem('token')
    //     const requestOptions = {
    //       method: 'DELETE',
    //       headers: {
    //         accept: 'application/json',
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //
    //   const response = await fetch(`http://localhost:8000/api/v1/project/${projectId}`,requestOptions);
    //   const data = await response.json();
    //   if (!response.ok) {
    //     throw new Error(data.message || 'Something went wrong!');
    //   }
    //   console.log(data)
    //
    //   }
    //   catch(err){
    //
    //     }
    //
  }
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <Box sx={boxOutside}>
          <Grid container direction='row' alignContent='baseline'>
          {
            orderFinishArr.map((order: Order.Description,idx:number) => {
              return (
                <SwiperSlide key={idx}>
                  <OrderFinishComponent
                    order={order}
                  />
                </SwiperSlide>
              )
            })}
          </Grid>
        </Box>
      </Swiper>
    </>
  )
}

export default SliderFinishedOrder
