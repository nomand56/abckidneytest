import {  useRef} from 'react';

import useOutsideClick from '../../core/hooks/useOutsideClick';

const EditModal = ({ onClose, formData, setFormData, handleSubmit }) => {
    console.log("formData", formData)
    const modalRef = useRef();
    useOutsideClick(modalRef, () => {
        onClose();
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
        console.log(formData)
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center z-30 backdrop-filter backdrop-blur-sm " ref={modalRef}>
            <div className=" rounded-lg p-8 bg-primary">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"

                            value={formData.title}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            type='textarea'
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full  text-black" />


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

export default EditModal;
