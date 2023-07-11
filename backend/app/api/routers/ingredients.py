from fastapi import APIRouter, Request, Depends, Response, HTTPException
from fastapi.responses import JSONResponse , FileResponse
from app.db.schemas.user_project_schemas import (
    IngredientSchema,
    CreateIngredient,
    Ingredient,
    UpdateIngredient,
)

from app.db.session import get_db
from app.db.server import (
    create_ingredient,
    get_project,
    get_ingredient,
    add_ingredient_project,
    get_ingredients,
    edit_ingredient_by_id,
    delete_ingredient,
)
from app.core.auth import get_current_active_leader, get_current_active_user
from app.db.models import IngredientDB
from app.core.utils import (decodeBase64,SUPPORT_FILES_TYPE,upload_s3)
import typing as t
from app.core.utils import (upload,download,delete)


ingredient_router = re = APIRouter()

# CRUD operations for Ingredients
# response_model=IngredientSchema
@re.post(
    "/ingredients/{projectId}",  
    response_model=IngredientSchema,
    response_model_exclude_none=True
)
async def ingredient_create(
    request: Request,
    projectId: int,
    ingredient: CreateIngredient,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Create a new ingredient and save image to S3 AWS
    """
    
    
    """
    -----------------------Save image to S3 AWS ----------------
    """
    #Decode base64 image
    file= decodeBase64(ingredient.image_url)
    #Upload to S3 AWS
    answer = await upload(file)
    
    """
    -----------------------Create Ingredient Object with S3 key object as imageUrl in DB ----------------
    """

    ingredient.image_url = answer['key']
    currentProject = get_project(db, projectId)
    createdIngredient = create_ingredient(db, ingredient, projectId)

    [project_ingredient, ingredient_with_project] = add_ingredient_project(
        db, currentProject, createdIngredient
    )
    print(ingredient_with_project.items)

    return ingredient_with_project

@re.get(
    "/ingredients/image/{key}",
    response_model_exclude_none=True,
)
async def ingredient_get_image(
        response:Response,
        key:str,
        db=Depends(get_db),
        current_user=Depends(get_current_active_user),
        ):
    """
    Get Ingredient Image
    """
    print(key)
    ans = await download(key)
    print("========================================Answer ======================>"+ans)
    return ans

@re.get(
    "/ingredients/{projectId}",
    # response_model=t.List[IngredientSchema],
    response_model_exclude_none=True,
)
async def ingredient_list(
    response: Response,
    projectId: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get all Ingredients
    """

    ingredients = get_ingredients(db, projectId)

    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(ingredients)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"

    for x in ingredients:
        print(x)

    return ingredients 


@re.put(
    "/ingredients/{ingredient_id}",
    # response_model=t.List[IngredientSchema],
    response_model_exclude_none=True,
)
async def ingredient_edit(
    response: Response,
    ingredient: UpdateIngredient,
    ingredient_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Edit Ingredient
    """
    edited_ingredient = edit_ingredient_by_id(db,ingredient,ingredient_id) 

    return edited_ingredient 


@re.delete(
    "/ingredient/{ingredient_id}",
    # response_model=ItemSchema,
    response_model_exclude_none=True,
)
async def ingredient_delete(
    response: Response,
    ingredient_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    [deleted_ingredient,key_to_delete] = delete_ingredient(db, ingredient_id)
    contents = await delete(key_to_delete)
    db.commit()
    return f'Deleted Ingredient is {deleted_ingredient.ingredientId} and key to delete is {key_to_delete}'
