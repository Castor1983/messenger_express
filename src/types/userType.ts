
 export interface IUser {
     id: string;
     nickname: string;
     phone: string;
     password: string;

    }
 export type IUserCredentials = Pick<IUser, "phone" | "password">;
