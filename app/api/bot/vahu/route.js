import vahuService from '@/services/vahuService';
import connectDB from '@/utils/mongodb';

export async function GET(req) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    try {
        const content = await vahuService.getData(domain);
        console.log(content)
        return new Response(
            { success: true, content },
            { status: 200 }
        );
    } catch (err) {
        console.log("error")
        return new Response(JSON.stringify({
            success: false,
            error: err.message,
        }), { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    try {
        const { domain, newContent } = await req.json();
        // const data = await vahuService.login();
        const result = await vahuService.saveContent(domain, newContent);
        console.log(
           result?.error
        )
        if (result.success) {
            return new Response(
                { success: true },
                { status: 201 }
            );
        }
        return new Response(
            { success: false },
            { error: result?.error || 'nothing' },
            { status: 500 }
        );

    } catch (error) {
        console.error('Lỗi khi tạo bài viết:', error);
        // return NextResponse.json({ message: 'Dữ liệu không hợp lệ' }, { status: 500 });
    }
}