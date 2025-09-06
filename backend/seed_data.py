from database import DatabaseManager
from models import *
import asyncio
import os

async def seed_database():
    """Seed the database with mock data from frontend"""
    
    # Initialize database
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'portfolio')
    db = DatabaseManager(mongo_url, db_name)
    
    print("🌱 Starting database seeding...")
    
    # Personal Info
    personal_info = PersonalInfoCreate(
        name="Professional Portfolio",
        title="Associate Solutions Engineer",
        currentCompany="Western Union",
        location="Pune, India",
        email="contact@example.com",
        phone="+91-XXXXX-XXXXX",
        socialLinks=SocialLinks(
            linkedin="https://linkedin.com/in/yourprofile",
            github="https://github.com/yourusername",
            twitter="https://twitter.com/yourusername"
        ),
        resumeUrl="/resume.pdf"
    )
    await db.create_or_update_personal_info(personal_info)
    print("✅ Personal info seeded")
    
    # About
    about = AboutCreate(
        summary="Experienced Associate Solutions Engineer specializing in high-throughput streaming applications and compliance systems. Currently at Western Union, I design and develop scalable solutions capable of processing 400K-600K transaction records within 15 minutes using cutting-edge technologies like Kafka, Spark Streaming, and Apache Spark.",
        highlights=[
            "Built high-throughput streaming applications processing 400K-600K transactions in 15 minutes",
            "Developed scalable APIs and microservices architecture on AWS",
            "Expertise in real-time data processing with Kafka and Spark Streaming",
            "Strong background in financial compliance and regulatory reporting systems"
        ],
        personalInterests=[
            "Passionate biker exploring scenic routes",
            "Avid music enthusiast with diverse taste",
            "Active sports lover - cricket and football",
            "Technology learning and AWS cloud architecture"
        ]
    )
    await db.create_or_update_about(about)
    print("✅ About section seeded")
    
    # Skills
    skills_data = [
        SkillsCreate(
            category="Programming Languages",
            items=[
                SkillItem(name="Java 8", proficiency=90, years=4),
                SkillItem(name="Java 11", proficiency=70, years=2),
                SkillItem(name="Java 17/21", proficiency=60, years=1),
                SkillItem(name="Scala 2.x", proficiency=80, years=2),
                SkillItem(name="Python 3", proficiency=40, years=0.5, status="Learning")
            ]
        ),
        SkillsCreate(
            category="Frameworks",
            items=[
                SkillItem(name="Spring Boot 3.0", proficiency=80, years=3),
                SkillItem(name="Hibernate", proficiency=60, years=2),
                SkillItem(name="Spring JPA", proficiency=60, years=2),
                SkillItem(name="Apache Spark 3.0", proficiency=80, years=2)
            ]
        ),
        SkillsCreate(
            category="Cloud Services (AWS)",
            items=[
                SkillItem(name="S3", proficiency=85, years=2),
                SkillItem(name="Lambda", proficiency=75, years=2),
                SkillItem(name="EMR", proficiency=70, years=1),
                SkillItem(name="EC2", proficiency=80, years=2),
                SkillItem(name="SNS/SQS", proficiency=75, years=2),
                SkillItem(name="CodeDeploy/CodePipeline", proficiency=65, years=1)
            ]
        ),
        SkillsCreate(
            category="Databases",
            items=[
                SkillItem(name="PostgreSQL", proficiency=75, years=3),
                SkillItem(name="Cassandra", proficiency=70, years=2)
            ]
        ),
        SkillsCreate(
            category="Tools & Technologies",
            items=[
                SkillItem(name="Apache Kafka", proficiency=85, years=2),
                SkillItem(name="Free Marker", proficiency=80, years=2),
                SkillItem(name="Maven", proficiency=85, years=4),
                SkillItem(name="Git", proficiency=90, years=4)
            ]
        )
    ]
    
    for skill in skills_data:
        await db.create_skill(skill)
    print("✅ Skills seeded")
    
    # Projects
    projects_data = [
        ProjectCreate(
            title="End-to-End Content Delivery Service",
            description="Designed and deployed a scalable content delivery service on AWS EC2 with auto-scaling capabilities and microservices architecture.",
            longDescription="A comprehensive content delivery platform leveraging AWS services for global content distribution. The system handles dynamic traffic scaling and ensures reliable service delivery through decoupled microservices communication.",
            technologies=["AWS EC2", "Auto Scaling", "Amazon SQS", "Amazon S3", "AWS CloudFront", "Java", "Spring Boot"],
            category="Cloud Architecture",
            featured=True,
            githubUrl="https://github.com/yourusername/content-delivery-service",
            liveUrl=None,
            imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
            keyFeatures=[
                "Auto-scaling based on traffic patterns",
                "Microservices communication via SQS",
                "Global CDN with CloudFront",
                "Cost-effective S3 storage",
                "High availability architecture"
            ]
        ),
        ProjectCreate(
            title="Maven JSON Validation Plugin",
            description="Custom Maven plugin for validating JSON files against schemas during build phase, ensuring data integrity in development pipelines.",
            longDescription="A specialized Maven plugin that automates JSON validation during the build process. It validates all JSON files in specified directories against predefined schemas, catching errors early in the development cycle.",
            technologies=["Java", "Maven", "JSON Schema", "Plugin Development"],
            category="Developer Tools",
            featured=True,
            githubUrl="https://github.com/yourusername/maven-json-validation-plugin",
            liveUrl=None,
            imageUrl="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
            keyFeatures=[
                "Schema-based JSON validation",
                "Maven lifecycle integration",
                "Batch file processing",
                "Detailed error reporting",
                "Easy plugin configuration"
            ]
        )
    ]
    
    for project in projects_data:
        await db.create_project(project)
    print("✅ Projects seeded")
    
    # Experience (in reverse chronological order for proper sorting)
    experience_data = [
        ExperienceCreate(
            company="Western Union",
            position="Associate Solutions Engineer",
            department="Risk & Compliance",
            location="Pune",
            startDate="October 2024",
            endDate="Current",
            duration="3+ months",
            current=True,
            description="Leading the design and development of high-throughput streaming applications for financial compliance and transaction processing.",
            achievements=[
                "Designed streaming applications processing 400K–600K transaction records within 15 minutes using Kafka consumers",
                "Integrated Spark Streaming with Kafka for near real-time transaction processing",
                "Built end-to-end compliance reporting systems for diverse financial jurisdictions",
                "Leveraged Apache Spark for complex data transformations and visualizations"
            ],
            technologies=["Apache Kafka", "Spark Streaming", "Apache Spark", "Java", "Real-time Processing"]
        ),
        ExperienceCreate(
            company="Western Union",
            position="Junior Associate",
            department="Risk & Compliance",
            location="Pune",
            startDate="February 2023",
            endDate="October 2024",
            duration="1 year 8 months",
            current=False,
            description="Developed scalable APIs and reporting applications for document management and regulatory compliance workflows.",
            achievements=[
                "Developed scalable APIs using Java 11 and Spring Boot for document upload automation",
                "Engineered secure SFTP integrations for external file system document submission",
                "Created multi-format reporting application (XML, XLSX, PDF, JSON, PARQUET)",
                "Streamlined regulatory document transfer processes"
            ],
            technologies=["Java 11", "Spring Boot", "SFTP", "API Development", "Multi-format Reporting"]
        ),
        ExperienceCreate(
            company="Cognizant",
            position="Software Engineer",
            department="Application Development",
            location="Kolkata",
            startDate="October 2022",
            endDate="January 2023",
            duration="4 months",
            current=False,
            description="Implemented Java-based APIs for timeshare exchange management platform operations.",
            achievements=[
                "Developed inventory management APIs for booking, cancellation, and waitlisting",
                "Contributed to timeshare exchange platform functionality",
                "Implemented business logic for inventory operations"
            ],
            technologies=["Java", "API Development", "Inventory Management"]
        ),
        ExperienceCreate(
            company="Cognizant",
            position="Junior Software Engineer",
            department="Application Development",
            location="Kolkata",
            startDate="July 2022",
            endDate="September 2022",
            duration="3 months",
            current=False,
            description="Enhanced hotel booking platform with improved user experience and system reliability.",
            achievements=[
                "Contributed to hotel booking flows using Java 8, Hibernate, and Spring JPA",
                "Handled scheduling, cancellations, waitlist management, and refund processing",
                "Enhanced end-user experience through improved booking workflows"
            ],
            technologies=["Java 8", "Hibernate", "Spring JPA", "Booking Systems"]
        ),
        ExperienceCreate(
            company="Cognizant",
            position="Program Analyst",
            department="Application Development",
            location="Kolkata",
            startDate="August 2021",
            endDate="June 2022",
            duration="11 months",
            current=False,
            description="Optimized high-volume booking management systems with smart inventory allocation during peak periods.",
            achievements=[
                "Optimized booking management for ~5K concurrent API hits during peak time",
                "Implemented smart, rule-based inventory allocation algorithms",
                "Ensured balanced distribution and system reliability during high traffic",
                "Enhanced system performance and user experience"
            ],
            technologies=["Java 8", "Hibernate", "Spring JPA", "High-Volume Systems", "Performance Optimization"]
        ),
        ExperienceCreate(
            company="Cognizant",
            position="Program Analyst Trainee",
            department="Training & Development",
            location="Kolkata",
            startDate="August 2020",
            endDate="July 2021",
            duration="1 year",
            current=False,
            description="Foundation training in Java development and Maven-based project management.",
            achievements=[
                "Mastered Java 8 OOPs concepts and reusable function development",
                "Learned Maven-based project creation and dependency management",
                "Understanding of Maven lifecycles for web application development",
                "Built foundation for enterprise Java development"
            ],
            technologies=["Java 8", "Maven", "OOPs", "Web Development Basics"]
        )
    ]
    
    for exp in experience_data:
        await db.create_experience(exp)
    print("✅ Experience seeded")
    
    # Education
    education_data = [
        EducationCreate(
            institution="Lovely Professional University",
            degree="Bachelor's Degree in Mechanical Engineering",
            location="Jalandhar, India",
            startDate="2016",
            endDate="May 2020",
            description="Comprehensive mechanical engineering program with focus on problem-solving and analytical thinking.",
            relevantCourses=["Mathematics", "Problem Solving", "System Design", "Project Management"]
        ),
        EducationCreate(
            institution="Government Autonomous College",
            degree="XII Science",
            location="Rourkela, Odisha",
            startDate="2014",
            endDate="May 2016",
            description="Science stream with focus on Physics, Chemistry, and Mathematics.",
            relevantCourses=["Physics", "Chemistry", "Mathematics", "Computer Science"]
        )
    ]
    
    for edu in education_data:
        await db.create_education(edu)
    print("✅ Education seeded")
    
    # Certifications
    certifications_data = [
        CertificationCreate(
            name="AWS Certified Cloud Practitioner",
            issuer="Amazon Web Services",
            issueDate="2023",
            expiryDate="2026",
            credentialId="AWS-CCP-XXXX",
            description="Foundational AWS cloud knowledge and best practices",
            badgeUrl="https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
        ),
        CertificationCreate(
            name="AWS Certified AI Practitioner",
            issuer="Amazon Web Services",
            issueDate="2024",
            expiryDate="2027",
            credentialId="AWS-AIP-XXXX",
            description="AI and machine learning services on AWS platform",
            badgeUrl="https://images.credly.com/size/340x340/images/61e07492-31c2-4912-a844-4f04f4bc88b7/image.png"
        )
    ]
    
    for cert in certifications_data:
        await db.create_certification(cert)
    print("✅ Certifications seeded")
    
    await db.close()
    print("🎉 Database seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())