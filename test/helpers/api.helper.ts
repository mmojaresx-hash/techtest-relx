
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

function logRequest(method: string, url: string, data?: unknown): void {
    console.log('\n================ REQUEST ================');
    console.log(`${method} ${url}`);

    if (data) {
        console.log('Request Body:');
        console.log(JSON.stringify(data, null, 2));
    }

    console.log('=========================================');
}

function logResponse<T>(response: AxiosResponse<T>): void {
    console.log('\n================ RESPONSE ===============');
    console.log(`Status: ${response.status} ${response.statusText}`);

    console.log('Response Body:');
    console.log(JSON.stringify(response.data, null, 2));

    console.log('=========================================\n');
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    logRequest('POST', url, data);
    const response = await axios.post<T>(url, data, { ...config, validateStatus: () => true });
    logResponse(response);
    return response;
}

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    logRequest('GET', url);
    const response = await axios.get<T>(url, { ...config, validateStatus: () => true });
    logResponse(response);
    return response;
}

export async function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    logRequest('PUT', url, data);
    const response = await axios.put<T>(url, data, { ...config, validateStatus: () => true });
    logResponse(response);
    return response;
}

export async function remove<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    logRequest('DELETE', url);
    const response = await axios.delete<T>(url, { ...config, validateStatus: () => true });
    logResponse(response);
    return response;
}
