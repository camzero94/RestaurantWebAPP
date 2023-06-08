import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Modal } from '@mui/material'
import HeaderOrder from '../../../../../../components/Orders/HeaderOrder'
import SliderFinishedOrder from '../../../../../../components/Orders/SlideFinishedOrders'
import SecurityLayout from '../../../../../../components/MainNavigation/SecurityLayout'
import SlideOrdersComponent from '../../../../../../components/Orders/SlideOrdersComponent'
import LayoutComponent from '../../../../../../components/MainNavigation/LayoutComponent'

import {
  Project_Page_Ctx,
  IContext,
} from '../../../../../../store/context/project-context'



function Orders_Page() {
  const router = useRouter()
  const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null)
  const {setOrdersArr,ordersArr,projectId,setProjectId,orderFinishArr,setOrderFinishArr} = useContext(Project_Page_Ctx) as IContext

  const getOrdersAsync = async (token: String, projectid:String) => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch(`http://localhost:8000/api/v1/orders/restaurant/${projectid}`, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json()
      console.log(data)
      setOrdersArr(data.filter((order)=>!order.delivered))
      setOrderFinishArr(data.filter((order)=> order.delivered && !order.deleted) )
    }
    catch (error: any) {
      console.log("Could not Fetch Data Ingredients " + error);
    }
  }

  useEffect(() => {

    const { projId} = router.query
    console.log("Project Id Query =====>"+projId)

    const token = localStorage.getItem('token')
    projId? getOrdersAsync(token,String(projId)):null

    }, [router])

  console.log("Orders===>",ordersArr)
  console.log("Finished===>",orderFinishArr)

  return (
    <>
      <SecurityLayout>
        <LayoutComponent>
          <HeaderOrder activity={"My Orders"}/>
          <SlideOrdersComponent />
          <HeaderOrder activity={"My Orders Finsihed"}/>
          <SliderFinishedOrder/>
        </LayoutComponent>
      </SecurityLayout>
    </>
  )
}

export default Orders_Page
