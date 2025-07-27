
import vahuService from '@/services/vahuService';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        let q = searchParams.get('q');
        let type = null;
        if (q) {
            type = q.endsWith('?') ? 'note' : 'solution';
            q = q.replace("?", '');
        }

        let data;

        if (!q && !type) {
            data = await vahuService.getAllActions();
        } else {
            data = await vahuService.handleFuzzySearch(q, type);
        }

        return new Response(JSON.stringify({
            success: true,
            data,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return NextResponse.json({ sucess: false, message: error }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    try {
        const data = await vahuService.createAction(body);
        return new Response(
            { success: true, data },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ sucess: false, message: error }, { status: 500 });
    }
}