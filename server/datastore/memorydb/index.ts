import { Datastore } from "..";
import { User, Post } from "../../types";

export class InmemoryDatastore implements Datastore{

    private users: User[] = [];
    private posts: Post[] = [];

    createUser(user: User): Promise <void> {
        this.users.push(user);
        return Promise.resolve();
    }
    getUserByEmail(email: string): Promise <User | undefined> {
        return Promise.resolve(this.users.find(u => u.email === email));
    }
    getUserByUserName(userName: string): Promise <User | undefined> {
        return Promise.resolve(this.users.find(u => u.userName === userName));
    }
    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }
    createPost(post: Post): Promise<void>{
        this.posts.push(post);
        return Promise.resolve();
    }
    getPost(id: string): Promise<Post | undefined>{
        return Promise.resolve(this.posts.find(p => p.id === id));
    }
    deletePost(id: string): Promise<void> {
        const index = this.posts.findIndex(p => p.id === id);
        if(index === -1){
            return Promise.resolve();
        }
        else{
            this.posts.slice(index,1);
            return Promise.resolve();
        }
    }
    
}