from motor.motor_asyncio import AsyncIOMotorClient
from models import Vehiculo
from bson import ObjectId

client = AsyncIOMotorClient('mongodb://localhost:27017')

database = client.encava

collection = database.vehiculos

async def get_oneV_id(id):

    vehiculo = await collection.find_one({'_id': ObjectId(id)})
    return vehiculo

async def get_oneV(name):

    vehiculo = await collection.find_one({'name': name})
     
    return vehiculo

async def get_allV():
    vehiculos = []
    cursor = collection.find({})
    async for document in cursor:
        vehiculos.append(Vehiculo(**document))
    return vehiculos

async def createV(vehiculos):

    newV = await collection.insert_one(vehiculos)
    createdV = await collection.find_one({'_id': newV.inserted_id})
    return createdV

async def updateV(id: str, data):

    vehiculos = {k:v for k, v in data.model_dump().items() if v is not None}
    print(vehiculos)

    await collection.update_one({'_id': ObjectId(id)}, {'$set': vehiculos})
    document = await collection.find_one({'_id': ObjectId(id)})
    return document

async def deleteV(id: str):

    await collection.delete_one({'_id': ObjectId(id)})
    return True


