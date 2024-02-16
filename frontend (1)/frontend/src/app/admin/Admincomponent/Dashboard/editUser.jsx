import { useContext, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { AdminContext } from '../../../../core/Context/AdminContext';
    
const EditUserModal = ({ user, onClose }) => {
    const { updateUser, isLoading } = useContext(AdminContext)
    const [formData, setFormData] = useState({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.role === '' || formData.firstName === '' || formData.lastName === '' ) {
            alert('Please fill all the fields');
            return;
        }
        await updateUser(formData)
        onClose();
    };
    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <MoonLoader color="#30528f" />
            </div>
        );
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-30 backdrop-filter backdrop-blur-sm">
            <div className=" rounded-lg p-8 bg-primary">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block font-medium mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block font-medium mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block font-medium mb-1">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        >
                            <option value="">Select a role</option>
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
