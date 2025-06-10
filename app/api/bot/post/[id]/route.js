import connectDB from '@/utils/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connectDB();
    const { id } = params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ message: 'Không tìm thấy bài viết' }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await connectDB();
    const { id } = params;
    const data = await req.json();

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
        if (!updatedPost) {
            return NextResponse.json({ message: 'Không tìm thấy bài viết' }, { status: 404 });
        }
        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi khi cập nhật', error }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await connectDB();
    const { id } = await params;
    try {
        const deleted = await Post.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: 'Không tìm thấy bài viết' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Xóa thành công', id });
    } catch (error) {
        return NextResponse.json({ message: 'Lỗi khi xóa', error }, { status: 500 });
    }
}
