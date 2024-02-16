import { useContext, useEffect, useState } from "react";
import QuizModal from "./QuizModal.jsx";
import QuizTable from "./QuizTable.jsx";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { AdminContext } from "../../../../core/Context/AdminContext.jsx";
import { toast } from "react-toastify";

function QuizSection() {
  const { addQuiz, isLoading, fetchAllQuiz, quiz } = useContext(AdminContext);
  const { chapterId } = useParams();

  useEffect(() => {
    fetchAllQuiz();
  }, []);
  const handleQuiz = () => {
    setIsModalOpen(false);
    setFormData({
      questions: [
        {
          question: "",
          correctAnswer: "",
          options: ["", "", "", ""],
        },
      ],
    });
    setError("");
  };

  const [quizLimit, setQuizLimit] = useState(10);
  const [currentCard, setCurrentCard] = useState(0);
  const [formData, setFormData] = useState({
    questions: [
      {
        question: "",
        correctAnswer: "",
        options: ["", "", "", ""],
      },
    ],
  });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStart, setModalStart] = useState(true);
  const [quizTitle, setQuizTitle] = useState({
    title: "",
    subject: "",
  });

  const isCurrentCardValid = () => {
    const { question, correctAnswer, options } =
      formData.questions[currentCard];
    return (
      question.trim() !== "" &&
      correctAnswer.trim() !== "" &&
      options.every((option) => option.trim() !== "")
    );
  };

  const handleInputChange = (key, value) => {
    setFormData((prevFormData) => {
      const newQuestions = [...prevFormData.questions];
      newQuestions[currentCard][key] = value;
      return {
        ...prevFormData,
        questions: newQuestions,
      };
    });
  };

  const handleAddQuestion = () => {
    if (isCurrentCardValid()) {
      setFormData((prevFormData) => {
        const newQuestions = [...prevFormData.questions];
        newQuestions.push({
          question: "",
          correctAnswer: "",
          options: ["", "", "", ""],
        });
        return {
          ...prevFormData,
          questions: newQuestions,
        };
      });
      setError("");
    } else {
      setError("Please fill out all fields before adding the question.");
    }
  };

  const handleNextCard = () => {
    if (isCurrentCardValid()) {
      handleAddQuestion();
      setCurrentCard(currentCard + 1);
    } else {
      setError("Please fill out all fields before moving to the next card.");
    }
  };
  console.log("QUiz limit", quizLimit);

  console.log("current card", currentCard);
  const handleSaveQuiz = async () => {
    const data = {
      chapter_id: chapterId,
      title: quizTitle.title,
      subject: quizTitle.subject,
      questions: formData.questions,
    };

    await addQuiz(data);
    toast.success("Quiz added successfully.");
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#30528f" />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-y-auto h-full p-4 md:flex md:flex-col">
        <div className="flex-grow">
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            User Quiz Panel
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white p-2 mb-3 rounded text-sm md:text-base"
          >
            Add Question
          </button>

          {error && (
            <p className="text-red-500 mb-4 text-sm md:text-base">{error}</p>
          )}

          <QuizModal isOpen={isModalOpen} onClose={() => handleQuiz()}>
            {modalStart ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="max-w-sm md:max-w-lg m-auto">
                  <input
                    type="text"
                    placeholder="Title"
                    value={quizTitle.title}
                    onChange={(e) =>
                      setQuizTitle({ ...quizTitle, title: e.target.value })
                    }
                    className="w-full p-2 border rounded mb-2 text-sm md:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={quizTitle.subject}
                    onChange={(e) =>
                      setQuizTitle({ ...quizTitle, subject: e.target.value })
                    }
                    className="w-full p-2 border rounded text-sm md:text-base"
                  />
                  <input
                    type="number"
                    placeholder="Enter the number of questions"
                    value={quizLimit}
                    onChange={(e) => setQuizLimit(e.target.value)}
                    className="w-full p-2 border rounded text-sm md:text-base"
                  />
                </div>
                <div className="m-auto">
                  <button
                    onClick={() => {
                      setModalStart(false);
                    }}
                    className="bg-green-500 text-white p-2 rounded text-sm md:text-base"
                  >
                    Add Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-sm md:max-w-lg m-auto">
                <p className="mt-4 text-sm md:text-base">
                  Quiz : {currentCard + 1}/{quizLimit}
                </p>
                {["question", "correctAnswer"].map((field) => (
                  <div key={field} className="mb-4">
                    <input
                      type="text"
                      placeholder={
                        field?.charAt(0).toUpperCase() + field?.slice(1)
                      }
                      value={formData?.questions[currentCard][field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full p-2 border rounded text-sm md:text-base"
                      required
                    />
                  </div>
                ))}
                {formData?.questions[currentCard]?.options?.map(
                  (option, index) => (
                    <div key={index} className="mb-4">
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [
                            ...formData?.questions[currentCard].options,
                          ];
                          newOptions[index] = e.target.value;
                          handleInputChange("options", newOptions);
                        }}
                        className="w-full p-2 border rounded text-sm md:text-base"
                        required
                      />
                    </div>
                  )
                )}
                {currentCard === +quizLimit - 1 ? (
                  <button
                    onClick={handleSaveQuiz}
                    className="bg-green-500 text-white p-2 rounded text-sm md:text-base"
                  >
                    Save Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextCard}
                    className="bg-green-500 text-white p-2 rounded text-sm md:text-base"
                  >
                    Next Card
                  </button>
                )}
              </div>
            )}
          </QuizModal>
          <QuizTable quizData={quiz} />
        </div>
      </div>
    </>
  );
}

export default QuizSection;
