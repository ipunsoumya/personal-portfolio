from database import DatabaseManager
from models import *
import asyncio
import os

async def update_database_with_real_data():
    """Update the database with actual detailed resume data"""
    
    # Initialize database
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'portfolio')
    db = DatabaseManager(mongo_url, db_name)
    
    print("🔄 Updating database with real resume data...")
    
    # Clear existing data
    await db.db.personal_info.delete_many({})
    await db.db.about.delete_many({})
    await db.db.skills.delete_many({})
    await db.db.projects.delete_many({})
    await db.db.experience.delete_many({})
    await db.db.education.delete_many({})
    await db.db.certifications.delete_many({})
    print("🗑️ Cleared existing test data")
    
    # Personal Info - Real Data
    personal_info = PersonalInfoCreate(
        name="Soumyajeet Patra",  # User can update this
        title="Associate Solutions Engineer",
        currentCompany="Western Union",
        location="Pune, India",
        email="ipunsoumya@gmail.com",  # User can update this
        phone="+91-75084-44156",  # User can update this
        socialLinks=SocialLinks(
            linkedin="https://www.linkedin.com/in/soumyajeet-patra/",
            github="https://github.com/ipunsoumya",
            twitter="#"
        ),
        resumeUrl="/resume.pdf"
    )
    await db.create_or_update_personal_info(personal_info)
    print("✅ Updated personal info")
    
    # About - Real Data
    about = AboutCreate(
        summary="Dynamic Solution Engineer with 5 years of experience in leveraging advanced technologies such as Java, Scala, and Apache Spark to develop impactful financial solutions within the fintech industry. Recognized for a strong commitment to engineering innovation, combining technical expertise with strategic insights to drive effective data transformation and compliance initiatives. As an AWS Certified Cloud Practitioner, a passion for harnessing cloud technologies to enhance operational efficiency shines through. Collaborative achievements in web application development reflect a relentless pursuit of excellence and a commitment to delivering robust solutions.",
        highlights=[
            "Designed high-throughput streaming applications consuming 400K–600K transaction records within 15 minutes using Kafka consumers",
            "Integrated Spark Streaming with Kafka for near real-time transaction processing in compliance workflows",
            "Built end-to-end compliance reporting systems for diverse financial jurisdictions using Apache Spark",
            "Developed scalable APIs using Java 11 and Spring Boot for document upload workflow automation",
            "Optimized high-volume booking management systems handling ~5K concurrent API hits during peak periods"
        ],
        personalInterests=[
            "Passionate biker exploring scenic routes",
            "Avid music enthusiast with diverse musical tastes",
            "Active sports lover with keen interest in cricket and football",
            "Continuous learning in cloud technologies and system architecture"
        ]
    )
    await db.create_or_update_about(about)
    print("✅ Updated about section")
    
    # Skills - Real Detailed Data
    skills_data = [
        SkillsCreate(
            category="Programming Languages",
            items=[
                SkillItem(name="Java 8", proficiency=90, years=4, status="Advanced"),
                SkillItem(name="Java 11", proficiency=70, years=2, status="Intermediate"),
                SkillItem(name="Java 17/21", proficiency=60, years=1, status="Intermediate"),
                SkillItem(name="Scala 2.x", proficiency=80, years=2, status="Intermediate"),
                SkillItem(name="Python 3", proficiency=30, years=0.5, status="Learning in progress")
            ]
        ),
        SkillsCreate(
            category="Front-End (Aspiring)",
            items=[
                SkillItem(name="Angular", proficiency=20, years=0.2, status="Aspiring to Learn"),
                SkillItem(name="React", proficiency=25, years=0.3, status="Aspiring to Learn")
            ]
        ),
        SkillsCreate(
            category="Frameworks",
            items=[
                SkillItem(name="Spring Boot 3.0", proficiency=80, years=3, status="Intermediate"),
                SkillItem(name="Hibernate", proficiency=60, years=2, status="Beginner"),
                SkillItem(name="Spring JPA", proficiency=60, years=2, status="Beginner"),
                SkillItem(name="Apache Spark 3.0", proficiency=80, years=2, status="Intermediate")
            ]
        ),
        SkillsCreate(
            category="Tools & Libraries",
            items=[
                SkillItem(name="Free Marker Template Engine", proficiency=80, years=2, status="Intermediate"),
                SkillItem(name="Transformer (Proprietary Tool)", proficiency=100, years=2, status="Expert"),
                SkillItem(name="Maven", proficiency=85, years=4),
                SkillItem(name="Git", proficiency=90, years=4)
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
            category="Cloud Services (AWS)",
            items=[
                SkillItem(name="S3", proficiency=85, years=2),
                SkillItem(name="Lambda", proficiency=75, years=2),
                SkillItem(name="EMR", proficiency=70, years=1),
                SkillItem(name="MWAA (Managed Apache Airflow)", proficiency=65, years=1),
                SkillItem(name="EC2", proficiency=80, years=2),
                SkillItem(name="SNS", proficiency=75, years=2),
                SkillItem(name="SQS", proficiency=75, years=2),
                SkillItem(name="CodeDeploy", proficiency=65, years=1),
                SkillItem(name="CodePipeline", proficiency=65, years=1)
            ]
        )
    ]
    
    for skill in skills_data:
        await db.create_skill(skill)
    print("✅ Updated skills with real data")
    
    # Projects - Real Data (same projects but keeping them)
    projects_data = [
        ProjectCreate(
            title="End-to-End Content Delivery Service",
            description="Designed and deployed a scalable content delivery service on AWS EC2, leveraging Auto Scaling to dynamically adjust capacity based on incoming traffic.",
            longDescription="A comprehensive content delivery platform leveraging AWS services for global content distribution. Implemented a microservices-based architecture where communication between services was handled via Amazon SQS messaging queues, ensuring reliability and decoupling. Used Amazon S3 for secure and cost-effective content storage, with AWS CloudFront as the CDN to enable fast, global content distribution with low latency.",
            technologies=["AWS EC2", "Auto Scaling", "Amazon SQS", "Amazon S3", "AWS CloudFront", "Java", "Spring Boot", "Microservices"],
            category="Cloud Architecture",
            featured=True,
            githubUrl="https://github.com/ipunsoumya/content-delivery-service",
            liveUrl=None,
            imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
            keyFeatures=[
                "Auto-scaling based on incoming traffic patterns",
                "Microservices communication via Amazon SQS messaging queues",
                "Global CDN with AWS CloudFront for low latency",
                "Secure and cost-effective storage with Amazon S3",
                "High availability and reliability architecture",
                "Dynamic capacity adjustment based on demand"
            ]
        ),
        ProjectCreate(
            title="Maven JSON Validation Plugin",
            description="Developed a custom Maven plugin that validates JSON files against a defined schema during the Maven validation phase, ensuring early error detection.",
            longDescription="A specialized Maven plugin that automates JSON validation during the build process. The plugin accepts a JSON schema and a target directory as input, automatically validating all JSON files within the directory for correctness. Designed for easy integration into any Maven-based application, enabling developers to maintain data integrity within build pipelines.",
            technologies=["Java", "Maven", "JSON Schema", "Plugin Development", "Build Automation"],
            category="Developer Tools",
            featured=True,
            githubUrl="https://github.com/ipunsoumya/json-validator",
            liveUrl=None,
            imageUrl="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
            keyFeatures=[
                "Schema-based JSON validation during Maven build phase",
                "Accepts JSON schema and target directory as input parameters",
                "Automatic validation of all JSON files within specified directory",
                "Early error detection in development pipeline",
                "Easy integration into any Maven-based application",
                "Maintains data integrity within build pipelines"
            ]
        )
    ]
    
    for project in projects_data:
        await db.create_project(project)
    print("✅ Updated projects with detailed descriptions")
    
    # Experience - Real Detailed Data
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
            description="Leading the design and development of high-throughput streaming applications for financial compliance and transaction processing in risk management systems.",
            achievements=[
                "Designed and developed high-throughput streaming applications capable of consuming 400K–600K transaction records within 15 minutes using Kafka consumers, ensuring efficient and scalable data ingestion",
                "Integrated Spark Streaming with Kafka to enable near real-time transaction processing, improving the speed and reliability of compliance workflows",
                "Leveraged Apache Spark for complex data transformations and visualizations, enabling actionable insights from large-scale financial transaction datasets",
                "Built end-to-end compliance reporting systems by consuming, analyzing, and transforming data into objective or subjective reports tailored to the regulatory requirements of diverse financial jurisdictions"
            ],
            technologies=["Apache Kafka", "Spark Streaming", "Apache Spark", "Java", "Real-time Processing", "Financial Compliance", "Data Transformations"]
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
            description="Developed scalable APIs and reporting applications for document management and regulatory compliance workflows in financial services.",
            achievements=[
                "Developed scalable APIs using Java 11 and Spring Boot to automate document upload workflows into internal document repositories",
                "Engineered secure API integrations for document submission to external file systems via SFTP, streamlining regulatory document transfers",
                "Created a Java-based reporting application capable of generating reports in multiple formats (XML, XLSX, PDF, JSON, PARQUET) from JSON data, increasing flexibility for varied compliance and operational needs"
            ],
            technologies=["Java 11", "Spring Boot", "SFTP", "API Development", "Multi-format Reporting", "XML", "XLSX", "PDF", "JSON", "PARQUET"]
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
                "Implemented Java-based APIs to manage inventory operations such as booking, cancellation, and waitlisting for a timeshare exchange management platform",
                "Contributed to platform functionality and business logic implementation",
                "Enhanced system reliability and user experience through efficient API design"
            ],
            technologies=["Java", "API Development", "Inventory Management", "Timeshare Management"]
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
            description="Enhanced hotel booking platform with improved user experience and system reliability using Java technologies.",
            achievements=[
                "Contributed to hotel booking flows using Java 8, Hibernate, and Spring JPA, handling scheduling, cancellations, waitlist management, and refund processing to enhance end-user experience",
                "Improved booking workflow efficiency and user satisfaction",
                "Implemented robust error handling and data persistence mechanisms"
            ],
            technologies=["Java 8", "Hibernate", "Spring JPA", "Booking Systems", "Scheduling", "Refund Processing"]
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
            description="Optimized high-volume booking management systems with smart inventory allocation during peak periods, ensuring system reliability and performance.",
            achievements=[
                "Contributed to hotel booking flows using Java 8, Hibernate, and Spring JPA, handling scheduling, cancellations, waitlist management, and refund processing to enhance end-user experience",
                "Optimized high-volume (~5K concurrent API hits during peak time) booking management with smart, rule-based inventory allocation during peak periods, ensuring balanced distribution and system reliability",
                "Implemented performance optimizations for high-traffic scenarios",
                "Enhanced system scalability and fault tolerance"
            ],
            technologies=["Java 8", "Hibernate", "Spring JPA", "High-Volume Systems", "Performance Optimization", "Rule-based Allocation"]
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
            description="Foundation training in Java development and Maven-based project management with focus on enterprise application development.",
            achievements=[
                "Worked on Java 8 to create small-scale reusable functions following OOPs concepts",
                "Learned creation of Maven-based Java projects, dependency management, Maven lifecycles, etc., needed for basic web application development",
                "Built strong foundation in enterprise Java development practices",
                "Mastered version control and collaborative development workflows"
            ],
            technologies=["Java 8", "Maven", "OOPs", "Web Development Basics", "Project Management", "Dependency Management"]
        )
    ]
    
    for exp in experience_data:
        await db.create_experience(exp)
    print("✅ Updated experience with detailed real data")
    
    # Education - Real Data
    education_data = [
        EducationCreate(
            institution="Lovely Professional University",
            degree="Bachelor's Degree in Mechanical Engineering",
            location="Jalandhar, India",
            startDate="2016",
            endDate="May 2020",
            description="Comprehensive mechanical engineering program with focus on problem-solving, analytical thinking, and engineering principles. Developed strong foundation in mathematics, physics, and system design that translated well into software engineering career.",
            relevantCourses=["Mathematics", "Problem Solving", "System Design", "Project Management", "Engineering Analysis", "Technical Communication"]
        ),
        EducationCreate(
            institution="Government Autonomous College",
            degree="XII Science",
            location="Rourkela, Odisha",
            startDate="2014",
            endDate="May 2016",
            description="Science stream with focus on Physics, Chemistry, and Mathematics, building strong analytical and problem-solving foundation.",
            relevantCourses=["Physics", "Chemistry", "Mathematics", "Computer Science", "Laboratory Work"]
        )
    ]
    
    for edu in education_data:
        await db.create_education(edu)
    print("✅ Updated education")
    
    # Certifications - Real Data
    certifications_data = [
        CertificationCreate(
            name="AWS Certified Cloud Practitioner",
            issuer="Amazon Web Services",
            issueDate="2022",
            expiryDate="2025",
            credentialId="PP34TVZLHNEE1PCJ",
            description="Foundational AWS cloud knowledge and best practices, covering core AWS services, security, architecture, pricing, and support.",
            badgeUrl="https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
        ),
        CertificationCreate(
            name="AWS Certified AI Practitioner",
            issuer="Amazon Web Services",
            issueDate="2025",
            expiryDate="2028",
            credentialId="149cff9c013145f4a1382ec6a321c63b",
            description="AI and machine learning services on AWS platform, covering ML fundamentals, AWS AI/ML services, and best practices for implementing AI solutions.",
            badgeUrl="https://images.credly.com/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png"
        )
    ]
    
    for cert in certifications_data:
        await db.create_certification(cert)
    print("✅ Updated certifications")
    
    await db.close()
    print("🎉 Database updated successfully with real detailed resume data!")
    print("\n📋 Summary of updates:")
    print("✅ Personal info with current role details")
    print("✅ About section with detailed experience summary")
    print("✅ Skills with accurate proficiency levels and categories")
    print("✅ Projects with comprehensive descriptions")
    print("✅ Experience with detailed achievements and technologies")
    print("✅ Education with enhanced descriptions")
    print("✅ Certifications with detailed descriptions")

if __name__ == "__main__":
    asyncio.run(update_database_with_real_data())