export interface IUserCredentials {
    login: string;
    password: string
}

export interface IUserCredentialsChange {
    login: string;
    currentPassword: string;
    newPassword: string
}

export interface ILoginResponse {
    token: string;
}