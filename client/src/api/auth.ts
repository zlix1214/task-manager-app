import axios from 'axios';

interface AuthResponse {
    token: string;
}

const API_URL =import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/auth';

export const login = async (email: string, password:string) : Promise<AuthResponse> =>{
    const res = await axios.post<AuthResponse>(`${API_URL}/login`, {email, password});
    return res.data;
};

export const register = async (username: string, email:string, password:string) : Promise<AuthResponse>=>{
    const res = await axios.post<AuthResponse>(`${API_URL}/register`,{username, email, password});
    return res.data;
};