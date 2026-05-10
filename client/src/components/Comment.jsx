
import { useState, useContext } from "react";
import { appContext } from "../app";

export default function Comment({ comment, onUpdate, onDelete }) {
  const { user } = useContext(appContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const isOwner = user && (comment.email === user.email);

  const handleSave = () => {
    if (!editBody.trim()) return;
    onUpdate(comment.id, { body: editBody });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditBody(comment.body);
    setIsEditing(false);
  };

  return (
    <li className="comment-item">
      {isEditing ? (
        <div className="comment-edit">
          <textarea 
            value={editBody} 
            onChange={(e) => setEditBody(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="comment-view">
          <strong>{comment.name || user.username}:</strong>
          <p>{comment.body}</p>
          
          {isOwner && (
            <div className="comment-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => onDelete(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}