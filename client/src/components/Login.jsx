import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { appContext } from "../app";
import authService from "../services/authService";


export default function Login() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useContext(appContext);

    const handleLogin = async (data) => {
        try {
            setError(null);
            console.log(data.username,data.password);
            
            const userData = await authService.login(data.username, data.password);
            setUser(userData);
            navigate("/");
        } catch (err) {            
            setError(err.message);
        }
    };



    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        {...register("username", { required: "Must enter username" })}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        {...register("password", { required: "Must enter password" })}
                    />
                </div>

                <p className="errorLog">{error}</p>
                <button type="submit">Log in</button>
            </form>

            <p>Not registered yet?
                <button onClick={() => navigate("/register")}>Register</button>
            </p>
        </div>
    );
}

