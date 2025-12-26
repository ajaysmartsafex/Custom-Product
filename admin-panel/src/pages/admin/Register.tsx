import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_MUTATION } from "../../graphql/mutations";
import {
    RegisterMutation,
    RegisterMutationVariables,
} from "../../generated/graphql";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [register, { loading, error }] = useMutation<
        RegisterMutation,
        RegisterMutationVariables
    >(REGISTER_MUTATION, {
        onCompleted: (data) => {
            if (data?.register?.token) {
                localStorage.setItem("token", data.register.token);
                localStorage.setItem("role", data.register.user?.role ?? "");
                navigate("/dashboard");
            }
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({
            variables: {
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role,
            },
        });
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                {error && <p style={{ color: "red" }}>{error.message}</p>}
            </form>
        </div>
    );
};

export default Register;
