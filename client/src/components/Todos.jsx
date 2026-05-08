import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext, useMemo } from "react";
import { useForm } from "react-hook-form";
import apiService from "../services/apiService"; 
import { appContext } from "../app";
import Todo from "./Todo"; 

export default function Todos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todos, setTodos] = useState([]);  
  const { id: urlUserId } = useParams();
  const { user } = useContext(appContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const filterType = searchParams.get("filter") || "all";
  const sortBy = searchParams.get("sortBy") || "id";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (!user) return navigate("/login");
    //if (urlUserId !== String(user.id)) return navigate("/access_denied");

    const loadTodos = async () => {
      try {
        const data = await apiService.getAll(`todos?userId=${user.id}`);
        setTodos(data);
      } catch (err) {
        alert(err.message);
      } 
    };
    loadTodos();
  }, [user, urlUserId, navigate]);

  const processedTodos = useMemo(() => {
    let result = [...todos];

    if (filterType === "completed") result = result.filter(t => t.completed);
    if (filterType === "active") result = result.filter(t => !t.completed);

    if (searchQuery) {
      result = result.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        String(t.id) === searchQuery
      );
    }

    result.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "completed") return b.completed - a.completed;
      return a.id - b.id;
    });

    return result;
  }, [todos, filterType, sortBy, searchQuery]);

  const handleAdd = async (data) => {
    try {
      const newItem = await apiService.create('todos', { 
        ...data, userId: user.id, completed: false 
      });
      setTodos(prev => [...prev, newItem]);
      reset();
    } catch (err) { alert(err.message); }
  };

  const handleUpdate = async (todoId, updates) => {
    try {
      const updated = await apiService.update('todos', todoId, updates);
      setTodos(prev => prev.map(t => t.id === todoId ? updated : t));
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (todoId) => {
    if (!window.confirm("Delete?")) return;
    try {
      await apiService.remove('todos', todoId);
      setTodos(prev => prev.filter(t => t.id !== todoId));
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="todos-page">
      
      <header>
        <h1>My Todos</h1>
        <select value={sortBy} onChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), sortBy: e.target.value })}>
          <option value="id">Sort by ID</option>
          <option value="title">Sort by title</option>
          <option value="completed">Completed first </option>
        </select>

        <div className="filter-buttons">
          <button onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), filter: "all" })}>All</button>
          <button onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), filter: "completed" })}>Completed</button>
          <button onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), filter: "active" })}>Active</button>
        </div>
      </header>

      <form onSubmit={handleSubmit(handleAdd)} className="add-todo-form">
        <input {...register("title", { required: true })} placeholder="New Todo..." />
        <button type="submit">Add</button>
      </form>

      <div className="todo-list">
        {processedTodos.length > 0 ? (
          processedTodos.map(todo => (
            <Todo
              key={todo.id} 
              todo={todo} 
              onDelete={handleDelete} 
              onUpdate={handleUpdate} 
            />
          ))
        ) : <p>No Todos Found </p>}
      </div>
    </div>
  );
}