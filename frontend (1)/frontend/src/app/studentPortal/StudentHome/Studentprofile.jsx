import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../core/Context/AuthContext.jsx';

const StudentProfile = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState({
    name: '',
    lastName: '',
    email: '',
    studentID: '',
    image: '',
  });

  useEffect(() => {
    if (user) {
      setStudent({
        name: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        studentID: generateRandomStudentID(),
        image: user.image || '',
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setStudent({
        ...student,
        image: event.target.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e, field) => {
    setStudent({
      ...student,
      [field]: e.target.innerHTML,
    });
  };

  const renderEditableField = (label, content, key) => (
    <div className="text-left mb-4">
      <label className="text-gray-700 block mb-1">{label}:</label>
      <div
        contentEditable
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
        onBlur={(e) => handleChange(e, key)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );

  const generateRandomStudentID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-10 ">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-6 bg-white rounded-lg shadow-lg mx-4 text-center">
        <h1 className="text-4xl font-semibold mb-6 text-primary">Student Profile</h1>

        <div className="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full shadow-lg transition-transform transform hover:scale-105">
          <img
            src={student.image || '/abckidneylogo-faded.png'}
            alt="Student"
            className="w-full h-full object-cover rounded-full"
          />
          <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white cursor-pointer hover:bg-blue-600">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <FontAwesomeIcon icon={faCamera} size="2x" />
          </label>
        </div>

        <div className="grid gap-4">
          {renderEditableField("Name", student.name, "name")}
          {renderEditableField("Last Name", student.lastName, "lastName")}
          {renderEditableField("Email", student.email, "email")}
          {renderEditableField("Student ID", student.studentID, "studentID")}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
