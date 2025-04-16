from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.items import router as items_router
from routes.analytics import router as analytics_router
from routes.quiz import router as quiz_router
from routes.users import router as users_router

app = FastAPI()  

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://localhost:8000"], # Frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

app.include_router(items_router, prefix="/items")
app.include_router(analytics_router, prefix="/analytics")
app.include_router(quiz_router, prefix="/quiz")
app.include_router(users_router, prefix="/users")
app.include_router(analytics_router, prefix="/analytics")
app.include_router(quiz_router, prefix="/quiz")
app.include_router(analytics_router)
app.include_router(quiz_router)
app.include_router(users_router, prefix="/users")

@app.get("/home")
async def get_home():
    return {"message": "Welcome to the Multi-Page FastAPI App!"}
