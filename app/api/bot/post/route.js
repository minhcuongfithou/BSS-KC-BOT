import connectDB from '@/utils/mongodb';
import postService from '@/services/postService';

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
        return new Response(JSON.stringify({
            success: false,
            error: err.message,
        }), { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    try {
        const data = await postService.createPost(body);
        console.log(body)
        console.log(data)
        return new Response(
            { success: true, data }, 
            { status: 201 }
        );
    } catch (error) {
        console.error('Lỗi khi tạo bài viết:', error);
        return NextResponse.json({ message: 'Dữ liệu không hợp lệ' }, { status: 500 });
    }

    
}