// admin-panel/src/routes/AppRoutes.tsx

import { Routes, Route } from "react-router-dom";
import { AdminLogin, AdminRegister } from "../pages/admin/index";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../features/auth/ProtectedRoute";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Route>
    </Routes>
);

export default AppRoutes;