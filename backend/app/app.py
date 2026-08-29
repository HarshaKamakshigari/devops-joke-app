from fastapi import FastAPI
import httpx

from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(title="joke App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"msg":"joke App"}

@app.get("/health")
def health():
    return{"msg":"healthy"}


@app.get("/joke")
async def joke():
    async with httpx.AsyncClient() as client:
        response=await client.get("https://official-joke-api.appspot.com/random_joke")
        return response.json()
    