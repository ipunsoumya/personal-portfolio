# Professional Portfolio Website

A modern, full-stack professional portfolio website built with React, FastAPI, and MongoDB, featuring a sleek dark TWEN monochromatic design system.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React.js      │    │   FastAPI       │    │   MongoDB       │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   Port: 3000    │    │   Port: 8001    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
   ┌────▼────┐            ┌─────▼─────┐         ┌──────▼──────┐
   │ TWEN    │            │ REST API  │         │ Collections │
   │ Design  │            │ Endpoints │         │ - personal  │
   │ System  │            │ /api/*    │         │ - about     │
   │         │            │           │         │ - skills    │
   └─────────┘            └───────────┘         │ - projects  │
                                               │ - experience│
                                               │ - education │
                                               │ - certs     │
                                               │ - messages  │
                                               └─────────────┘
```

### Technology Stack

- **Frontend**: React 19.0.0 with modern hooks and functional components
- **Styling**: TWEN Monochromatic Design System with Tailwind CSS
- **Backend**: FastAPI with Python 3.8+
- **Database**: MongoDB with Motor (async driver)
- **API**: RESTful API with standardized response format
- **Development**: Hot reload enabled for both frontend and backend

## 📊 Data Architecture & Models

### Data Object Mapping

| **Collection** | **Purpose** | **Key Fields** | **Represents** |
|----------------|-------------|----------------|----------------|
| `personal_info` | Basic profile information | `name`, `title`, `currentCompany`, `location`, `email`, `socialLinks` | Professional identity and contact details |
| `about` | Professional summary | `summary`, `highlights`, `personalInterests` | Career overview, key achievements, and personal background |
| `skills` | Technical competencies | `category`, `items[{name, proficiency, years, status}]` | Skill categories with proficiency levels and experience |
| `projects` | Portfolio projects | `title`, `description`, `technologies`, `githubUrl`, `keyFeatures` | Technical projects showcasing expertise |
| `experience` | Work history | `company`, `position`, `duration`, `achievements`, `technologies` | Career progression and professional accomplishments |
| `education` | Academic background | `institution`, `degree`, `startDate`, `endDate`, `relevantCourses` | Educational qualifications and relevant coursework |
| `certifications` | Professional certifications | `name`, `issuer`, `issueDate`, `credentialId`, `badgeUrl` | Industry certifications and credentials |
| `contact_messages` | Contact form submissions | `name`, `email`, `subject`, `message`, `status`, `createdAt` | User inquiries and communication |

### Detailed Data Models

#### PersonalInfo Model
```javascript
{
  id: "uuid",
  name: "Professional Name",
  title: "Current Job Title",
  currentCompany: "Current Employer",
  location: "City, Country",
  email: "contact@email.com",
  phone: "+XX-XXXXX-XXXXX",
  socialLinks: {
    linkedin: "https://linkedin.com/in/profile",
    github: "https://github.com/username",
    twitter: "https://twitter.com/username"
  },
  resumeUrl: "/path/to/resume.pdf"
}
```

#### Skills Model
```javascript
{
  id: "uuid",
  category: "Programming Languages", // Categories: Programming Languages, Frameworks, Cloud Services, etc.
  items: [
    {
      name: "Java 8",
      proficiency: 90, // Percentage (0-100)
      years: 4.0,      // Years of experience
      status: "Advanced" // Optional: Advanced, Intermediate, Beginner, Learning
    }
  ]
}
```

#### Experience Model
```javascript
{
  id: "uuid",
  company: "Company Name",
  position: "Job Title",
  department: "Department/Division",
  location: "City, Country",
  startDate: "Month Year",
  endDate: "Month Year" | "Current",
  duration: "X years Y months",
  current: boolean,
  description: "Role overview",
  achievements: [
    "Specific accomplishment with metrics",
    "Technical achievement with impact"
  ],
  technologies: ["Tech1", "Tech2", "Tech3"]
}
```

#### Projects Model
```javascript
{
  id: "uuid",
  title: "Project Name",
  description: "Brief project description",
  longDescription: "Detailed project explanation",
  technologies: ["React", "FastAPI", "MongoDB"],
  category: "Web Development" | "Cloud Architecture" | "Developer Tools",
  featured: boolean,
  githubUrl: "https://github.com/user/repo",
  liveUrl: "https://project-demo.com", // Optional
  imageUrl: "https://image-url.com/project.jpg",
  keyFeatures: [
    "Feature 1 description",
    "Feature 2 description"
  ]
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+
- MongoDB (local or cloud instance)
- Git

### 1. Clone Repository

```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Environment Setup

Create environment files:

**Frontend (`/app/frontend/.env`):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Backend (`/app/backend/.env`):**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd /app/backend

# Install Python dependencies
pip install -r requirements.txt

# Seed database with sample data
python updated_seed_data.py

# Start FastAPI server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd /app/frontend

# Install Node.js dependencies
yarn install

# Start React development server
yarn start
```

### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs

## 🔧 Development

### Project Structure

```
/app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.js     # Navigation header
│   │   │   ├── Hero.js       # Hero section with typing animation
│   │   │   ├── About.js      # About section
│   │   │   ├── Skills.js     # Skills with categories
│   │   │   ├── Projects.js   # Projects showcase
│   │   │   ├── Experience.js # Work experience timeline
│   │   │   ├── Education.js  # Education & certifications
│   │   │   ├── Contact.js    # Contact form
│   │   │   └── Footer.js     # Footer links
│   │   ├── data/
│   │   │   └── mock.js       # Mock data (deprecated - now uses API)
│   │   └── App.js           # Main app with TWEN design system
│   ├── package.json
│   └── tailwind.config.js   # Tailwind configuration
├── backend/                 # FastAPI application
│   ├── server.py           # Main FastAPI application
│   ├── models.py           # Pydantic data models
│   ├── database.py         # MongoDB connection and operations
│   ├── updated_seed_data.py # Database seeding script
│   └── requirements.txt    # Python dependencies
├── contracts.md            # API contracts documentation
└── README.md              # This file
```

### Design System - TWEN Monochromatic

The application uses a custom TWEN (sharp, minimal) design system:

**Color Palette:**
- Background: `#0F0F10` (Dark)
- Cards: `#1A1A1B` (Dark Gray)
- Text: `#FFFFFF` (White)
- Accent: `#38FF62` (Neon Green)
- Borders: `rgba(255, 255, 255, 0.1)`

**Typography:**
- Headers: Monaco, Menlo, Ubuntu Mono (monospace)
- Body: System fonts stack
- No rounded corners (sharp rectangular design)

### API Endpoints

| **Method** | **Endpoint** | **Description** | **Response** |
|------------|--------------|------------------|--------------|
| `GET` | `/api/` | Health check | `{"message": "Portfolio API is running"}` |
| `GET` | `/api/personal-info` | Get personal information | `PersonalInfo` object |
| `GET` | `/api/about` | Get about section data | `About` object |
| `GET` | `/api/skills` | Get all skill categories | Array of `Skills` objects |
| `GET` | `/api/projects` | Get all projects | Array of `Project` objects |
| `GET` | `/api/projects?category={category}` | Get filtered projects | Filtered array of `Project` objects |
| `GET` | `/api/experience` | Get work experience | Array of `Experience` objects |
| `GET` | `/api/education` | Get education history | Array of `Education` objects |
| `GET` | `/api/certifications` | Get certifications | Array of `Certification` objects |
| `POST` | `/api/contact` | Submit contact message | Success/error response |
| `GET` | `/api/admin/messages` | Get contact messages (admin) | Array of `ContactMessage` objects |

### Standard API Response Format

```javascript
{
  "success": boolean,
  "data": object | array | null,
  "message": string,
  "error": string | null
}
```

## 🚢 Deployment

### Production Build

**Frontend:**
```bash
cd /app/frontend
yarn build
# Serves static files from build/ directory
```

**Backend:**
```bash
cd /app/backend
# Use production WSGI server
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Environment Variables (Production)

**Frontend:**
```env
REACT_APP_BACKEND_URL=https://your-api-domain.com
```

**Backend:**
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
DB_NAME=portfolio_prod
```

### Docker Deployment (Optional)

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]

# Backend Dockerfile  
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

## 🔒 Security Considerations

- **CORS**: Configured for specific domains in production
- **Input Validation**: Pydantic models validate all API inputs
- **Rate Limiting**: Implement rate limiting for contact form
- **Environment Variables**: Sensitive data stored in environment variables
- **Database**: Use MongoDB connection strings with authentication

## 🧪 Testing

### Backend Testing
```bash
cd /app/backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd /app/frontend
yarn test
```

### API Testing
Use the provided test file:
```bash
python backend_test.py
```

## 📈 Performance Optimization

- **Frontend**: Code splitting, lazy loading, image optimization
- **Backend**: Async database operations, response caching
- **Database**: Proper indexing on frequently queried fields
- **CDN**: Serve static assets via CDN in production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Built with ❤️ using React, FastAPI, and MongoDB**
