import logo from "../../../../core/assets/abckidneylogo.png";

// eslint-disable-next-line react/prop-types
function QuizModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  ">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-md p-10  m-auto">
        <div>
          <img
            src={logo}
            alt="logo"
            className="w-20   opacity-80"
          />
        </div>
        <button
          className="absolute top-0 right-0 m-3 text-gray-600"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default QuizModal;
