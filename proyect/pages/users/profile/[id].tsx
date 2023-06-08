
import { Grid } from '@material-ui/core'
import React, { useState, createContext, useEffect, useContext } from 'react'
import SecurityLayout from '../../../components/MainNavigation/SecurityLayout'
import {
  Project_Page_Ctx,
  IContext,
} from '../../../store/context/project-context'
import LayoutComponent from '../../../components/MainNavigation/LayoutComponent'
import { useRouter } from 'next/router'
import UserComponent from '../../../components/UserComponent'

function HomeUserPage() {

  const router = useRouter()
  const { userId} = useContext(Project_Page_Ctx) as IContext
  const [projectId,setProjectId] = useState<string | string[]>(null)

  useEffect(() => { 
    const projectId = router.query.projectId_Home
    console.log("Project Id ======="+ projectId)
    setProjectId(projectId)
    },[router])
  return (
    <>
      <SecurityLayout>
        <LayoutComponent>
          <Grid container direction='row' >
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
              }}
            >
            <UserComponent/> 
            </Grid>
          </Grid>
        </LayoutComponent>
      </SecurityLayout>
    </>
  )
}

//
export default HomeUserPage
