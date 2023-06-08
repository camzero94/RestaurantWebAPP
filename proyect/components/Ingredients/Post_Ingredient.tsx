import { Button, Grid, TextField } from '@material-ui/core'
import React, {
  useRef,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from 'react'
import LayoutEditIngredient from '../Auth/LayoutEditIngredient'
import Ingredient from '../../namespaces/User'
import { Alert } from '@mui/material'
import { Project_Page_Ctx_2 } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'

const Post_Ingredient: React.FC = () => {

  const { projectId, setOpenIngredient } = useContext(
    Project_Page_Ctx_2
  ) as IContextProject

  const [error, setError] = useState<String | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fileInput, setFileInput] = useState<string | null>(null)

  const ingredientNameRef = useRef<HTMLInputElement>()
  const quantityRef = useRef<HTMLInputElement>()
  const unitRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Pressssssss")
    const fileImage = e.target.files[0]
    //Reader Object
    const reader = new FileReader()
    reader.onload = () => {
      setFileInput(reader.result as string)
    }
    reader.onerror = (error) => {
      console.log('Error: ', error)
    }

    fileImage ? reader.readAsDataURL(fileImage):null
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // setLoading(true)
    try {

      if (ingredientNameRef.current?.value && quantityRef.current?.value) {
        const token = localStorage.getItem('token')
        const dateNow = new Date().toISOString()

        const ingredient = {
          nameIngredient: ingredientNameRef.current?.value,
          quantity: quantityRef.current?.value,
          unit: unitRef.current?.value,
          summary: descriptionRef.current?.value,
          image_url: fileInput,
          createdAtTime: dateNow,
        }

        const requestOptions = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredient),
        }
        console.log("Project Id============>"+projectId)
        const response = 
           await fetch(
              `http://localhost:8000/api/v1/ingredients/${projectId}`,
              requestOptions
            )
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        setOpenIngredient(false)
        console.log(data)
      } else {
        setError('Incorrectly filled')
    e.preventDefault();
      }
    } catch (e: any) {
      console.log(e)
      setError('Error while POST')
    e.preventDefault();
    }
  }
  const formStyle = {
    // padding: 20,
    // margin: '10px auto',
    //     marginLeft: '50px',
    marginTop: '20px ',
  }
  return (
    <>
      <LayoutEditIngredient
        nameForm={'New Ingredient'}
        submitForm={handleSubmit}
      >
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>
        )}

        <Grid container spacing={1} style={formStyle}>
          <Grid item xs={12}>
            <TextField
              label='Item Name'
              variant='outlined'
              placeholder='Enter Name of Item'
              fullWidth
              size='small'
              inputRef={ingredientNameRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Unit Ingredient'
              variant='outlined'
              placeholder='Enter Unit'
              fullWidth
              size='small'
              inputRef={unitRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Quantity'
              variant='outlined'
              placeholder='Enter Quantity'
              fullWidth
              size='small'
              inputRef={quantityRef}
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
          <Grid item xs={12}>
          <input
            accept="image/*"
            type="file"
            onChange={handleFile}
          />
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: '40px' }}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </LayoutEditIngredient>
    </>
  )
}

export default Post_Ingredient
