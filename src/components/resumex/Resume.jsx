import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Server, Code2, ChevronDown } from "lucide-react";
import ProfilePhoto from "./ProfilePhoto";
import PageTransition from "../Transition/PageTransition";
const Resume = () => {
  const [selectedSection, setSelectedSection] = useState("Education");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "Experience":
        return <ExperienceSection />;
      case "Education":
        return <EducationSection />;
      case "Skills":
        ProfilePhoto;
        return <SkillsSection />;
      case "About me":
        return <AboutSection />;
      default:
        return <EducationSection />;
    }
  };

  return (
    <PageTransition>
      <div className="bg-gradient-to-b from-black to-violet-800 pt-16">
        <div
          className="min-h-screen  "
          style={{ width: "92%", margin: "auto" }}
        >
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            {/* Header with Name */}

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Sidebar */}
              <motion.div
                className="md:w-1/4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-3xl font-mono text-white mb-8">
                  Why hire me?
                </h2>
                <p className="text-gray-300 mb-8">
                  As a software engineer, I combine creativity with technical
                  expertise to build innovative solutions that make a real
                  impact.
                </p>

                {/* Dropdown Navigation for Mobile */}
                <div className="relative md:hidden mb-8">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-full flex items-center justify-between p-4 bg-violet-600 text-white rounded-lg"
                  >
                    {selectedSection}
                    <ChevronDown
                      className={`transform transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl z-10"
                      >
                        {["Experience", "Education", "Skills", "About me"].map(
                          (item) => (
                            <button
                              key={item}
                              onClick={() => {
                                setSelectedSection(item);
                                setIsMenuOpen(false);
                              }}
                              className={`w-full text-left p-4 hover:bg-violet-700 transition-colors ${
                                item === selectedSection
                                  ? "bg-violet-600 text-white"
                                  : "text-gray-300"
                              }`}
                            >
                              {item}
                            </button>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex flex-col space-y-2">
                  {["Experience", "Education", "Skills", "About me"].map(
                    (item) => (
                      <motion.button
                        key={item}
                        whileHover={{ x: 10 }}
                        onClick={() => setSelectedSection(item)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          item === selectedSection
                            ? "bg-violet-600 text-white"
                            : "bg-gray-800/50 text-gray-300 hover:bg-violet-700/50"
                        }`}
                      >
                        {item}
                      </motion.button>
                    )
                  )}
                </nav>
              </motion.div>

              {/* Right Content Area */}
              <motion.div
                className="md:w-3/4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const EducationSection = () => (
  <div>
    <h2 className="text-3xl font-mono text-white mb-8">My education</h2>
    <div className="space-y-12">
      {[
        {
          year: "2023-2025",
          title: "ISTA NTIC SYBA Marrakech",
          institution: "developement digital web fullstack",
        },
        {
          year: "2022 - 2023",
          title: "2022-2023 - cadi ayyad MARRAKECHe",
          institution: "étudiant en economie et gestion",
        },
        {
          year: "2021-2022",
          title: "LYCEE QUALIFIANT MOUSSA BEN NOUSSAYRE",
          institution: "Baccalaureat (Science physique et chimie)",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="relative pl-8 border-l-2 border-violet-400"
        >
          <div className="absolute w-4 h-4 bg-violet-400 rounded-full -left-[9px] top-0" />
          <span className="text-violet-400 font-mono">{item.year}</span>
          <h3 className="text-xl text-white mt-2">{item.title}</h3>
          <p className="text-gray-300">{item.institution}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const SkillsSection = () => (
  <div>
    <h2 className="text-3xl font-mono text-white mb-8">Skills & Expertise</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-violet-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            {category.icon}
            <h3 className="text-white font-semibold">{category.title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {category.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 p-2 rounded bg-gray-700/50 hover:bg-violet-600/50 transition-colors"
              >
                {skill.icon}
                <span className="text-gray-300 text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ExperienceSection = () => (
  <div>
    <h2 className="text-3xl font-mono text-white mb-8">Experience</h2>
    <div className="space-y-12">
      {[
        {
          year: "2023",
          title: "Projet E-commerce ",
          company: "ISTA NTIC SYBA Marrakech",
          description:
            "Créer une plateforme e-commerce sur mesure pour la vente d'huiles essentielles nécessite une approche structurée qui répond aux besoins spécifiques de votre client tout en offrant une expérience utilisateur fluide et engageante..",
        },
        {
          year: "2023 - 2024",
          title: "Projet E-commerce (CMS Strapi)",
          company: "ISTA NTIC SYBA Marrakech",
          description:
            "Déployer un site e-commerce complet en utilisant le CMS Strapi, en intégrant des solutions API-first.",
        },
        {
          year: "2023 - 2024",
          title: "Projet pour un site de location de voitures",
          company: "ISTA NTIC SYBA Marrakech",
          description:
            "Implémenter un système de gestion des réservations avec fonctionnalités de recherche et de paiement.",
        },
        {
          year: "2023 - 2024",
          title: "Projet pour un site de location de voitures",
          company: "ISTA NTIC SYBA Marrakech",
          description:
            "Implémenter un système de gestion des réservations avec fonctionnalités de recherche et de paiement.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="relative pl-8 border-l-2 border-violet-400"
        >
          <div className="absolute w-4 h-4 bg-violet-400 rounded-full -left-[9px] top-0" />
          <span className="text-violet-400 font-mono">{item.year}</span>
          <h3 className="text-xl text-white mt-2">{item.title}</h3>
          <p className="text-violet-300">{item.company}</p>
          <p className="text-gray-300 mt-2">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const AboutSection = () => (
  <div>
    <h2 className="text-3xl font-mono text-white mb-8">About Me</h2>
    <ProfilePhoto /> {/* Add this line */}
    <div className="space-y-6 text-gray-300">
      <p>
        Développeur Web Fullstack avec 2 ans d'expérience, spécialisé en React,
        Laravel, et WordPress. Créatif et passionné, je maîtrise HTML, CSS, et
        JavaScript. Dévoué à suivre les dernières tendances technologiques et à
        fournir des solutions modernes et performantes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-violet-500/20">
          <h3 className="text-violet-400 font-semibold mb-2">Location</h3>
          <p>Marrakech, maroc</p>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-violet-500/20">
          <h3 className="text-violet-400 font-semibold mb-2">Languages</h3>
          <p>English , Franch , Arabic</p>
        </div>
      </div>
    </div>
  </div>
);

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5 text-violet-400" />,
    skills: [
      {
        name: "HTML",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-orange-500 font-bold">
            <span className="text-lg">&lt;/&gt;</span>
          </div>
        ),
      },
      {
        name: "CSS",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-blue-500 font-bold">
            #
          </div>
        ),
      },
      {
        name: "JavaScript",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center bg-yellow-400 text-black rounded">
            JS
          </div>
        ),
      },
      {
        name: "TypeScript",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded">
            TS
          </div>
        ),
      },
    ],
  },
  {
    title: "Frameworks",
    icon: <Code2 className="w-5 h-5 text-violet-400" />,
    skills: [
      {
        name: "React",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-cyan-400 font-bold">
            ⚛
          </div>
        ),
      },
      {
        name: "Laravel",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-red-500">
            🔸
          </div>
        ),
      },
      {
        name: "Tailwind",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-cyan-400 font-bold">
            TW
          </div>
        ),
      },
      {
        name: "Bootstrap",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-purple-500 font-bold">
            B
          </div>
        ),
      },
    ],
  },
  {
    title: "Backend & Database",
    icon: <Server className="w-5 h-5 text-violet-400" />,
    skills: [
      {
        name: "PHP",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-indigo-500 font-bold">
            𝔓
          </div>
        ),
      },
      {
        name: "Python",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-yellow-300">
            🐍
          </div>
        ),
      },
      {
        name: "MySQL",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-blue-500 font-bold">
            𝓜
          </div>
        ),
      },
      {
        name: "WordPress",
        icon: (
          <div className="w-6 h-6 flex items-center justify-center text-blue-400">
            W
          </div>
        ),
      },
    ],
  },
];
export default Resume;
