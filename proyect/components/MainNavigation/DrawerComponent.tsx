import {
  Box,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import HomeIcon from '@mui/icons-material/Home'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState, useContext } from 'react'
import User from '../../namespaces/User'
import QrCodeIcon from '@mui/icons-material/QrCode'
import { Project_Page_Ctx, IContext } from '../../store/context/project-context'
import Link from 'next/link'

interface DrawerComponentProps extends DrawerProps {}
const DrawerComponent: React.FC<DrawerComponentProps> = (props) => {
  const { userName,setOpenQRCode, userId } = useContext(Project_Page_Ctx) as IContext

  console.log("Here UserName====>",userName)
  const router = useRouter()

  const [user, setUser] = useState<User.Description>()

  const buttonHandlerUsers = () => {
    return router.push(`/users/${user?.id}`)
  }
  const buttonHandlerHome = () => {
    return router.push(`/main_home/${user?.id}`)
  }
  const buttonHandlerLogin = () => {
    return router.push('/login')
  }
  const buttonHandlerQRCode = () => {
    console.log('Turn true')
    setOpenQRCode(true)
  }
  useEffect(() => {}, [])

  return (
    <>
      <Drawer {...props}>
        <Box width={300}>
          <List>
            <Link href={`/users/profile/${encodeURIComponent(userId)}`}>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                  <ListItemText primary={`${userName}`} />
                </ListItemIcon>
              </ListItem>
            </Link>

            <Link href={`/users/profile/${encodeURIComponent(userId)}`}>
              <ListItem>
                <ListItemIcon>
                  <AccountBoxIcon />
                  <ListItemText primary={'Users'} />
                </ListItemIcon>
              </ListItem>
            </Link>
            <Link href={`/users/profile/${encodeURIComponent(userId)}`}>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                  <ListItemText primary={'Calendar'} />
                </ListItemIcon>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default DrawerComponent
