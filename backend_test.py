#!/usr/bin/env python3
"""
Portfolio Backend API Test Suite
Tests all GET endpoints and POST contact form submission
"""

import requests
import json
import os
from datetime import datetime

# Get the backend URL from environment variable
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://skill-display-60.preview.emergentagent.com')
BASE_URL = f"{BACKEND_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = []
        
    def log_test(self, endpoint, method, status_code, success, message, data=None):
        """Log test results"""
        result = {
            'endpoint': endpoint,
            'method': method,
            'status_code': status_code,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'data_received': bool(data)
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {method} {endpoint} - {message}")
        if not success:
            print(f"   Status Code: {status_code}")
        
    def test_health_check(self):
        """Test GET /api/ - Health check"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'message' in data:
                    self.log_test('/', 'GET', response.status_code, True, 
                                "Health check successful", data)
                    return True
                else:
                    self.log_test('/', 'GET', response.status_code, False, 
                                "Health check response missing 'message' field")
            else:
                self.log_test('/', 'GET', response.status_code, False, 
                            f"Health check failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/', 'GET', 0, False, f"Health check error: {str(e)}")
            
        return False
    
    def test_personal_info(self):
        """Test GET /api/personal-info"""
        try:
            response = requests.get(f"{self.base_url}/personal-info", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if not self._validate_api_response(data):
                    self.log_test('/personal-info', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                # Check if data contains expected fields
                personal_data = data.get('data', {})
                required_fields = ['name', 'title', 'currentCompany', 'location', 'email']
                
                missing_fields = [field for field in required_fields if field not in personal_data]
                if missing_fields:
                    self.log_test('/personal-info', 'GET', response.status_code, False, 
                                f"Missing required fields: {missing_fields}")
                    return False
                
                # Check for Western Union experience in currentCompany
                if 'Western Union' in personal_data.get('currentCompany', ''):
                    self.log_test('/personal-info', 'GET', response.status_code, True, 
                                "Personal info retrieved with Western Union experience", data)
                else:
                    self.log_test('/personal-info', 'GET', response.status_code, True, 
                                "Personal info retrieved successfully", data)
                return True
                
            else:
                self.log_test('/personal-info', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/personal-info', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_about(self):
        """Test GET /api/about"""
        try:
            response = requests.get(f"{self.base_url}/about", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/about', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                about_data = data.get('data', {})
                required_fields = ['summary', 'highlights', 'personalInterests']
                
                missing_fields = [field for field in required_fields if field not in about_data]
                if missing_fields:
                    self.log_test('/about', 'GET', response.status_code, False, 
                                f"Missing required fields: {missing_fields}")
                    return False
                
                self.log_test('/about', 'GET', response.status_code, True, 
                            "About info retrieved successfully", data)
                return True
                
            else:
                self.log_test('/about', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/about', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_skills(self):
        """Test GET /api/skills"""
        try:
            response = requests.get(f"{self.base_url}/skills", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/skills', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                skills_data = data.get('data', [])
                if not isinstance(skills_data, list):
                    self.log_test('/skills', 'GET', response.status_code, False, 
                                "Skills data should be a list")
                    return False
                
                # Check for expected technologies
                all_skills_text = json.dumps(skills_data).lower()
                expected_techs = ['java', 'aws', 'spark']
                found_techs = [tech for tech in expected_techs if tech in all_skills_text]
                
                if len(found_techs) >= 2:  # At least 2 out of 3 expected technologies
                    self.log_test('/skills', 'GET', response.status_code, True, 
                                f"Skills retrieved with expected technologies: {found_techs}", data)
                else:
                    self.log_test('/skills', 'GET', response.status_code, True, 
                                "Skills retrieved successfully", data)
                return True
                
            else:
                self.log_test('/skills', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/skills', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_projects(self):
        """Test GET /api/projects"""
        try:
            response = requests.get(f"{self.base_url}/projects", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/projects', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                projects_data = data.get('data', [])
                if not isinstance(projects_data, list):
                    self.log_test('/projects', 'GET', response.status_code, False, 
                                "Projects data should be a list")
                    return False
                
                # Check for expected projects
                all_projects_text = json.dumps(projects_data).lower()
                expected_projects = ['aws content delivery', 'maven plugin']
                found_projects = [proj for proj in expected_projects if proj in all_projects_text]
                
                if found_projects:
                    self.log_test('/projects', 'GET', response.status_code, True, 
                                f"Projects retrieved with expected projects: {found_projects}", data)
                else:
                    self.log_test('/projects', 'GET', response.status_code, True, 
                                "Projects retrieved successfully", data)
                return True
                
            else:
                self.log_test('/projects', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/projects', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_projects_filtered(self):
        """Test GET /api/projects?category=Cloud Architecture"""
        try:
            response = requests.get(f"{self.base_url}/projects?category=Cloud Architecture", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/projects?category=Cloud Architecture', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                projects_data = data.get('data', [])
                if not isinstance(projects_data, list):
                    self.log_test('/projects?category=Cloud Architecture', 'GET', response.status_code, False, 
                                "Projects data should be a list")
                    return False
                
                # Verify all projects have the correct category
                for project in projects_data:
                    if project.get('category') != 'Cloud Architecture':
                        self.log_test('/projects?category=Cloud Architecture', 'GET', response.status_code, False, 
                                    f"Project has wrong category: {project.get('category')}")
                        return False
                
                self.log_test('/projects?category=Cloud Architecture', 'GET', response.status_code, True, 
                            f"Filtered projects retrieved successfully ({len(projects_data)} projects)", data)
                return True
                
            else:
                self.log_test('/projects?category=Cloud Architecture', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/projects?category=Cloud Architecture', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_experience(self):
        """Test GET /api/experience"""
        try:
            response = requests.get(f"{self.base_url}/experience", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/experience', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                experience_data = data.get('data', [])
                if not isinstance(experience_data, list):
                    self.log_test('/experience', 'GET', response.status_code, False, 
                                "Experience data should be a list")
                    return False
                
                # Check for timeline from 2020-current
                all_experience_text = json.dumps(experience_data).lower()
                has_recent_experience = '2020' in all_experience_text or '2021' in all_experience_text or '2022' in all_experience_text or '2023' in all_experience_text or '2024' in all_experience_text
                
                if has_recent_experience:
                    self.log_test('/experience', 'GET', response.status_code, True, 
                                "Experience retrieved with timeline from 2020-current", data)
                else:
                    self.log_test('/experience', 'GET', response.status_code, True, 
                                "Experience retrieved successfully", data)
                return True
                
            else:
                self.log_test('/experience', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/experience', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_education(self):
        """Test GET /api/education"""
        try:
            response = requests.get(f"{self.base_url}/education", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/education', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                education_data = data.get('data', [])
                if not isinstance(education_data, list):
                    self.log_test('/education', 'GET', response.status_code, False, 
                                "Education data should be a list")
                    return False
                
                self.log_test('/education', 'GET', response.status_code, True, 
                            "Education retrieved successfully", data)
                return True
                
            else:
                self.log_test('/education', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/education', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_certifications(self):
        """Test GET /api/certifications"""
        try:
            response = requests.get(f"{self.base_url}/certifications", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/certifications', 'GET', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                certifications_data = data.get('data', [])
                if not isinstance(certifications_data, list):
                    self.log_test('/certifications', 'GET', response.status_code, False, 
                                "Certifications data should be a list")
                    return False
                
                # Check for AWS certifications
                all_certs_text = json.dumps(certifications_data).lower()
                has_aws_certs = 'aws' in all_certs_text
                
                if has_aws_certs:
                    self.log_test('/certifications', 'GET', response.status_code, True, 
                                "Certifications retrieved with AWS certifications", data)
                else:
                    self.log_test('/certifications', 'GET', response.status_code, True, 
                                "Certifications retrieved successfully", data)
                return True
                
            else:
                self.log_test('/certifications', 'GET', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/certifications', 'GET', 0, False, f"Error: {str(e)}")
            
        return False
    
    def test_contact_form(self):
        """Test POST /api/contact"""
        test_data = {
            "name": "John Smith",
            "email": "john.smith@techcorp.com",
            "company": "TechCorp Solutions",
            "subject": "Portfolio Inquiry - Senior Developer Position",
            "message": "Impressive portfolio! I'm particularly interested in your AWS Content Delivery Service project and your experience with Spark. Would love to discuss potential opportunities at our company."
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", 
                                   json=test_data, 
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if not self._validate_api_response(data):
                    self.log_test('/contact', 'POST', response.status_code, False, 
                                "Invalid API response structure")
                    return False
                
                # Check if message was created and stored
                contact_data = data.get('data', {})
                if 'id' in contact_data and contact_data.get('name') == test_data['name']:
                    self.log_test('/contact', 'POST', response.status_code, True, 
                                "Contact form submission successful - message created and stored", data)
                    return True
                else:
                    self.log_test('/contact', 'POST', response.status_code, False, 
                                "Contact form response missing expected data")
                    return False
                
            else:
                self.log_test('/contact', 'POST', response.status_code, False, 
                            f"Failed with status {response.status_code}")
                
        except Exception as e:
            self.log_test('/contact', 'POST', 0, False, f"Error: {str(e)}")
            
        return False
    
    def _validate_api_response(self, data):
        """Validate API response structure"""
        if not isinstance(data, dict):
            return False
        
        required_fields = ['success']
        for field in required_fields:
            if field not in data:
                return False
        
        return data.get('success') is True
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Portfolio Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        tests = [
            self.test_health_check,
            self.test_personal_info,
            self.test_about,
            self.test_skills,
            self.test_projects,
            self.test_projects_filtered,
            self.test_experience,
            self.test_education,
            self.test_certifications,
            self.test_contact_form
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
            print()  # Add spacing between tests
        
        print("=" * 60)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Portfolio backend API is working correctly.")
        else:
            print(f"⚠️  {total - passed} test(s) failed. Check the details above.")
        
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Print summary for automation
    if success:
        print("\n✅ BACKEND_TESTS_PASSED")
    else:
        print("\n❌ BACKEND_TESTS_FAILED")