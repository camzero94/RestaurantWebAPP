import React, { useContext,createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Modal } from '@mui/material'

import SecurityLayout from '../../../../../components/MainNavigation/SecurityLayout'
import IContextProject from '../../../../../namespaces/Ingredients_Page_States'
import LayoutComponent from '../../../../../components/MainNavigation/LayoutComponent'
import Post_Ingredient from '../../../../../components/Ingredients/Post_Ingredient'
import Post_Item from '../../../../../components/Items/PostItem'
import Post_Menu from '../../../../../components/Menus/PostMenu'
import SlideItem from '../../../../../components/Items/SlideItemsComponent'
import SlideIngredient from '../../../../../components/Ingredients/SlideIngredientsComponent'
import SlideMenu from '../../../../../components/Menus/SlideMenuComponent'
import Ingredient from '../../../../../namespaces/Ingredient'
import Item from '../../../../../namespaces/Item'
import Menu from '../../../../../namespaces/Menu'
import HeaderIngredient from '../../../../../components/Ingredients/HeaderIngredient'
import HeaderItem from '../../../../../components/Items/HeaderItem'
import HeaderMenu from '../../../../../components/Menus/HeaderMenu'
import {IContext,Project_Page_Ctx} from '../../../../../store/context/project-context'


export const Project_Page_Ctx_2 = createContext<IContextProject | null>(null)

let ingredientArray: Ingredient.Description[] = []
let itemArr: Item.Description[] = []
let menuArr: Menu.Description[] = []

