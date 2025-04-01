import { Link } from "react-router-dom";
import { FiHome, FiShoppingBag, FiShoppingCart, FiSettings } from "react-icons/fi";

const SideBar = () => {
    return (
        <aside className="w-64 p-6 h-full border-r-2 border-t-2 border-b-2 border-gray-600 rounded-r-3xl shadow-lg">
            <ul className="space-y-6">
                <li>
                    <Link to="/" className="flex items-center px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
                        <FiHome size={22} className="mr-3" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/products" className="flex items-center px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
                        <FiShoppingBag size={22} className="mr-3" />
                        <span className="text-sm font-medium">Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/orders" className="flex items-center px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
                        <FiShoppingCart size={22} className="mr-3" />
                        <span className="text-sm font-medium">Orders</span>
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className="flex items-center px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
                        <FiSettings size={22} className="mr-3" />
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default SideBar;
