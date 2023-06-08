from fastapi import APIRouter, Request,Depends,Response
from app.db.schemas.user_project_schemas import Project, ProjectSchema,CreateProject, UpdateProject,User
from app.db.session import get_db
from app.db.server import create_project, update_project,add_project_to_user, get_projects,delete_project,get_projectByProjectId
from app.core.auth import get_current_active_leader, get_current_active_user
from app.db.models import User_Project 
import typing as t


project_router = re = APIRouter()
#CRUD operations for project    

@re.post("/projects",response_model=ProjectSchema,response_model_exclude_none=True)
async def project_create(
    request: Request,
    project: CreateProject,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    print (project)
    """
    Create a new project
    """
    user_project = User_Project(extraData="My Data")
    created_project = create_project(db,project)
    project_with_user = add_project_to_user(db,created_project,current_user,user_project)
    
    return project_with_user

@re.get(
    "/projects",
    response_model=t.List[Project],
    response_model_exclude_none=True,
)
async def project_list(
    response: Response,

    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get all users
    """
    projects = get_projects(db,current_user)
    # print(projects) 
    # for project in projects:
    #     print(project.projectId)
    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(projects)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return projects

@re.get(
    "/project/{project_id}",
    response_model_exclude_none=True,
)
async def project_by_id(
    response: Response,
    project_id:int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get Project by Id 
    """
    project = get_projectByProjectId(db,project_id)

    return project
@re.delete (
    "/project/{project_id}",
    response_model=CreateProject,
    response_model_exclude_none=True,
)
async def project_delete(
    response: Response,
    project_id:int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    deleted_project = delete_project(db,project_id)
    return deleted_project

@re.put(
    "/project/{project_id}",
    response_model=UpdateProject,
    response_model_exclude_none=True,
)
async def project_update(
    response: Response,
    project_id:int,
    projectUpdateReq:UpdateProject,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):

    project_to_update = get_projectByProjectId(db,project_id)
    updated_project = update_project(db,project_to_update,projectUpdateReq)
    return updated_project 






