import { useState, useEffect } from "react";

export default function Todo({ todo, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    useEffect(() => {
        setNewTitle(todo.title);
    }, [todo.title]);

    const saveEdit = () => {
        if (newTitle.trim() === "") return;
        onUpdate(todo.id, { title: newTitle });
        setEditing(false);
    };

    const handleCancel = () => {
        setNewTitle(todo.title);
        setEditing(false);
    };

    const toggleComplete = () => {
        onUpdate(todo.id, { completed: !todo.completed });
    };

    return (
        <div className={`todo ${todo.completed ? "is-completed" : ""}`}>
            {editing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        autoFocus
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="view-mode">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={toggleComplete}
                    />

                    <span className="todo-text">
                        <small>#{todo.id}</small>
                        <h3>{todo.title}</h3>
                    </span>

                    <div className="todo-actions">
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(todo.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}



