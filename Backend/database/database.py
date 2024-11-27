from motor.motor_asyncio import AsyncIOMotorClient
from models.models import Vehiculo, Repuesto
from database.password import BDPASS
from bson import ObjectId

client = AsyncIOMotorClient(f'mongodb+srv://emg4bgabrielhernandezcastillo:{BDPASS}@encava.qngdp.mongodb.net/')

database = client.encava

collectionV = database.vehiculos
collectionR = database.repuestos

async def get_oneV_id(id):

    vehiculo = await collectionV.find_one({'_id': ObjectId(id)})
    return vehiculo

async def get_oneV(name):

    vehiculo = await collectionV.find_one({'name': name})
     
    return vehiculo

async def get_allV():
    vehiculos = []
    cursor = collectionV.find({})
    async for document in cursor:
        vehiculos.append(Vehiculo(**document))
    return vehiculos

async def createV(vehiculos):

    newV = await collectionV.insert_one(vehiculos)
    createdV = await collectionV.find_one({'_id': newV.inserted_id})
    return createdV

async def updateV(id: str, data):

    vehiculos = {k:v for k, v in data.model_dump().items() if v is not None}
    print(vehiculos)

    await collectionV.update_one({'_id': ObjectId(id)}, {'$set': vehiculos})
    document = await collectionV.find_one({'_id': ObjectId(id)})
    return document

async def deleteV(id: str):

    await collectionV.delete_one({'_id': ObjectId(id)})
    return True

async def get_oneR_id(id):
    repuesto = await collectionR.find_one({'_id': ObjectId(id)})
    return repuesto

async def get_oneR(name):
    repuesto = await collectionR.find_one({'name': name})
    return repuesto

async def get_allR():
    repuestos = []
    cursor = collectionR.find({})
    async for document in cursor:
        repuestos.append(Repuesto(**document))
    return repuestos

async def createR(repuesto):
    newR = await collectionR.insert_one(repuesto)
    createdR = await collectionR.find_one({'_id': newR.inserted_id})
    return createdR

async def updateR(id: str, data):
    repuesto = {k:v for k, v in data.model_dump().items() if v is not None}
    print(repuesto)
    await collectionR.update_one({'_id': ObjectId(id)}, {'$set': repuesto})
    document = await collectionR.find_one({'_id': ObjectId(id)})
    return document

async def deleteR(id: str):
    await collectionR.delete_one({'_id': ObjectId(id)})
    return True


