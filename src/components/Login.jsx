import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"; // Heroicons v1

const Login = () => {
    const navigate = useNavigate();

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

    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

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

    // Validation function for email
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailPattern.test(email);
    };

    // Validation function for mobile number
    const validateMobile = (mobile) => {
        const mobilePattern = /^[0-9]{10}$/; // Validates a 10-digit number
        return mobilePattern.test(mobile);
    };

    // Validation function for password
    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).+$/;
        return passwordPattern.test(password);
    };

    // Handle form submission with validation
    const handleLogin = (e) => {
        e.preventDefault();

        let valid = true;
        let emailOrMobileError = "";
        let passwordError = "";

        // Validate email or mobile number
        if (!formData.emailOrMobile) {
            emailOrMobileError = "Please enter email or mobile number.";
            valid = false;
        } else if (!validateEmail(formData.emailOrMobile) && !validateMobile(formData.emailOrMobile)) {
            emailOrMobileError = "Please enter a valid email address or mobile number.";
            valid = false;
        }

        // Validate password
        if (!validatePassword(formData.password)) {
            passwordError =
                "Password must contain at least one uppercase letter, one number, and one special character.";
            valid = false;
        }

        // Ensure all fields are filled
        if (!formData.emailOrMobile || !formData.password) {
            valid = false;
            if (!formData.emailOrMobile) emailOrMobileError = "Please fill in your email or mobile number.";
            if (!formData.password) passwordError = "Please fill in your password.";
        }

        // If validation fails, set errors and return
        if (!valid) {
            setErrors({
                emailOrMobile: emailOrMobileError,
                password: passwordError,
            });
            return;
        }

        // Clear errors
        setErrors({ emailOrMobile: "", password: "" });

        // Admin login
        if (
            formData.emailOrMobile === adminCredentials.email &&
            formData.password === adminCredentials.password
        ) {
            localStorage.setItem("userType", "admin");
            localStorage.setItem("adminData", JSON.stringify(adminCredentials));
            navigate("/admin");
        }
        // CRP login
        else if (formData.emailOrMobile && formData.password) {
            const crpData = { emailOrMobile: formData.emailOrMobile, password: formData.password };
            localStorage.setItem("userType", "crp");
            localStorage.setItem("crpData", JSON.stringify(crpData));
            navigate("/crp");
        } else {
            console.error("Invalid Login Details");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA]">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg h-100">
                <h1 className="text-2xl font-semibold text-center mb-6 text-[#EA6E2E]">
                    बचत गट Login
                </h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="emailOrMobile"
                            className="block text-sm font-medium text-[#424242]"
                        >
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
                        {errors.emailOrMobile && (
                            <p className="text-sm text-red-500 mt-2">{errors.emailOrMobile}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-[#424242]"
                        >
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
                                {passwordVisible ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-2">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-md text-lg font-medium bg-[#EA6E2E] text-white hover:bg-[#FF5722] transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
