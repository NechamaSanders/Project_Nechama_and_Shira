import { useState, useContext } from "react";
import { appContext } from "../app";
import apiService from "../services/apiService";
import Comments from "./Comments";
export default function Post({ post, onUpdate, onDelete }) {
  const { user } = useContext(appContext);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ title: post.title, body: post.body });
  const [showComments, setShowComments] = useState(false);

  const isOwner = user && post.userId === user.id;

  const handleSave = async () => {
    try {
      await apiService.update('posts', post.id, editData);
      onUpdate(post.id, editData); 
      setEditing(false);
    } catch (err) {
      alert("Error in editing");
    }
  };
  



  return (
    <div className="post-card">
      {editing ? (
        <div className="edit-mode">
          <input 
            value={editData.title} 
            onChange={(e) => setEditData({...editData, title: e.target.value})} 
          />
          <textarea 
            value={editData.body} 
            onChange={(e) => setEditData({...editData, body: e.target.value})} 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="view-mode">
            <div className="post-content"  style={{ cursor: 'pointer' }}>
        <small>Published by User: {post.userId}</small>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          </div>
          <div className="post-footer">
            <button onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide Comments " : "Comments"}
            </button>

            {isOwner && (
              <div className="owner-actions">
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={() => onDelete(post.id)} style={{color: 'red'}}>Delete</button>
              </div>
            )}
          </div>
        </div>
      )}
      {showComments && <Comments postId={post.id} />}
    </div>
  );
}