function Project_Page() {
  const router = useRouter()
  const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null)
  const [projectId, setProjectId] = useState<any>(null)

  //Ingredients States
  const [openIngredientModal, setOpenIngredient] = useState<boolean>(false)
  const [openEditIngredient, setOpenEditIngredient] = useState<boolean>(false)
  const [ingredientArr, setIngredient] = useState<Ingredient.Description[]>([])
  const [imageArrIngredients, setImageArrIngredients] = useState<Blob[]>([])

  const [idDeleteIngredient, setIdDeletedIngredient] = useState<any>(null)
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false)
  const [searchName, setSearchName] = useState<string>('')

  //Item States
  const [openItemModal, setOpenItem] = useState<boolean>(false)
  const [openEditItem, setOpenEditItem] = useState<boolean>(false)
  const [itemArray, setItemArray] = useState<Item.Description[]>([])
  const [anchorElItem, setanchorElItem] = useState<null | HTMLElement>(null)

  const [idDeleteItem, setIdDeletedItem] = useState<any>(null)
  const [deleteFlagItem, setDeleteFlagItem] = useState<boolean>(false)
  // const [addRecipeItem,setRecipeItem] = useState<Recipe>

  //Menus States
  const [openMenuModal, setOpenMenu] = useState<boolean>(false)
  const [openEditMenu, setOpenEditMenu] = useState<boolean>(false)
  const [menuArray, setMenuArray] = useState<Menu.Description[]>([])
  const [anchorElMenu, setanchorElMenu] = useState<null | HTMLElement>(null)

  const { userName} = useContext(Project_Page_Ctx) as IContext
  console.log("Name Page",userName)
  const statesPage = {
    // Get Id project
    projectId: projectId,

    //User Name
    //Ingredients States
    ingredientArray: ingredientArr,
    setOpenIngredient: setOpenIngredient,
    setOpenEditIngredient: setOpenEditIngredient,
    openEditIngredient: openEditIngredient,
    setIdDeletedIngredient: setIdDeletedIngredient,
    idDeleteIngredient: idDeleteIngredient,
    setDeleteFlag: setDeleteFlag,
    setanchorEl: setanchorEl,
    anchorEl: anchorEl,
    setSearchName: setSearchName,
    searchName: searchName,

    //Items States
    setOpenItem: setOpenItem,
    itemArr: itemArr,
    setOpenEditItem: setOpenEditItem,
    openEditItem: openEditItem,
    setanchorElItem: setanchorElItem,
    anchorElItem: anchorElItem,

    idDeleteItem: idDeleteItem,
    setIdDeletedItem: setIdDeletedItem,
    setDeleteFlagItem: setDeleteFlagItem,

    //Menu States
    setOpenMenu: setOpenMenu,
    menuArray: menuArray,
    setOpenEditMenu: setOpenEditMenu,
    openEditMenu: openEditMenu,
    setanchorElMenu: setanchorElMenu,
    anchorElMenu: anchorElMenu,
  }

  //Methods Ingredients Modals
  const handleCloseIngredient = () => {
    setOpenIngredient(false)
  }
  //Methods Item Modals
  const handleCloseItem = () => {
    setOpenItem(false)
  }
  const handleCloseMenu = () => {
    setOpenMenu(false)
  }

  const getMenusAsync = async (token: String, projectid: any) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/menus/${projectid}`,
        requestOptions
      )

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
      }
      const data = await res.json()
      menuArr = Object.assign([], data)
      setMenuArray(menuArr)
      setProjectId(projectid)
      // setanchorEl(null)
    } catch (error: any) {
      console.log('Could not Fetch Data Item' + error)
    }
  }
  const getItemsAsync = async (token: String, projectid: any) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/items/${projectid}`,
        requestOptions
      )

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
      }
      const data = await res.json()
      itemArr = Object.assign([], data)

    //Call api to get all Items Images
      for (let i = 0; i < itemArr.length; i++) {
        let key = itemArr[i].image_url
        const res = await fetch(
          `http://localhost:8000/api/v1/items/image/${key}`,
          requestOptions
        )

        const img = await res.json()
        //Replace image_url with image file Blob Type
        itemArr[i].imageFile = img 
      }
      //Update State of Ingredients Array
      setItemArray(itemArr)
      setProjectId(projectid)
      // setanchorEl(null)
    } catch (error: any) {
      console.log('Could not Fetch Data Item' + error)
    }
  }

  const getIngredientsAsync = async (token: String, projectid: any) => {

    //Call api to get all ingredients
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/ingredients/${projectid}`,
        requestOptions
      )

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
      }
      const data = await res.json()
      ingredientArray = Object.assign([], data)

    //Call api to get all Ingredients Images
      for (let i = 0; i < ingredientArray.length; i++) {
        let key = ingredientArray[i].image_url
        const res = await fetch(
          `http://localhost:8000/api/v1/ingredients/image/${key}`,
          requestOptions
        )

        const img = await res.json()
        //Replace image_url with image file Blob Type
        ingredientArray[i].imageFile = img
      }
      //Update State of Ingredients Array
      setIngredient(ingredientArray)
      setProjectId(projectid)
      setanchorEl(null)
    } catch (error: any) {
      console.log('Could not Fetch Data Ingredients ' + error)
    }
  }


  const deleteIngredientAsync = async (
    token: string,
    idDeleteIngredient: any
  ) => {

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/ingredient/${idDeleteIngredient}`,
        requestOptions
      )

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
      }
      const data = await res.json()

      console.log(data)
      setanchorEl(null)
      window.location.reload()
    } catch (error: any) {
      console.log('Could not Fetch Data Ingredients ' + error)
    }
  }

  const deleteItemAsync = async (token: string, idDeleteItem: any) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    // console.log("Here Id Selected Ingredient inside the async funtion ", idDeleteIngredient)
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/item/${idDeleteItem}`,
        requestOptions
      )

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
      }
      const data = await res.json()

      console.log(data)
      setanchorEl(null)
      window.location.reload()
    } catch (error: any) {
      console.log('Could not Fetch Data Ingredients ' + error)
    }
  }
  useEffect(() => {
    //Get Project Id for Post,Edit and Delete Items, Ingredients and Menus
    const { projectid } = router.query
    setProjectId(projectid)
    //Get Token From Local storage to be able to acces the Backend
    const token = localStorage.getItem('token')

    //Ingredients States
    //If the project Id exists correct get all Ingredients fron backend

    projectid ? getIngredientsAsync(token, projectid) : null

    // ingredientArr.length > 0 ? getIngredientsImgAsync(token, ingredientArr):null
    //Get Id from Ingredient to be deleted
    console.log('Flag is Ingredient =====', deleteFlag)
    deleteFlag ? deleteIngredientAsync(token, idDeleteIngredient) : null

    //Item States
    projectid ? getItemsAsync(token, projectid) : null

    //Get Id from Item to be deleted
    console.log('Flag is =====', deleteFlagItem)
    deleteFlagItem ? deleteItemAsync(token, idDeleteItem) : null

    //Menu States
    projectid ? getMenusAsync(token, projectid) : null
  }, [router, deleteFlag, deleteFlagItem])


  for (let i = 0; i < ingredientArr.length; i++) {
    console.log('Array Ingredients =====>' + ingredientArr[i].nameIngredient)
    console.log('Array Ingredients Url =====>' + ingredientArr[i].imageFile)
  }
  // console.log('Array lenght -=====> ', ingredientArr.length)
  return (
    <>
      <Project_Page_Ctx_2.Provider value={statesPage}>
        <SecurityLayout>
          <LayoutComponent>
            <HeaderMenu activity='My Menu' />
            <SlideMenu />
            <HeaderItem activity='My Items' />
            <SlideItem />
            <HeaderIngredient activity='My Ingredients' />
            <SlideIngredient />
          </LayoutComponent>
          <Modal open={openIngredientModal} onClose={handleCloseIngredient}>
            <Post_Ingredient />
          </Modal>
          <Modal open={openItemModal} onClose={handleCloseItem}>
            <Post_Item />
          </Modal>
          <Modal open={openMenuModal} onClose={handleCloseMenu}>
            <Post_Menu />
          </Modal>
        </SecurityLayout>
      </Project_Page_Ctx_2.Provider>
    </>
  )
}

export default Project_Page
