/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
import Modal from "../../../Components/Modals/Modal.jsx";
import { useParams } from "react-router-dom";
const QuizTable = ({ quizData }) => {
  const { removeQuiz } = useContext(AdminContext);
  const { chapterId } = useParams();
  const filteredQuiz = quizData?.filter((quiz) => quiz.chapter_id === chapterId);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  console.log("quizData", quizData)
  console.log("filteredQuiz", filteredQuiz)
  const [modal, setModal] = useState("");
  const handleModal = (quizId) => {
    setModal(quizId);
  }
  const handleClose = () => {
    setModal("");
  }
  const handleDelete = () => {
    removeQuiz(modal);
    setModal("");
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-6 py-3 sm:py-2">Quiz Name</th>
          <th className="px-6 py-3 sm:py-2">Subject</th>
          <th className="px-6 py-3 sm:py-2">Created At</th>
          <th className="px-6 py-3 sm:py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredQuiz?.map((quiz) => (
          <tr key={quiz._id}>
            <td className="table-cell px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 whitespace-nowrap">
              {quiz.title}
            </td>
            <td className="table-cell px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 whitespace-nowrap">
              {quiz.subject}
            </td>
            <td className="table-cell px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 whitespace-nowrap">
              {formatDate(quiz.createdAt)}
            </td>
            <td className="table-cell px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 whitespace-nowrap">
              <button className="text-red-500 hover:text-red-700" onClick={() => handleModal(quiz._id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Modal showModal={modal} handleClose={handleClose} handleDelete={handleDelete} />
  </div>
);
};
export default QuizTable;
