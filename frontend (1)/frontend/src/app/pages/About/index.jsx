import { teamMembers } from "../../core/constants/about.jsx";
function About() {
  return (
    <div className="team">
      <h1 className="text-center py-10 text-4xl font-bold">
        About ABCKidney PhysioSim
      </h1>
      jsx Copy code
      <div className="bg-blue-500 text-black p-4 rounded-lg shadow-lg">
        <p className="text-center py-10 px-4 md:px-20 leading-7">
          Welcome to ABC Kidney PhysioSim! ABC Kidney PhysioSim is a
          comprehensive interactive educational tool where kidney physiology is
          made simple. Find bite-sized, easily navigable modules complete with
          easy-to-understand kidney physiology concepts, clinical correlation,
          interactive simulation-like quizzes and multiple-choice questions,
          perfect for self-directed learning needs.
        </p>
      </div>
      <h1 className="text-center py-10 text-4xl font-bold">The Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teamMembers.map((person, index) => (
          <div className="bg-blue-200 p-4 rounded-lg" key={index}>
            <img
              src={person.image}
              alt={person.name}
              className="mx-auto w-32 h-32 rounded-full"
            />
            <h3 className="text-center py-2 font-bold text-xl">
              {person.name}
            </h3>
            <p className="text-center py-2">{person.position}</p>
            <p className="py-2 px-4 leading-7">{person.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
