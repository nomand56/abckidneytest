
const StudentDashboard = () => {
  // Sample data for the student's courses
  const courses = [
    { name: 'The Nephron', progress: 50 },

    { name: 'Sodium & Water', progress: 20 },
    
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-3">
      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 shadow-lg"
        >
          <h2 className="text-xl font-semibold">{course.name}</h2>
          <div className="w-full h-2 bg-gray-200 mt-2 rounded-lg">
            <div
              className={`w-${course.progress} h-full ${
                course.progress >= 80 ? 'bg-green-500' : course.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              } rounded-lg`}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Progress: {course.progress}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
