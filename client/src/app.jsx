import { useState, createContext } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Posts from "./components/Posts.jsx";
import Post from "./components/Post.jsx";
import Todos from "./components/Todos.jsx";
import Todo from "./components/Todo.jsx";
import Info from "./components/Info.jsx";
import NavBar from "./components/Navbar.jsx";
import NotFound from "./components/NotFound.jsx";
import Forbidden from "./components/Forbidden.jsx";

export const appContext = createContext();

function ProtectedUserRoute({ user, children }) {
    const { username } = useParams();
    if (!user) return <Navigate to="/login" />;
    if (user.username !== username) return <Forbidden />;
    return children;
}

function App() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("current-user")) || null
    );
    return (
        <appContext.Provider value={{ user, setUser }}>
            <div className="app-wrapper">
                <NavBar />
                <main className="content-area">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/users/:username">
                            <Route path="info" element={<ProtectedUserRoute user={user}><Info /></ProtectedUserRoute>} />
                            <Route path="todos" element={<ProtectedUserRoute user={user}><Todos /></ProtectedUserRoute>}>
                                <Route path=":id" element={<Todo />} />
                            </Route>
                            <Route path="posts" element={<ProtectedUserRoute user={user}><Posts /></ProtectedUserRoute>}>
                                <Route path=":id" element={<Post />} />
                            </Route>
                        </Route>
                        <Route path="/posts" element={user ? <Posts /> : <Navigate to="/login" />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </appContext.Provider>
    );
}

export default App;


