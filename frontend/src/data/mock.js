// Mock data for portfolio website based on resume content

export const personalInfo = {
  name: "Professional Portfolio",
  title: "Associate Solutions Engineer",
  currentCompany: "Western Union",
  location: "Pune, India",
  email: "contact@example.com",
  phone: "+91-XXXXX-XXXXX",
  socialLinks: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername"
  },
  resumeUrl: "/resume.pdf"
};

export const aboutMe = {
  summary: "Experienced Associate Solutions Engineer specializing in high-throughput streaming applications and compliance systems. Currently at Western Union, I design and develop scalable solutions capable of processing 400K-600K transaction records within 15 minutes using cutting-edge technologies like Kafka, Spark Streaming, and Apache Spark.",
  highlights: [
    "Built high-throughput streaming applications processing 400K-600K transactions in 15 minutes",
    "Developed scalable APIs and microservices architecture on AWS",
    "Expertise in real-time data processing with Kafka and Spark Streaming",
    "Strong background in financial compliance and regulatory reporting systems"
  ],
  personalInterests: [
    "Passionate biker exploring scenic routes",
    "Avid music enthusiast with diverse taste",
    "Active sports lover - cricket and football",
    "Technology learning and AWS cloud architecture"
  ]
};

export const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Java 8", proficiency: 90, years: 4 },
      { name: "Java 11", proficiency: 70, years: 2 },
      { name: "Java 17/21", proficiency: 60, years: 1 },
      { name: "Scala 2.x", proficiency: 80, years: 2 },
      { name: "Python 3", proficiency: 40, years: 0.5, status: "Learning" }
    ]
  },
  {
    category: "Frameworks",
    items: [
      { name: "Spring Boot 3.0", proficiency: 80, years: 3 },
      { name: "Hibernate", proficiency: 60, years: 2 },
      { name: "Spring JPA", proficiency: 60, years: 2 },
      { name: "Apache Spark 3.0", proficiency: 80, years: 2 }
    ]
  },
  {
    category: "Cloud Services (AWS)",
    items: [
      { name: "S3", proficiency: 85, years: 2 },
      { name: "Lambda", proficiency: 75, years: 2 },
      { name: "EMR", proficiency: 70, years: 1 },
      { name: "EC2", proficiency: 80, years: 2 },
      { name: "SNS/SQS", proficiency: 75, years: 2 },
      { name: "CodeDeploy/CodePipeline", proficiency: 65, years: 1 }
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", proficiency: 75, years: 3 },
      { name: "Cassandra", proficiency: 70, years: 2 }
    ]
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Apache Kafka", proficiency: 85, years: 2 },
      { name: "Free Marker", proficiency: 80, years: 2 },
      { name: "Maven", proficiency: 85, years: 4 },
      { name: "Git", proficiency: 90, years: 4 }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "End-to-End Content Delivery Service",
    description: "Designed and deployed a scalable content delivery service on AWS EC2 with auto-scaling capabilities and microservices architecture.",
    longDescription: "A comprehensive content delivery platform leveraging AWS services for global content distribution. The system handles dynamic traffic scaling and ensures reliable service delivery through decoupled microservices communication.",
    technologies: ["AWS EC2", "Auto Scaling", "Amazon SQS", "Amazon S3", "AWS CloudFront", "Java", "Spring Boot"],
    category: "Cloud Architecture",
    featured: true,
    githubUrl: "https://github.com/yourusername/content-delivery-service",
    liveUrl: null,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    keyFeatures: [
      "Auto-scaling based on traffic patterns",
      "Microservices communication via SQS",
      "Global CDN with CloudFront",
      "Cost-effective S3 storage",
      "High availability architecture"
    ]
  },
  {
    id: 2,
    title: "Maven JSON Validation Plugin",
    description: "Custom Maven plugin for validating JSON files against schemas during build phase, ensuring data integrity in development pipelines.",
    longDescription: "A specialized Maven plugin that automates JSON validation during the build process. It validates all JSON files in specified directories against predefined schemas, catching errors early in the development cycle.",
    technologies: ["Java", "Maven", "JSON Schema", "Plugin Development"],
    category: "Developer Tools",
    featured: true,
    githubUrl: "https://github.com/yourusername/maven-json-validation-plugin",
    liveUrl: null,
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    keyFeatures: [
      "Schema-based JSON validation",
      "Maven lifecycle integration",
      "Batch file processing",
      "Detailed error reporting",
      "Easy plugin configuration"
    ]
  }
];

