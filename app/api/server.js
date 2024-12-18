'use server'

import Post from '@/app/models/post'
import {NextResponse } from "next/server";

export async function POST(request){

    const reqBody = await request.json()
    const {title, description} = reqBody

    const newPost = new Post({ title, description })
    const respons = await newPost.save()
    console.log(respons);

    return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser
    })
}


