'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function AllPostsPage() {
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const fetchPosts = async () => {
        const res = await fetch('/api/bot/post');
        const result = await res.json();
        if (result.success) {
            console.log(result)
            setPosts(result.data || []);
        }
    };
    
    useEffect(() => {
        fetchPosts();
    }, []);

    async function handleDelete(postId) {
        console.log({ postId })
        const res = await fetch(`/api/bot/post/${postId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            console.log(12312)
            await fetchPosts();
        }
    }

    return (
        <div className="container">
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
                    {posts.map(post => (
                        <tr key={post._id}>
                            <td>{post._id}</td>
                            <td>{post.title}</td>
                            <td className="text-center">{post.author}</td>
                            <td className="text-center">{post.type}</td>
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
