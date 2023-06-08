import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import {
  Modal,
  Button,
  Grid,
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import React, {
  useRef,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from 'react'
import { Alert } from '@mui/material'
import CheckItem from './Check_Items'
import LayoutEditIngredient from '../Auth/LayoutEditIngredient'
import Item from '../../namespaces/Item'
import Menu from '../../namespaces/Menu'
import MenuItem from '../../namespaces/Menu_Item'
import { Project_Page_Ctx_2 } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import { post_button_add_delete } from '../Styles'

const Post_Menu: React.FC = () => {
  const { projectId, setOpenMenu } = useContext(
    Project_Page_Ctx_2
  ) as IContextProject

  const [error, setError] = useState<String | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)

  const [items, setItems] = useState<Item.Description[]>([])
  const [openModalAddItem, setOpenModalAddItem] = useState<boolean>()
  const [arraySelected, setArraySelected] = useState<Item.Description[]>()
  const [menuItems, setMenuItems] = useState<MenuItem.Description[]>([])

  const menuNameRef = useRef<HTMLInputElement>()
  const typeMenuRef = useRef<HTMLInputElement>()
  const urlStringRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()

  const handleChangeActive = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(true)
  }
  const handleChangeNotActive = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActive(false)
  }
  const handleClickAddItem = () => {
    console.log('Open Modal Add Item')
    setOpenModalAddItem(true)
  }
  const handleCloseAddItem = () => {
    setOpenModalAddItem(false)
  }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    console.log(arraySelected)
    try {
      setLoading(true)
      if (menuNameRef.current?.value && arraySelected.length >= 1) {
        const token = localStorage.getItem('token')
        const dateNow = new Date().toISOString()
        const menu = {
          nameMenu: menuNameRef.current?.value,
          type: typeMenuRef.current?.value,
          description: descriptionRef.current?.value,
          summary:descriptionRef.current?.value,
          image_url: urlStringRef.current?.value,
          createdAtTime: dateNow,
          items: arraySelected,
          add: false,
          delete: false,
          edit_flag: false,
        }

        const requestOptions = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(menu),
        }

        console.log('Request=====>', requestOptions)
        const response = projectId
          ? await fetch(`http://localhost:8000/api/v1/menus/${projectId}`, requestOptions)
          : null
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        console.log('Returned Data', data)
        location.reload()
      } else {
        setError('Incorrectly filled')
      }
    } catch (e: any) {
      console.log(e)
      setError('Error while POST')
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('Active', active)
    console.log('Selected Ingredients', arraySelected)
    // console.log('Quantity Arr ', quantity)
  }, [arraySelected])

  return (
    <>
      <LayoutEditIngredient nameForm={'New Menu'} submitForm={handleSubmit}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>
        )}

        <Grid container spacing={1} style={{ marginTop: '20px ' }}>
          <Grid item xs={12}>
            <TextField
              label='Menu Name'
              variant='outlined'
              placeholder='Enter Name of Menu'
              fullWidth
              size='small'
              inputRef={menuNameRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Type of Menu'
              variant='outlined'
              placeholder='Enter Type of Menu'
              fullWidth
              size='small'
              inputRef={typeMenuRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Image Menu Url'
              variant='outlined'
              placeholder='Enter Url or Path Image Menu '
              fullWidth
              size='small'
              inputRef={urlStringRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Description'
              variant='outlined'
              placeholder='Enter Description'
              fullWidth
              multiline
              rows={5}
              size='small'
              inputRef={descriptionRef}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} direction='row'>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox checked={active} onChange={handleChangeActive} />
              }
              label='Active'
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox checked={!active} onChange={handleChangeNotActive} />
              }
              label='Not Active'
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction='row'
          style={{
            display: 'flex',
            marginTop: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            xs={6}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant='contained'
              style={post_button_add_delete}
              onClick={handleClickAddItem}
              startIcon={<RestaurantMenuIcon />}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </LayoutEditIngredient>
      <Modal open={openModalAddItem} onClose={handleCloseAddItem}>
        <CheckItem
          setItems={setItems}
          items={items}
          arraySelected={arraySelected}
          setArraySelected={setArraySelected}
          setOpenModalAddItem={setOpenModalAddItem}
        />
      </Modal>
    </>
  )
}

export default Post_Menu
