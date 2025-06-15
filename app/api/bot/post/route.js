import postService from '@/services/postService';
import connectDB from '@/utils/mongodb';

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
            data = await postService.getAllPosts();
        } else {
            data = await postService.handleFuzzySearch(q, type);
        }

        return new Response(JSON.stringify({
            success: true,
            data,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        return NextResponse.json({ sucess: false, message: error }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    try {
        const data = await postService.createPost(body);
        return new Response(
            { success: true, data },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ sucess: false, message: error }, { status: 500 });
    }


}