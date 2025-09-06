# Portfolio Website - API Contracts & Integration Plan

## Overview
This document outlines the API contracts, database schema, and integration plan for converting the frontend mock data to a fully functional backend system.

## Database Collections

### 1. Personal Info Collection
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  currentCompany: String,
  location: String,
  email: String,
  phone: String,
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String
  },
  resumeUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. About Collection
```javascript
{
  _id: ObjectId,
  summary: String,
  highlights: [String],
  personalInterests: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Skills Collection
```javascript
{
  _id: ObjectId,
  category: String,
  items: [{
    name: String,
    proficiency: Number,
    years: Number,
    status: String (optional)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Projects Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  longDescription: String,
  technologies: [String],
  category: String,
  featured: Boolean,
  githubUrl: String,
  liveUrl: String,
  imageUrl: String,
  keyFeatures: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Experience Collection
```javascript
{
  _id: ObjectId,
  company: String,
  position: String,
  department: String,
  location: String,
  startDate: String,
  endDate: String,
  duration: String,
  current: Boolean,
  description: String,
  achievements: [String],
  technologies: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Education Collection
```javascript
{
  _id: ObjectId,
  institution: String,
  degree: String,
  location: String,
  startDate: String,
  endDate: String,
  description: String,
  relevantCourses: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Certifications Collection
```javascript
{
  _id: ObjectId,
  name: String,
  issuer: String,
  issueDate: String,
  expiryDate: String,
  credentialId: String,
  description: String,
  badgeUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Contact Messages Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  company: String,
  subject: String,
  message: String,
  status: String, // 'new', 'read', 'replied'
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### GET Endpoints (Data Retrieval)
- `GET /api/personal-info` - Get personal information
- `GET /api/about` - Get about section data
- `GET /api/skills` - Get all skill categories
- `GET /api/projects` - Get all projects (with optional category filter)
- `GET /api/experience` - Get work experience timeline
- `GET /api/education` - Get education history
- `GET /api/certifications` - Get certifications

### POST Endpoints (Contact Form)
- `POST /api/contact` - Submit contact form message

### Admin Endpoints (Future Enhancement)
- `PUT /api/admin/personal-info` - Update personal info
- `PUT /api/admin/about` - Update about section
- `POST /api/admin/projects` - Add new project
- `PUT /api/admin/projects/{id}` - Update project
- `DELETE /api/admin/projects/{id}` - Delete project
- `GET /api/admin/messages` - Get contact messages

## Frontend Integration Points

### 1. Data Fetching in Components
Replace mock data imports with API calls:

```javascript
// Before (mock data)
import { personalInfo } from '../data/mock';

// After (API integration)
const [personalInfo, setPersonalInfo] = useState(null);
useEffect(() => {
  fetchPersonalInfo();
}, []);

const fetchPersonalInfo = async () => {
  const response = await axios.get(`${API}/personal-info`);
  setPersonalInfo(response.data);
};
```

### 2. Contact Form Integration
```javascript
// Replace mock form submission with actual API call
const handleSubmit = async (formData) => {
  try {
    const response = await axios.post(`${API}/contact`, formData);
    setSubmitStatus('success');
  } catch (error) {
    setSubmitStatus('error');
  }
};
```

### 3. Loading States
Add loading states for better UX:
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## Implementation Steps

### Phase 1: Basic CRUD Operations
1. Create database models for all collections
2. Implement GET endpoints for data retrieval
3. Seed database with mock data
4. Replace frontend mock imports with API calls

### Phase 2: Contact Form Backend
1. Implement POST /api/contact endpoint
2. Add email sending functionality (optional)
3. Integrate frontend contact form with backend

### Phase 3: Error Handling & Optimization
1. Add proper error handling and validation
2. Implement loading states in frontend
3. Add basic authentication for admin endpoints (future)

## Current Mock Data Mapping

### Files to Update:
- `/app/frontend/src/components/Hero.js` - Replace personalInfo, aboutMe
- `/app/frontend/src/components/About.js` - Replace aboutMe, personalInfo
- `/app/frontend/src/components/Skills.js` - Replace skills array
- `/app/frontend/src/components/Projects.js` - Replace projects array
- `/app/frontend/src/components/Experience.js` - Replace experience array
- `/app/frontend/src/components/Education.js` - Replace education, certifications
- `/app/frontend/src/components/Contact.js` - Replace contactInfo, form submission
- `/app/frontend/src/components/Header.js` - Replace personalInfo
- `/app/frontend/src/components/Footer.js` - Replace personalInfo, contactInfo

### API Response Formats
All GET endpoints will return:
```javascript
{
  success: true,
  data: [...] // actual data
}
```

Error responses:
```javascript
{
  success: false,
  error: "Error message"
}
```

Contact form submission response:
```javascript
{
  success: true,
  message: "Message sent successfully"
}
```

## Environment Variables
```
MONGO_URL=mongodb://localhost:27017/portfolio
DB_NAME=portfolio
EMAIL_SERVICE_API_KEY=xxx (optional for contact form emails)
```

## Testing Strategy
1. Test all GET endpoints with Postman/curl
2. Test contact form submission
3. Verify frontend integration with loading states
4. Test error scenarios (network failures, invalid data)

This contract ensures seamless transition from mock data to live backend without breaking the frontend functionality.