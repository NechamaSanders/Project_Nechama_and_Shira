import { useContext } from "react";
import { Link } from "react-router-dom";
import { appContext } from "../app";

export default function Home() {
  const { user } = useContext(appContext);

  if (!user) {
    return (
      <div className="home-error">
        <h2>Oops! Looks like you're not connected</h2>
        <Link typeof="button" to="/login">Back to Login </Link>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1> Welcome, {user.username}! </h1>
        <p>What would you like to do today?</p>
      </header>

      <div className="dashboard-grid">
        <Link to={`/users/${user.username}/todos`} className="dash-card">
          <div className="icon">📋</div>
          <h3>My Todos</h3>
          <p>Organize your Todo list</p>
        </Link>

        <Link to="/posts" className="dash-card">
          <div className="icon">💬</div>
          <h3>Posts Forum</h3>
          <p>See Posts and Comment</p>
        </Link>

        <Link to={`/users/${user.username}/info`} className="dash-card">
          <div className="icon">👤</div>
          <h3>Profile </h3>
          <p>See your Account details</p>
        </Link>
      </div>
    </div>
  );
}