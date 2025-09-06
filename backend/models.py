from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Personal Info Models
class SocialLinks(BaseModel):
    linkedin: str
    github: str
    twitter: str

class PersonalInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    currentCompany: str
    location: str
    email: str
    phone: str
    socialLinks: SocialLinks
    resumeUrl: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class PersonalInfoCreate(BaseModel):
    name: str
    title: str
    currentCompany: str
    location: str
    email: str
    phone: str
    socialLinks: SocialLinks
    resumeUrl: str

# About Models
class About(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    summary: str
    highlights: List[str]
    personalInterests: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class AboutCreate(BaseModel):
    summary: str
    highlights: List[str]
    personalInterests: List[str]

# Skills Models
class SkillItem(BaseModel):
    name: str
    proficiency: int
    years: float
    status: Optional[str] = None

class Skills(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    items: List[SkillItem]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class SkillsCreate(BaseModel):
    category: str
    items: List[SkillItem]

# Projects Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    longDescription: str
    technologies: List[str]
    category: str
    featured: bool
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    imageUrl: str
    keyFeatures: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    longDescription: str
    technologies: List[str]
    category: str
    featured: bool
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    imageUrl: str
    keyFeatures: List[str]

# Experience Models
class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    position: str
    department: Optional[str] = None
    location: str
    startDate: str
    endDate: str
    duration: str
    current: bool
    description: str
    achievements: List[str]
    technologies: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ExperienceCreate(BaseModel):
    company: str
    position: str
    department: Optional[str] = None
    location: str
    startDate: str
    endDate: str
    duration: str
    current: bool
    description: str
    achievements: List[str]
    technologies: List[str]

# Education Models
class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    institution: str
    degree: str
    location: str
    startDate: str
    endDate: str
    description: str
    relevantCourses: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class EducationCreate(BaseModel):
    institution: str
    degree: str
    location: str
    startDate: str
    endDate: str
    description: str
    relevantCourses: List[str]

# Certifications Models
class Certification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    issuer: str
    issueDate: str
    expiryDate: str
    credentialId: str
    description: str
    badgeUrl: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class CertificationCreate(BaseModel):
    name: str
    issuer: str
    issueDate: str
    expiryDate: str
    credentialId: str
    description: str
    badgeUrl: str

# Contact Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    subject: str
    message: str
    status: str = "new"  # 'new', 'read', 'replied'
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    subject: str
    message: str

# Response Models
from typing import Union, Any

class ApiResponse(BaseModel):
    success: bool
    data: Optional[Union[dict, list, Any]] = None
    message: Optional[str] = None
    error: Optional[str] = None