import { useContext, useRef, useState } from "react";
import EditUserModal from "./editUser";
import Modal from "../../../Components/Modals/Modal";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AdminContext } from "../../../../core/Context/AdminContext";
import useOutsideClick from "../../../../core/hooks/useOutsideClick";

export const DashboardTable = ({ students }) => {
  const [studentData, setStudentData] = useState(null);
  const { deleteUser } = useContext(AdminContext);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [modal, setModal] = useState("");

  const handleModal = (quizId) => {
    setModal(quizId);
  }
  
  const handleClose = () => {
    setModal("");
  }
  const handleDelete = async () => {
    await deleteUser(modal);
    setModal("");
  }

  const handleEdit = (student) => {
    console.log("student", student)
    setStudentData(student);
  }
  const modalRef = useRef();
  useOutsideClick(modalRef, () => {
    setOpenDropdownIndex(null);
  });

  const onClose = () => {
    setStudentData(null);
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-3 font-medium tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 font-medium tracking-wider">
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>

        </thead>

        <tbody>
          {students?.map((student, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'
              }
            >

              <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} alt={`${student.firstName} image`} />
                <div className="ps-3">
                  <div className="text-base font-semibold">{student?.firstName} {student?.lastName}</div>
                  <div className="font-normal text-gray-500">{student?.email}</div>
                </div>
              </th>
              <td className="px-6 py-4 uppercase">{student.role}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full bg-green-500 me-2`}></div>
                  Online
                </div>
              </td>
              <td >
                <button
                  id={`dropdownMenuIconButton-${index}`}
                  data-dropdown-toggle={`dropdownDots-${index}`}
                  onClick={() => setOpenDropdownIndex(index === openDropdownIndex ? null : index)}
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </button>
                {openDropdownIndex === index && (
                  <div
                    id={`dropdownDots-${index}`}
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2"
                  >
                    <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownMenuIconButton-${index}`}>
                      <li className="mb-2">
                        <div onClick={() => handleEdit(student)} className="font-medium  flex gap-5 align-center  dark:text-blue-500 hover:underline">
                          <FaEdit className="text-primary" /> Edit user
                        </div>
                      </li>
                      <li className="flex gap-5 align-center font-medium cursor-pointer">
                        <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleModal(student._id)} /> Delete user
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal showModal={modal} handleClose={handleClose} handleDelete={handleDelete} />
      {studentData && <EditUserModal user={studentData} onClose={onClose} />}
    </div>
  );
};
