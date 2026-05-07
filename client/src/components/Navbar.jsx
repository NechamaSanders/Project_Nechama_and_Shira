import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../app";
import authService from "../services/authService";

export default function NavBar() {
    const { user, setUser } = useContext(appContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate("/login");
    };
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link typeof="button" to="/">MyProject</Link>
            </div>

            <ul className="nav-links">
                {user ? (
                    <>
                        <li><Link to={`/users/${user.username}/todos`}>Todos</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                        <li><Link to={`/users/${user.username}/info`}>Info</Link></li>

                        <li className="user-greet">Hello, {user.username}</li>
                        <li>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}




