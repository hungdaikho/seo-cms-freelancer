import { User } from "./api.type";

export interface IAuth {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthState extends IAuth { }