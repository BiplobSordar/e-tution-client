import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[var(--bg)]">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-[var(--text-primary)] mb-8"
      >
        About Our Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl mx-auto text-[var(--text-secondary)] text-lg md:text-xl text-center leading-relaxed mb-12"
      >
        Our platform is dedicated to connecting students, tutors, and guardians seamlessly. 
        We provide a trusted environment where students can find the best tutors for their 
        needs, tutors can share their expertise, and guardians can ensure quality learning 
        for their children. Whether it's academics, extracurricular subjects, or exam preparation, 
        we strive to make learning accessible, engaging, and effective for everyone.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow hover:shadow-lg transition-all text-center">
          <h3 className="font-semibold text-xl text-[var(--text-primary)] mb-2">Our Mission</h3>
          <p className="text-[var(--text-secondary)]">Empower students and tutors by providing a reliable learning platform.</p>
        </div>
        <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow hover:shadow-lg transition-all text-center">
          <h3 className="font-semibold text-xl text-[var(--text-primary)] mb-2">Our Vision</h3>
          <p className="text-[var(--text-secondary)]">Make quality education accessible to every student, anywhere.</p>
        </div>
        <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow hover:shadow-lg transition-all text-center">
          <h3 className="font-semibold text-xl text-[var(--text-primary)] mb-2">Our Values</h3>
          <p className="text-[var(--text-secondary)]">Trust, transparency, and dedication to student success.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default About
