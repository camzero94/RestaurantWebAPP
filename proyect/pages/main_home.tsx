import LayoutComponent from '../components/MainNavigation/LayoutComponent'
import React, { useState, createContext, useContext, useEffect } from 'react'
import SignupComponent from '../components/signup'
import { useRouter } from 'next/router'
import User from '../namespaces/User'
import { isInfoComplete } from '../utils/aut'
import { Modal, Box } from '@mui/material'

let nullUser: User.Description = {
  id: 0,
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  cellphone: '',
  companyname: '',
  is_superuser: false,
  is_active: false,
  is_leader: false,
  projects: [],
}

export const HomeUserContext = createContext<User.Description>(nullUser)

function HomeMain() {

  const [open, setOpen] = useState<boolean>(false)
  const [user, setuser] = useState<User.Description>(nullUser)
  const router = useRouter()
  const [token, setToken] = useState<any>(null)


  const handleClose = () => setOpen(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Expose-Headers': 'Content-Range',
      },
    }

    const res = fetch(`http://localhost:8000/api/v1/users/me`, requestOptions)
      .then((res) => res.json())
      .then((data: any) => {
        if (isInfoComplete(data)) {
          nullUser = Object.assign(nullUser, data)
        } else {
          router.push(`/signup1`)
        }

        if (!isInfoComplete(nullUser)) {
          setOpen(true)
        } else {
          if (nullUser.is_active && nullUser.is_superuser)
            router.push(`/users/${nullUser.id}`)
          else if (nullUser.is_active && nullUser.is_leader)
            router.push(`/users/${nullUser.id}`)
          else router.push(`/users/${nullUser.id}`)
        }
      })
  }, [router.isReady])

  return (
    <>
      <LayoutComponent>
        <h2>Im Home Hello </h2>
      </LayoutComponent>
      <Modal open={open} onClose={handleClose}>
        <SignupComponent />
      </Modal>
    </>
  )
}

export default HomeMain
