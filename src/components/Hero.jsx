import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Find The Best Tutors & Tuitions",
    description:
      "Connect with verified tutors for school, college, and competitive exams.",
    primary: "Get Started",
    secondary: "Browse Tutors",
    image: "/images/hero-1.jpg",
  },
  {
    title: "Learn Anytime, Anywhere",
    description:
      "Online & in-person tuition options that fit your schedule and needs.",
    primary: "Join as Student",
    secondary: "Join as Tutor",
    image: "/images/hero-2.png",
  },
  {
    title: "Trusted by Students & Guardians",
    description:
      "Transparent profiles, secure payments, and trusted learning experience.",
    primary: "Explore Platform",
    secondary: "Learn More",
    image: "/images/hero-3.avif",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      4500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className=" bg-fuchsia-500
        relative w-full  overflow-hidden rounded-2xl
        h-[55vh] sm:h-[60vh] lg:h-[70vh] mx-1
         sm:mx-4 lg:mx-6 mt-8
      "
    >

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[index].image}
            alt="Hero Banner"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

   
      <div className="absolute inset-0 bg-black/60" />


      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-center"
          >
            <h1
              className="
                text-xl sm:text-3xl md:text-5xl lg:text-6xl
                font-extrabold text-white leading-tight
              "
            >
              {slides[index].title}
            </h1>

            <p
              className="
                mt-3 sm:mt-5
                text-xs sm:text-base md:text-lg lg:text-xl
                text-white/90
              "
            >
              {slides[index].description}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => navigate("/tuitions")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full sm:w-auto px-6 py-3"
              >
                {slides[index].primary}
              </motion.button>

              <motion.button
                onClick={() => navigate("/tutors")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary w-full sm:w-auto px-6 py-3"
              >
                {slides[index].secondary}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>


      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              index === i ? "bg-white w-6" : "bg-white/50 w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
