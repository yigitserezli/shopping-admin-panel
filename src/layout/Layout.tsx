import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <ToastContainer />
            <div className="bg-gradient-to-tr from-[#141414] via-[#1C1C1C] to-[#242424] text-white flex flex-col h-screen">
                {/* Header */}
                <Header />

                <div className="flex flex-1 relative overflow-hidden">
                    {/* Sidebar */}
                    <div className={`${sidebarOpen ? "w-64" : "w-8"} transition-all duration-300 h-full flex flex-col`}>
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 focus:outline-none text-white cursor-pointer">
                            {sidebarOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
                        </button>

                        <div className={`flex-1 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <SideBar />
                        </div>
                    </div>
                    {/* Main Content */}
                    <main className="flex-1 overflow-auto p-16">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;
