import React, { useState } from "react";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../Transition/PageTransition";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const playNotificationSound = () => {
    const audio = new Audio("../../../public/pop.mp3");
    audio.play().catch((error) => console.log("Audio playback failed:", error));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://formspree.io/f/xdkeelap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setShowSuccess(true);
        playNotificationSound();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const socialLinks = [
    { Icon: Facebook, href: "", bgColor: "bg-blue-600" },
    { Icon: Github, href: "#", bgColor: "bg-gray-800" },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/hassan_amagroud/",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/hassan-amagroud-6a0952290", bgColor: "bg-blue-500" },
    { Icon: Twitter, href: "#", bgColor: "bg-sky-500" },
    { Icon: Youtube, href: "#", bgColor: "bg-red-600" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-black to-violet-800 px-8 py-12 animate-fadeIn">
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-6xl font-bold text-white space-y-2 text-center">
            <div>
              Let's <span className="text-violet-800">talk business</span>.
            </div>
            <div className="text-white">But you first.</div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left Section */}
          <div className="space-y-8 animate-slideInLeft">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Let's Stay Connected
              </h2>
              <p className="text-gray-400">
                Let's connect! Reach out on any platform and let's collaborate
                or chat about new opportunities.
              </p>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              {socialLinks.map(({ Icon, href, bgColor }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`${bgColor} p-6 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:rotate-6 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/20 animate-fadeInUp`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-white transition-transform duration-300 hover:animate-wiggle" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="relative animate-slideInRight">
            {/* <h2 className="text-3xl font-bold text-white mb-6">Contact Me</h2> */}
            <p className="text-gray-400 mb-8">
              I am always looking for new opportunities
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Who am I chatting with today?"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 transition-all hover:bg-gray-700"
                />
                {errors.name && (
                  <p className="text-red-500 mt-1 text-sm animate-shake">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Let's keep in touch via email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 transition-all hover:bg-gray-700"
                />
                {errors.email && (
                  <p className="text-red-500 mt-1 text-sm animate-shake">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="What's brewing in your mind?"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 transition-all hover:bg-gray-700"
                />
                {errors.message && (
                  <p className="text-red-500 mt-1 text-sm animate-shake">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/50 group animate-pulse-slow flex items-center justify-center space-x-2"
              >
                <span className="transform transition-transform group-hover:translate-x-1">
                  Contact
                </span>
                <MessageSquare className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            {showSuccess && (
              <AnimatePresence>
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  exit={{ y: -100, opacity: 0 }}
                  className="fixed top-4 right-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-lg shadow-2xl backdrop-blur-sm border border-violet-400/30"
                >
                  <motion.div
                    className="flex items-center gap-3"
                    animate={{
                      scale: [1, 1.02, 1],
                      transition: {
                        duration: 0.3,
                        repeat: Infinity,
                        repeatDelay: 1,
                      },
                    }}
                  >
                    <span role="img" aria-label="success" className="text-xl">
                      ✨
                    </span>
                    <span className="font-medium">
                      Message sent successfully!
                    </span>
                    <span
                      role="img"
                      aria-label="celebration"
                      className="text-xl"
                    >
                      🎉
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
