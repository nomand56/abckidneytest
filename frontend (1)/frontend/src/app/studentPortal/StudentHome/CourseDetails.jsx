import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuizFront from "./QuizFront.jsx";
import VideoPlayer from "./VideoPlayerFron.jsx";
import { FaChevronDown, FaHome } from "react-icons/fa";
import { StudentContext } from "../../../core/Context/StudentContext.jsx";
import { MoonLoader } from "react-spinners";
import NephronMicroanatomyInteractive from "../InteractiveSection/Nephron/NephronMicanatomy.jsx";
import WaterDistributionInteractive from "../InteractiveSection/WaterDistribution/Intractive/WaterDistributionInteractive.jsx";
import SodiumDistributionInteractive from "../InteractiveSection/SodiumDistribution/SaltDistribution.jsx";
import TotalBodySodiumInteractive from "../InteractiveSection/TotalBodySodium/TotalBodySodium.jsx";
import TotalBodyWaterInteractive from "../InteractiveSection/TotalBodyWater/InteractiveWater.jsx";
import NephronFunctionInteractive1 from "../InteractiveSection/Nephron/NephronFunction.jsx";
import NephronMicroanatomyInteractiv2 from "../InteractiveSection/Nephron/NephronInteractive2/NephronMicroanatomy2.jsx";
import InteractiveWaterHandling from "../InteractiveSection/Water Handling/InteractiveWaterHandling.jsx";
import SoudiumResobration from "../InteractiveSection/SoudiumResobration/SoudiumResobration.jsx";
import Diuretic from "../InteractiveSection/SoudiumResobration/Diuretic.jsx";
import DiureticMOA from "../InteractiveSection/SoudiumResobration/DiureticMOA.jsx";
import Sodiumhypervolemia from "../InteractiveSection/Sodiumhypervolemia/Sodium hypervolemia .jsx";

