import sqlite3 from 'sqlite3'
import { open as openSqlite, Database } from 'sqlite'

import path from 'path';

import { Datastore, db } from "..";
import { User, Post } from "../../types";

export class SqlDataStore implements Datastore{
    
    private db!: Database<sqlite3.Database, sqlite3.Statement> ;
    public async openDb() {
        // open the database
        this.db = await openSqlite({
          filename: path.join(__dirname, 'codersBlog.sqlite'),
          driver: sqlite3.Database,
        });
        
        this.db.run(' PRAGMA foreign_keys = ON; '); 
        await this.db.migrate({
            migrationsPath: path.join(__dirname,'migrations')
        });

        return this;
    }

    
    

    async createUser(user: User): Promise<void> {
        await this.db.run(
            'INSERT INTO users (id, email, firstName, lastName, userName, password) VALUES(?,?,?,?,?,?)',
            user.id,
            user.email,
            user.firstName,
            user.lastName,
            user.userName,
            user.password
        );
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE email = ?', email)
    }
    getUserByUserName(userName: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE userName = ?', userName)
    }
    listPosts(): Promise<Post[]> {
        return  this.db.all<Post[]>('SELECT * FROM posts');
    }
    async createPost(post: Post): Promise<void> {
         await this.db.run(
            'INSERT INTO posts (id,title,url,postedAt,userId) VALUES (?,?,?,?,?)',
            post.id,
            post.title,
            post.url,
            post.postedAt,
            post.userId
        );
    }
    getPost(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}