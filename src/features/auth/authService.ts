import { axiosInstance } from "../../utils/axiosInstance";
import { User, LoginCredentials } from "./types";

const apiUrl = axiosInstance.defaults.baseURL + '/auth' as string;

/*
| Method | Endpoint                      | Description                         | Access  |
|--------|-------------------------------|-------------------------------------|---------|
| `POST`   | `/api/auth/login`           | Logs in a user                      | Public  |
| `GET`    | `/api/auth/me`              | Returns the authenticated user      | Private |
| `POST`   | `/api/auth/logout`          | Logs out a user                     | Public  |
*/

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
    const response = await axiosInstance.post(`${apiUrl}/login`, credentials);
    if (response.data?.user) {
        return response.data.user;
    }
    throw new Error(response.data?.message || 'Login failed: User data not found in response');
};

export const getAuthenticatedUser = async (): Promise<User> => {
    const response = await axiosInstance.get(`${apiUrl}/me`);
    if (response.data?.user) {
        return response.data.user;
    }
    throw new Error(response.data?.message || 'User data not found in response');
};

export const logoutUser = async (): Promise<void> => {
    await axiosInstance.post(`${apiUrl}/logout`);
};
