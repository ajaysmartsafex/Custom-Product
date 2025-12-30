// admin-panel/src/pages/admin/AdminRegister.tsx

import { useState } from "react";
import { useMutation } from "@apollo/client/react"; // ✅ Apollo v4
import { RegisterDocument } from "../../generated"; // ✅ typed document
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState(""); // ✅ REQUIRED
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const [register, { loading, error }] = useMutation(RegisterDocument);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const result = await register({
            variables: {
                name,              // ✅ REQUIRED
                email,
                password,
                role: "ADMIN",     // 👈 admin role
            },
        });

        if (!result.data?.register) return;

        // After successful register → redirect to login
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4">Admin Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-2 mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border p-2 mb-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
export const AdminRegister = Register;
