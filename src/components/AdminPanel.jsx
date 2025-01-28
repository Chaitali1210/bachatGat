import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const AdminPanel = () => {
    const [showAddCRPForm, setShowAddCRPForm] = useState(false);
    const [crpList, setCRPList] = useState([]);
    const [crpDetails, setCRPDetails] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
    });
    const [showCRPList, setShowCRPList] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle visibility
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        const storedCRPList = localStorage.getItem('crpList');
        if (storedCRPList) {
            setCRPList(JSON.parse(storedCRPList));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCRPDetails({ ...crpDetails, [name]: value });

        // Mobile number validation
        if (name === 'mobile' && value.length !== 10) {
            setMobileError('Mobile number must be exactly 10 digits.');
        } else {
            setMobileError('');
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleAddCRP = () => {
        if (crpList.length >= 10) {
            alert('You can only add a maximum of 10 CRPs.');
            return;
        }

        if (!crpDetails.name || !crpDetails.mobile || !crpDetails.email || !crpDetails.password) {
            alert('Please fill in all fields.');
            return;
        }

        if (crpDetails.mobile.length !== 10) {
            alert('Mobile number must be exactly 10 digits.');
            return;
        }

        if (!validatePassword(crpDetails.password)) {
            setPasswordError('Password must contain at least one uppercase letter, one number, and one special character.');
            return;
        }

        if (!validateEmail(crpDetails.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setPasswordError('');
        setMobileError('');

        const updatedList = editingIndex !== null
            ? crpList.map((crp, index) => (index === editingIndex ? crpDetails : crp))
            : [...crpList, crpDetails];

        setCRPList(updatedList);
        localStorage.setItem('crpList', JSON.stringify(updatedList));
        setCRPDetails({ name: '', mobile: '', email: '', password: '' });
        setShowAddCRPForm(false);
        setEditingIndex(null); // Reset editing state
    };

    const loadCRPList = () => {
        const storedCRPList = localStorage.getItem('crpList');
        if (storedCRPList) {
            setCRPList(JSON.parse(storedCRPList));
            setShowCRPList(true);
        }
    };

    const handleEditCRP = (index) => {
        const crpToEdit = crpList[index];
        setCRPDetails(crpToEdit);
        setEditingIndex(index); // Set the index to edit
        setShowAddCRPForm(true); // Show the form
    };

    const handleDeleteCRP = (index) => {
        const updatedList = crpList.filter((_, i) => i !== index);
        setCRPList(updatedList);
        localStorage.setItem('crpList', JSON.stringify(updatedList));
    };

    const closeCRPList = () => {
        setShowCRPList(false);
    };
    const closeAddCRP = () => {
        setShowAddCRPForm(false);
    };

    return (
        <div className="p-2 md:p-3 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-9 bg-[#F8F9FA] p-2 sm:p-4 rounded">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-2 sm:m-6 text-[#2C3D83]">
                    Admin Panel
                </h1>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => setShowAddCRPForm(true)}
                        className="bg-[#EA6E2E] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base w-full sm:w-auto"
                    >
                        Register CRP
                    </button>
                    <button
                        onClick={loadCRPList}
                        className="bg-[#EA6E2E] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base w-full sm:w-auto"
                    >
                        View CRPs
                    </button>
                </div>
            </div>

            {/* Add/Edit CRP Form */}
            {showAddCRPForm && (
                <div className="bg-[#F8F9FA] p-3 sm:p-4 mb-4 rounded shadow-md w-full max-w-2xl mx-auto">
                    <div className="relative">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#2C3D83] text-center pr-8">
                            {editingIndex !== null ? 'Edit CRP' : 'Add CRP'}
                        </h2>
                        <IoCloseSharp
                            onClick={closeAddCRP}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-all duration-300 cursor-pointer"
                        />
                    </div>

                    <div className="space-y-3">
                        {/* Form Fields */}
                        <div>
                            <label htmlFor="name" className="text-gray-600 text-sm block mb-1">Name:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={crpDetails.name}
                                onChange={handleInputChange}
                                className="text-[#424242] bg-[#F1F8E9] px-3 py-2 w-full rounded-md text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label htmlFor="mobile" className="text-gray-600 text-sm block mb-1">Mobile Number:</label>
                            <input
                                type="number"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={crpDetails.mobile}
                                onChange={handleInputChange}
                                className="text-[#424242] bg-[#F1F8E9] px-3 py-2 w-full rounded-md text-sm sm:text-base"
                            />
                            {mobileError && <p className="text-red-500 text-xs mt-1">{mobileError}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="text-gray-600 text-sm block mb-1">Email ID:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email ID"
                                value={crpDetails.email}
                                onChange={handleInputChange}
                                className=" text-[#424242] bg-[#F1F8E9] px-3 py-2 w-full rounded-md text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-gray-600 text-sm block mb-1">Password:</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={crpDetails.password}
                                    onChange={handleInputChange}
                                    className="text-[#424242] bg-[#F1F8E9] px-3 py-2 w-full rounded-md text-sm sm:text-base"
                                />
                                <div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEye  color="#EA6E2E" /> : <AiFillEyeInvisible  color="#EA6E2E" />}
                                </div>
                            </div>
                            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                        </div>

                        <button
                            onClick={handleAddCRP}
                            className="bg-[#EA6E2E] text-white px-4 py-2 rounded mt-4 text-center w-full text-sm sm:text-base"
                        >
                            {editingIndex !== null ? 'Update CRP' : 'Save CRP'}
                        </button>
                    </div>
                </div>
            )}

            {/* CRP List */}
            {showCRPList && crpList.length > 0 && (
                <div className=" p-3 sm:p-4 rounded shadow-[0px_0px_10px_1px_rgba(0,_0,_0,_0.1)] bg-white">
                    <div className="flex justify-between items-center mb-4 px-2 sm:px-4">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#2C3D83]">Existing CRPs</h2>
                        <IoCloseSharp
                            onClick={closeCRPList}
                            className="text-gray-600 hover:text-red-500 transition-all duration-300 cursor-pointer"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {crpList.slice(0, 10).map((crp, index) => (
                            <div key={index} className="p-3 sm:p-4 rounded shadow-md flex flex-col sm:flex-row justify-between bg-[#EA6E2E] text-white">
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm sm:text-base">Name: {crp.name}</p>
                                    <p className="text-sm sm:text-base">Mobile: {crp.mobile}</p>
                                    <p className="text-sm sm:text-base">Email ID: {crp.email}</p>
                                </div>
                                <div className="flex justify-end sm:flex-col gap-4 mt-2 sm:mt-0">
                                    <FaRegEdit
                                        size={20}
                                        color='#2C3D83'
                                        onClick={() => handleEditCRP(index)}
                                        className="cursor-pointer"
                                    />
                                    <RiDeleteBinLine
                                        size={20}
                                        color='#2C3D83'
                                        onClick={() => handleDeleteCRP(index)}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;