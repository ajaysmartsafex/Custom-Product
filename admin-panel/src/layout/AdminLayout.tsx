// admin-panel/src/layout/AdminLayout.tsx

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-gray-100">
                <Header />
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
