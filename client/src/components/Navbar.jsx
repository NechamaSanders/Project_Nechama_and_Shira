import { Link, NavLink, useNavigate } from "react-router-dom";
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
                <Link typeof="button" to="/">WorkSpace</Link>
            </div>
            <div className="user-greet">{user?(<p>Hello, {user.username}!</p>):(<></>)}</div>
            <ul className="nav-links">
                {user ? (
                    <>
                        <li><NavLink to={`/users/${user.username}/todos`} className={({isActive}) => isActive ? 'nav-active' : ''}>Todos</NavLink></li>
                        <li><NavLink to="/posts" className={({isActive}) => isActive ? 'nav-active' : ''}>Posts</NavLink></li>
                        <li><NavLink to={`/users/${user.username}/info`} className={({isActive}) => isActive ? 'nav-active' : ''}>Info</NavLink></li>
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




