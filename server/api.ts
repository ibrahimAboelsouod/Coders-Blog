import { Post, User } from "./types";




// USER API

// SignUp types
export type SignUpRequest = Pick< User, 'email'| 'firstName' | 'lastName' | 'password' | 'userName' >
export interface SignUpResponse{}


// SignIn types 
export interface SignInRequest {
    login: string;
    password: string;
}
export type SignInResponse = Pick< User, 'email'| 'firstName' | 'lastName' | 'userName' | 'id' >;





// POST API

export interface ListPostRequest {};
export interface ListPostResponse {
    posts: Post[];
};

export type CreatePostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export interface CreatePostResponse {};

export interface GetPostRequest{};
export interface GetPostResponse{
    post: Post;
};
