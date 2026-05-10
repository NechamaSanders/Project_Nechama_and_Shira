import { useState, useEffect, useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import apiService from "../services/apiService";
import { appContext } from "../app";
import Post from "./Post";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useContext(appContext);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await apiService.getAll("posts");
                setPosts(data);
            } catch (err) {
                alert("Error in loading Posts");
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter(post =>
            (post.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(post.userId) === searchQuery
        );
    }, [posts, searchQuery]);

    const handleAddPost = async (data) => {
        try {
            const payload = { ...data, userId: user.id };
            const newPost = await apiService.create('posts', payload);
            setPosts(prev => [{ ...payload, id: newPost.id }, ...prev]);
            reset();
        } catch (err) {
            alert("Could not add Post");
        }
    };
    const handleUpdate = async (postId, updates) => {
        try {
            await apiService.update('posts', postId, updates);
            setPosts(prev => prev.map(p => p.id === postId ? { ...p, ...updates } : p));
        } catch (err) { alert(err.message); }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm("Delete?")) return;
        try {
            await apiService.remove('posts', postId);
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (err) { alert(err.message); }
    };

    return (
        <div className="posts-container">
            <h1>Posts Forum </h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Title or User ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <form onSubmit={handleSubmit(handleAddPost)} className="add-post-form">
                <input {...register("title", { required: true })} placeholder="Post title..." />
                <textarea {...register("body", { required: true })} placeholder="What's on your mind?" />
                <button type="submit">Publish Post</button>
            </form>
            {
                <div className="posts-list">
                    {filteredPosts.length === 0
                        ? <p className="no-results">No posts found matching your search.</p>
                        : filteredPosts.map(post => (
                        <Post key={post.id} post={post} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))}
                </div>
            }
        </div>
    );
}