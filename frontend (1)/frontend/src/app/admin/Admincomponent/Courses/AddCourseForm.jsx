import { useContext, useRef, useState } from "react";
import useOutsideClick from "../../../../core/hooks/useOutsideClick.js";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
import { toast } from "react-toastify";

const AddCourseModal = ({ isOpen, handleModal }) => {
  const { createCourse } = useContext(AdminContext);
  const modalRef = useRef();
  useOutsideClick(modalRef, () => {
    handleModal();
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return toast.info("Please fill all the fields");
    }
    createCourse(formData);
    resetForm();
    handleModal();
  };

  return (
    <>
      {isOpen ? (
        <div
          className={`fixed -inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-800 bg-opacity-75 transition-all duration-300`}
        >
          <div
            className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg transition-all duration-300"
            ref={modalRef}
          >
            <h2 className="text-2xl font-bold mb-4">Add Course</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="form-input border-2 border-gray-200 w-full p-2 rounded-lg focus:outline-none focus:border-primary  "
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="form-textarea border-2 border-gray-200 w-full p-2 rounded-lg focus:outline-none focus:border-primary  "
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddCourseModal;
