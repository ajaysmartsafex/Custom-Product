// admin-panel/src/pages/admin/Login.tsx

import { useState } from "react";
import { useMutation } from "@apollo/client/react"; // ✅ FIXED
import { LoginDocument } from "../../generated";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { loading, error }] = useMutation(LoginDocument);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await login({
            variables: { email, password },
        });

        if (!result.data?.login) return;

        dispatch(
            loginSuccess({
                token: result.data.login.token,
                role: result.data.login.user.role ?? null,
            })
        );

        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className="text-red-500 text-sm mb-2">
                        {error.message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
export const AdminLogin = Login;
