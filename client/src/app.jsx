import { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Posts from "./components/Posts.jsx";
import Post from "./components/Post.jsx";
import Tasks from "./components/Tasks.jsx";
import Task from "./components/Task.jsx";
import Info from "./components/Info.jsx";
import NavBar from "./components/Navbar.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { AccessDenied } from "./components/AccessDenied.jsx";

export const appContext = createContext();
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
                            <Route path="info" element={<Info />} />
                            <Route path="todos" element={<Tasks />}>
                                <Route path=":id" element={<Task />} />
                            </Route>
                            <Route path="posts" element={<Posts />}>
                                <Route path=":id" element={<Post />} />
                            </Route>
                        </Route>
                        <Route path="/posts" element={<Posts />} />

                        <Route path="/access_denied" element={<AccessDenied />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes></main></div>
        </appContext.Provider>
    );
}

export default App;


