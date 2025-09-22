import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useResumeUrl = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const response = await axios.get(`${API}/resume-url`);
        if (response.data.success) {
          setResumeUrl(response.data.data.resumeUrl);
        }
      } catch (error) {
        console.error('Error fetching resume URL:', error);
        setResumeUrl(process.env.REACT_APP_RESUME_URL || '/resume.pdf');
      } finally {
        setLoading(false);
      }
    };

    fetchResumeUrl();
  }, []);

  return { resumeUrl, loading };
};