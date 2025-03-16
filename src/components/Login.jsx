import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "./Sidebar"


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Default Admin credentials
    const adminCredentials = {
        email: "admin123@gmail.com",
        password: "Admin@123",
    };

    // State for login form
    const [formData, setFormData] = useState({
        emailOrMobile: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        emailOrMobile: "",
        password: "",
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    // Handle form data changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    // Validation functions
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).+$/.test(password);

    // Handle form submission with validation
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            let valid = true;
            let emailOrMobileError = "";
            let passwordError = "";

            if (!formData.emailOrMobile) {
                emailOrMobileError = "Please enter email or mobile number.";
                valid = false;
            } else if (!validateEmail(formData.emailOrMobile) && !validateMobile(formData.emailOrMobile)) {
                emailOrMobileError = "Please enter a valid email address or mobile number.";
                valid = false;
            }

            if (!validatePassword(formData.password)) {
                passwordError = "Password must contain at least one uppercase letter, one number, and one special character.";
                valid = false;
            }

            if (!formData.emailOrMobile || !formData.password) {
                valid = false;
                if (!formData.emailOrMobile) emailOrMobileError = "Please fill in your email or mobile number.";
                if (!formData.password) passwordError = "Please fill in your password.";
            }

            if (!valid) {
                setErrors({ emailOrMobile: emailOrMobileError, password: passwordError });
                toast.error("Invalid login details. Please check and try again!");
                setLoading(false);
                return;
            }

            setErrors({ emailOrMobile: "", password: "" });

            // Admin login
            if (formData.emailOrMobile === adminCredentials.email && formData.password === adminCredentials.password) {
                localStorage.setItem("userType", "admin");
                localStorage.setItem("adminData", JSON.stringify(adminCredentials));
                toast.success("Admin login successful! Redirecting...");
                setTimeout(() => navigate("/admin"), 1500);
            }
            // CRP login
            else if (formData.emailOrMobile && formData.password) {
                const crpData = { emailOrMobile: formData.emailOrMobile, password: formData.password };
                localStorage.setItem("userType", "crp");
                localStorage.setItem("crpData", JSON.stringify(crpData));
                toast.success("CRP login successful! Redirecting...");
                setTimeout(() => navigate("/crp"), 1500);
            } else {
                toast.error("Invalid login credentials. Please try again!");
            }

            setLoading(false);
        }, 2000);


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA]">
            {/* <Sidebar /> */}
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg h-fit">
                <h1 className="text-2xl font-semibold text-center mb-6 text-[#EA6E2E]">
                    बचत गट Login
                </h1>
                <ToastContainer position="top-right" autoClose={4000} />
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="emailOrMobile" className="block text-sm font-medium text-[#424242]">
                            Email or Mobile Number
                        </label>
                        <input
                            type="text"
                            name="emailOrMobile"
                            id="emailOrMobile"
                            value={formData.emailOrMobile}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email or mobile number"
                            className="mt-1 block w-full rounded-md px-4 py-3 text-sm border-[#A5D6A7] bg-[#F1F8E9] focus:border-[#FF7043] focus:ring-[#FF7043]"
                        />
                        {errors.emailOrMobile && <p className="text-sm text-red-500 mt-2">{errors.emailOrMobile}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#424242]">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="mt-1 block w-full rounded-md px-4 py-3 text-sm border-[#A5D6A7] bg-[#F1F8E9] focus:border-[#FF7043] focus:ring-[#FF7043]"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FF7043] hover:text-[#EA6E2E]"
                            >
                                {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-md text-lg font-medium text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#EA6E2E] hover:bg-[#FF5722]"}`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
