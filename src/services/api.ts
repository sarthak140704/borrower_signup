import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const submitApplication = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/borrowers`, formData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};