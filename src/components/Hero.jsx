import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const slides = [
  {
    title: "Find The Best Tutors & Tuitions",
    description:
      "Connect with verified tutors for school, college, and competitive exams.",
    primary: "Get Started",
    secondary: "Browse Tutors",
  },
  {
    title: "Learn Anytime, Anywhere",
    description:
      "Online & in-person tuition options that fit your schedule and needs.",
    primary: "Join as Student",
    secondary: "Join as Tutor",
  },
  {
    title: "Trusted by Students & Guardians",
    description:
      "Transparent profiles, secure payments, and trusted learning experience.",
    primary: "Explore Platform",
    secondary: "Learn More",
  },
];

const Hero = () => {
  const navigate= useNavigate()
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      4500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--bg)]">
     
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10" />

      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] leading-tight">
              {slides[index].title}
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-[var(--text-secondary)]">
              {slides[index].description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
               onClick={()=>{navigate('/tuitions')}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full sm:w-auto"
              >
                {slides[index].primary}
              </motion.button>

              <motion.button
              onClick={()=>{navigate('/tutors')}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary w-full sm:w-auto"
              >
                {slides[index].secondary}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>


        <div className="mt-10 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === i
                  ? "bg-[var(--primary)] w-6"
                  : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
