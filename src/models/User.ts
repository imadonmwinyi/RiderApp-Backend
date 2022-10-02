export interface User{
    userId?:string;

    email?:string;

    password?:string;

    isActive?:boolean;

    createdAt?:Date;

    lastLogin?:Date;
}