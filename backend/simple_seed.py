from database import DatabaseManager
from models import *
import asyncio
import os

async def simple_seed():
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'test_database')
    db = DatabaseManager(mongo_url, db_name)
    
    print("🌱 Starting simple seeding...")
    
    # Skills
    skills_data = [
        SkillsCreate(
            category="Programming Languages",
            items=[
                SkillItem(name="Java 8", proficiency=90, years=4),
                SkillItem(name="Python 3", proficiency=40, years=0.5, status="Learning")
            ]
        ),
        SkillsCreate(
            category="Cloud Services (AWS)",
            items=[
                SkillItem(name="S3", proficiency=85, years=2),
                SkillItem(name="Lambda", proficiency=75, years=2),
                SkillItem(name="EC2", proficiency=80, years=2)
            ]
        ),
        SkillsCreate(
            category="Frameworks",
            items=[
                SkillItem(name="Apache Spark 3.0", proficiency=80, years=2)
            ]
        )
    ]
    
    for skill in skills_data:
        try:
            result = await db.create_skill(skill)
            print(f"✅ Created skill category: {skill.category}")
        except Exception as e:
            print(f"❌ Error creating skill {skill.category}: {e}")
    
    # Projects
    projects_data = [
        ProjectCreate(
            title="AWS Content Delivery Service",
            description="Scalable content delivery service on AWS",
            longDescription="A comprehensive content delivery platform leveraging AWS services",
            technologies=["AWS EC2", "Auto Scaling", "Amazon SQS", "Amazon S3"],
            category="Cloud Architecture",
            featured=True,
            githubUrl="https://github.com/example/content-delivery",
            liveUrl=None,
            imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
            keyFeatures=["Auto-scaling", "Microservices", "Global CDN"]
        ),
        ProjectCreate(
            title="Maven JSON Validation Plugin",
            description="Custom Maven plugin for JSON validation",
            longDescription="A specialized Maven plugin for automated JSON validation",
            technologies=["Java", "Maven", "JSON Schema"],
            category="Developer Tools",
            featured=True,
            githubUrl="https://github.com/example/maven-plugin",
            liveUrl=None,
            imageUrl="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
            keyFeatures=["Schema validation", "Maven integration", "Batch processing"]
        )
    ]
    
    for project in projects_data:
        try:
            result = await db.create_project(project)
            print(f"✅ Created project: {project.title}")
        except Exception as e:
            print(f"❌ Error creating project {project.title}: {e}")
    
    await db.close()
    print("🎉 Simple seeding completed!")

if __name__ == "__main__":
    asyncio.run(simple_seed())