import { useEffect, useState } from "react";
import QuizFront from "../studentPortal/StudentHome/QuizFront.jsx";
import VideoPlayer from "../studentPortal/StudentHome/VideoPlayerFron.jsx";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import TotalBodyWaterInteractive from "../studentPortal/InteractiveSection/TotalBodyWater/InteractiveWater.jsx";
import NephronMicroanatomyInteractive from "../studentPortal/InteractiveSection/Nephron/NephronMicanatomy.jsx";
import SaltDistributionInteractive from "../studentPortal/InteractiveSection/SodiumDistribution/SaltDistribution.jsx";
import axios from "axios";
import { apiUrl } from "../../utils/config.js";

const OpenAccess = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showInter, setShowInter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chapters, setChapters] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const studentChapters = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/openAccess`);
        if (response.data !== null) {
          setChapters(response.data.chapters);
          setLectures(response.data.videos);
          setQuiz(response.data.quiz);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    studentChapters();
  }, []);
  const chapterComponents = {
    nephron: <NephronMicroanatomyInteractive />,
    water: <SaltDistributionInteractive />,
    sodium: <TotalBodyWaterInteractive />,
  };

  const selectedChapterTitle = selectedChapter
    ? selectedChapter.title.toLowerCase()
    : "";
  const fetchVideoAndQuizData = async () => {
    try {
      setSelectedVideo(lectures);
      setSelectedQuiz(quiz);
    } catch (error) {
      console.error("Error fetching video and quiz data:", error);
    }
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setIsVideoOpen(false);
    setIsQuizOpen(false);
    setShowInter(false);
    fetchVideoAndQuizData();
  };

  const handleInterClick = () => {
    setShowInter(true);
    setIsVideoOpen(false);
    setIsQuizOpen(false);
  };

  const handleVideoClick = () => {
    setIsVideoOpen(true);
    setIsQuizOpen(false);
    setShowInter(false);
  };

  const handleQuizClick = (chapterId, quizId) => {
    const chapterQuizzes = quiz.filter(
      (quizItem) => quizItem.chapter_id === chapterId
    );
    const selectedQuiz = chapterQuizzes.find(
      (quizItem) => quizItem._id === quizId
    );
    setSelectedQuiz(selectedQuiz);
    setShowInter(false);
    setIsQuizOpen(true);
    setIsVideoOpen(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MoonLoader color="#30528f" />
      </div>
    );
  }

  return (
    <div className={`flex ${isDrawerOpen ? "drawer-open" : ""}`}>
      <div
        className={`sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 ${
          isDrawerOpen ? "drawer" : "max-md:hidden"
        }`}
      >
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="md:hidden cursor-pointer" onClick={closeDrawer}>
            <i className="fa fa-close"></i>
          </div>

          {chapters.map((chapter) => (
            <div key={chapter._id} className="mb-2">
              <div
                className={`p-4 cursor-pointer flex items-center justify-between ${
                  selectedChapter === chapter
                    ? "bg-gradient-to-r from-blue-500 to-blue-800 text-white"
                    : "bg-white border"
                } rounded-md mb-2`}
                onClick={() => handleChapterClick(chapter)}
              >
                {chapter.title}
                <FaChevronDown className="ml-2 inline-block" />
              </div>
              {selectedChapter === chapter && (
                <div className="ml-4">
                  {lectures
                    .filter(
                      (lectureItem) => lectureItem.chapter_id === chapter._id
                    )
                    .map((lectureItem) => (
                      <div
                        key={lectureItem._id}
                        className="cursor-pointer text-blue-500 mb-2"
                        onClick={() => {
                          setSelectedVideo(lectureItem);
                          handleVideoClick();
                        }}
                      >
                        {lectureItem.title} lectures
                      </div>
                    ))}

                  {quiz
                    .filter((quizItem) => quizItem.chapter_id === chapter._id)
                    .map((quizItem) => (
                      <div
                        key={quizItem._id}
                        className="cursor-pointer text-blue-500 mb-2"
                        onClick={() =>
                          handleQuizClick(chapter._id, quizItem._id)
                        }
                      >
                        {quizItem.title} Quiz
                      </div>
                    ))}
                  <div
                    className="cursor-pointer text-blue-500"
                    onClick={handleInterClick}
                  >
                    Interactive
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`sm:w-1/2 md:w-2/3 lg:w-3/4 p-4 ${
          !isDrawerOpen ? "drawer" : "hidden"
        }`}
      >
        <div className="md:hidden cursor-pointer" onClick={handleMenuIconClick}>
          <FaBars size={24} />
        </div>
        <h2 className="text-2xl text-center font-bold mb-2">
          {selectedChapter ? selectedChapter.title : "No Chapter Selected"}
        </h2>

        {selectedChapter && (
          <div>
            <p className="text-xl font-semibold mb-2">
              Description: {selectedChapter.description}
            </p>

            {showInter &&
              Object.keys(chapterComponents).some((keyword) =>
                selectedChapterTitle.includes(keyword)
              ) &&
              chapterComponents[
                Object.keys(chapterComponents).find((keyword) =>
                  selectedChapterTitle.includes(keyword)
                )
              ]}

            {isVideoOpen && selectedVideo && selectedVideo.url ? (
              <div>
                <h3 className="text-xl font-semibold mt-4 mb-2">Videos</h3>
                {selectedVideo.length > 0 ? (
                  <VideoPlayer videoUrl={selectedVideo[0].url} />
                ) : (
                  <p>No lectures available for this chapter.</p>
                )}
              </div>
            ) : null}

            {isQuizOpen && selectedQuiz ? (
              <div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  Selected Quiz
                </h3>
                {selectedQuiz.questions && selectedQuiz.questions.length > 0 ? (
                  <QuizFront data={selectedQuiz.questions} />
                ) : (
                  <p>No quiz available for this chapter.</p>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenAccess;
