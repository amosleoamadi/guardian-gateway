import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("userName");

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Course Registration", path: "/dashboard/courses", icon: "📚" },
    { name: "Exam Results", path: "/dashboard/results", icon: "📝" },
    { name: "Tuition Fees", path: "/dashboard/fees", icon: "💰" },
    { name: "My Profile", path: "/dashboard/profile", icon: "👤" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-orange-700">ESTAM PORTAL</h2>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-6 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive(item.path)
                    ? "bg-orange-50 text-orange-700 border-r-4 border-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button at bottom */}
        <div className="p-6 border-t mt-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header - Now in Layout */}
        <header className="bg-white shadow-sm px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {userName}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Academic Session: 2025/2026
            </p>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
