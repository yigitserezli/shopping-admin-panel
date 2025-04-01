const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {/* Sales Overview */}
            <div className="bg-transparent border border-gray-700 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Sales Overview</h2>
                <p className="text-gray-400">
                    Total Sales: <span className="text-white">$12,345</span>
                </p>
                <p className="text-gray-400">
                    Today's Sales: <span className="text-white">$1,234</span>
                </p>
                <p className="text-gray-400">
                    Monthly Growth: <span className="text-green-400">+12%</span>
                </p>
            </div>

            {/* New Orders */}
            <div className="bg-transparent border border-gray-700 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">New Orders</h2>
                <p className="text-gray-400">
                    You have <span className="text-white">5</span> new orders.
                </p>
                <ul className="list-disc list-inside text-gray-400 mt-2">
                    <li>Order #1024</li>
                    <li>Order #1025</li>
                    <li>Order #1026</li>
                </ul>
            </div>

            {/* User Statistics */}
            <div className="bg-transparent border border-gray-700 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">User Statistics</h2>
                <p className="text-gray-400">
                    Total Users: <span className="text-white">1,234</span>
                </p>
                <p className="text-gray-400">
                    Active Users: <span className="text-white">567</span>
                </p>
                <p className="text-gray-400">
                    New Signups: <span className="text-green-400">+23</span>
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
