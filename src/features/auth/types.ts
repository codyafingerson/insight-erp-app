export interface User {
    id: string;
    isActive: boolean;
    roleId: string;
    name: string;
    username: string;
    email: string;
    resetToken: null;
    resetTokenExpires: null;
    role: Role;
}

export interface Role {
    id: string;
    name: string;
    description: string;
    isEditable: boolean;
    permissions: Permission[];
}

export interface Permission {
    id: string;
    name: string;
    description: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}