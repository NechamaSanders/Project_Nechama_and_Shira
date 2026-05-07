import { useState, useEffect, useContext } from "react";
import apiService from "../services/apiService";
import { appContext } from "../app";
import Comment from "./Comment";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(appContext);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      try {
        const data = await apiService.getAll(`comments?postId=${postId}`);
        setComments(data);
      } catch (err) {
        console.error("Failed to load Comments");
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [postId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const created = await apiService.create('comments', {
        postId,
        body: newComment,
        name: user.username,
        email: user.email,
      });
      setComments(prev => [...prev, created]);
      setNewComment("");
    } catch (err) { alert("Error in adding "); }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await apiService.update('comments', id, updates);
      setComments(prev => prev.map(c => c.id === id ? updated : c));
    } catch (err) { alert("Error in updating "); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Comment?")) return;
    try {
      await apiService.remove('comments', id);
      setComments(prev => prev.filter(c => c.id !== id));
    } catch (err) { alert("Error in deleting"); }
  };

  return (
    <div className="comments-wrapper">
      <form onSubmit={handleAdd} className="comment-form">
        <input 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Add Comment..."
        />
      </form>

      {loading ? <p>Loading Comments...</p> : (
        <ul className="comments-list">
          {comments.map(c => (
            <Comment
              key={c.id} 
              comment={c} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}