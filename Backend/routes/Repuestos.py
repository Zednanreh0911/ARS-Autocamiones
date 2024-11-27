from fastapi import APIRouter, HTTPException
from database.database import get_allR, createR, get_oneR, get_oneR_id, updateR, deleteR
from models.models import Repuesto, UpdateRepuesto

repuesto = APIRouter()

@repuesto.get('/Repuestos')
async def allR():

    repuesto = await get_allR()
    return repuesto


@repuesto.post('/Repuestos', response_model=Repuesto)
async def CreateR(repuesto: Repuesto):

    Rfound = await get_oneR(repuesto.name)
    if Rfound:
        raise HTTPException(409, "Repuesto ya existente")
    
    response = await createR(repuesto.model_dump())
    if response:
        return response
    raise HTTPException(400, "No se ha podido guardar el repuesto")


@repuesto.get('/Repuestos/{id}', response_model=Repuesto)
async def oneR(id: str):

    repuesto = await get_oneR_id(id)
    if repuesto:
        return repuesto
    raise HTTPException(404, f"Repuesto con id: {id} no encontrado :(")


@repuesto.put('/Repuestos/{id}', response_model=Repuesto)
async def UpdateR(id: str, repuesto: UpdateRepuesto):

    response = await updateR(id, repuesto)
    if response:
        return response
    return HTTPException(404, f"Repuesto con id: {id} no encontrado :(")


@repuesto.delete('/Repuestos/{id}')
async def DeleteR(id: str):

    response = await deleteR(id)
    if response:
        return "Repuesto eliminado"
    raise HTTPException(404, f"Repuesto con id: {id} no encontrado :(")
