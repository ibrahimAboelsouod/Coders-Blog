import { RequestHandler } from "express";
import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";

import crypto from 'crypto';
import { CreatePostRequest, CreatePostResponse, ListPostRequest, ListPostResponse } from "../api";





export const listPostHandler: ExpressHandler<ListPostRequest,ListPostResponse> = async (request,response) => {
    response.send({posts: await db.listPosts()});
}



export const creatPostHandler: ExpressHandler<CreatePostRequest,CreatePostResponse> = async (request,response) => {
    
    if(!request.body.title || !request.body.url || !request.body.userId){
        return response.sendStatus(400);
    }

    const post: Post = {
        id: crypto.randomUUID(),
        title: request.body.title,
        url: request.body.url,
        userId: request.body.userId,
        postedAt: Date.now()
    };

    await db.createPost(post);
    response.sendStatus(200);
}

