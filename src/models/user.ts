export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    role?: string;
}
export enum Roles {
    user = 'user',
    admin = 'admin'
}
