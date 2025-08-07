'use client';
import { useEffect, useState } from 'react';
import { Pencil, Trash2, Eye, Settings } from 'lucide-react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useUser } from '@/app/context/UserContext';

export default function AllPostsPage() {
    const session = useUser();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/bot/auto');
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
        const res = await fetch(`/api/auto/${actionId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            await fetchPosts();
        }
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="container">
            <h1> <Settings size={27} /> AUTOMATIC</h1>
            <div className="text-right mb-10"><a href={`/auto/create`}><button className="btn btn-success">New</button></a></div>
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
                            <td>{post.describe}</td>
                            <td className="text-center">
                                <a className="btn btn-sm btn-primary" href={`/auto/${post.name}`} style={{ marginRight: 8 }}>
                                    <Eye size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Xem</span>
                                </a>
                                {/* <a className="btn btn-sm btn-warning" href={`/auto/${post._id}`} style={{ marginRight: 8 }}>
                                    <Pencil size={20} className="h-4 w-4" />
                                    <span className="hidden sm:inline">Chỉnh sửa</span>
                                </a> */}
                                {session?.user?.email === 'mcvp9x@gmail.com' &&
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
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
