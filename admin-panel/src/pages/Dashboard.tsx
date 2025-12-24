const Dashboard = () => {
    const stats = [
        { label: "Total Products", value: 120 },
        { label: "Orders Today", value: 35 },
        { label: "Users", value: 540 },
        { label: "Revenue", value: "₹45,000" },
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white p-4 rounded shadow"
                    >
                        <p className="text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
