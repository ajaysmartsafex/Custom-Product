// admin-panel/src/layout/Header.tsx

import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Header = () => {
    const role = useSelector((state: RootState) => state.auth.role);

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="text-sm text-gray-600">
                Role: <span className="font-medium">{role}</span>
            </div>
        </header>
    );
};

export default Header;
