import { PostDao } from "./Dao/PostDao";
import { userDao } from "./Dao/UserDao";
import { SqlDataStore } from "./sql";

export interface Datastore extends userDao, PostDao{};


export let db: Datastore;

export async function initDB() {
    db = await new SqlDataStore().openDb();
}