const CourseDetails = () => {
  const {
    studentChapters,
    chapters,
    isLoading,
    quiz,
    lectures
  } = useContext(StudentContext);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showInter, setShowInter] = useState(false);
  const [interactiveTitle, setInteractiveTitle] = useState("");
  const [initialSelectedChapter, setInitialSelectedChapter] = useState(null);
  const { courseId } = useParams();
  useEffect(() => {
    // Fetch student chapters and set the initial selected chapter
    studentChapters(courseId).then((chaptersData) => {
      // Assuming you want the first chapter to be initially selected
      const firstChapter = chaptersData[0];
      setSelectedChapter(firstChapter);
      setInitialSelectedChapter(firstChapter);
    });
  }, [courseId]);

  const chapterComponents = {
    nephronmicroanatomy: {
      title: 'Nephron Microanatomy',
      sections: [
        { id: 1, title: 'Neprhon Microanatomy 1-0', component: <NephronMicroanatomyInteractive /> },
        { id: 2, title: 'Nephron Microanatomy 2-0  ', component: <NephronMicroanatomyInteractiv2 /> },
      ],
    },
    nephronfunction: {
      title: 'Nephron Function',
      sections: [
        { id: 3, title: 'Nephron Function Interactive ', component: <NephronFunctionInteractive1 /> },
      ],
    },
    waterdistribution: {
      title: 'Water Distribution',
      sections: [
        { id: 4, title: 'Water Distribution', component: <WaterDistributionInteractive /> },
   
      
      ]

    },
    sodiumdistribution: {
      title: 'Sodium Distribution',
      sections: [{ id: 4, title: 'Sodium Distribution', component: <SodiumDistributionInteractive /> }],

    },
    totalbodysodium: {
      title: 'Total Body Sodium',
      sections: [{ id: 5, title: 'Total Body Sodium', component: <TotalBodySodiumInteractive /> }]
    },
    totalbodywater: {
      title: 'Total Body Water',
      sections: [{ id: 6, title: 'Total Boday Water', component: <TotalBodyWaterInteractive /> }],
    },
    sodiumhandlinghypervolemia: {
      title: 'Sodium handling Hypervolemia',
      sections:[{ id: 11, title: 'Sodiumhypervolemia', component: <Sodiumhypervolemia /> }]

    },
    Renalsodiumreabsorptionmechanisms: {
      title: 'Renal Sodium Reabsorption Mechanisms',
      sections: [
        { id: 9, title: 'SodiumResobration ', component: <SoudiumResobration /> },
        { id: 8, title: 'Diuretic site of action', component: <Diuretic /> },
        { id: 10, title: 'Diuretic MOA', component: <DiureticMOA /> },
      
      ]

    },
    Waterhandlingadhstimulus: {
      title: 'Water Handling ADH Stimulus',
      sections:  [{ id: 7, title: 'Water Handling   ', component: <InteractiveWaterHandling /> },]


    },
  };
  
  console.log("Selected Chapter", selectedChapter)
  const handleChapterClick = (chapter) => {
    // Check if the initial selected chapter is set and if the clicked chapter is the initial selected chapter
    if (initialSelectedChapter && chapter._id === initialSelectedChapter._id) {
      // If true, return early to prevent further execution
      return;
    }
  
    setSelectedChapter((prevChapter) => (prevChapter === chapter ? null : chapter));
    setIsVideoOpen(false);
    setIsQuizOpen(false);
    setShowInter(false);
  };
  

  const handleInterClick = () => {
    setShowInter(true);
    setIsVideoOpen(false);
    setIsQuizOpen(false);
  };
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
  };

  const handleVideoClick = () => {
    setIsVideoOpen(true);
    setIsQuizOpen(false);
    setShowInter(false);
  };

  const handleQuizClick = (chapterId, quizId) => {
    const chapterQuizzes = quiz.filter((quizItem) => quizItem.chapter_id === chapterId);
    const selectedQuiz = chapterQuizzes.find((quizItem) => quizItem._id === quizId);
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
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 p-4 mb-4 lg:mb-0 order-2 lg:order-1">
      <Link to="/student/dashboard" className="text-xl font-semibold  p-2 cursor-pointer bg-white border rounded-md mb-2">
        <FaHome className="inline-block mb-2 mr-2" />
        Dashboard
      </Link>

      <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Chapters</h2>
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
                <div className="flex items-center">
                  <FaChevronDown className="inline-block mr-2" />
                </div>

                </div>
              {selectedChapter === chapter && (
                <div className="ml-4">
                  {
                    lectures.filter((lectureItem) => (lectureItem.chapter_id === chapter._id)).map((lectureItem) => (
                      <div
                        key={lectureItem._id}
                        className="cursor-pointer  mb-2 border-gray-300 rounded-lg transition duration-300 py-4 px-4 ease-in-out transform bg-gradient-to-r from-blue-400 to-blue-400 text-white hover:bg-blue-200 hover:scale-105"
                        onClick={() => {
                          setSelectedVideo(lectureItem)

                          handleVideoClick()
                        }}
                      >
                        {lectureItem.title} lectures
                      </div>))}
                  {quiz
                    .filter((quizItem) => quizItem.chapter_id === chapter._id)
                    .map((quizItem) => (
                      <div
                        key={quizItem._id}
                        className="cursor-pointer  mb-2 border-gray-300 rounded-lg transition duration-300 py-4 px-4 ease-in-out transform bg-gradient-to-r from-blue-400 to-blue-400 text-white hover:bg-blue-200 hover:scale-105"
                        onClick={() => handleQuizClick(chapter._id, quizItem._id)}
                      >
                        {quizItem.title} Quiz
                      </div>
                    ))}
                  {Object.entries(chapterComponents).map(([key, value]) => {
                    if (value.title.trim() === selectedChapter.title.trim()) {
                      return <div key={key} className="cursor-pointer  mb-2">
                        {value.sections ? (
                          value.sections.map((section) => (
                            <div className=" border-gray-300 mb-2 rounded-lg transition duration-300 py-4 px-4 ease-in-out transform bg-gradient-to-r from-blue-400 to-blue-400 text-white hover:bg-blue-200 hover:scale-105" key={section.id} onClick={() => {
                              handleSectionClick(section.id)
                              setInteractiveTitle(key)
                              handleInterClick()
                            }}>
                              {section.title} Interactive
                            </div>
                          ))
                        ) : (
                          <div onClick={() => handleSectionClick(key)}>{value.title}</div>
                        )}
                      </div>
                    }
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-3/4 p-4 order-2 lg:order-1">

        <h2 className=" text-center font-bold mb-2 text-xl">
          {selectedChapter ? selectedChapter.title : "No Chapter Selected"}
        </h2>
        {selectedChapter && (
          <div>
            <p className="text-xl max-md:text-lg font-semibold mb-2">
<p className="text-2xl">            Learning Objectives:</p>

              <ul>
                {selectedChapter.description.split('\n').map((line, index) => (
                  <li key={index}>
                    {index + 1}. {line.trim()} {/* trim to remove leading/trailing spaces */}
                  </li>
                ))}
              </ul>
            </p>



            {showInter && selectedSection !== null && (
              <div>
                {chapterComponents[interactiveTitle].sections
                  .filter((section) => section.id === selectedSection)
                  .map((section) => section.component)}
              </div>
            )}
            <>
              {selectedVideo?.url && isVideoOpen ? (
                <div>
                  <h3 className="text-xl font-semibold mt-4 mb-2">Videos</h3>
                  <VideoPlayer videoUrl={selectedVideo.url} />
                </div>
              ) : null}
            </>
            
            {isQuizOpen && selectedQuiz ? (
              <div>
                <h3 className="text-xl font-semibold mt-4 mb-2">Selected Quiz</h3>
                {selectedQuiz.questions && selectedQuiz.questions.length > 0 ? (
                  <QuizFront data={selectedQuiz.questions} />
                ) : null
                }
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
