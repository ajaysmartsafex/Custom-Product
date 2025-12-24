import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../features/auth/ProtectedRoute";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Route>
    </Routes>
);

export default AppRoutes;