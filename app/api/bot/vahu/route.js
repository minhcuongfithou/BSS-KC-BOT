
import vahuService from '@/services/vahuService';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectDB();
    try {
        let { domain, name, params } = await req.json();
        console.log(typeof params)
        try {
            params = JSON.parse(params)
        } catch (error) {
            console.error('!!!', error);
        }

        console.log({ domain, name, params })
        const result = await vahuService.saveContent(domain, "add", name, params);

        console.log({ result })
        if (result?.success) {
            return NextResponse.json(
                { success: true },
                { status: 201 }
            );
        }

        return NextResponse.json(
            { success: false, error: result?.error || 'nothing' },
            { status: 500 }
        );

    } catch (error) {
        console.error('Error while creating post:', error);
    }
}
export async function DELETE(req) {
    await connectDB();
    try {
        const { domain, name } = await req.json();

        const result = await vahuService.saveContent(domain, "delete", name);

        if (result?.success) {
            return NextResponse.json(
                { success: true },
                { status: 201 }
            );
        }

        return NextResponse.json(
            { success: false, error: result?.error || 'nothing' },
            { status: 500 }
        );

    } catch (error) {
        console.error('Error while creating post:', error);
    }
}