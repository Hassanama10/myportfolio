"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  Github,
  ExternalLink,
  Code,
  Server,
  Database,
  Layers,
  ChevronRight,
  Star,
  Clock,
  Users,
  Package,
} from "lucide-react"

// Import project images
import project1 from "../../../public/project1.jpg"
import project2 from "../../../public/project2.jpg"
import project3 from "../../../public/project3.jpg"
import project4 from "../../../public/project4.jpg"
import project5 from "../../../public/project5.jpg"
import project6 from "../../../public/project6.jpg"

const techIcons = {
  WordPress: <Code className="text-blue-500" />,
  WooCommerce: <Server className="text-green-500" />,
  Elementor: <Layers className="text-purple-500" />,
  ACF: <Database className="text-orange-500" />,
  "Custom Theme": <Code className="text-white" />,
  "Custom Plugin": <Server className="text-yellow-500" />,
  PHP: <Code className="text-indigo-500" />,
  MySQL: <Database className="text-blue-500" />,
  JavaScript: <Code className="text-yellow-500" />,
  CSS: <Layers className="text-blue-500" />,
  HTML: <Code className="text-orange-500" />,
}

const projects = [
  {
    id: "01",
    title: "Bio et Bien-Être",
    badge: "FEATURED 2024",
    description:
      "Site e-commerce WordPress pour la vente d'huiles essentielles avec une expérience utilisateur fluide et engageante. Intégration complète de WooCommerce avec des fonctionnalités personnalisées pour la présentation des produits.",
    tech: ["WordPress", "WooCommerce", "Elementor", "Custom Plugin"],
    image: project1,
  
    links: {
      live: "https://www.mimarruecostours.com",
    },
  },
  {
    id: "02",
    title: "Marrakech Immobilier",
    badge: "NEW",
    description:
      "Site WordPress pour une agence immobilière à Marrakech avec système de recherche avancée de propriétés, intégration de carte interactive et formulaires de contact personnalisés.",
    tech: ["WordPress", "Custom Theme", "ACF", "JavaScript"],
    image: project2,
    stats: {
      experience: "4",
      teamSize: "3",
      users: "3k+",
      features: "40+",
    },
    links: {
      github: "https://github.com/username/marrakech-immobilier",
      live: "https://marrakech-immobilier.com",
    },
  },
  {
    id: "03",
    title: "Centre Kech",
    badge: "TRENDING",
    description:
      "Site WordPress pour un centre de soutien et d'accompagnement scolaire à Marrakech. Système de réservation de cours, espace membre et blog éducatif intégrés.",
    tech: ["WordPress", "Elementor", "Custom Plugin", "PHP"],
    image: project3,
    stats: {
      experience: "3",
      teamSize: "2",
      users: "2k+",
      features: "30+",
    },
    links: {
      github: "https://github.com/username/centrekech",
      live: "https://centerkech.vercel.app/",
    },
  },
  {
    id: "04",
    title: "Artisanat Marocain",
    badge: "E-COMMERCE",
    description:
      "Boutique en ligne WordPress pour la vente d'artisanat marocain avec expédition internationale. Intégration multi-devises et système de paiement sécurisé.",
    tech: ["WordPress", "WooCommerce", "Custom Theme", "JavaScript"],
    image: project4,
    stats: {
      experience: "4",
      teamSize: "3",
      users: "7k+",
      features: "60+",
    },
    links: {
      github: "https://github.com/username/artisanat-marocain",
      live: "https://artisanat-marocain.com",
    },
  },
  {
    id: "05",
    title: "Restaurant Tajine",
    badge: "FOOD & BEVERAGE",
    description:
      "Site WordPress pour un restaurant marocain avec système de réservation en ligne, menu interactif et galerie photo professionnelle.",
    tech: ["WordPress", "Elementor", "Custom Plugin", "ACF"],
    image: project5,
    stats: {
      experience: "3",
      teamSize: "2",
      users: "4k+",
      features: "25+",
    },
    links: {
      github: "https://github.com/username/restaurant-tajine",
      live: "https://restaurant-tajine.com",
    },
  },
  {
    id: "06",
    title: "Atlas Trekking",
    badge: "TOURISM",
    description:
      "Site WordPress pour une agence de trekking dans l'Atlas avec réservation d'excursions, blog de voyage et témoignages clients. Optimisé pour le référencement local.",
    tech: ["WordPress", "Custom Theme", "WooCommerce", "PHP"],
    image: project6,
    stats: {
      experience: "5",
      teamSize: "3",
      users: "6k+",
      features: "45+",
    },
    links: {
      github: "https://github.com/username/atlas-trekking",
      live: "https://atlas-trekking.com",
    },
  },
]

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) onClose()
    }

    // Animation on mount
    if (modalRef.current) {
      modalRef.current.style.opacity = 0
      setTimeout(() => {
        if (modalRef.current) modalRef.current.style.opacity = 1
      }, 10)
    }

    document.addEventListener("keydown", handleEsc)
    document.addEventListener("click", handleClickOutside)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "" // Restore scrolling
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 modal-overlay transition-all duration-300">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl transition-opacity duration-300"
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:text-gray-300 z-10 bg-black/40 p-2 rounded-full backdrop-blur-sm transition-transform hover:scale-110"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <div className="relative h-[350px] overflow-hidden">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={350}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md mb-4">
                {project.badge}
              </div>
              <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{project.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-8">
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">{project.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 bg-white/5 p-6 rounded-xl">
            <div className="text-center">
              <div className="flex justify-center mb-2 text-green-400">
                <Clock size={24} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{project.stats.experience}</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2 text-blue-400">
                <Users size={24} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{project.stats.teamSize}</div>
              <div className="text-sm text-gray-400">Team Size</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2 text-green-400">
                <Star size={24} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{project.stats.users}</div>
              <div className="text-sm text-gray-400">Users</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2 text-purple-400">
                <Package size={24} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{project.stats.features}</div>
              <div className="text-sm text-gray-400">Features</div>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
          <div className="flex flex-wrap gap-3 mb-10">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/10 hover:bg-white/15 transition-colors"
              >
                {techIcons[tech]}
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all hover:shadow-lg hover:shadow-green-500/10 border border-white/5 group"
            >
              <Github size={20} className="group-hover:text-green-400 transition-colors" />
              <span className="font-medium">View Code</span>
              <ChevronRight
                size={16}
                className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
              />
            </a>
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 rounded-xl text-white transition-all hover:shadow-lg hover:shadow-green-500/20 group"
            >
              <ExternalLink size={20} />
              <span className="font-medium">Live Demo</span>
              <ChevronRight
                size={16}
                className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const projectsRef = useRef(null)

  // Animation for project cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      observer.observe(card)
    })

    return () => {
      projectCards.forEach((card) => {
        observer.unobserve(card)
      })
    }
  }, [projects])

  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8" ref={projectsRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">WordPress Projects</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional WordPress websites with custom themes, plugins, and e-commerce solutions. Each project
            showcases the versatility and power of WordPress as a content management system.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-card group cursor-pointer opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all hover:shadow-xl hover:shadow-green-500/5 h-full">
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-md z-10 shadow-lg">
                    {project.badge}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col h-[calc(100%-224px)]">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md text-gray-300 text-xs"
                      >
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 rounded-md text-gray-300 text-xs">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-all group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-green-500 flex items-center justify-center gap-2">
                    <span>View Details</span>
                    <ChevronRight
                      size={16}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                  </button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}

export default Projects

