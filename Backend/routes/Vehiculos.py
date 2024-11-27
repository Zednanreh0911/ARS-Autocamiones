from fastapi import APIRouter, HTTPException
from database import get_allV, createV, get_oneV, get_oneV_id, updateV, deleteV
from models import Vehiculo, UpdateVehiculo

vehiculo = APIRouter()

@vehiculo.get('/Vehiculos')
async def allV():
    
    vehiculo = await get_allV()
    return vehiculo


@vehiculo.post('/Vehiculos', response_model=Vehiculo)
async def CreateV(vehiculo: Vehiculo):

    Vfound = await get_oneV(vehiculo.name)
    if Vfound:
        raise HTTPException(409, "Vehiculo ya existente")

    response = await createV(vehiculo.model_dump())
    if response:
        return response
    raise HTTPException(400, "No se ha podido guardar el vehiculo")
    

@vehiculo.get('/Vehiculos/{id}', response_model=Vehiculo)
async def oneV(id: str):

    vehiculo = await get_oneV_id(id)
    if vehiculo:
        return vehiculo
    raise HTTPException(404, f"Vehiculo con id: {id} no encontrado :(")


@vehiculo.put('/Vehiculos/{id}', response_model=Vehiculo)
async def UpdateV(id: str, vehiculo: UpdateVehiculo):

    response = await updateV(id, vehiculo)
    if response:
        return response
    return HTTPException(404, f"Vehiculo con id: {id} no encontrado :(")


@vehiculo.delete('/Vehiculos/{id}')
async def DeleteV(id: str):

    response = await deleteV(id)
    if response:
        return "Vehiculo eliminado"
    raise HTTPException(404, f"Vehiculo con id: {id} no encontrado :(")