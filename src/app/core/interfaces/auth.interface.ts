export interface IOauth {
    token_type: string;
    expires_in: number;
    refresh_token: string;
    access_token: string;
}

export type UpdateUserParam = {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | number;
};

export type UpdateUserAvatarParam = {
    file: File;
};

export type UpdateUserPasswordParam = {
    password_confirmation: string;
    password: string;
    current_password: string;
};

export type RegisterUserParam = {
    email: string;
    first_name: string;
    last_name: string;
    password_confirmation: string;
    password: string;
    token?: string;
};
