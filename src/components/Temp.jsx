const SkillsSection = () => {
  const skills = [
    {
      category: "Frontend",
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Tailwind CSS",
        "Bootstrap",
        "axios",
      ],
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express"],
    },
    {
      category: "Database",
      technologies: ["MongoDB"],
    },
    {
      category: "State Management",
      technologies: ["redux"],
    },
    {
      category: "Version Control",
      technologies: ["git/github"],
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Technical Skills
        </h2>

        <div className="relative">
          <div className="flex justify-between gap-4 relative">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className="w-1/4 bg-white rounded-lg shadow-lg overflow-hidden relative z-10 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 text-2xl font-bold">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
                    {skill.category}
                  </h3>

                  <div className="flex flex-col gap-2">
                    {skill.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-2 bg-gray-50 rounded-md text-center hover:bg-blue-50 transition-colors duration-200"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
