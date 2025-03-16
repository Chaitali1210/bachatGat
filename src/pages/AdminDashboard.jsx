import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { AttachMoney, People, Assignment, TrendingUp, ExitToApp } from "@mui/icons-material";

const data = [
    { title: "Total Savings", icon: <AttachMoney fontSize="large" />, value: "₹1,50,000" },
    { title: "Total Members", icon: <People fontSize="large" />, value: "250" },
    { title: "Active Loans", icon: <Assignment fontSize="large" />, value: "45" },
    { title: "Monthly Growth", icon: <TrendingUp fontSize="large" />, value: "₹20,000" },
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Mocking a CRP login status (replace this with actual authentication logic)
    const isCRPLoggedIn = localStorage.getItem("userRole") === "CRP";


    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 flex-1">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8 border-b-2 border-[#34495E]">
                    <h1 className="text-2xl font-bold mb-4 px-1.5">Admin Dashboard</h1>
                    {/* <Button 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<ExitToApp />} 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button> */}

                    <h1 className="text-3xl font-bold mb-4 text-center px-1.5 text-red-600 tracking-wide">
                        बचत गट 
                    </h1>


                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((item, index) => (
                        <Card key={index} className="shadow-lg p-4 flex items-center gap-4">
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <div className="text-orange-500">{item.icon}</div>
                                    <div>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold">
                                            {item.value}
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CRP Panel Link (Only if CRP is logged in) */}
                {isCRPLoggedIn && (
                    <div className="mt-6">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/crp-panel")}
                        >
                            Go to CRP Panel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
