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
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(post.id) === searchQuery
        );
    }, [posts, searchQuery]);

    const handleAddPost = async (data) => {
        try {
            const newPost = await apiService.create('posts', {
                ...data,
                userId: user.id
            });
            console.log(newPost);

            setPosts(prev => [newPost, ...prev]);
            reset();
        } catch (err) {
            alert("Could not add Post");
        }
    };
    const handleUpdate = async (postId, updates) => {
        try {
            const updated = await apiService.update('posts', postId, updates);
            console.log(updated);
            
            setPosts(prev => prev.map(p => p.id === postId ? {...p,...updated} : p));
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
                    placeholder="Search for Post by Title or ID..."
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
                    {filteredPosts.map(post => (
                        <Post key={post.id} post={post} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))}
                </div>
            }
        </div>
    );
}