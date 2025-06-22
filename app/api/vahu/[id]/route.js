import connectDB from '@/utils/mongodb';
import Action from '@/models/Action';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connectDB();
    const id = (await params).id;
    try {
        const action = await Action.findById(id);
        if (!action) {
            return NextResponse.json({ message: 'Action not found' }, { status: 404 });
        }
        return NextResponse.json(action, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await connectDB();
    const id = (await params).id;
    const data = await req.json();
    try {
        const updatedAction = await Action.findByIdAndUpdate(id, data, { new: true });
        if (!updatedAction) {
            return NextResponse.json({ message: 'Action not found' }, { status: 404 });
        }
        return NextResponse.json(updatedAction);
    } catch (error) {
        return NextResponse.json({ message: 'Error while updating', error }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await connectDB();
    const id = (await params).id;
    try {
        const deleted = await Action.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: 'Action not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Deleted successfully', id });
    } catch (error) {
        return NextResponse.json({ message: 'Error while deleting', error }, { status: 500 });
    }
}
