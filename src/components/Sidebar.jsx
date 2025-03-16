import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    HomeIcon,
    UsersIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    CogIcon,
    MenuAlt3Icon,
    XIcon,
    LogoutIcon
} from "@heroicons/react/outline";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear();  // Clears user session
        navigate("/");  // Redirects to login page
    };

    return (
        <div className={`h-screen bg-[#2C3E50] text-white transition-all ${isOpen ? "w-64" : "w-18"} flex flex-col justify-between `}>
            {/* Sidebar Toggle Button */}
            <div>
                <div className="flex items-center justify-between p-4">
                    <h1 className={`text-xl font-bold transition-all ${isOpen ? "block" : "hidden"}`}>Admin Panel</h1>
                    <button onClick={toggleSidebar} className="text-white focus:outline-none cursor-pointer">
                        {isOpen ? <XIcon className=" h-6 w-6" /> : <MenuAlt3Icon className="h-8 w-8" />}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4 flex flex-col gap-4 ">
                    <SidebarLink to="/admin" Icon={HomeIcon} text="Dashboard" isOpen={isOpen} />
                    <SidebarLink to="/crp-management" Icon={UsersIcon} text="CRP Management" isOpen={isOpen} />
                    <SidebarLink to="/loans" Icon={CurrencyDollarIcon} text="Loan Sanctions" isOpen={isOpen} />
                    <SidebarLink to="/reports" Icon={ChartBarIcon} text="Reports" isOpen={isOpen} />
                    <SidebarLink to="/settings" Icon={CogIcon} text="Settings" isOpen={isOpen} />
                </nav>
            </div>

            {/* Logout Button */}
            <div className="p-2">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 bg-white hover:bg-red-600 transition text-red-600 hover:text-white rounded"
                >
                    <LogoutIcon className="h-6 w-6" />
                    {isOpen && <span className="ml-3 text-xl font-semibold px-8">Logout</span>}
                </button>
            </div>
        </div>
    );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, Icon, text, isOpen }) => (
    <Link to={to} className= {`flex items-center space-x-3 px-4 py-3 hover:bg-[#34495E] transition ${
            isOpen ? "justify-start space-x-3" : "justify-center"
        }` }>
        <Icon className="h-6 w-6" />
        {isOpen && <span className="text-lg">{text}</span>}
    </Link>
);

export default Sidebar;
