from fastapi import APIRouter, Request, Depends, Response 
from app.db.schemas.user_project_schemas import BaseRating,UpdateRating
from app.db.session import get_db
from app.db.server import (
    create_ratings,
    get_items_ratings,
    get_project,
    get_rating_by_userId,
    get_ratings_all,
    update_ratings,
    get_ratings_update

)
from app.core.auth import  get_current_active_user
import typing as t


rating_router = re = APIRouter()

# CRUD operations for Ingredients


@re.post("/ratings/{projectId}", response_model_exclude_none=True)
async def item_create(
    request: Request,
    projectId: int,
    ratings_query: t.List[UpdateRating],
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    print("Here Is the project Id   ===>", ratings_query)

    """
    Create a new Menu 
    """

    #Get Project 
    currentProject = get_project(db, projectId)
    #Get OrderItems
    itemsQuery = get_items_ratings(db,ratings_query)
    print (itemsQuery)
    # Create Rating
    userRatings = create_ratings(db, itemsQuery, current_user, currentProject,ratings_query)

    return "Successfully Rating Created"

@re.get("/ratings", response_model_exclude_none=True)

async def ratings_all(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    
    ratings= get_ratings_all(db,current_user.id)
    response.headers["Content-Range"] = f"0-200/{len(ratings)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return ratings 

@re.get("/ratings/me", response_model_exclude_none=True)
async def rating_by_userId(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    
    ratings= get_rating_by_userId(db,current_user.id)
    response.headers["Content-Range"] = f"0-50/{len(ratings)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return ratings 
# @re.delete("/menu/{menu_id}", response_model_exclude_none=True)
# async def delete_item(
#     request: Request,
#     menu_id: int,
#     db=Depends(get_db),
#     current_user=Depends(get_current_active_user),
# ):
#     #Delete Item
#     print("=================DELETE===============")
#     res = menu_delete(db,menu_id)
#     return res 
#
@re.put("/ratings/{project_id}", response_model_exclude_none=True)

async def edit_rating(
    request: Request,
    project_id: int,
    ratings_query: t.List[UpdateRating],
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    #Get Project 
    currentProject = get_project(db, project_id)
    #Get OrderItems
    itemsRatingsQuery = get_ratings_update(db,current_user.id,currentProject.projectId,ratings_query)

    # Edit the item, add new ingredient or Delete ingredient
    ratingUpdated= update_ratings(db, itemsRatingsQuery,currentProject,ratings_query)

    return  ratingUpdated

