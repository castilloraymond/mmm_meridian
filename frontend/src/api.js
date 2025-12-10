import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001/api',
});

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const loadSampleData = async (scenario) => {
    // Use embedded sample data (no backend required)
    const { getSampleData } = await import('./data/sampleData');
    return getSampleData(scenario);
};

export default api;
