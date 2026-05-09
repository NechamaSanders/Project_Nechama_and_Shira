import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import apiService from "../services/apiService";

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();

    const password = watch("password");

    const handleRegister = async (data) => {
        try {
            setServerError(null);

            const newUser = {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                city: data.city,
                street: data.street,
                zipcode: data.zipcode,
                password: data.password
            };

            await apiService.create('users', newUser);

            alert("Registration succeeded! Now you can log in");
            navigate("/login");

        } catch (err) {
            setServerError(err.message || "Error in registration process");
        }
    };

    return (
        <div className="register-page">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit(handleRegister)}>

                <div>
                    <label>First Name: </label>
                    <input {...register("firstName", { required: true })} />
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
                <div>
                    <label>Last Name: </label>
                    <input {...register("lastName", { required: true })} />
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
                <div>
                    <label>Username: </label>
                    <input {...register("username", { required: true })} />
                </div>

                <div>
                    <label>Email: </label>
                    <input type="email" {...register("email", { required: true })} />
                </div>
                <div>
                    <label>Phone: </label>
                    <input {...register("phone", { required: true })} />
                </div>
                <div>
                    <label>City: </label>
                    <input {...register("city")} />
                </div>
                <div>
                    <label>Street: </label>
                    <input {...register("street")} />
                </div>
                <div>
                    <label>Zipcode: </label>
                    <input {...register("zipcode")} />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: { value: 4, message: "Password must be at least 4 characters long" }
                        })}
                    />
                </div>

                <div>
                    <label>Verify Password: </label>
                    <input
                        type="password"
                        {...register("verifyPassword", {
                            validate: value => value === password || "Passwords don't match"
                        })}
                    />
                    {errors.verifyPassword && <span>{errors.verifyPassword.message}</span>}
                </div>

                {serverError && <p style={{ color: 'red' }}>{serverError}</p>}

                <button type="submit">Register</button>
            </form>

            <button onClick={() => navigate("/login")}>Back to Login </button>
        </div>
    );
}

