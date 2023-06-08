
import IngredientCard from '../Ingredients/IngredientCard'
import { Grid, Box, MenuItem } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "swiper/css";
import "swiper/css/navigation";
import React, { useContext, useState, useEffect } from "react";
import { Project_Page_Ctx_2 } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import { Modal } from '@mui/material'
import Edit_Ingredient from '../Ingredients/Edit_Ingredient'
import Ingredient from '../../namespaces/Ingredient'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    {...props}
  />

))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '2px 0',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiMenuItem-root': {
      justifyContent: 'flex-start',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),

      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}
))
const boxOutside = {
  display: "flex",
  width: "maxWidth",
  height: 200,
  spacing: 5,
  justifyContent: "center"
}
const SlideIngredient: React.FC = () => {

  const { searchName, openEditIngredient, setOpenEditIngredient, ingredientArray, setIdDeletedIngredient, setDeleteFlag, anchorEl, setanchorEl } = useContext(Project_Page_Ctx_2) as IContextProject


  

  const open = Boolean(anchorEl)
  console.log("Open Ingredient",Boolean(anchorEl))
  const handleClose = () => {
    setanchorEl(null);
    setDeleteFlag(false)
  }

  let foundArray = ingredientArray.filter(ingredient => ingredient.nameIngredient === searchName)

  const handleOpenEditIngredient = () => {
    setOpenEditIngredient(true);
  }

  const handleCloseEditIngredient = () => {
    setOpenEditIngredient(false);

  }
  const handleDeleteIngredient = async () => {
    setDeleteFlag(true)
  }
  return (

    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={4} navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <Box sx={boxOutside}>
          <Grid container direction="row" alignContent="baseline">
            {searchName ?
              ingredientArray.filter(searchIngredient => searchIngredient.nameIngredient === searchName)
                .map((ingredient) => {
                  return (
                    <SwiperSlide key={ingredient.ingredientId}>
                      <Grid item >
                        <IngredientCard ingredient={ingredient} setanchorEl={setanchorEl} setIdDeletedIngredient={setIdDeletedIngredient} />
                      </Grid>
                    </SwiperSlide>
                  )
                }
                )
              :
              ingredientArray.map((ingredient) => {
                return (
                  <SwiperSlide key={ingredient.ingredientId}>
                    <Grid item >
                      <IngredientCard ingredient={ingredient} setanchorEl={setanchorEl} setIdDeletedIngredient={setIdDeletedIngredient} />
                    </Grid>
                  </SwiperSlide>
                )
              }
              )
            }
          </Grid>
        </Box >
      </Swiper>

      <StyledMenu
        id="style-menu"
        MenuListProps={{
          'aria-labelledby': 'customized-button',

        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

        <Modal
          open={openEditIngredient}
          onClose={handleCloseEditIngredient}
        >
          <Edit_Ingredient />
        </Modal>

        <MenuItem onClick={handleOpenEditIngredient} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteIngredient} disableRipple>
          <FileCopyIcon />
          Delete
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>

    </>
  );
}

export default SlideIngredient;




