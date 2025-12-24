import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const menu = [
        { name: "Dashboard", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Orders", path: "/orders" },
        { name: "Users", path: "/users" },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen">
            <div className="p-4 text-xl font-bold border-b border-gray-700">
                Admin Panel
            </div>

            <nav className="p-4 space-y-2">
                {menu.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
