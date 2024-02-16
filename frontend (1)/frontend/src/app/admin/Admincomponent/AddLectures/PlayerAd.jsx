import { useState, useCallback, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { FaTimes, FaTrash } from "react-icons/fa";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import Modal from "../../../Components/Modals/Modal.jsx";

function PlayerAd() {
  const { chapterId } = useParams();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { uploadLecture, isLoading, fetchLectures, lectures,deleteLecture} = useContext(AdminContext);
  useEffect(() => {
    fetchLectures(chapterId);
  }, []);
  const handleVideoChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
 


  const handleTitleChange = (e) => {
    setVideoTitle(e.target.value);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (!videoFile) {
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length === 1 && droppedFiles[0].type.startsWith("video/")) {
          console.log(droppedFiles[0])
          setVideoFile(droppedFiles[0]);
        }
      }
    },
    [videoFile]
  );
  const [modal, setModal] = useState("");
  const handleModal = (quizId) => {
    setModal(quizId);
  }
  const handleClose = () => {
    setModal("");
  }
  const handleDelete = async () => {
    deleteLecture(modal);
    setModal("");
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!videoFile) {
      // Handle drag over if needed
    }
  };

  const handlePopupSubmit = async () => {
    try {
      if (!videoFile) {
        toast.error("Please choose a video file");
        return;
      }
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("title", videoTitle);
      formData.append("chapter_id", chapterId);
      await uploadLecture(formData);

      await fetchLectures(chapterId);

      setVideoTitle("");
      setVideoFile(null);
      setShowPopup(false);

      toast.success("Video submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit video");
    }
  };
  if (isLoading) {
    return <div
      className="flex justify-center items-center h-screen">
      <MoonLoader color="#30528F" />

    </div>
  }

  return (
<div className="mt-8 sm:mt-24 text-center">
  <div
    className="container mx-auto p-4 relative flex flex-col items-center"
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    style={{ minHeight: "100px" }}
  >
    <h1 className="text-2xl sm:text-3xl font-bold mb-4">Video Section</h1>
    <div className="overflow-x-auto">
      <table className="mt-4 w-full border-collapse">
        <thead className="shadow-lg">
          <tr>
            <th className="p-4 text-left align-middle">Video</th>
            <th className="p-4 text-center align-middle">Title</th>
            <th className="p-4 text-left align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lectures &&
            Array.isArray(lectures) &&
            lectures.map((video, index) => (
              <tr key={index}>
                <td className="p-2 text-left align-middle border-b-2">
                  <div className="m-1 sm:w-96 overflow-hidden rounded-md mb-1">
                    <ReactPlayer
                      url={video.url}
                      controls
                      width="100%"
                      height="100%"
                    />
                  </div>
                </td>
                <td className="p-2 text-center align-middle border-b-2">
                  <div className="mb-1">{video.title}</div>
                </td>
                <td className="p-2 text-center align-middle border-b-2">
                  <button className="text-red-600 px-2 py-1 rounded-md">
                    <span
                      className="material-icons"
                      onClick={() => handleModal(video._id)}
                    >
                      <FaTrash />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
    <Modal showModal={modal} handleClose={handleClose} handleDelete={handleDelete} />

      </table>
    </div>
    <button
      onClick={() => setShowPopup(true)}
      className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 sm:absolute sm:top-0 sm:right-0 sm:mt-4 sm:mr-4"
    >
      Add Lecture
    </button>
  </div>

  {showPopup && (
    <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-8 rounded-md shadow-md">
      <div className="text-right mb-4">
        <button onClick={() => setShowPopup(false)} className="text-gray-500">
          <FaTimes />
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter video title"
        value={videoTitle}
        onChange={handleTitleChange}
        className="py-2 px-4 mb-4 w-full border rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose a video file
      </label>
      <input
        type="file"
        accept=".mp4"
        onChange={handleVideoChange}
        className="py-2 px-4 mb-4 w-full border rounded-md"
      />
      <button
        onClick={handlePopupSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Submit
      </button>
    </div>
  )}
</div>
);
  }
export default PlayerAd;
