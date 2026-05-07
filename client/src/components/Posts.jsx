import { useState, useEffect, useContext, useMemo } from "react";
import apiService from "../services/apiService";
import { appContext } from "../app";
import Post from "./Post";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useContext(appContext);

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
            setPosts(prev => [newPost, ...prev]);
            reset();
        } catch (err) {
            alert("Could not add Post");
        }
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
                <input {...register("title", { required: true })} placeholder="כותרת הפוסט" />
                <textarea {...register("body", { required: true })} placeholder="מה על לבך?" />
                <button type="submit">פרסם פוסט</button>
            </form>
            {
                <div className="posts-list">
                    {filteredPosts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            }
        </div>
    );
}