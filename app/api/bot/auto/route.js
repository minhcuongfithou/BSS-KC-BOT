
import Handle from '@/models/Handle';
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
    try {
        let { author, domain, action, params } = await req.json();
        try {
            params = JSON?.parse(params) ?? params;
        } catch (error) {
            console.error('!!!', error);
        }
        const result = await vahuService.checkAndSaveContent(author, domain, "add", action, params, '');

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
        const { author, domain, action } = await req.json();
        const params = '';
        const result = await vahuService.checkAndSaveContent(author, domain, "delete", action);

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