export const experience = [
  {
    id: 1,
    company: "Western Union",
    position: "Associate Solutions Engineer",
    department: "Risk & Compliance",
    location: "Pune",
    startDate: "October 2024",
    endDate: "Current",
    duration: "3+ months",
    current: true,
    description: "Leading the design and development of high-throughput streaming applications for financial compliance and transaction processing.",
    achievements: [
      "Designed streaming applications processing 400K–600K transaction records within 15 minutes using Kafka consumers",
      "Integrated Spark Streaming with Kafka for near real-time transaction processing",
      "Built end-to-end compliance reporting systems for diverse financial jurisdictions",
      "Leveraged Apache Spark for complex data transformations and visualizations"
    ],
    technologies: ["Apache Kafka", "Spark Streaming", "Apache Spark", "Java", "Real-time Processing"]
  },
  {
    id: 2,
    company: "Western Union",
    position: "Junior Associate",
    department: "Risk & Compliance",
    location: "Pune",
    startDate: "February 2023",
    endDate: "October 2024",
    duration: "1 year 8 months",
    current: false,
    description: "Developed scalable APIs and reporting applications for document management and regulatory compliance workflows.",
    achievements: [
      "Developed scalable APIs using Java 11 and Spring Boot for document upload automation",
      "Engineered secure SFTP integrations for external file system document submission",
      "Created multi-format reporting application (XML, XLSX, PDF, JSON, PARQUET)",
      "Streamlined regulatory document transfer processes"
    ],
    technologies: ["Java 11", "Spring Boot", "SFTP", "API Development", "Multi-format Reporting"]
  },
  {
    id: 3,
    company: "Cognizant",
    position: "Software Engineer",
    department: "Application Development",
    location: "Kolkata",
    startDate: "October 2022",
    endDate: "January 2023",
    duration: "4 months",
    current: false,
    description: "Implemented Java-based APIs for timeshare exchange management platform operations.",
    achievements: [
      "Developed inventory management APIs for booking, cancellation, and waitlisting",
      "Contributed to timeshare exchange platform functionality",
      "Implemented business logic for inventory operations"
    ],
    technologies: ["Java", "API Development", "Inventory Management"]
  },
  {
    id: 4,
    company: "Cognizant",
    position: "Junior Software Engineer",
    department: "Application Development",
    location: "Kolkata",
    startDate: "July 2022",
    endDate: "September 2022",
    duration: "3 months",
    current: false,
    description: "Enhanced hotel booking platform with improved user experience and system reliability.",
    achievements: [
      "Contributed to hotel booking flows using Java 8, Hibernate, and Spring JPA",
      "Handled scheduling, cancellations, waitlist management, and refund processing",
      "Enhanced end-user experience through improved booking workflows"
    ],
    technologies: ["Java 8", "Hibernate", "Spring JPA", "Booking Systems"]
  },
  {
    id: 5,
    company: "Cognizant",
    position: "Program Analyst",
    department: "Application Development",
    location: "Kolkata",
    startDate: "August 2021",
    endDate: "June 2022",
    duration: "11 months",
    current: false,
    description: "Optimized high-volume booking management systems with smart inventory allocation during peak periods.",
    achievements: [
      "Optimized booking management for ~5K concurrent API hits during peak time",
      "Implemented smart, rule-based inventory allocation algorithms",
      "Ensured balanced distribution and system reliability during high traffic",
      "Enhanced system performance and user experience"
    ],
    technologies: ["Java 8", "Hibernate", "Spring JPA", "High-Volume Systems", "Performance Optimization"]
  },
  {
    id: 6,
    company: "Cognizant",
    position: "Program Analyst Trainee",
    department: "Training & Development",
    location: "Kolkata",
    startDate: "August 2020",
    endDate: "July 2021",
    duration: "1 year",
    current: false,
    description: "Foundation training in Java development and Maven-based project management.",
    achievements: [
      "Mastered Java 8 OOPs concepts and reusable function development",
      "Learned Maven-based project creation and dependency management",
      "Understanding of Maven lifecycles for web application development",
      "Built foundation for enterprise Java development"
    ],
    technologies: ["Java 8", "Maven", "OOPs", "Web Development Basics"]
  }
];

export const education = [
  {
    id: 1,
    institution: "Lovely Professional University",
    degree: "Bachelor's Degree in Mechanical Engineering",
    location: "Jalandhar, India",
    startDate: "2016",
    endDate: "May 2020",
    gpa: null,
    description: "Comprehensive mechanical engineering program with focus on problem-solving and analytical thinking.",
    relevantCourses: ["Mathematics", "Problem Solving", "System Design", "Project Management"]
  },
  {
    id: 2,
    institution: "Government Autonomous College",
    degree: "XII Science",
    location: "Rourkela, Odisha",
    startDate: "2014",
    endDate: "May 2016",
    gpa: null,
    description: "Science stream with focus on Physics, Chemistry, and Mathematics.",
    relevantCourses: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
  }
];

export const certifications = [
  {
    id: 1,
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2023",
    expiryDate: "2026",
    credentialId: "AWS-CCP-XXXX",
    description: "Foundational AWS cloud knowledge and best practices",
    badgeUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
  },
  {
    id: 2,
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services", 
    issueDate: "2024",
    expiryDate: "2027",
    credentialId: "AWS-AIP-XXXX",
    description: "AI and machine learning services on AWS platform",
    badgeUrl: "https://images.credly.com/size/340x340/images/61e07492-31c2-4912-a844-4f04f4bc88b7/image.png"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Senior Manager",
    company: "Western Union",
    position: "Team Lead - Risk & Compliance",
    content: "Exceptional technical skills in building high-throughput streaming applications. Consistently delivers robust solutions for complex compliance requirements.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Technical Architect",
    company: "Cognizant",
    position: "Senior Architect",
    content: "Strong problem-solving abilities and deep understanding of Java ecosystem. Played key role in optimizing high-volume booking systems.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  }
];

export const languages = [
  { name: "English", proficiency: "Advanced", level: 95 },
  { name: "Hindi", proficiency: "Advanced", level: 95 },
  { name: "Odia", proficiency: "Advanced", level: 95 }
];

export const contactInfo = {
  email: "contact@example.com",
  phone: "+91-XXXXX-XXXXX",
  location: "Pune, India",
  availability: "Open to new opportunities",
  responseTime: "Usually responds within 24 hours"
};