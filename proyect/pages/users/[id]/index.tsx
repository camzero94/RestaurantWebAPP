import React, { useState, createContext, useEffect, useContext } from 'react'
import LayoutComponent from '../../../components/MainNavigation/LayoutComponent'
import Project from '../../../namespaces/Project'
import HeaderUserPage from '../../../components/Projects/HeaderUser'
import SimpleSlider from '../../../components/Projects/SlideProjectsComponent'
import HeaderProject from '../../../components/Projects/HeaderProject'
import { Modal } from '@mui/material'
import SecurityLayout from '../../../components/MainNavigation/SecurityLayout'
import { Dispatch, SetStateAction } from 'react'
import Signup_Project from '../../../components/Signup_Project'
import QRComponent from '../../../components/QRCode'
import {
  Project_Page_Ctx,
  IContext,
} from '../../../store/context/project-context'
import Edit_ProjectComponent from '../../../components/Edit_Project'
export interface IContextHome {
  projectArr?: Project.Description[]
}

export const ProjectContext = createContext<IContextHome | null>(null)

let projectArr: Project.Description[] = []

function UserHome() {
  const { setUserName,setOrdersArr,setUserId,userId,projectId,open, setOpen, openEdit, setOpenEdit, openQRCode, setOpenQRCode } =
    useContext(Project_Page_Ctx) as IContext
  const handleClose = () => setOpen(false)

  const handleCloseEdit = () => setOpenEdit(false)
  const handleCloseQRCode = () => setOpenQRCode(false)
  const [project, setProject] = useState<Project.Description[]>([])

  const statePages = {
    projectArr: projectArr,
  }
  console.log("User Id ======="+ userId) 

  const getProjectsAsync = async (token:string) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try{
      const res = fetch(`http://localhost:8000/api/v1/projects`, requestOptions)
        .then((res) => {
          res.json().then((data) => {
            projectArr = Object.assign([], data)
            setProject(projectArr)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      }catch (error: any) {
          console.log("Could not Fetch Data Ingredients " + error);
      }
    }
    const getUserInfoAsync = async (token:string) => {

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      try{
        const res = await fetch(`http://localhost:8000/api/v1/users/me`, requestOptions);
        const data = await res.json()
        console.log(data)
        setUserName(data.username)
        }catch (error: any) {
            console.log("Could not Fetch Data User " + error);
        }
      }

  useEffect(() => {
    const token = localStorage.getItem('token')
    setUserId(localStorage.getItem('id'))
    getProjectsAsync(token)
    getUserInfoAsync(token)
    setOrdersArr([])
  }, [])

  console.log(projectId, 'project id')
  return (
    <>
      <SecurityLayout>
        <ProjectContext.Provider value={statePages}>
          <LayoutComponent>
            <HeaderUserPage />
            <HeaderProject activity='Recently Projects' />
            <SimpleSlider />
            <HeaderProject activity='My Projects' />
            <SimpleSlider />
          </LayoutComponent>

          
          <Modal open={openQRCode} onClose={handleCloseQRCode}>
            <QRComponent projectId={projectId}/>
          </Modal>
          <Modal open={open} onClose={handleClose}>
            <Signup_Project />
          </Modal>
          <Modal open={openEdit} onClose={handleCloseEdit}>
          <Edit_ProjectComponent /> 
          </Modal>
        </ProjectContext.Provider>
      </SecurityLayout>
    </>
  )
}

//
export default UserHome
