import connectDB from '@/utils/mongodb';
import Action from '@/models/Action';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connectDB();
    const id = (await params).id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await connectDB();
    const id = (await params).id;
    const data = await req.json();

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
        if (!updatedPost) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ message: 'Error while updating', error }, { status: 500 });
    }
}