import React, { createContext, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import Project from '../../namespaces/Project'
import Order from '../../namespaces/Order'

export interface IContext {

  //User Page States
  open?: boolean
  openEdit?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  setOpenEdit?: Dispatch<SetStateAction<boolean>>
  userId?: number | string
  setUserId?: Dispatch<SetStateAction<number | string>>
  userName?: string
  setUserName?: Dispatch<SetStateAction<string>>


  //QRCode States
  openQRCode?: boolean
  setOpenQRCode?: Dispatch<SetStateAction<boolean>>
  projectId?: string | number | null
  setProjectId?: Dispatch<SetStateAction<string | number | null>>

  //Orders States
  ordersArr:Order.Description[]
  setOrdersArr:Dispatch<SetStateAction<Order.Description[]>>
  orderFinishArr:Order.Description[]
  setOrderFinishArr:Dispatch<SetStateAction<Order.Description[]>>
  //QRCode State
  setOpenQRCodeModal?:Dispatch<SetStateAction<boolean>>;
}
export const Project_Page_Ctx = createContext<IContext | null>(null)
interface IProps {
  children: React.ReactNode
}

const PageProjectProvider: React.FC <IProps> =  ({ children }) => {

  const [project, setProject] = useState<Project.Description[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openQRCode, setOpenQRCode] = useState<boolean>(false)
  const [url, setUrl] = useState<string|null>(null)
  const [projectId, setProjectId] = useState<string | number | null>(null)
  const [userId, setUserId] = useState<number | string | null>(null)
  const [ordersArr, setOrdersArr] = useState<Order.Description[]>([])
  const [orderFinishArr, setOrderFinishArr] = useState<Order.Description[]>([])
  const [userName, setUserName] = useState<string>('')

  const statesPage = {
    setOpenEdit: setOpenEdit,
    openEdit: openEdit,
    setOpen: setOpen,
    open: open,
    setOpenQRCode:setOpenQRCode,
    openQRCode:openQRCode,
    projectId:projectId,
    setProjectId:setProjectId,
    userId:userId,
    setUserId:setUserId,
    userName:userName,
    setUserName:setUserName,
    ordersArr:ordersArr,
    setOrdersArr:setOrdersArr,
    orderFinishArr:orderFinishArr,
    setOrderFinishArr:setOrderFinishArr
  }

  return (
    <Project_Page_Ctx.Provider value={statesPage}>
      {children}
    </Project_Page_Ctx.Provider>
  )
}
export default PageProjectProvider

