from fastapi import APIRouter, Request, Depends, Response 
from app.db.schemas.user_project_schemas import CreateOrderSchema, MenuSchema,UpdateOrder
from app.db.session import get_db
from app.db.server import (
    get_project,
    order_create,
    get_itemlist_order,
    orderItem_create,
    get_orders_by_userId,
    get_order_by_id,
    get_orders_by_projectId,
    order_edit,
    order_delete

)
from app.core.auth import get_current_active_leader, get_current_active_user
from app.db.models import ItemDB 
import typing as t


order_router = re = APIRouter()

# CRUD operations for Ingredients

#Create Order 
@re.post("/order/{projectId}", response_model_exclude_none=True)
async def create_NewOrder(
    request: Request,
    projectId: int,
    order:CreateOrderSchema,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    print("Here Is the project Id   ===>", projectId)
    print("Here Is the UserId===>", current_user.id)

    """
    Create a Order 
    """

    
    # Get Current Project
    currentProject = get_project(db, projectId)

    new_order = order_create(db,current_user.id,projectId,order)

    item_list = get_itemlist_order(db,order)
      
    new_orderItem = orderItem_create(db,order,new_order,item_list)

    
    print(new_orderItem.orderId)

    return { 'mssg':'Susseccfully Created Order', 'orderId':new_orderItem.orderId}

#Get Orders by UserId
@re.get("/orders/{user_id}", response_model_exclude_none=True)
async def ordersByUserId(
    response: Response,
    user_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    
    orders = get_orders_by_userId(db,user_id)
    # response.headers["Content-Range"] = f"0-9/{len(orders)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return orders 


#Get Orders by OrderId
@re.get("/order/{order_id}", response_model_exclude_none=True)
async def ordersByOrderId(
    response: Response,
    order_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    
    order = get_order_by_id(db,order_id)
    return order 

#Get Orders by Project_id 
@re.get("/orders/restaurant/{project_id}", response_model_exclude_none=True)
async def ordersByOrderId(
    response: Response,
    project_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    
    orders = get_orders_by_projectId(db,project_id)
    response.headers["Content-Range"] = f"0-9/{len(orders)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return orders 

#Edit Order by OrderId

@re.put("/order/{order_id}", response_model_exclude_none=True)
async def editDelete_orderById(
    request: Request,
    order_id: int,
    order_req:UpdateOrder,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    #Edit Order
    print("=================EDIT===============")
    order_byId = get_order_by_id(db,order_id)
    res = order_edit(db,order_byId,order_req)
    return { 'mssg':'Susseccfully Edit Order', 'orderId':res.orderId}

@re.put("/order/delivered/{order_id}", response_model_exclude_none=True)
async def editDelete_orderById(
    request: Request,
    order_id: int,
    order_req:UpdateOrder,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    #Edit Order
    print("=================EDIT===============")
    order_byId = get_order_by_id(db,order_id)
    res = order_edit(db,order_byId,order_req)
    return { 'mssg':'Susseccfully Edit Order', 'orderId':res.orderId}
#Delete Order By Order Id
@re.delete("/order/{order_id}", response_model_exclude_none=True)
async def delete_orderById(
    request: Request,
    order_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    #Delete Item
    print("=================DELETE===============")
    res = order_delete(db,order_id)
    return res 

