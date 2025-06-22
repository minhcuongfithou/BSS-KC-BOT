
import Token from '@/models/Token';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    await connectDB();
    const data = await req.json();
    console.log(data)
    const token = `access_token=${data.token}`;
    console.log(token)
    try {
        const updatedToken = await Token.findByIdAndUpdate('684994c9346f8a4efd75085d', { token }, { new: true });
        if (!updatedToken) {
            return NextResponse.json({ message: 'token not found' }, { status: 404 });
        }
        return NextResponse.json(updatedToken);
    } catch (error) {
        return NextResponse.json({ message: 'Error while updating', error }, { status: 500 });
    }
}