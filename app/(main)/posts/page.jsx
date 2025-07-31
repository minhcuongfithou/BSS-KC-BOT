'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pencil, ClipboardList, Trash2, Eye } from 'lucide-react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import '@/app/styles/badge.css';

export default function AllPostsPage() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/bot/post');
            const result = await res.json();
            console.log({ result })
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
            <div className="text-right mb-10"><a href={`/posts/create`}><button className="btn btn-success">New</button></a></div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th width="3%" className="text-center">ID</th>
                        <th width="40%" className="text-center">Title</th>
                        <th width="10%" className="text-center">Author</th>
                        <th width="5%" className="text-center">Type</th>
                        <th width="20%" className="text-center">Last update</th>
                        <th width="22%" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post._id}>
                            <td className="text-center">{index + 1}</td>
                            <td>{post.title}</td>
                            <td className="text-center">{post.author}</td>
                            <td className="text-center"><span title={post.type}>{post.type === 'solution' ? <span className="badge badge-green">Solution</span> : <span className="badge badge-warning">Note</span>}</span></td>
                            <td className="text-center">{new Date(post.updated_at).toLocaleString()}</td>
                            <td className="text-center">
                                <a className="btn btn-sm btn-primary" href={`/posts/view/${post._id}`} style={{ marginRight: 8 }}>
                                    <Eye size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Xem</span>
                                </a>
                                <a className="btn btn-sm btn-warning" href={`/posts/${post._id}`} style={{ marginRight: 8 }}>
                                    <Pencil size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Chỉnh sửa</span>
                                </a>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                        const confirmed = window.confirm('Delete this post?');
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
