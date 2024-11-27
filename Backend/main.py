from fastapi import FastAPI
from routes.Vehiculos import vehiculo
from routes.Repuestos import repuesto
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

app = FastAPI()

origins = [
    config('FRONTEND_URL')
]

app.add_middleware(

    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def home():
    
    return {"message":"este es el inicio uwu"}

app.include_router(vehiculo)
app.include_router(repuesto)


    