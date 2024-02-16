import { Link } from "react-router-dom";
import CardGrid from "./CardGrid.jsx";
const Home = () => {
  return (
    <div className="bg-gray-100 mt-4 container mx-auto">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4 max-sm:text-2xl">
            Welcome to ABC Kidney
          </h1>
          <p className="text-lg text-gray-600">
            An interactive virtual educational platform designed to empower
            learners with knowledge and skills.
          </p>
        </header>
        <main className="mt-8 flex justify-center items-center mb-7">
          <Link
            to="/openAccess"
            className="bg-primary hover:bg-primary text-white font-bold py-3 px-6 rounded-lg"
          >
            Explore the Platform
          </Link>
        </main>

        <CardGrid />
      </div>
    </div>
  );
};

export default Home;
