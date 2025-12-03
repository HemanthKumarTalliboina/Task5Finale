# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

#from app.routes.student_routes import router as student_router
from app.routes.student_routes import router as student_router
from app.routes.auth_routes import router as auth_router

app = FastAPI(
    title="Task3Finale API",
    version="1.0.0",
)

# CORS – allow frontend origins
origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    # later add your deployed frontend URL here
    # "https://your-frontend.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        routes=app.routes,
    )

    app.openapi_schema = openapi_schema
    return app.openapi_schema

"""
    # --- REMOVE client_id and client_secret from Swagger UI ---
    openapi_schema["components"]["securitySchemes"] = {
        "OAuth2PasswordBearer": {
            "type": "oauth2",
            "flows": {
                "password": {
                    "tokenUrl": "/auth/login",
                    "scopes": {}
                }
            }
        }
    }
"""




# root route endpoint
@app.get("/")
def root():
    return {"message": "Processing Student Details"}


# Routers
app.include_router(auth_router)
app.include_router(student_router)

app.openapi = custom_openapi
