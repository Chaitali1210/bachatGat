import React, { useState } from 'react';
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
    const [showCRPList, setShowCRPList] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle visibility
    const [editingIndex, setEditingIndex] = useState(null);

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

        if (crpDetails.mobile.length !== 10 ){
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

    return (
        <div className='bg-[#F8F9FA] p-3'>
            <div className='flex justify-between items-center mb-9'>
                <h1 className="text-3xl font-bold text-center m-6 text-[#2C3D83]">Admin Panel</h1>
                <div className="mb-4 text-center m-4">
                    <button
                        onClick={() => setShowAddCRPForm(true)}
                        className="bg-[#EA6E2E] text-white px-4 py-2 rounded mr-2"
                    >
                        Register CRP
                    </button>
                    <button
                        onClick={loadCRPList}
                        className="bg-[#EA6E2E] text-white px-4 py-2 rounded"
                    >
                        View CRPs
                    </button>
                </div>
            </div>

            {showAddCRPForm && (
                <div className="bg-[#F8F9FA] p-4 mb-4 rounded shadow-md w-160 mx-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-[#2C3D83] text-center">{editingIndex !== null ? 'Edit CRP' : 'Add CRP'}</h2>
                    <label htmlFor="name" className='text-[gray] ml-2 '>Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={crpDetails.name}
                        onChange={handleInputChange}
                        className="border-[#A5D6A7] text-[#424242] bg-[#F1F8E9] px-4 py-2 mb-2 w-full rounded-md mt-2"
                    />
                    <label htmlFor="mobile"  className='text-[gray] ml-2 '>Mobile Number:</label>
                    <input
                        type="number"
                        name="mobile"
                        class="no-spinner" 
                        placeholder="Mobile Number"
                        value={crpDetails.mobile}
                        onChange={handleInputChange}
                        className="border-[#A5D6A7] text-[#424242] bg-[#F1F8E9] px-4 py-2 mb-2 w-full rounded-md mt-2"
                    />
                    {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>}
                    <label htmlFor="email"  className='text-[gray] ml-2'>Email ID:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        value={crpDetails.email}
                        onChange={handleInputChange}
                        className="border-[#A5D6A7] text-[#424242] bg-[#F1F8E9] px-4 py-2 mb-2 w-full rounded-md mt-2 mt-2"
                    />
                    <div className="relative">
                        <label htmlFor="password"  className='text-[gray] ml-2 '>Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={crpDetails.password}
                            onChange={handleInputChange}
                            className="border-[#A5D6A7] text-[#424242] bg-[#F1F8E9] px-4 py-2 mb-2 w-full rounded-md mt-2" 
                        />
                        <div
                            className="absolute right-2 top-11 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </div>
                    </div>
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    <button
                        onClick={handleAddCRP}
                        className="bg-[#EA6E2E] text-[white] px-4 py-2 rounded mt-2"
                    >
                        {editingIndex !== null ? 'Update CRP' : 'Save CRP'}
                    </button>
                </div>
            )}
            {showCRPList && crpList.length > 0 && (
                <div className="border p-4 rounded shadow-md" style={{ backgroundColor: '', color: 'white' }}>
                    <div className="flex justify-between items-center mb-4 px-4">
                        <h2 className="text-3xl font-semibold text-[#2C3D83]">Existing CRPs</h2>
                        <IoCloseSharp
                            onClick={closeCRPList}
                            className="text-gray-600 hover:text-red-500 transition-all duration-300 cursor-pointer"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {crpList.slice(0, 10).map((crp, index) => (
                            <div key={index} className="p-4 rounded shadow-md flex justify-between" style={{ backgroundColor: '#EA6E2E' }}>
                                <div>
                                    <p className="font-semibold">Name: {crp.name}</p>
                                    <p>Mobile: {crp.mobile}</p>
                                    <p>Email ID: {crp.email}</p>
                                </div>
                                <div className="flex mt-2 gap-4">
                                    <FaRegEdit size={25} color='#2C3D83' onClick={() => handleEditCRP(index)} className="cursor-pointer"></FaRegEdit>
                                    <RiDeleteBinLine size={26} color='#2C3D83' onClick={() => handleDeleteCRP(index)} className="cursor-pointer">
                                    </RiDeleteBinLine>
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
