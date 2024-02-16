import TruncateReadMore from "../../../core/TruncateReadMore";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sophia Ambruso, DO",
      position: "Creator/Director/Animator",
      bio: "Dr. Ambruso is a nephrologist & clinician educator at the University of Colorado School of Medicine. Her main passions are patient care and medical education. Dr. Ambruso also has an interest in education as it intersects with social and digital media. She is the co-creator and cohost of the Kidney Essentials podcast discussing salient nephrologic topics tailored to medical students, residents and all nephrocurious practitioners. Finally, Dr. Ambruso is one of the 'filtrates' on Freely Filtered, a podcast that discusses recent NephJC articles.",
      image: "/Sophia Ambdruso-WEB.png",
    },

    {
      name: "Momen Abbassi, MD",
      position: "Illustrator/Animator",
      bio: "A nephrology fellow at Hadassah medical center and a medical illustrator. Creator of The monthly published Kidney Comics and Visual abstract editor in CJASN and Kidney Medicine. NSMC intern of 2022 and current NSMC faculty member. Special interest in urine microscopy, GN, and using cartoons in medical educationc",
      image: "/Abbasi.png",
    },
    {
      name: "Emmanuel Cruz",
      position: "Project Manager/future doctor",
      bio: "Emmanuel is a medical student at CU Anschutz, class of 2026. In his previous career, he was a computational chemist and R&D Head for a small biotech startup where he was able to work on two assets that later became FDA approved. His role was in modeling chemical and biophysical properties of small molecule compounds against cancer targets using machine learning. Emmanuel has always found education as an opportunity to put complex topics into the simplest language possible. Here at ABC Kidney, Emmanuel helps with product management, development of the platform, and good vibes.",
      image: "Emmal.png",
    },
  ];
  const contributors = [
    {
      name: "Andrea Chau",
      image: "fgt.jpeg",
      postion: "Contributor",
    },
    {
      name: "Spencer Evans",
      image: "fgt.jpeg",
      postion: "Contributor",
    },
    {
      name: "Tyler Harris, MD",
      image: "fgt.jpeg",
      postion: "Contributor",
    },
    {
      name: "Eva Stein, MD   ",
      image: "fgt.jpeg",
      postion: "Contributor",
    },
    {
      name: "Bang Zeng, MD ",
      image: "fgt.jpeg",
      postion: "Contributor",
    },
  ];

  return (
    <div className="bg-gray-100  flex flex-col container mx-auto">
      <header className="relative py-6 mt-2 shadow-md max-lg:mx-auto flex">
        <img
          src="/page-title.jpg"
          alt="Education Hub"
          className="w-full h-64 md:h-96 object-cover object-center opacity-80"
        />
        <div className="absolute top-0 left-0 bg-primary right-0 bottom-0 bg-opacity-50 text-center p-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-8xl font-bold text-white">
            About ABCKidney PhysioSim
          </h1>
        </div>
      </header>
      <section className="container mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl md:text-4xl font-semibold">Our Mission</h2>
            <p className="text-gray-600 text-center max-w-prose mt-4">
              Nephrology is fun!! And Kidney physiology is not as hard as you
              think! We want you to feel that way too. For this reason ABC
              Kidney PhysioSim integrates effective durable learning strategies
              into a platform that offers short easily navigable animated
              physiology tutorials and clinical correlation vignettes with
              interactive simulation-like activities and multiple-choice
              questions, both designed to test newly acquired knowledge.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl md:text-4xl font-semibold">Who We Are</h2>
            <p className="text-gray-600 text-center max-w-prose mt-4">
              Hi! I’m Sophia Ambruso. I’m a Nephrologist and clinician educator
              at the University of Colorado School of Medicine. I collaborate
              with a group of medical students, residents and fellows who are as
              passionate about nephrology and medical education as I am. We all
              believe that kidney physiology is really cool and want to create
              an education forum conducive to learning. Welcome!
            </p>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-semibold">Meet Our Team</h2>
          <p className="mb-10 mt-4 text-xl">
            Our dedicated professionals are here to support you on your
            educational journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-44  mx-auto mb-2"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
                <TruncateReadMore
                  text={member.bio}
                  maxLength={100}
                  key={`readmore-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className=" px-4 py-8">
        <div className="container mx-auto text-center ">
          <h2 className="text-3xl font-semibold mb-6">Contributors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {contributors.map((contributor, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className="h-32 w-32 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {contributor.name}
                </h3>
                <p className="text-lg">{contributor.postion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
