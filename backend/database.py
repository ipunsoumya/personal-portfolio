from motor.motor_asyncio import AsyncIOMotorClient
from models import *
import os
from typing import List, Optional

class DatabaseManager:
    def __init__(self, mongo_url: str, db_name: str):
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        
    async def close(self):
        self.client.close()
    
    # Personal Info Operations
    async def get_personal_info(self) -> Optional[PersonalInfo]:
        doc = await self.db.personal_info.find_one()
        if doc:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            return PersonalInfo(**doc)
        return None
    
    async def create_or_update_personal_info(self, personal_info: PersonalInfoCreate) -> PersonalInfo:
        existing = await self.db.personal_info.find_one()
        personal_info_dict = personal_info.dict()
        
        if existing:
            personal_info_dict['updatedAt'] = datetime.utcnow()
            await self.db.personal_info.update_one(
                {"_id": existing["_id"]}, 
                {"$set": personal_info_dict}
            )
            personal_info_dict['id'] = str(existing['_id'])
        else:
            personal_info_obj = PersonalInfo(**personal_info_dict)
            result = await self.db.personal_info.insert_one(personal_info_obj.dict())
            personal_info_dict['id'] = str(result.inserted_id)
            
        return PersonalInfo(**personal_info_dict)
    
    # About Operations
    async def get_about(self) -> Optional[About]:
        doc = await self.db.about.find_one()
        if doc:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            return About(**doc)
        return None
    
    async def create_or_update_about(self, about: AboutCreate) -> About:
        existing = await self.db.about.find_one()
        about_dict = about.dict()
        
        if existing:
            about_dict['updatedAt'] = datetime.utcnow()
            await self.db.about.update_one(
                {"_id": existing["_id"]}, 
                {"$set": about_dict}
            )
            about_dict['id'] = str(existing['_id'])
        else:
            about_obj = About(**about_dict)
            result = await self.db.about.insert_one(about_obj.dict())
            about_dict['id'] = str(result.inserted_id)
            
        return About(**about_dict)
    
    # Skills Operations
    async def get_skills(self) -> List[Skills]:
        docs = await self.db.skills.find().to_list(1000)
        skills = []
        for doc in docs:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            skills.append(Skills(**doc))
        return skills
    
    async def create_skill(self, skill: SkillsCreate) -> Skills:
        skill_obj = Skills(**skill.dict())
        result = await self.db.skills.insert_one(skill_obj.dict())
        skill_dict = skill_obj.dict()
        skill_dict['id'] = str(result.inserted_id)
        return Skills(**skill_dict)
    
    # Projects Operations
    async def get_projects(self, category: Optional[str] = None) -> List[Project]:
        query = {"category": category} if category else {}
        docs = await self.db.projects.find(query).to_list(1000)
        projects = []
        for doc in docs:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            projects.append(Project(**doc))
        return projects
    
    async def create_project(self, project: ProjectCreate) -> Project:
        project_obj = Project(**project.dict())
        result = await self.db.projects.insert_one(project_obj.dict())
        project_dict = project_obj.dict()
        project_dict['id'] = str(result.inserted_id)
        return Project(**project_dict)
    
    # Experience Operations
    async def get_experience(self) -> List[Experience]:
        docs = await self.db.experience.find().sort("startDate", -1).to_list(1000)
        experience = []
        for doc in docs:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            experience.append(Experience(**doc))
        return experience
    
    async def create_experience(self, experience: ExperienceCreate) -> Experience:
        experience_obj = Experience(**experience.dict())
        result = await self.db.experience.insert_one(experience_obj.dict())
        experience_dict = experience_obj.dict()
        experience_dict['id'] = str(result.inserted_id)
        return Experience(**experience_dict)
    
    # Education Operations
    async def get_education(self) -> List[Education]:
        docs = await self.db.education.find().sort("startDate", -1).to_list(1000)
        education = []
        for doc in docs:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            education.append(Education(**doc))
        return education
    
    async def create_education(self, education: EducationCreate) -> Education:
        education_obj = Education(**education.dict())
        result = await self.db.education.insert_one(education_obj.dict())
        education_dict = education_obj.dict()
        education_dict['id'] = str(result.inserted_id)
        return Education(**education_dict)
    
    # Certifications Operations
    async def get_certifications(self) -> List[Certification]:
        docs = await self.db.certifications.find().sort("issueDate", -1).to_list(1000)
        certifications = []
        for doc in docs:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            certifications.append(Certification(**doc))
        return certifications
    
    async def create_certification(self, certification: CertificationCreate) -> Certification:
        certification_obj = Certification(**certification.dict())
        result = await self.db.certifications.insert_one(certification_obj.dict())
        certification_dict = certification_obj.dict()
        certification_dict['id'] = str(result.inserted_id)
        return Certification(**certification_dict)
    
    # Contact Messages Operations
    async def create_contact_message(self, message: ContactMessageCreate) -> ContactMessage:
        message_obj = ContactMessage(**message.dict())
        result = await self.db.contact_messages.insert_one(message_obj.dict())
        message_dict = message_obj.dict()
        message_dict['id'] = str(result.inserted_id)
        return ContactMessage(**message_dict)
    
    async def get_contact_messages(self) -> List[ContactMessage]:
        docs = await self.db.contact_messages.find().sort("createdAt", -1).to_list(1000)
        messages = []
        for doc in docs:
            doc['id'] = str(doc['_id'])
            del doc['_id']
            messages.append(ContactMessage(**doc))
        return messages