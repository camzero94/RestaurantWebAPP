from fastapi import HTTPException, Response
from app.db.schemas.user_project_schemas import CreateOrderSchema
from .config import (AWS_BUCKET_NAME,AWS_ACCESS_KEY,AWS_SECRET_KEY,AWS_BUCKET_REGION)
from uuid import uuid4
import base64
import boto3
from botocore.exceptions import ClientError 
import magic

SUPPORT_FILES_TYPE = {
        'image/png':'png',
        'image/jpeg':'jpeg',
        'image/jpg':'jpg',
        }


s3 = boto3.client('s3',
                aws_access_key_id=AWS_ACCESS_KEY,
                aws_secret_access_key=AWS_SECRET_KEY,
                region_name=AWS_BUCKET_REGION
                  )


def calculate_global_order(order:CreateOrderSchema):
    total:float = 0.0
    subtotal:float = 0.0
    tax:float = 0.05
    globalDiscount = 0.0

    for idx,item in enumerate(order.items):
        globalDiscount += item.discount
        subtotal += round(item.price  - (item.price * item.discount))
        # print(f'{idx},{item.item.nameItem} Total Acumm = {total}' )
    total = round(subtotal + (subtotal*tax))

    return total,subtotal,tax,globalDiscount


def decodeBase64 (data_url:str):
    """
    Decode a base64 string
    """
    
    mime, data= data_url.split(",", 1)
    mimetype = mime.split(":",1)[1].split(";",1)[0]
    try:
        decoded_data = base64.b64decode(data)
    except base64.binascii.Error:
        print("Invalid base64-encoded string")
    return decoded_data 

async def upload(file:bytes ):

    #If the file is null throw error Invalid Image
    if not file:
        raise HTTPException(status_code=400, detail="Invalid image")
    file_size = len(file)
    #If file size is bigger than 1MB error
    if not  0 < file_size <= 1048576:
        raise HTTPException(status_code=400, detail="Image size is too big only supported size is less 1MB")

    #Get the file type from the image (jpg, jpeg, png)
    file_type = magic.from_buffer(file, mime=True) 
    #If the file type is not supported throw error
    if file_type not in SUPPORT_FILES_TYPE:
        raise HTTPException(status_code=400, detail="Invalid image type")
    #Create a unique key for the image
    key = f'{uuid4()}.{SUPPORT_FILES_TYPE[file_type]}'
    #Upload the image to S3 AWS
    await upload_s3(contents=file, key=key)
    ans = {'key':key}
    return ans

async def download(key:str) -> Response:
    #If the file is null throw error Invalid Image
    if not key:
        raise HTTPException(status_code=400, detail="Not filename provided Aka(Key)")
    #Download the image from S3 AWS
    contents = await download_s3(key=key)
    return contents

async def delete(key:str):
    #If the file is null throw error Invalid Image
    if not key:
        raise HTTPException(status_code=400, detail="Not filename provided Aka(Key) to Delete")
    #Download the image from S3 AWS
    contents = await delete_s3(key=key)
    return contents


async def delete_s3(key:str):
    try:
        return s3.delete_object(Bucket=AWS_BUCKET_NAME,Key= key)
    except ClientError as e:
        print(e)

async def upload_s3(contents:bytes , key:str):
    try:
        return s3.put_object(Body=contents, Bucket=AWS_BUCKET_NAME,Key= key)
    except Exception as e:
        print(e)

async def download_s3(key:str):
    try:
        response = s3.generate_presigned_url('get_object',
                                            Params={'Bucket': AWS_BUCKET_NAME,
                                                    'Key': key},
                                            ExpiresIn=60)
        return response
    except ClientError as e:
        print(e)


