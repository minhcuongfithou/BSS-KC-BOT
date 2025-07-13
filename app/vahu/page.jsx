'use client';
import { useEffect, useState } from 'react';
import { ClipboardList, Pencil, Trash2, Eye } from 'lucide-react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function AllPostsPage() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/bot/vahu');
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

    async function handleDelete(actionId) {
        const res = await fetch(`/api/vahu/${actionId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            await fetchPosts();
        }
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="container">
            <h1> <ClipboardList size={27} /> VAHU</h1>
            <div className="text-right mb-10"><a href={`/vahu/create`}><button className="btn btn-success">Create</button></a></div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th width="10%" className="text-center">ID</th>
                        <th width="20%" className="text-center">Name</th>
                        <th width="12%" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={index + 1}>
                            <td className="text-center">{index + 1}</td>
                            <td>{post.name}</td>
                            <td className="text-center">
                                <a className="btn btn-sm btn-primary" href={`/vahu/${post.name}`} style={{ marginRight: 8 }}>
                                    <Eye size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Xem</span>
                                </a>
                                <a className="btn btn-sm btn-primary" href={`/vahu/${post._id}`} style={{ marginRight: 8 }}>
                                    <Pencil size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Chỉnh sửa</span>
                                </a>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa action này không?');
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
