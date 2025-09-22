from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from database import DatabaseManager
from models import *
import os
import logging
from pathlib import Path
from typing import Optional

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']
db_manager = DatabaseManager(mongo_url, db_name)

# Create the main app without a prefix
app = FastAPI(title="Portfolio API", description="Personal Portfolio Backend API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}

# Personal Info Endpoints
@api_router.get("/personal-info", response_model=ApiResponse)
async def get_personal_info():
    try:
        personal_info = await db_manager.get_personal_info()
        if not personal_info:
            raise HTTPException(status_code=404, detail="Personal info not found")
        
        return ApiResponse(
            success=True,
            data=personal_info.dict(),
            message="Personal info retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching personal info: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch personal info"
        )

# About Endpoints
@api_router.get("/about", response_model=ApiResponse)
async def get_about():
    try:
        about = await db_manager.get_about()
        if not about:
            raise HTTPException(status_code=404, detail="About info not found")
        
        return ApiResponse(
            success=True,
            data=about.dict(),
            message="About info retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching about info: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch about info"
        )

# Skills Endpoints
@api_router.get("/skills", response_model=ApiResponse)
async def get_skills():
    try:
        skills = await db_manager.get_skills()
        return ApiResponse(
            success=True,
            data=[skill.dict() for skill in skills],
            message="Skills retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching skills: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch skills"
        )

# Projects Endpoints
@api_router.get("/projects", response_model=ApiResponse)
async def get_projects(category: Optional[str] = None):
    try:
        projects = await db_manager.get_projects(category)
        return ApiResponse(
            success=True,
            data=[project.dict() for project in projects],
            message="Projects retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching projects: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch projects"
        )

# Experience Endpoints
@api_router.get("/experience", response_model=ApiResponse)
async def get_experience():
    try:
        experience = await db_manager.get_experience()
        return ApiResponse(
            success=True,
            data=[exp.dict() for exp in experience],
            message="Experience retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching experience: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch experience"
        )

# Education Endpoints
@api_router.get("/education", response_model=ApiResponse)
async def get_education():
    try:
        education = await db_manager.get_education()
        return ApiResponse(
            success=True,
            data=[edu.dict() for edu in education],
            message="Education retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching education: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch education"
        )

# Certifications Endpoints
@api_router.get("/certifications", response_model=ApiResponse)
async def get_certifications():
    try:
        certifications = await db_manager.get_certifications()
        return ApiResponse(
            success=True,
            data=[cert.dict() for cert in certifications],
            message="Certifications retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching certifications: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch certifications"
        )

# Contact Endpoints
@api_router.post("/contact", response_model=ApiResponse)
async def submit_contact_message(message: ContactMessageCreate):
    try:
        contact_message = await db_manager.create_contact_message(message)
        return ApiResponse(
            success=True,
            data=contact_message.dict(),
            message="Message sent successfully! Thank you for reaching out."
        )
    except Exception as e:
        logging.error(f"Error creating contact message: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to send message. Please try again."
        )

# Resume endpoint
@api_router.get("/resume-url", response_model=ApiResponse)
async def get_resume_url():
    try:
        resume_url = os.environ.get('RESUME_URL', 'https://drive.google.com/file/d/YOUR_FILE_ID/view')
        return ApiResponse(
            success=True,
            data={"resumeUrl": resume_url},
            message="Resume URL retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching resume URL: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch resume URL"
        )

# Admin endpoint to view contact messages (for future use)
@api_router.get("/admin/messages", response_model=ApiResponse)
async def get_contact_messages():
    try:
        messages = await db_manager.get_contact_messages()
        return ApiResponse(
            success=True,
            data=[msg.dict() for msg in messages],
            message="Contact messages retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        return ApiResponse(
            success=False,
            error="Failed to fetch contact messages"
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    await db_manager.close()