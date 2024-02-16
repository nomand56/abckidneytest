import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddChapterModal from "./AddChapters.jsx";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
import TruncateReadMore from "../../../../core/TruncateReadMore.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../../Components/Modals/Modal.jsx";
import EditModal from "../../EditModal.jsx";
import useOutsideClick from "../../../../core/hooks/useOutsideClick.js";


const Chapters = () => {
  const { courseId } = useParams();
  const { fetchChapters, chapters, isLoading, deleteChapter, updateChapter } = useContext(AdminContext);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState("");
  const [menu, setMenu] = useState(false);
  const handleModal = (quizId) => {
    setModal(quizId);
  }
  const handleClose = () => {
    setModal("");
  }
  const handleDelete = async () => {
    deleteChapter(modal);
    setModal("");
  }
  const modalToggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    fetchChapters(courseId);

  }, []);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description === '' || formData.title === '') {
      alert('Please fill all the fields');
      return;
    }
    await updateChapter(formData)
    onClose();
  };
  const handleMenu = (chapter) => {
    setFormData({
      id: chapter._id,
      title: chapter?.title,
      description: chapter?.description,
    })
  }

  const onClose = () => {
    setIsEdit(false);
  }
  const modalRef = useRef();
  useOutsideClick(modalRef, () => {
    setMenu(false);
  }
  );


  return (
    <div className="container mx-auto my-8 p-8 rounded-lg shadow-md bg-primary">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl text-white font-bold mb-4 sm:mb-0">Chapters</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={modalToggle}
        >
          Add Chapter
        </button>
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {chapters && chapters.length > 0 ? (
            chapters.map((chapter,index) => (
              <>
                <div
                  key={chapter._id}
                  className="bg-white rounded-lg shadow-md p-6 mb-6 sm:mb-0 flex flex-row-reverse justify-between "
                >
                  <div className="flex relative" key={chapter._id}>
                    <button
                      id={`dropdownMenuIconButton-`}
                      data-dropdown-toggle={`dropdownDots-`}
                      onClick={() => setOpenDropdownIndex(index === openDropdownIndex ? null : index)}
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                    </button>
                    {openDropdownIndex === index  && <div
                      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-6 mt-2"
                      ref={modalRef}
                      key={index}
                    >
                      <div className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownMenuIconButton`}>
                        <div className="mb-2">
                          <div className="font-medium  flex gap-5 align-center  dark:text-blue-500 hover:underline">
                            <FaEdit className="text-primary" onClick={() => { setIsEdit(true); handleMenu(chapter) }} /> Edit user
                          </div>
                        </div>
                        <div className="flex">
                          <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleModal(course._id)} /> Delete user
                        </div>
                      </div>
                    </div>}
                  </div>
                  <Link to={`/admin/chapters/${chapter._id}`} key={chapter._id}>
                    <h2 className="text-xl font-bold mb-4">{chapter?.title}</h2>
                    <TruncateReadMore text={chapter?.description} maxLength={100} />
                  </Link>
                </div>
              </>
            ))
          ) : (
            <p>No chapters available.</p>
          )}
        </div >
      )}
      <Modal showModal={modal} handleClose={handleClose} handleDelete={handleDelete} />
      {isEdit && <EditModal onClose={onClose} formData={formData} handleSubmit={handleSubmit} setFormData={setFormData} />}
      <AddChapterModal isOpen={isOpen} handleModal={modalToggle} id={courseId} />
    </div>
  );
};

export default Chapters;
