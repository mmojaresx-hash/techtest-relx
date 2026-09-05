import { apiConfig } from '../config/api.config';
import { post } from './api.helper';

interface AuthResponse {
    token: string;
}

export async function getAuthToken(): Promise<string> {

    const response = await post<AuthResponse>(
        `${apiConfig.baseUrl}${apiConfig.endpoints.auth}`,

        {
            username: 'admin',
            password: 'password123'
        },

        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.token;
}
