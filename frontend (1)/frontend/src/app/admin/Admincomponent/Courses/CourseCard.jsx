/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import TruncateReadMore from "../../../../core/TruncateReadMore.jsx";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
import { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../../Components/Modals/Modal.jsx";
import { MoonLoader } from "react-spinners";
import EditModal from "../../EditModal.jsx";
const CourseCard = ({ course }) => {
  const { deleteCourse, updateCourse, isLoading } = useContext(AdminContext);
  const [modal, setModal] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [menu, setMenu] = useState(false);
  const [formData, setFormData] = useState({
    id: course._id,
    title: course?.title,
    description: course?.description,
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description === '' || formData.title === '') {
      alert('Please fill all the fields');
      return;
    }
    await updateCourse(formData)
    onClose();
  };
  const handleModal = (quizId) => {
    setModal(quizId);
  }
  const handleClose = () => {
    setModal("");
  }
  const handleDelete = async () => {
    deleteCourse(modal);
    setModal("");
  }

  const onClose = () => {
    setIsEdit(false);
  }



  if (!course) {
    return <p className="text-red-500">Course not found</p>;
  }
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
    <div className="bg-primary h-64 text-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ">
      <div className="flex justify-end relative">
        <button
          id={`dropdownMenuIconButton-`}
          data-dropdown-toggle={`dropdownDots-`}
          onClick={() => setMenu(!menu)}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
        {menu && <div
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-6 mt-2"
        >
          <div className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownMenuIconButton`}>
            <div className="mb-2">
              <div  className="font-medium  flex gap-5 align-center  dark:text-blue-500 hover:underline">
                <FaEdit className="text-primary" onClick={() => setIsEdit(true)} /> Edit user
              </div>
            </div>
            <div className="flex">
              <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleModal(course._id)} /> Delete user
            </div>
          </div>
        </div>}


      </div>
      <h2 className="text-lg font-bold">{course?.title}</h2>
      <Modal showModal={modal} handleClose={handleClose} handleDelete={handleDelete} />
      {isEdit && <EditModal onClose={onClose} formData={formData} handleSubmit={handleSubmit} setFormData={setFormData} />}
      <TruncateReadMore text={course?.description} maxLength={100} />
      <div className="flex ">
        <button className="bg-white rounded w-40 h-8 mt-1">
          <Link
            to={`/admin/courses/${course?._id}`}
            className="text-primary text-lg"
          >
            GO TO COURSE
          </Link>
        </button>
      </div>
    </div >
  );
};
export default CourseCard;
