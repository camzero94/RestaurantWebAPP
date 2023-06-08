import { Container, Grid } from '@material-ui/core'
import React, { useContext, useEffect, createContext, useState } from 'react'
import NavigationDrawer from './DrawerComponent'
import ToolbarComponent from './ToolbarComponent'
import { Dispatch, SetStateAction } from 'react'

interface LayoutProps {
  children: React.ReactNode
}



const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  
  const [drawerOpen, setdrawerOpen] = useState(false)

  return (
    <div>
        <NavigationDrawer
          open={drawerOpen}
          variant='temporary'
          anchor='left'
          onClose={() => setdrawerOpen(false)}
        />
        <ToolbarComponent clickMenu={() => setdrawerOpen(true)} />
        <Container maxWidth='lg'>
          <div>{children}</div>
        </Container>
    </div>
  )
}

export default LayoutComponent
