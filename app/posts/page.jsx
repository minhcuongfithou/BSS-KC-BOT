'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pencil, ClipboardList, Trash2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AllPostsPage() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/bot/post');
            const result = await res.json();
            if (result.success) {
                setPosts(result.data || []);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    async function handleDelete(postId) {
        const res = await fetch(`/api/bot/post/${postId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            await fetchPosts();
        }
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="container">
            <h1><ClipboardList size={27} /> SOLUTION</h1>
            <div className="text-right mb-10"><a href={`/posts/create`}><button className="btn btn-success">Create</button></a></div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th width="10%" className="text-center">ID</th>
                        <th width="40%" className="text-center">Tiêu đề</th>
                        <th width="10%" className="text-center">Tác giả</th>
                        <th width="10%" className="text-center">Loại</th>
                        <th width="18%" className="text-center">Ngày cập nhật</th>
                        <th width="12%" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post._id}>
                            <td className="text-center">{index + 1}</td>
                            <td>{post.title}</td>
                            <td className="text-center">{post.author}</td>
                            <td className="text-center"><span title={post.type}>{post.type === 'solution' ? '✔️' : '✏️'}</span></td>
                            <td>{new Date(post.updated_at).toLocaleString()}</td>
                            <td className="text-center">
                                <a className="btn btn-sm btn-primary" href={`/posts/${post._id}`} style={{ marginRight: 8 }}>
                                    <Pencil size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Chỉnh sửa</span>
                                </a>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
                                        if (confirmed) {
                                            handleDelete(post._id);
                                        }
                                    }}
                                >
                                    <Trash2 size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Xóa</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
