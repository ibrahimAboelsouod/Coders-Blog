import { User } from "../../types";

export interface userDao {
    createUser(user: User): Promise <void>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUserName(userName: string): Promise<User | undefined>;
}